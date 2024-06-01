const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

let data = [];

// clicks on add btn -> form validation -> if success -> store the data in local storage  (acceptData func) -> display the data on the screen (createTasks func)

// form validation
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "") {
    // if textInput value is empty => show error message
    msg.textContent = "Task cannot be blank";
  } else {
    // else success
    msg.textContent = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    // IIFE
    () => {
      add.setAttribute("data-bs-dismiss", "");
    };
  }
};

// collecting the data and storing it in the local storage

const acceptData = () => {
  // the user input
  const task = {
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  };

  data.push(task);
  localStorage.setItem("tasks", JSON.stringify(data));
  createTasks();
  resetForm();
  console.log(data);
};

// displaying the data on the screen

const createTasks = () => {
  tasks.innerHTML = "";
  data.map((task, index) => {
    return (tasks.innerHTML += `
         <div id=${index}>
            <span class="fw-bold">${task.text}</span>
            <span class="text-secondary">
               ${task.date}
            </span>
            <p>${task.description}</p>
            <span class="options">
                <i class="fa-solid fa-edit" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
            </span>
        </div>
        `);
  });
};

const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

const deleteTask = (e) => {
  // delete the HTML elment from the screen
  e.parentElement.parentElement.remove();

  // remove element from data array
  data.splice(e.parentElement.parentElement.id, 1);

  // update the local storage
  localStorage.setItem("tasks", JSON.stringify(data));
};

const editTask = (e) => {
  // get the task to be edited
  let selectedTask = e.parentElement.parentElement;
  // set the textInput value , dateInput value and textarea value to the selected task
  textInput.value = selectedTask.children[0].textContent;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].textContent;
  deleteTask(e);
};

(() => {
  // getting the data from local storage
  data = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(data);
  // displaying it on screen
  createTasks();
})();
// sample input

// [
//   {
//     text: "Task 1",
//     date: "2021-07-20",
//     description: "This is the first task",
//   },
//   {
//     text: "Task 2",
//     date: "2021-07-20",
//     description: "This is the first task",
//   },
// ];
