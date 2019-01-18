// ***** index.js ********

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

    // REACTION ON CLICKING DELETE-ALL-LISTS BUTTON
    elements.deleteListsBtnAll.addEventListener("click", () => {
        removeList("done");   // remove from state and DOM
        removeList("todo");   // remove from state and DOM
    });

    // REACTION ON CLICKING DELETE-TODO-LIST BUTTON
    elements.deleteListsBtnTodo.addEventListener("click", () => {
        removeList("todo");   // remove from state and DOM
    });

    // REACTION ON CLICKING DELETE-DONE-LIST BUTTON
    elements.deleteListsBtnDone.addEventListener("click", () => {
        removeList("done");   // remove from state and DOM
    });

    // ! REACTION ON CLICKING THE ICON => SORTING ITEMS
    elements.listIcons.addEventListener("click", e => {
        const elem = e.target.closest(".lists-icons__item");

        //console.log(elem);
        //console.log(state);

        if (elem.id == "lists-icons__urgency") {
            console.log("**** urgency icon clicked");
            sortListUrgency(state.todoList.items);

        } else if (elem.id == "lists-icons__name") {
            console.log("**** name icon clicked");
            sortListName(state.todoList.items);

        } else if (elem.id == "lists-icons__tag") {
            console.log("**** tag icon clicked");
            sortListTag(state.todoList.items);

        } else if (elem.id == "lists-icons__dateFrom") {
            console.log("**** dateFrom icon clicked");

        } else if (elem.id == "lists-icons__dateUntil") {
            console.log("**** dateUntil icon clicked");

        } else if (elem.id == "lists-icons__daysRemaining") {
            console.log("**** daysRemaining icon clicked");

        }

    })

    // REACTION ON CLICKING BUTTONS / CHECKBOX
    elements.lists.addEventListener("click", e => {
        const tagId = e.target.parentElement.dataset.itemid;
        console.log("other-Btn state:");
        console.log(state);

        // REACTION ON CLICKING THE DEL-BTN (item)
        if (e.target.matches(".item__delete--btn")) {
            (!e.target.checked) ? removeFromList(tagId, "todo") : removeFromList(tagId, "done");

            // REACTION ON CLICKING THE EDIT-BTN (item) 
        } else if (e.target.matches(".item__edit--btn")) {
            console.log("edit-btn pressed")

            // REACTION TO CHECKING / UCHECKING THE CHECKBOX
        } else if (e.target.matches(".item__checkbox--btn") && (e.target.checked)) {
            if (!state.doneList) state.doneList = new TodoList();
            moveItem(tagId, "todo", "done");

        } else if (e.target.matches(".item__checkbox--btn") && (e.target.checked === false)) {
            if (!state.todoList) state.todoList = new TodoList();
            moveItem(tagId, "done", "todo");
        }
    })
}

const moveItem = (tagId, listTypeFrom, listTypeTo) => {
    const sListFrom = findWhichList(listTypeFrom, "state");
    const sListTo = findWhichList(listTypeTo, "state");
    const newItem = sListFrom.getTodoItem(tagId);   // get copy of the item  
    switchChecked(newItem);     // change CHECKED x UNCHECKED 
    sListTo.items.push(newItem);     // add to state.doneList  
    removeFromList(tagId, listTypeFrom);      // remove from the first list
    createListMarkup(listTypeTo);       // add the markup and put it to the correct list
}

const removeList = (listType) => {
    const sList = findWhichList(listType, "state");
    const eList = findWhichList(listType, "elem");
    sList.deleteList();
    eList.innerHTML = "";
}

const addToTodoList = () => {
    if (!state.todoList) state.todoList = new TodoList();
    addFromFormToTodoState();       // add to state.todoList as a new item
    createListMarkup("todo");
}

const addFromFormToTodoState = () => {
    const dateFrom = new Date().getTime();
    const dateUntil = new Date(elements.taskUntil.value);
    const timestampUntil = dateUntil.getTime(); // format the date from input to timestamp
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
    (item.checked === "" || !item.checked) ? item.checked = "checked" : item.checked = "";
}

const createListMarkup = (listType) => {
    const sList = findWhichList(listType, "state");
    const eList = findWhichList(listType, "elem");
    const listLength = sList.items.length;
    const addedMarkup = todoView.renderItem(sList.items[listLength - 1]);
    eList.insertAdjacentHTML("beforeend", addedMarkup);
}

// FUNCTION TRIGGERED AFTER PUSHING THE DELETE-ITEM-BUTTON:
const removeFromList = (id, listType) => {
    const sList = findWhichList(listType, "state");
    sList.deleteListItem(id);
    todoView.deleteItem(id);
}

const findWhichList = (listType, elemOrState) => {
    /*     let stateList = undefined;  // ! ? Must be assigned???
        let elemList = undefined;  // ! ? Must be assigned??? */
    if (elemOrState == "state") {
        let stateList = undefined;  // ! ? Must be assigned???
        if (listType === "todo") {
            stateList = state.todoList;
        } else if (listType === "done") {
            stateList = state.doneList;
        }
        return stateList;

    } else if (elemOrState == "elem") {
        let elemList = undefined;  // ! ? Must be assigned???
        if (listType === "todo") {
            elemList = elements.tasksList;
        } else if (listType === "done") {
            elemList = elements.doneList;
        }
        return elemList;
    }
}


// ! SORTING §§§§§§§§§§§§§§§
const sortListUrgency = (items) => {
    const newStateTodoList = items.sort((a, b) => a.urgency - b.urgency);

    //state.todoList.items = newStateTodoList;
    console.log(state.todoList.items);
    console.log(newStateTodoList);
}

const sortListName = (items) => {
    const newStateTodoList = items.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());

    //state.todoList.items = newStateTodoList;
    console.log(state.todoList.items);
    console.log(newStateTodoList);
}

const sortListTag = (items) => {
    const newStateTodoList = items.sort((a, b) => a.tag - b.tag);
    //state.todoList.items = newStateTodoList;
    console.log(state.todoList.items);
    console.log(newStateTodoList);
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