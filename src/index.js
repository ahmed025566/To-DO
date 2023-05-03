import './index.css';

const tasksDiv = document.querySelector('.tasksDiv');
const form = document.querySelector('.form');
const text = document.querySelector('.task-text');

const saveToStorage = (arrayOfTasks) => {
  for (let i = 0, j = 1; i < arrayOfTasks.length; i += 1, j += 1) {
    arrayOfTasks[i].IDX = j;
  }
  localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
};

const getFromStorage = () => {
  const storage = localStorage.getItem('tasks') === null
    ? [] : JSON.parse(localStorage.getItem('tasks'));
  return storage;
};

let arrayOfTasks = getFromStorage();

const displayData = () => {
  tasksDiv.innerHTML = '';
  arrayOfTasks.forEach((task) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.setAttribute('data-id', task.id);
    div.innerHTML = '<i class="fa-regular fa-square"></i>';
    div.innerHTML += `<input type="text" class = "taskText" value="${task.description}">`;

    div.innerHTML += '<i class="fa-solid fa-trash-can"></i>';
    tasksDiv.append(div);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (text.value !== '') {
    const task = {
      id: Date.now(),
      description: text.value,
      completed: false,
      IDX: arrayOfTasks.length + 1,
    };
    arrayOfTasks.push(task);
    text.value = '';
    saveToStorage(arrayOfTasks);
    displayData();
  }
});
const edit = () => {
  tasksDiv.addEventListener('input', (e) => {
    for (let i = 0; i < arrayOfTasks.length; i += 1) {
      if (arrayOfTasks[i].id === +e.target.parentElement.getAttribute('data-id')) {
        arrayOfTasks[i].description = e.target.value;
        saveToStorage(arrayOfTasks);
      }
    }
  });
};

const removeWithId = (taskID) => {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id !== +taskID);
  saveToStorage(arrayOfTasks);
};

const deleteTask = () => {
  tasksDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
      removeWithId(e.target.parentElement.getAttribute('data-id'));
      e.target.parentElement.remove();
    }
  });
};
const changeStyle = () => {
  tasksDiv.addEventListener('click', (e) => {
    for (let i = 0; i < arrayOfTasks.length; i += 1) {
      if (+e.target.parentElement.getAttribute('data-id') === arrayOfTasks[i].id) {
        e.target.style.background = '#FFF9A6';
        tasksDiv.childNodes[i].style.background = '#FFF9A6';
      }
    }
  });
};
const resetStyle = () => {
  tasksDiv.addEventListener('click', (e) => {
    for (let i = 0; i < arrayOfTasks.length; i += 1) {
      if (arrayOfTasks[i].id !== +e.target.parentElement.getAttribute('data-id')) {
        for (let k = 0; k < tasksDiv.childNodes.length; k += 1) {
          tasksDiv.childNodes[i].style.background = '#fff';
          tasksDiv.childNodes[i].childNodes[1].style.background = '#fff';
        }
      }
    }
  });
};
const reset = () => {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('taskText')) {
      for (let i = 0; i < tasksDiv.childNodes.length; i += 1) {
        tasksDiv.childNodes[i].style.background = '#fff';
        tasksDiv.childNodes[i].childNodes[1].style.background = '#fff';
      }
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  displayData();
  edit();
  reset();
  resetStyle();
  changeStyle();
  deleteTask();
});
