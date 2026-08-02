// AI Study Planner — AI Client
// The only file that calls /api/ask-ai. Handles loading/error states.

async function askAI(type, context) {
  try {
    const response = await fetch("/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, context: context })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, text: null };
    }

    return { success: true, text: data.text };
  } catch (err) {
    console.error("AI request failed:", err);
    return { success: false, text: null };
  }
}

function buildExplainContext(subjects) {
  return {
    subjects: subjects.map(function (s) { return { name: s.name, examDate: s.examDate }; })
  };
}

function buildTipContext(todayPlanDay, subjects) {
  const subjectNames = [];
  const topicNames = [];
  if (todayPlanDay) {
    todayPlanDay.blocks.forEach(function (block) {
      if (subjectNames.indexOf(block.subjectName) === -1) subjectNames.push(block.subjectName);
      if (block.topicName && topicNames.indexOf(block.topicName) === -1) topicNames.push(block.topicName);
    });
  }
  return { todaySubjects: subjectNames, todayTopics: topicNames };
}

function buildMotivationContext(subjects, todayStr) {
  if (!subjects || subjects.length === 0) {
    return { nearestSubject: null, daysUntilNearestExam: null };
  }
  const today = new Date(todayStr + "T00:00:00");
  let nearest = null;
  let minDays = Infinity;
  subjects.forEach(function (s) {
    const examDate = new Date(s.examDate + "T00:00:00");
    const days = Math.round((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (days >= 0 && days < minDays) {
      minDays = days;
      nearest = s.name;
    }
  });
  return { nearestSubject: nearest, daysUntilNearestExam: nearest ? minDays : null };
}

function buildQaContext(question, subjects) {
  const summary = subjects.map(function (s) { return s.name + " (exam " + s.examDate + ")"; }).join(", ");
  return { question: question, planSummary: summary || "No subjects added yet" };
}