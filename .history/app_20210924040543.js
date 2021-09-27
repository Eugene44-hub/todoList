const input = document.querySelector('input')
const button = document.querySelector('button')
const list = document.querySelector('ul')

class Task {
    constructor(input) {
        this.input = input.value;
    }

    addTask() {
        console.log(this.input)
    }

    deleteTask() {

    }

    displayTask() {

    }

    deleteFromLs() {

    }
}
const task = new Task(input)

function eventListeners() {
    button.addEventListener

}