/* Whole configuration done using 
https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1 */


import "./sass/main.scss";
import { elements } from "./js/views/base";
import TodoList from "./js/models/TodoList";
import * as todoView from "./js/views/todoView";
 
const state = {};

const setupEventListeners = () => {
    elements.addBtn.addEventListener("click", () => {
        controlTodoList();       
        todoView.clearInput();
    })

    

}

const controlTodoList = () => {
    // create a new todo-list if there is none yet
    if (!state.todoList) state.todoList = new TodoList();

    state.todoList.addTodoItem(elements.taskName.value,
        elements.taskTag.value, 
        elements.taskPerson.value,
        elements.taskUntil.value,
        elements.taskUrgency.value
    );    
    const todoListLength = state.todoList.todoItems.length;
    todoView.renderTodoItem(state.todoList.todoItems[todoListLength - 1]);
}

const init = () => {
    console.log("App has started");
    setupEventListeners();
}

// CONTROLLING STARTING SETTING (AFTER LOADING):
window.addEventListener("load", () => {
    init();
})

// CONTROLLING CLICKING ADD-BUTTON:
/* elements.addBtn.addEventListener("click", () => {
    console.log("clicked");
}) */


/* elements.addBtn.addEventListener("click", console.log("clicked"))
*/