const input = document.querySelector('input')
const button = document.querySelector('#add')
let list = document.querySelector('ul')
const deleted = document.querySelector('#delete')
const check = document.querySelector('#checked')
const clear = document.querySelector('#clear-all')
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
            // console.log(task.textContent)

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

        clear.style.display = 'none';


    }
    taskComplete(task) {
        task.textContent = 'Task Completed';
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
    }

    clearAll() {
        list.innerHTML = '';
        localStorage.setItem('tasks', JSON.stringify([]))
        clear.style.display = 'none';
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
        if (e.target.id === 'checked') {
            task.taskComplete(e.target.parentElement);
        }
        if (e.target.id === 'clear-all') {
            task.clearAll()
        }
    })

    document.addEventListener('DOMContentLoaded', Task.displayfromLs())

}

eventListeners();

if (JSON.parse(localStorage.getItem('tasks')).length === 0 || localStorage.getItem('tasks') === null) {
    Swal.fire({ title: 'Welcome', text: 'You have no tasks' })
} else {
    Swal.fire({ title: 'Welcome', text: 'You have unfinished tasks' })
}