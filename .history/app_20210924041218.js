const input = document.querySelector('input')
const button = document.querySelector('button')
const list = document.querySelector('ul')

class Task {
    constructor(input) {
        this.input = input.value;
    }

    addTask() {

    }

    deleteTask() {

    }

    displayTask() {
        list.innerHTML = ` <li>${this.input}
        <i class="fas fa-trash-alt" id="delete"></i>
        <i class="fas fa-check-square" id="checked"></i>
    </li>`
    }

    deleteFromLs() {

    }
}



function eventListeners() {
    button.addEventListener('click', () => {
        const task = new Task(input);
        task.displayTask()
    })

}

eventListeners()