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
        console.log("AddBtn state:");
        console.log(state);
    });

    // REACTION ON CLICKING BUTTONS / CHECKBOX
    elements.lists.addEventListener("click", e => {
        console.log("other-Btn state:");
        console.log(state);

        // REACTION ON CLICKING THE DEL-BTN 
        if (e.target.matches(".item__delete--btn")) {
            const tagId = e.target.parentElement.dataset.itemid;
            removeFromTodoList(tagId);

            // REACTION ON CLICKING THE EDIT-BTN 
        } else if (e.target.matches(".item__edit--btn")) {
            const tagId = e.target.parentElement.dataset.itemid;
            console.log("edit-btn pressed")

            // MOVE TO DONE-LIST WHEN CHECKBOX IS CHECKED:
        } else if (e.target.matches(".item__checkbox--btn") && (e.target.checked)) {
            const tagId = e.target.parentNode.dataset.itemid;

            // CREATE A NEW DONE-LIST IF THERE IS NONE YET
            if (!state.doneList) state.doneList = new TodoList();

            const newItem = state.todoList.getTodoItem(tagId);  // get copy of the item         
            switchChecked(newItem); // change CHECKED x UNCHECKED            
            state.doneList.items.push(newItem); // add to state.doneList
            // moveToDoneList();
            removeFromTodoList(tagId);
            createDoneListMarkup();  // add the markup to the page

        } else if (e.target.matches(".item__checkbox--btn") && (e.target.checked === false)) {
            let tagId = e.target.parentElement.dataset.itemid;
            moveToTodoList();
            removeFromDoneList(tagId);
        }
    }

        /* } else if (e.target.matches(".item__checkbox--btn")) {
            if (e.target.checked) {
                let tagId = e.target.parentElement.dataset.itemid;
                moveToDoneList();
                removeFromTodoList(tagId);
            } else if (e.target.checked === false) {
                let tagId = e.target.parentElement.dataset.itemid;
                moveToTodoList();
                removeFromDoneList(tagId);
            }
        } */
    )
}

const moveToDoneList = () => {
    // CREATE A NEW DONE-LIST IF THERE IS NONE YET
    if (!state.doneList) state.doneList = new TodoList();
    // SELECT THE LAST ITEM FROM THE TODO-LIST
    state.todoList.getTodoItem(id)


    switchChecked(newItem); // change CHECKED x UNCHECKED
    state.doneList.items.push(newItem); // add to state.doneList
    createDoneListMarkup(); // add the markup to the page
}

const addToTodoList = () => {
    // CREATE A NEW TODO-LIST IF THERE IS NONE YET
    if (!state.todoList) state.todoList = new TodoList();
    addFromFormToTodoState();       // add to state.todoList as a new item
    createTodoListMarkup();     // 
}

const addFromFormToTodoState = () => {
    const dateFrom = new Date().getTime(); // TODAY´S DATE
    // FORMAT THE DATE FROM INPUT TO TIMESTAMP:
    const dateUntil = new Date(elements.taskUntil.value);
    const timestampUntil = dateUntil.getTime();
    // ADD ITEM-OBJECT TO STATE-ARRAY:
    state.todoList.addTodoItem(elements.taskName.value,
        elements.taskTag.value,
        elements.taskPerson.value,
        dateFrom,
        timestampUntil,
        elements.taskUrgency.value
    );
}



const switchChecked = (item) => {
    console.log("item:");
    console.log(item);
    if (item.checked === "" || !item.checked) {
        item.checked = "checked";
    } else {
        item.checked = ""
    }
}
/* 
const moveToTodoList = () => {
    // CREATE A NEW DONE-LIST IF THERE IS NONE YET
    if (!state.todoList) state.todoList = new TodoList();
        // SELECT THE LAST ITEM FROM THE DONE-LIST
    const doneListLength = state.doneList.items.length;
    const newItem = state.doneList.items[doneListLength - 1];
    switchChecked(newItem);  // change CHECKED x UNCHECKED
    state.todoList.items.push(newItem); // add to state.todoList
    createTodoListMarkup();  // add the markup to the page
} */

// CREATE THE MARKUP ACCORDING TO STATE-TODOLIST-ITEMS[i] AND PUSH IT TO VIEW
const createTodoListMarkup = () => {
    const todoListLength = state.todoList.items.length;
    const addedMarkup = todoView.renderTodoItem(state.todoList.items[todoListLength - 1]);
    elements.tasksList.insertAdjacentHTML("beforeend", addedMarkup);
}

// CREATE THE MARKUP ACCORDING TO STATE-DONELIST-ITEMS[i] AND PUSH IT TO VIEW
const createDoneListMarkup = () => {
    const doneListLength = state.doneList.items.length;
    const addedMarkup = todoView.renderTodoItem(state.doneList.items[doneListLength - 1]);
    elements.doneList.insertAdjacentHTML("beforeend", addedMarkup);
}

// FUNCTION TRIGGERED AFTER PUSHING THE DELETE-ITEM-BUTTON:
const removeFromTodoList = id => {
    state.todoList.deleteTodoItem(id);
    todoView.deleteItem(id);
}

const removeFromDoneList = id => {
    state.doneList.deleteTodoItem(id);
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


/*  
? CONTROLLING CLICKING ADD-BUTTON:
? elements.addBtn.addEventListener("click", () => {
?    console.log("clicked");
?}) 

? IS NOT THE SAME AS BELOW??? 
? elements.addBtn.addEventListener("click", console.log("clicked"))
*/