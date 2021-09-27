const input = document.querySelector('input')
const button = document.querySelector('#add')
let list = document.querySelector('ul')
const deleted = document.querySelector('#delete')
const check = document.querySelector('#checked')
const clear = document.querySelector('#clear-all')
const minutes = document.querySelector('#minutes')
const hours = document.querySelector('#hours')
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
        Swal.fire({ title: 'Deleted', icon: 'success', text: 'task Deleted' })

        task.remove();
        this.deleteFromLs(task)

    }

    displayTask() {
        if (this.input === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'please input a task'
            })
            return
        }
        list.innerHTML += `<li>${this.input}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></li>`;
        this.addTaskToLS()

        clear.style.display = 'block';


    }
    taskComplete(task) {
        Swal.fire('Success', 'Good job', 'success')
        setTimeout(() => {
            this.deleteTask(task);
        }, 2000)

    }
    static displayfromLs() {
        const fromLs = JSON.parse(localStorage.getItem('tasks'));
        for (let i = 0; i < fromLs.length; i++) {
            list.innerHTML += `<li>${fromLs[i]}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></li>`
        }

    }

    deleteFromLs(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] === task.textContent) {
                tasks.splice([i], 1)
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
        if (JSON.parse(localStorage.getItem('tasks')).length === 0 || localStorage.getItem('tasks') === null) {

            clear.style.display = 'none'
        } else {

            clear.style.display = 'block'
        }
    }
    setTimer() {
        const date = new Date();


    }
    clearAll() {
        list.innerHTML = '';
        localStorage.setItem('tasks', JSON.stringify([]))
        clear.style.display = 'none';
        Swal.fire({ title: 'Cleared', text: 'Tasks Cleared successfully', icon: 'success' })
    }
}


function eventListeners() {
    document.body.addEventListener('click', e => {
        const task = new Task(input);

        if (e.target === button) {
            task.displayTask();
            input.value = '';
        }
        if (e.target.id === 'delete') {
            if (confirm('are you sure you want to delete'))
                task.deleteTask(e.target.parentElement);

        }
        if (e.target.id == 'checked') {
            task.taskComplete(e.target.parentElement);

        }
        if (e.target.id === 'clear-all') {
            task.clearAll()
        }
        console.log(e.target)
    })
    minutes.addEventListener('input',
        e => {
            const min = +e.target.value
            console.log(min)
        })
    hours.addEventListener('input',
        e => {
            const hr = +e.target.value
            console.log(hr)
        })
    document.addEventListener('DOMContentLoaded', Task.displayfromLs())

}

eventListeners();

if (JSON.parse(localStorage.getItem('tasks')).length === 0 || localStorage.getItem('tasks') === null) {
    Swal.fire({ title: 'Welcome', text: 'You have no tasks' });
    clear.style.display = 'none'
} else {
    Swal.fire({ title: 'Welcome', text: 'You have unfinished tasks' })
    clear.style.display = 'block'
}

const date = new Date();
const hours =
    console.log(date.setHours(22) - date.getHours())
console.log(date.getMinutes())