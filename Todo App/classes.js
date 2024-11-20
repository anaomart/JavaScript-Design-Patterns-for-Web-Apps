import { observerMixin } from "./maxin.js";
console.log("hello")
export class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        // we use this so if we add a new property in the future we don't have to change the code every where 
        return this.text == other.text;
    }
}

export class TodoList {

    constructor() {
        if (TodoList.instance) {
            // the if statement makes sure we can do like this | new TodoList() | only once the we have to do with TodoList.getInstance() 
            throw new Error("Use TodoList.getInstance() instead.");
        }
    }
    //
    #data = new Set();
    get items() { return this.#data }
    // Singleton 
    static instance = null;

    static {
        // executed only once 
        this.instance = new TodoList();
    }

    static getInstance() {
        return this.instance;
    }
    
    add(item) {
        const array = Array.from(this.#data)
        const todoExists = array.filter(t => t.equals(item)).length > 0;
        console.log({todoExists})
        if (!todoExists) {
            this.#data.add(item);
            this.notify();

        }
    }

    delete(todo_text) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter(t => t.text == todo_text)[0];
        this.#data.delete(todoToDelete);
        this.notify();
    }


    find(text) {
        const array = Array.from(this.#data);
                this.notify();

        return array.find(i => i.text == text);

    }

    replaceList(list) {
        console.log(list);
        this.#data = list;
        this.notify();
    }


}



Object.assign(TodoList.prototype, observerMixin);