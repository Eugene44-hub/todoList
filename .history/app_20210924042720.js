const input = document.querySelector('input')
const button = document.querySelector('button')
const list = document.querySelector('ul')
const deleted = document.querySelector('#delete')
const check = document.querySelector('#checked')

class Task {
    constructor(input) {
        this.input = input.value;
    }

    addTask() {

    }

    deleteTask() {

    }

    displayTask() {
        if (this.input === '') {
            return
        }
        list.innerHTML += ` <li>${this.input}
        <i class="fas fa-trash-alt" id="delete"></i>
        <i class="fas fa-check-square" id="checked"></i>
    </li>`
    }
    taskComplete()
    deleteFromLs() {

    }
}



function eventListeners() {
    document.body.addEventListener('click', e => {
        const task = new Task(input);

        if (e.target === button)
            task.displayTask();

        if (e.target.id === 'delete') {
            e.target.parentElement.remove();
        }
    })



}

eventListeners()