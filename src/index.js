/* Whole configuration done using 
https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1 */


import "./sass/main.scss";
import { elements } from "./js/views/base";
import TodoList from "./js/models/TodoList";
import * as todoView from "./js/views/todoView";
 
const state = {
};

// SETUP EVENT LISTENERS:
const setupEventListeners = () => {

    // REACTION ON CLICKING THE ADD-BTN:
    elements.addBtn.addEventListener("click", () => {
        addToTodoList();       
        todoView.clearInput();
    });

    // REACTION ON CLICKING THE DEL-BTN and EDIT-BTN:
    elements.tasksList.addEventListener("click", e => {
        if (e.target.matches(".item__delete--btn")) {
            const tagId = e.target.parentElement.dataset.itemid;
            removeFromTodoList(tagId);

        } else if (e.target.matches(".item__edit--btn")) {
            console.log("edit-btn pressed")
        }       
    })
}

const addToTodoList = () => {
    // CREATE A NEW TODO-LIST IF THERE IS NONE YET
    if (!state.todoList) state.todoList = new TodoList();  

    // FORMAT THE DATE FROM INPUT TO TIMESTAMP:
    const dateUntil = new Date(elements.taskUntil.value);
    const timestampUntil = dateUntil.getTime();

    // ADD ITEM-OBJECT TO STATE-ARRAY:
    state.todoList.addTodoItem(elements.taskName.value,
        elements.taskTag.value, 
        elements.taskPerson.value,
        timestampUntil,
        elements.taskUrgency.value
    );    
    const todoListLength = state.todoList.todoItems.length;
    todoView.renderTodoItem(state.todoList.todoItems[todoListLength - 1]);
}

// FUNCTION TRIGGERED AFTER PUSHING THE DELETE-ITEM-BUTTON:
const removeFromTodoList = id => {
    state.todoList.deleteTodoItem(id);
    todoView.deleteItem(id);        
}

// INITIALIZATION FUNCTION:
const init = () => {
    console.log("App has started");
    setupEventListeners();
    todoView.clearInput();
}

// CONTROLLING STARTING SETTING (AFTER LOADING):
window.addEventListener("load", () => {
    init();
})

// CONTROLLING CLICKING ADD-BUTTON:
/* elements.addBtn.addEventListener("click", () => {
    console.log("clicked");
}) 

- IS NOT THE SAME AS BELOW??? 
 elements.addBtn.addEventListener("click", console.log("clicked"))
*/