// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('form');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

// Functions
function addTodo(e) {
  // Prevent form from submit
  e.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item")
  todoDiv.appendChild(newTodo);
  // Add todo to localStorage
  saveLocalTodos(todoInput.value);
  // CHECK mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML= '<i class="fas fa-check"> </i>'
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // TRASH mark button
  const trashButton = document.createElement('button');
  trashButton.innerHTML= '<i class="fas fa-trash"> </i>'
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  // Append to list
  todoList.appendChild(todoDiv);
  // Clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // The element where the event listener is attached
  // console.log(this)
  // The element that triggered the event
  // console.log(e.target)
  // Delete todo
  if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
      todo.remove();
    })
  }

  // Check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  console.log('clicked', e.target.value)
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch(e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted': {
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      };
    }
  })
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo);
    // CHECK mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"> </i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // TRASH mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"> </i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todos.indexOf(todo.children[0].innerText)
  todos.splice(todoIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}