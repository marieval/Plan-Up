/* import uniqid from "uniqid"; */

/* List with todo-items: constructor for todo-item, 
adding new todo-item, deleting todo-item  */

export default class TodoList {
    constructor() {
        this.items = [];
    }

    addTodoItem(name, tag, person, from, until, urgency) {
        const randomNo = Math.random();

        const todoItem = {
            /* id: uniqid(), */
            id: randomNo,
            name,
            tag,
            person,
            from,
            until,
            urgency,
            checked: ""
        }

        this.items.push(todoItem);
        return todoItem;
    }

    deleteTodoItem(ID) {
        const index = this.items.findIndex(el => el.id == ID); // ! doesn´t work with "===". WHY???
        this.items.splice(index, 1);
    }

    getTodoItem(ID) {
        let extractedItem = this.items.find(obj => obj.id == ID);
        console.log("+++++ extractedItem: ");
        console.log(extractedItem);
        return extractedItem;
        /* const index = this.items.findIndex(el => el.id == ID); // ! doesn´t work with "===". WHY???
        return this.items.slice(index, index + 1); */
    }

    /*     persistData() {
            localStorage.setItem("items", JSON.stringify(this.items));
        }
    
        readStorage() {
            const storage = JSON.parse(localStorage.getItem("todoList"));
            if (storage) this.todoList = storage;
        } */


}

