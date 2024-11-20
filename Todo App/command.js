import { TodoItem, TodoList } from "./classes.js";
import { TodoHistory } from "./memento.js";

export class Command {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}
export const Commands = {
    ADD: 'add',
    DELETE: "delete",
    UNDO: "undo",
}

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();

        switch (command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput
                const todoText = todoInput.value.trim();
                const itemToAdd = todoList.find(todoText);
                if (todoText !== '' && itemToAdd == null) {
                    todoList.add(new TodoItem(todoText));
                    DOM.todoInput.value = '';

                }

                console.log("Add command");
                break;
            case Commands.DELETE:
                const [itemToDelete] = command.args;
                todoList.delete(itemToDelete);
                console.log("Delete command");
                break;
            case Commands.UNDO:
                const before = TodoHistory
                console.log({ before })
                const previousList = TodoHistory.pop();
                TodoHistory.pop();
                console.log({ previousList })
                console.log('undo command');
                if (previousList) {
                    console.log('undo command 2');
                    todoList.replaceList(previousList);
                }
        }
    }
}