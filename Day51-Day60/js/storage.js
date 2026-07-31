// AI Study Planner — Storage Layer
// The only file that talks to localStorage. Everything else goes through these functions.

const STORAGE_KEY = "aiStudyPlanner.state";

function getDefaultState() {
  return {
    version: 1,
    preferences: {
      dailyHours: 3
    },
    subjects: [],
    generatedPlan: {
      generatedAt: null,
      days: []
    }
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultState();
    }
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) {
      return getDefaultState();
    }
    if (!Array.isArray(parsed.subjects)) parsed.subjects = [];
    if (!parsed.preferences) parsed.preferences = { dailyHours: 3 };
    if (!parsed.generatedPlan) parsed.generatedPlan = { generatedAt: null, days: [] };
    return parsed;
  } catch (err) {
    console.error("Failed to load data, resetting to default:", err);
    return getDefaultState();
  }
}

function saveData(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error("Failed to save data:", err);
    return false;
  }
}

function generateId(prefix) {
  return prefix + "_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}