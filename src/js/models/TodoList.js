/* import uniqid from "uniqid"; */

/* List with todo-items: constructor for todo-item, 
adding new todo-item, deleting todo-item  */

export default class TodoList {
    constructor() {
        this.todoItems = [];
    }

    addTodoItem(name, tag, person, until, urgency) {
        const randomNo = Math.random();
        
        const todoItem = {
            /* id: uniqid(), */
            id: randomNo,
            name,
            tag, 
            person,
            from: "19-1-1999",
            until,
            urgency
        }
        
        this.todoItems.push(todoItem);
        return todoItem;
    }

    deleteTodoItem(id) {
        console.log("deleteTodo called");
        const index = this.todoItems.findIndex(el => el.id === id);
        this.todoItems.splice(index, 1);
        
    }

    
}

 