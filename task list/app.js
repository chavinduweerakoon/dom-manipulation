//ui vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load event listners
loadEventListeners();

function loadEventListeners() {
  //get tasks from LS
  document.addEventListener("DOMContentLoaded", getTasks);

  //add task event
  form.addEventListener("submit", addTask);

  //remove task event
  taskList.addEventListener("click", removeTask);

  //clear event
  clearBtn.addEventListener("click", clearTasks);

  //filter event
  filter.addEventListener("keyup", filterTasks);
}

//get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

//Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  }
  //create li
  const li = document.createElement("li");
  li.className = "collection-item";
  //text node
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //icon html
  link.innerHTML = '<i class="fa fa-remove"></>';
  li.appendChild(link);

  //append li to ui
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  e.preventDefault;
}

//local storage
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

//clear tasks
function clearTasks() {
  //   taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//filter tasks
function filterTasks(e) {
  const searchString = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(searchString) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
