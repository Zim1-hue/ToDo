// Grab elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');


loadTasks();


addBtn.addEventListener('click', function() {
  addTask();
});


taskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});


function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    alert('Please type something!');
    return;
  }

  renderTask(text, false);
  saveTask(text);

  taskInput.value = '';
  taskInput.focus();
}


function renderTask(text, isDone) {
  const li = document.createElement('li');
  li.className = 'task-item' + (isDone ? ' done' : '');

  li.innerHTML = `
    <input type="checkbox" class="check-box" ${isDone ? 'checked' : ''} />
    <span>${text}</span>
    <button class="delete-btn">✕</button>
  `;


  const checkbox = li.querySelector('.check-box');
  checkbox.addEventListener('change', function() {
    li.classList.toggle('done', checkbox.checked);
    updateStorage();
  });

  
  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', function() {
    li.remove();
    updateStorage();
  });

  taskList.appendChild(li);
}


function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push({ text: text, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(function(item) {
    tasks.push({
      text: item.querySelector('span').textContent,
      done: item.classList.contains('done')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach(function(task) {
    renderTask(task.text, task.done);
  });
}