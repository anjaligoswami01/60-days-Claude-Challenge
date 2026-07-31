// AI Study Planner — Deterministic Scheduling Engine
// Pure logic: no DOM access, no network calls. Same inputs always produce the same output.

function toMidnight(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function daysBetween(startDate, endDate) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

// Minimum guaranteed revision days reserved right before the exam.
function getMinRevisionDays(daysUntilExam) {
  if (daysUntilExam <= 1) return 0;
  if (daysUntilExam <= 3) return 1;
  return 2;
}

function generateSchedule(subjects, dailyHours, todayStr) {
  const result = { generatedAt: new Date().toISOString(), days: [] };

  if (!subjects || subjects.length === 0) {
    return result;
  }

  const today = todayStr ? toMidnight(todayStr) : toMidnight(formatDate(new Date()));
  const dailyMinutes = Math.round(dailyHours * 60);

  const subjectMeta = subjects.map(function (subject) {
    const examDate = toMidnight(subject.examDate);
    const daysUntilExam = daysBetween(today, examDate);
    const minRevisionDays = getMinRevisionDays(daysUntilExam);
    const studyDayCount = Math.max(daysUntilExam - minRevisionDays, 0);
    return {
      id: subject.id,
      name: subject.name,
      examDate: examDate,
      daysUntilExam: daysUntilExam,
      minRevisionDays: minRevisionDays,
      studyDayCount: studyDayCount,
      topics: subject.topics.slice(),
      topicsRemaining: subject.topics.length,
      topicsAssigned: 0
    };
  }).filter(function (s) {
    return s.daysUntilExam >= 0;
  });

  if (subjectMeta.length === 0) {
    return result;
  }

  const lastExamDate = subjectMeta.reduce(function (latest, s) {
    return s.examDate > latest ? s.examDate : latest;
  }, subjectMeta[0].examDate);

  const totalDays = daysBetween(today, lastExamDate) + 1;

  for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    const currentDate = addDays(today, dayIndex);
    const currentDateStr = formatDate(currentDate);
    const blocks = [];

    const activeSubjects = subjectMeta.filter(function (s) {
      return daysBetween(currentDate, s.examDate) >= 0;
    });

    activeSubjects.sort(function (a, b) {
      return daysBetween(currentDate, a.examDate) - daysBetween(currentDate, b.examDate);
    });

    const shareMinutes = activeSubjects.length > 0 ? Math.round(dailyMinutes / activeSubjects.length) : 0;

    activeSubjects.forEach(function (subject) {
      const daysLeftForSubject = daysBetween(currentDate, subject.examDate);
      const isExamDay = daysLeftForSubject === 0;

      if (isExamDay) {
        blocks.push({
          subjectId: subject.id,
          subjectName: subject.name,
          topicId: null,
          topicName: "Exam Day",
          type: "exam",
          durationMinutes: 0
        });
        return;
      }

      const hasTopicsLeft = subject.topicsAssigned < subject.topicsRemaining;
      const inGuaranteedRevisionWindow = daysLeftForSubject <= subject.minRevisionDays;

      // Topics still to cover, and we're not yet in the guaranteed revision window: study day.
      if (hasTopicsLeft && !inGuaranteedRevisionWindow && subject.studyDayCount > 0) {
        const topicsPerDay = Math.max(1, Math.ceil(subject.topicsRemaining / subject.studyDayCount));
        const topicsToAssignToday = Math.min(topicsPerDay, subject.topicsRemaining - subject.topicsAssigned);
        for (let t = 0; t < topicsToAssignToday; t++) {
          const topic = subject.topics[subject.topicsAssigned];
          if (!topic) break;
          blocks.push({
            subjectId: subject.id,
            subjectName: subject.name,
            topicId: topic.id,
            topicName: topic.name,
            type: "study",
            durationMinutes: Math.round(shareMinutes / topicsToAssignToday)
          });
          subject.topicsAssigned++;
        }
        return;
      }

      // Otherwise (topics done early, or inside the guaranteed revision window): revision.
      // This guarantees there are never idle gap days before an exam.
      blocks.push({
        subjectId: subject.id,
        subjectName: subject.name,
        topicId: null,
        topicName: "Revision",
        type: "revision",
        durationMinutes: shareMinutes
      });
    });

    result.days.push({ date: currentDateStr, blocks: blocks });
  }

  return result;
}