import { observerMixin } from "./maxin.js";
console.log("hello")
export class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        return this.text == other.text;
    }
}

export class TodoList {

    //
    #data = new Set();
    get items() { return this.#data }
    static instance = null;

    static {
        this.instance = new TodoList();
    }

    static getInstance() {
        return this.instance;
    }
    constructor() {
        if (TodoList.instance) {
            throw new Error("Use TodoList.getInstance() instead.");
        }
    }
    add(item) {
        const array = Array.from(this.#data)
        const todoExists = array.filter(t => t.equals(item)).length > 0;
        if (!todoExists) {
            this.#data.add(item);
            this.notify();

        }
    }

    delete(todo) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter(t => t.text == todo);
        this.#data.delete(todoToDelete[0]);
        this.notify();
    }


    find(text) {
        const array = Array.from(this.#data);
        return array.find(i => i.text == text);
    }

    replaceList(list) {
        this.#data = list;
        this.notify();
    }


}


console.log()

Object.assign(TodoList.prototype, observerMixin);