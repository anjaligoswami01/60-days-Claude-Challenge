// AI Study Planner — Secure AI Proxy (Google Gemini, free tier)
// The only backend code in this project. Keeps the API key server-side only.

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

function buildPrompt(type, context) {
  if (type === "explain") {
    const subjects = (context.subjects || [])
      .map(function (s) { return s.name + " (exam " + s.examDate + ")"; })
      .join(", ");
    return "You are a friendly study coach. In 2-3 short sentences, plain text, no markdown, " +
      "explain why a study plan prioritizes these subjects in this order based on how close their exams are: " +
      subjects + ". Mention that revision days are automatically scheduled before each exam.";
  }
  if (type === "tip") {
    const subjects = (context.todaySubjects || []).join(", ");
    const topics = (context.todayTopics || []).join(", ");
    return "You are a friendly study coach. Give ONE short, specific, practical study tip (1-2 sentences, plain text, no markdown) " +
      "for a student studying these subjects today: " + subjects + ", covering these topics: " + topics + ".";
  }
  if (type === "motivation") {
    return "You are a friendly study coach. Write ONE short motivational message (1 sentence, plain text, no markdown, no emojis) " +
      "for a student whose nearest exam (" + (context.nearestSubject || "a subject") + ") is in " +
      (context.daysUntilNearestExam != null ? context.daysUntilNearestExam : "a few") + " day(s).";
  }
  if (type === "qa") {
    return "You are a friendly, helpful study coach. Answer this student's question briefly and practically " +
      "(2-4 sentences, plain text, no markdown). Their current plan: " + (context.planSummary || "not provided") +
      ". Their question: " + (context.question || "");
  }
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      res.status(400).json({ success: false, error: "Invalid JSON body." });
      return;
    }
  }

  const type = body && body.type;
  const context = body && body.context;

  const allowedTypes = ["explain", "tip", "motivation", "qa"];
  if (!type || allowedTypes.indexOf(type) === -1) {
    res.status(400).json({ success: false, error: "Invalid or missing 'type'." });
    return;
  }
  if (!context || typeof context !== "object") {
    res.status(400).json({ success: false, error: "Invalid or missing 'context'." });
    return;
  }
  if (type === "qa") {
    if (!context.question || typeof context.question !== "string" || context.question.trim().length === 0) {
      res.status(400).json({ success: false, error: "Invalid or missing 'context.question'." });
      return;
    }
    if (context.question.length > 500) {
      res.status(400).json({ success: false, error: "Question is too long (max 500 characters)." });
      return;
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ success: false, error: "AI service is not configured." });
    return;
  }

  const prompt = buildPrompt(type, context);
  if (!prompt) {
    res.status(400).json({ success: false, error: "Could not build a prompt for this request type." });
    return;
  }

  try {
    const geminiResponse = await fetch(GEMINI_URL + "?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      res.status(502).json({ success: false, error: "AI service is temporarily unavailable." });
      return;
    }

    const data = await geminiResponse.json();
    const text = data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;

    if (!text) {
      res.status(502).json({ success: false, error: "AI service returned an unexpected response." });
      return;
    }

    res.status(200).json({ success: true, type: type, text: text.trim() });
  } catch (err) {
    console.error("Gemini request failed:", err);
    res.status(502).json({ success: false, error: "AI service is temporarily unavailable." });
  }
};