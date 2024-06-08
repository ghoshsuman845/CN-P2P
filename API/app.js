const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const todoForm = document.getElementById("todoForm");
const todoContainer = document.getElementById("todoContainer");
const newTodoInput = document.getElementById("newTodo");
const loader = document.getElementById("loader");

// Show loader
function showLoader() {
  loader.style.display = "block";
}

// Hide loader
function hideLoader() {
  loader.style.display = "none";
}

// Fetch and display todos
function fetchTodos() {
  showLoader();
  fetch(apiUrl + "?_limit=10") // Limiting to 10 items for simplicity
    .then((response) => response.json())
    .then((todos) => {
      todoContainer.innerHTML = "";
      todos.forEach((todo) => displayTodoItem(todo));
      hideLoader();
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
      hideLoader();
    });
}

// Display a todo item
function displayTodoItem(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo-item";
  todoDiv.setAttribute("data-id", todo.id);

  const todoText = document.createElement("input");
  todoText.type = "text";
  todoText.value = todo.title;
  todoText.disabled = true;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => editTodoItem(todo.id, todoText, editButton);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.style.display = "none";
  saveButton.onclick = () =>
    saveTodoItem(todo.id, todoText, editButton, saveButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTodoItem(todo.id, todoDiv);

  todoDiv.appendChild(todoText);
  todoDiv.appendChild(editButton);
  todoDiv.appendChild(saveButton);
  todoDiv.appendChild(deleteButton);
  todoContainer.appendChild(todoDiv);
}

// Add new todo item
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTodo = newTodoInput.value.trim();
  if (newTodo) {
    showLoader();
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then((response) => response.json())
      .then((todo) => {
        displayTodoItem(todo);
        newTodoInput.value = "";
        hideLoader();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        hideLoader();
      });
  }
});

// Edit todo item
function editTodoItem(id, todoText, editButton) {
  todoText.disabled = false;
  todoText.focus();
  editButton.style.display = "none";
  editButton.nextSibling.style.display = "inline";
}

// Save edited todo item
function saveTodoItem(id, todoText, editButton, saveButton) {
  const updatedTitle = todoText.value.trim();
  if (updatedTitle) {
    showLoader();
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, completed: false }),
    })
      .then((response) => response.json())
      .then(() => {
        todoText.disabled = true;
        editButton.style.display = "inline";
        saveButton.style.display = "none";
        hideLoader();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        hideLoader();
      });
  }
}

// Delete todo item
function deleteTodoItem(id, todoDiv) {
  showLoader();
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      todoContainer.removeChild(todoDiv);
      hideLoader();
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
      hideLoader();
    });
}

// Initial fetch of todos
window.onload = fetchTodos();
