import { LocalStorage } from "./Todo App/storage.js";
import { TodoList } from "./Todo App/classes.js";
import { Command, CommandExecutor, Commands } from "./Todo App/command.js";


// same as window 
globalThis.DOM = {}

const DOM = globalThis.DOM

function renderList() {
    DOM.todoList.innerHTML = '';
    const list = TodoList.getInstance();
    for (let todo of list.items) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `${todo.text} 
                <button class="delete-btn">Delete</button>`;
        listItem.dataset.text = todo.text;
        DOM.todoList.appendChild(listItem);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded")

    DOM.todoList = document.getElementById('todo-list');
    DOM.addBtn = document.getElementById('add-btn');
    DOM.undoBtn = document.getElementById('undo-btn');
    DOM.todoInput = document.getElementById('todo-input')

    DOM.addBtn.addEventListener('click', () => {
        const cmd = new Command(Commands.ADD)
        CommandExecutor.execute(cmd);
    });

    DOM.todoList.addEventListener('click', (event) => {
        const toDelete = event.target.parentNode.dataset.text
        if (event.target.classList.contains('delete-btn')) {
            const cmd = new Command(Commands.DELETE, [toDelete]);
            CommandExecutor.execute(cmd);
        }
    })
    DOM.undoBtn.addEventListener('click', () => {
        let cmd = new Command(Commands.UNDO);
        CommandExecutor.execute(cmd);
    })
    TodoList.getInstance().addObserver(renderList);

})

document.addEventListener('DOMContentLoaded', () => {
    console.log({ LocalStorage: LocalStorage.load() })
    LocalStorage.load()
})

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    }
    if (e.ctrlKey && e.key === 'z') {
        event.preventDefault();
        const cmd = new Command(Commands.UNDO);
        CommandExecutor.execute(cmd);
    }
});