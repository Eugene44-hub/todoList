const input = document.querySelector('input')
const button = document.querySelector('#add')
let list = document.querySelector('ul')
const deleted = document.querySelector('#delete')
const check = document.querySelector('#checked')
const clear = document.querySelector('#clear-all')
const date = document.querySelector('input[type=date]');
const time = document.querySelector('input[type=time]');

class Task {
    constructor(input) {
            this.input = input.value;
        }
        // adding task to LS
    addTaskToLS(hour, minute) {
            let tasks;
            let hours;
            let minutes;
            let dates;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
                hours = [];
                minutes = [];
                dates = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
                minutes = JSON.parse(localStorage.getItem('minutes'));
                hours = JSON.parse(localStorage.getItem('hours'));
                dates = JSON.parse(localStorage.getItem('dates'));
            }
            tasks.push(this.input)
            hours.push(hour)
            minutes.push(minute)
            dates.push(date.value)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            localStorage.setItem('hours', JSON.stringify(hours))
            localStorage.setItem('minutes', JSON.stringify(minutes))
            localStorage.setItem('dates', JSON.stringify(dates))
            console.log(hour, minute)
        }
        // delete Tak from DOM
    deleteTask(task) {
        Swal.fire({ title: 'Deleted', icon: 'success', text: 'task Deleted' })

        task.remove();
        this.deleteFromLs(task)
        console.log(task)
    }

    // display Task from DOM and display Error message if details are incorrect
    displayTask(callback) {
        if (this.input === '' || time.value === '' || date.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please input a task and set the time correctly'
            })
            return
        }

        Swal.fire({
            icon: 'success',
            title: 'Task added',
            text: 'You will be notified when its time'
        })
        list.innerHTML += `<li>${this.input}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></li>`;
        this.addTaskToLS(callback.hours, callback.minutes)

        clear.style.display = 'block';
        console.log(callback.hours)
        console.log(callback.minutes)

    }
    taskComplete(task) {
        Swal.fire('Success', 'Good job', 'success')
        setTimeout(() => {
            this.deleteTask(task);
        }, 2000)

    }

    //display Task when DOM is reloaded
    static displayfromLs() {
            const fromLs = JSON.parse(localStorage.getItem('tasks'));
            // const hrsLs = JSON.parse(localStorage.getItem('hours'));
            // const minLs = JSON.parse(localStorage.getItem('minutes'));
            // const datesLS = JSON.parse(localStorage.getItem('dates'));
            for (let i = 0; i < fromLs.length; i++) {
                list.innerHTML += `<li>${fromLs[i]}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></li>`
            }

        }
        // delete task from LS
    deleteFromLs(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let hours = JSON.parse(localStorage.getItem('hours'));
        let minutes = JSON.parse(localStorage.getItem('minutes'));
        let dates = JSON.parse(localStorage.getItem('dates'));

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] === task.textContent) {
                tasks.splice([i], 1)
                hours.splice([i], 1)
                minutes.splice([i], 1)
                dates.splice([i], 1)
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('hours', JSON.stringify(hours))
        localStorage.setItem('minutes', JSON.stringify(minutes))
        localStorage.setItem('dates', JSON.stringify(dates))
        if (JSON.parse(localStorage.getItem('tasks')).length === 0 || localStorage.getItem('tasks') === null) {

            clear.style.display = 'none'
        } else {

            clear.style.display = 'block'
        }

        console.log(task.textContent)
    }
    static TimeUp() {
        const hrsLs = JSON.parse(localStorage.getItem('hours'))
        const minLs = JSON.parse(localStorage.getItem('minutes'));
        const dateLs = JSON.parse(localStorage.getItem('dates'));
        const task = JSON.parse(localStorage.getItem('tasks'));

        const currentDate = new Date()
            // console.log(currentDate.getDate())
            // console.log(currentDate.getMonth() + 1)
            // console.log(currentDate.getFullYear())
            // console.log(currentDate.getDate())
        for (let i = 0; i < dateLs.length; i++) {
            let stored = new Date(`${dateLs[i]}T${hrsLs[i]}:${minLs[i]}:00Z`)
            if (currentDate.getDate() == stored.getDate() && (currentDate.getMonth() + 1) == (stored.getMonth() + 1) && currentDate.getHours() == stored.getUTCHours() && currentDate.getMinutes() == stored.getMinutes()) {
                Swal.fire({

                    title: 'Its time To',
                    text: task[i]
                })

                return

            }

        };

    }
    setTimer() {
        const timeTo = new Date(`${date.value}T${time.value}:00Z`)

        return {
            hours: (timeTo.getUTCHours() < 10 ? '0' : '') + timeTo.getUTCHours(),
            minutes: (timeTo.getMinutes() < 10 ? '0' : '') + timeTo.getMinutes()

        }

    }

    //clear all ask
    clearAll() {
        list.innerHTML = '';
        localStorage.setItem('tasks', JSON.stringify([]))
        localStorage.setItem('hours', JSON.stringify([]))
        localStorage.setItem('minutes', JSON.stringify([]))
        localStorage.setItem('dates', JSON.stringify([]))
        clear.style.display = 'none';
        Swal.fire({ title: 'Cleared', text: 'Tasks Cleared successfully', icon: 'success' })
    }
}


function eventListeners() {
    document.body.addEventListener('click', e => {
        const task = new Task(input);

        if (e.target === button) {
            task.displayTask(task.setTimer());
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
};

//convert to seconds first then subtract timeTO with currentTime
// console.log((((timeTo.getHours() * 60) - (currentDate.getHours() * 60)) / 60) - 1)
// console.log((((timeTo.getHours() * 60) - (currentDate.getHours() * 60)) / 60) - 1)



setInterval(e => {
    Task.TimeUp()
}, 1000)