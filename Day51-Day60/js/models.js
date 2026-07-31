// AI Study Planner — Data Models
// These are documentation-only shapes (no classes/enforcement) — see docs/SCHEMA.md for full details.

// Subject:
// { id: string, name: string, examDate: "YYYY-MM-DD", topics: Topic[] }

// Topic:
// { id: string, name: string }

// Preferences:
// { dailyHours: number }

// PlanDay:
// { date: "YYYY-MM-DD", blocks: Block[] }

// Block:
// { subjectId: string, subjectName: string, topicId: string|null, topicName: string, type: "study"|"revision", durationMinutes: number }

// Top-level state shape stored in localStorage under "aiStudyPlanner.state":
// { version: 1, preferences: Preferences, subjects: Subject[], generatedPlan: { generatedAt: string, days: PlanDay[] } }