import './index.css';

const tasksDiv = document.querySelector('.tasksDiv');
const arrayOfTasks = [
  {
    description: 'wash the dishes',
    id: Date.now(),
    completed: false,
    index: 1,
  },
  {
    description: 'Complete to do app project',
    id: Date.now(),
    completed: false,
    index: 2,
  },
];

const displayData = () => {
  tasksDiv.innerHTML = '';
  arrayOfTasks.forEach((task) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.setAttribute('data-id', task.id);
    div.innerHTML = '<i class="fa-regular fa-square"></i>';
    div.innerHTML += `<input type="text" class = "taskText" readonly value="${task.description}">`;
    div.innerHTML += '<i class="fa-solid fa-ellipsis-vertical"></i>';
    tasksDiv.append(div);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  displayData();
});