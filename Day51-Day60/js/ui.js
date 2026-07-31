// AI Study Planner — UI Orchestration
// Wires the Subject Form and subject list to the storage layer.

let appState = loadData();
let editingSubjectId = null;
let tempTopics = [];

function initApp() {
  renderSubjectList();
  wireFormEvents();
  document.getElementById("dailyHoursInput").value = appState.preferences.dailyHours;
}

function wireFormEvents() {
  document.getElementById("addTopicBtn").addEventListener("click", handleAddTopic);
  document.getElementById("subjectForm").addEventListener("submit", handleFormSubmit);
  document.getElementById("cancelBtn").addEventListener("click", resetForm);
  document.getElementById("dailyHoursInput").addEventListener("change", handleDailyHoursChange);
  document.getElementById("topicInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTopic();
    }
  });
}

function handleDailyHoursChange(e) {
  const value = parseFloat(e.target.value);
  if (isNaN(value) || value < 0.5 || value > 16) {
    alert("Daily hours must be between 0.5 and 16.");
    e.target.value = appState.preferences.dailyHours;
    return;
  }
  appState.preferences.dailyHours = value;
  saveData(appState);
}

function handleAddTopic() {
  const input = document.getElementById("topicInput");
  const name = input.value.trim();
  if (!name) return;
  tempTopics.push({ id: generateId("top"), name: name });
  input.value = "";
  renderTempTopics();
}

function renderTempTopics() {
  const list = document.getElementById("topicList");
  list.innerHTML = "";
  tempTopics.forEach(function (topic, index) {
    const li = document.createElement("li");
    li.textContent = topic.name + " ";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.type = "button";
    removeBtn.addEventListener("click", function () {
      tempTopics.splice(index, 1);
      renderTempTopics();
    });
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("subjectNameInput");
  const examDateInput = document.getElementById("examDateInput");

  const name = nameInput.value.trim();
  const examDate = examDateInput.value;

  if (!name) {
    alert("Please enter a subject name.");
    return;
  }
  if (!examDate) {
    alert("Please choose an exam date.");
    return;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosenDate = new Date(examDate + "T00:00:00");
  if (chosenDate < today) {
    alert("Exam date cannot be in the past.");
    return;
  }
  if (tempTopics.length === 0) {
    alert("Please add at least one topic.");
    return;
  }

  if (editingSubjectId) {
    const subject = appState.subjects.find(function (s) { return s.id === editingSubjectId; });
    subject.name = name;
    subject.examDate = examDate;
    subject.topics = tempTopics;
  } else {
    appState.subjects.push({
      id: generateId("sub"),
      name: name,
      examDate: examDate,
      topics: tempTopics
    });
  }

  saveData(appState);
  resetForm();
  renderSubjectList();
}

function resetForm() {
  editingSubjectId = null;
  tempTopics = [];
  document.getElementById("subjectForm").reset();
  document.getElementById("topicList").innerHTML = "";
  document.getElementById("formTitle").textContent = "Add Subject";
  document.getElementById("saveBtn").textContent = "Save Subject";
}

function handleEditSubject(id) {
  const subject = appState.subjects.find(function (s) { return s.id === id; });
  if (!subject) return;

  editingSubjectId = id;
  tempTopics = subject.topics.map(function (t) { return { id: t.id, name: t.name }; });

  document.getElementById("subjectNameInput").value = subject.name;
  document.getElementById("examDateInput").value = subject.examDate;
  document.getElementById("formTitle").textContent = "Edit Subject";
  document.getElementById("saveBtn").textContent = "Update Subject";
  renderTempTopics();
  window.scrollTo(0, 0);
}

function handleDeleteSubject(id) {
  if (!confirm("Delete this subject? This cannot be undone.")) return;
  appState.subjects = appState.subjects.filter(function (s) { return s.id !== id; });
  saveData(appState);
  renderSubjectList();
}

function renderSubjectList() {
  const container = document.getElementById("subjectListContainer");
  container.innerHTML = "";

  if (appState.subjects.length === 0) {
    container.innerHTML = '<p class="empty-state">No subjects yet. Add your first subject above.</p>';
    return;
  }

  appState.subjects.forEach(function (subject) {
    const card = document.createElement("div");
    card.className = "subject-card";

    const title = document.createElement("h3");
    title.textContent = subject.name;

    const meta = document.createElement("p");
    meta.className = "subject-meta";
    meta.textContent = "Exam: " + subject.examDate + " · " + subject.topics.length + " topic(s)";

    const topicsList = document.createElement("p");
    topicsList.className = "subject-topics";
    topicsList.textContent = subject.topics.map(function (t) { return t.name; }).join(", ");

    const actions = document.createElement("div");
    actions.className = "subject-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () { handleEditSubject(subject.id); });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () { handleDeleteSubject(subject.id); });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(topicsList);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", initApp);