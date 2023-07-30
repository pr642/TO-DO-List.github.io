const todoList = [];

// Load data from Local Storage when the page is loaded
window.onload = function () {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (storedTodoList) {
        todoList.push(...storedTodoList);
        renderTodoList();
    }
};

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const task = todoInput.value.trim();

    if (task !== '') {
        todoList.push({ task, checked: false });
        todoInput.value = '';
        renderTodoList();
    }
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

function toggleCheck(index) {
    todoList[index].checked = !todoList[index].checked;
    renderTodoList();
}

function clearCompleted() {
    for (let i = todoList.length - 1; i >= 0; i--) {
        if (todoList[i].checked) {
            todoList.splice(i, 1);
        }
    }
    renderTodoList();
}

function renderTodoList() {
    const todoListUl = document.getElementById('todoList');
    todoListUl.innerHTML = '';

    todoList.forEach((item, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = item.task;

        // Add animation to newly added items
        todoItem.style.animation = 'slideIn 0.5s';
        todoItem.addEventListener('animationend', () => {
            todoItem.style.animation = '';
        });

        if (item.checked) {
            todoItem.classList.add('checked');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function () {
            deleteTodo(index);
        };

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        checkbox.onclick = function () {
            toggleCheck(index);
        };

        todoItem.appendChild(checkbox);
        todoItem.appendChild(deleteButton);
        todoListUl.appendChild(todoItem);
    });

    // Update the total number of tasks
    const totalTasks = document.getElementById('totalTasks');
    totalTasks.textContent = `Total Tasks: ${todoList.length}`;

    // Save data to Local Storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
