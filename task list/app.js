//ui vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load event listners
loadEventListeners();

function loadEventListeners() {
  //add task event
  form.addEventListener("submit", addTask);
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

  //clear input
  taskInput.value = "";

  e.preventDefault;
}
