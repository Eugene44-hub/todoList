const input = document.querySelector('input')
const button = document.querySelector('button')
const list = document.querySelector('ul')
const deleted = document.querySelector('#delete')
const check = document.querySelector('#checked')

class Task {
    constructor(input) {
        this.input = input.value;
    }

    addTaskToLS() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = []
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }
        tasks.push(this.input)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    deleteTask(task) {
        task.remove();
    }

    displayTask() {
        if (this.input === '') {
            return
        }
        list.innerHTML += ` <li>${this.input}
        <i class="fas fa-trash-alt" id="delete"></i>
        <i class="fas fa-check-square" id="checked"></i>
    </li>`;
        this.addTaskToLS()
    }
    taskComplete(task) {
        task.textContent = 'Task Completed'
        setTimeout(() => {
            this.deleteTask(task);
        }, 1000)

    }
    getfromLs() {
        const fromLs = JSON.parse(localStorage.getItem('tasks'));
        for (let i = 0; i < fromLs.length; i++) {
            console.log(fromLs[i])
        }
    }
    deleteFromLs() {

    }
}



function eventListeners() {
    document.body.addEventListener('click', e => {
        const task = new Task(input);

        if (e.target === button) {
            task.displayTask();
        }
        if (e.target.id === 'delete')
            task.deleteTask(e.target.parentElement);
        if (e.target.id === 'checked') {
            task.taskComplete(e.target.parentElement);
        }
    })



}

eventListeners()