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

    deleteTask(task) {
        Swal.fire({ title: 'Deleted', icon: 'success', text: 'task Deleted' })

        task.remove();
        this.deleteFromLs(task)

    }

    displayTask(callback) {
        if (this.input === '' || time.value === '' || date.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please input a task and set the time correctly'
            })
            return
        }
        list.innerHTML += `
        <li><fieldset>${this.input}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></fieldset>
        </li>`;
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
    static displayfromLs() {
        const fromLs = JSON.parse(localStorage.getItem('tasks'));
        const hrsLs = JSON.parse(localStorage.getItem('hours'));
        const minLs = JSON.parse(localStorage.getItem('minutes'));
        const datesLS = JSON.parse(localStorage.getItem('dates'));
        for (let i = 0; i < fromLs.length; i++) {
            list.innerHTML += `
            <fieldset> <li><legend><p>On <span>${datesLS[i]}</span> <span id="hrs">By ${hrsLs[i]}</span>:<span id="mins">${minLs[i]}</span></p></legend>${fromLs[i]}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></li>
            <fieldset> <li><legend><p>On <span>${datesLS[i]}</span> <span id="hrs">By ${hrsLs[i]}</span>:<span id="mins">${minLs[i]}</span></p></legend>${fromLs[i]}<i class="fas fa-trash-alt" id="delete"></i><i class="fas fa-check-square" id="checked"></i></li>
            `
        }

    }

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

        console.log(task)
    }
    setTimer() {
        // const currentDate = new Date()

        // const timeTo = new Date(`${date.value}T${time.value}:00Z`)
        const timeTo = new Date(`${date.value}T${time.value}:00Z`)
            // const remMins = Math.abs(timeTo.getMinutes() - currentDate.getMinutes());
            // const remHrs = Math.round((timeTo.getTime() - currentDate.getTime()) / 3600000) - 1;

        return {
            hours: timeTo.getUTCHours().toString(),
            minutes: (timeTo.getMinutes() < 10 ? '0' : '') + timeTo.getMinutes()

        }

    }
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

//
console.log(new Date().getUTCMinutes())

// button.addEventListener('click', (e) => {


// })

// var day1 = new Date("12/25/2020");
// var day2 = new Date("08/25/2021");

// var difference = Math.abs(day2 - day1);
// days = difference / (1000 * 3600 * 24)

// console.log(days)
// console.log(days)
// console.log(date.value)
// console.log(time.value)

const dates = new Date;
console.log(dates.getTime().toString())

console.log(localStorage.getItem('tasks'))



//<legend><p>On <span>${date.value}</span> <span id="hrs">By ${callback.hours}</span>:<span id="mins">${callback.minutes}</span></p></legend>

//<fieldset><legend><p>On <span>${datesLS[i]}</span> <span id="hrs">By ${hrsLs[i]}</span>:<span id="mins">${minLs[i]}</span></p></legend>