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

    // REACTION ON CLICKING BUTTONS / CHECKBOX
    elements.tasksList.addEventListener("click", e => {

        // REACTION ON CLICKING THE DEL-BTN 
        if (e.target.matches(".item__delete--btn")) {
            const tagId = e.target.parentElement.dataset.itemid;
            removeFromTodoList(tagId);

            // REACTION ON CLICKING THE EDIT-BTN 
        } else if (e.target.matches(".item__edit--btn")) {
            console.log("edit-btn pressed")

            // MOVE TO DONE-LIST WHEN CHECKBOX IS CHECKED:
        } else if (e.target.matches(".item__checkbox--btn")) {
            if (e.target.checked) {
                console.log("checkbox is checked");
                console.log(state);
                moveToDoneList();
                const tagId = e.target.parentElement.dataset.itemid;
                removeFromTodoList(tagId);
            } else {
                console.log("checkbox is NOT checked");
                console.log(state);
            }
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
    createTodoListMarkup();
}

const moveToDoneList = () => {
    // CREATE A NEW DONE-LIST IF THERE IS NONE YET
    if (!state.doneList) state.doneList = new TodoList();
    console.log("state.doneList created:");
    console.log(state);

    const todoListLength = state.todoList.todoItems.length;
    const newItem = state.todoList.todoItems[todoListLength - 1];
    console.log("New item: ");
    console.log(newItem);

    state.doneList.addTodoItem(newItem.name,
        newItem.tag,
        newItem.person,
        newItem.until,
        newItem.urgency);
    console.log("state.doneList updated: ");
    console.log(state.doneList);
    createDoneListMarkup();
}

// CREATE THE MARKUP ACCORDING TO STATE-TODOLIST-TODOITEMS[i] AND PUSH IT TO VIEW
const createTodoListMarkup = () => {
    const todoListLength = state.todoList.todoItems.length;
    const addedMarkup = todoView.renderTodoItem(state.todoList.todoItems[todoListLength - 1]);
    elements.tasksList.insertAdjacentHTML("beforeend", addedMarkup);
}

// CREATE THE MARKUP ACCORDING TO STATE-DONELIST-TODOITEMS[i] AND PUSH IT TO VIEW
const createDoneListMarkup = () => {
    const doneListLength = state.doneList.todoItems.length;
    const addedMarkup = todoView.renderTodoItem(state.doneList.todoItems[doneListLength - 1]);
    elements.doneList.insertAdjacentHTML("beforeend", addedMarkup);
}



// FUNCTION TRIGGERED AFTER PUSHING THE DELETE-ITEM-BUTTON:
const removeFromTodoList = id => {
    state.todoList.deleteTodoItem(id);
    todoView.deleteItem(id);
    console.log(state);
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


/*  
? CONTROLLING CLICKING ADD-BUTTON:
? elements.addBtn.addEventListener("click", () => {
?    console.log("clicked");
?}) 

? IS NOT THE SAME AS BELOW??? 
? elements.addBtn.addEventListener("click", console.log("clicked"))
*/