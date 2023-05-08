import { arrayOfTasks, saveToStorage } from '../index.js';

const tasksDiv = document.querySelector('.tasksDiv');
export default () => {
  tasksDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-square')) {
      for (let i = 0; i < arrayOfTasks.length; i += 1) {
        if (arrayOfTasks[i].id === +e.target.parentElement.getAttribute('data-id')) {
          arrayOfTasks[i].completed === false ? arrayOfTasks[i].completed = true
            : arrayOfTasks[i].completed = false;
          saveToStorage(arrayOfTasks);
        }
        if (arrayOfTasks[i].completed && arrayOfTasks[i].id === +e.target.parentElement.getAttribute('data-id')) {
          e.target.parentElement.childNodes[0].style.background = 'black';
          e.target.parentElement.childNodes[1].style['text-decoration'] = 'line-through';
          e.target.parentElement.childNodes[1].style.color = '#d3d3d3';
        }
        if (!arrayOfTasks[i].completed && arrayOfTasks[i].id === +e.target.parentElement.getAttribute('data-id')) {
          e.target.parentElement.childNodes[0].style.background = 'white';
          e.target.parentElement.childNodes[1].style['text-decoration'] = 'none';
          e.target.parentElement.childNodes[1].style.color = '#000';
        }
      }
    }
  });
};
