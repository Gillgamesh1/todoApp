document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const modeToggle = document.getElementById('mode-toggle');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Load dark mode preference from localStorage
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply initial mode
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        modeToggle.querySelector('.mode-toggle__icon').textContent = '☀️';
    }

    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${todo}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add new todo
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            todos.push(newTodo);
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    });

    // Delete todo
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    });

    // Toggle dark mode
    modeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        modeToggle.querySelector('.mode-toggle__icon').textContent = isDarkMode ? '☀️' : '🌙';
    });

    // Initial render
    renderTodos();
});