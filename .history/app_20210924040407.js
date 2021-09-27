const input = document.querySelector('input')
const button = document.querySelector('button')
const ul = document.querySelector('ul')

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

s