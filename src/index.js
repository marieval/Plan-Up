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

    elements.listIconsTodo.addEventListener("click", e => {
        console.log("e.target");
        console.log(e.target);
        const elem = e.target.closest(".lists-icons__item");
        console.log("eventListener started +++++++++++++++");
        if (elem.classList.contains("lists-icons__urgency")) {
            sortList(state.todoList, "urgency");
            console.log("urgency triggered +++++++++++++++");
        } else if (elem.classList.contains("lists-icons__name")) {
            sortList(state.todoList, "name");
            console.log("name triggered +++++++++++++++");
        } else if (elem.classList.contains("lists-icons__tag")) {
            sortList(state.todoList, "tag");
        } else if (elem.classList.contains("lists-icons__dateFrom")) {
            console.log("**** dateFrom icon clicked");
            sortList(state.todoList, "dateFrom");
        } else if (elem.classList.contains("lists-icons__dateUntil")) {
            console.log("**** dateUntil icon clicked");
            sortList(state.todoList, "dateUntil");
        } else if (elem.classList.contains("lists-icons__daysRemaining")) {
            sortList(state.todoList, "daysRemaining");
            console.log("**** daysRemaining icon clicked");
        }
    })

    elements.listIconsDone.addEventListener("click", e => {
        console.log("e.target");
        console.log(e.target);
        const elem = e.target.closest(".lists-icons__item");
        console.log("eventListener on DoneList started +++++++++++++++");
        if (elem.classList.contains("lists-icons__urgency")) {
            sortList(state.doneList, "urgency");
            console.log("urgency triggered +++++++++++++++");
        } else if (elem.classList.contains("lists-icons__name")) {
            sortList(state.doneList, "name");
            console.log("name triggered +++++++++++++++");
        } else if (elem.classList.contains("lists-icons__tag")) {
            sortList(state.doneList, "tag");
        } else if (elem.classList.contains("lists-icons__dateFrom")) {
            console.log("**** dateFrom icon clicked");
            sortList(state.doneList, "dateFrom");
        } else if (elem.classList.contains("lists-icons__dateUntil")) {
            console.log("**** dateUntil icon clicked");
            sortList(state.doneList, "dateUntil");
        } else if (elem.classList.contains("lists-icons__daysRemaining")) {
            sortList(state.doneList, "daysRemaining");
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

const findWhichList = (liType, elemOrState) => {
    /*     let stateList = undefined;  // ! ? Must be assigned???
        let elemList = undefined;  // ! ? Must be assigned??? */
    if (elemOrState == "state") {
        let stateList = undefined;  // ! ? Must be assigned???
        if (liType === "todo") {
            stateList = state.todoList;
        } else if (liType === "done") {
            stateList = state.doneList;
        }
        return stateList;

    } else if (elemOrState == "elem") {
        let elemList = undefined;  // ! ? Must be assigned???
        if (liType === "todo") {
            elemList = elements.tasksList;
        } else if (liType === "done") {
            elemList = elements.doneList;
        }
        return elemList;
    }
}


// ! SORTING §§§§§§§§§§§§§§§

const sortList = (listType, column) => {
    if (column == "urgency") {
        listType.items.sort((a, b) => a.urgency - b.urgency);
        console.log(state.todoList.items);
    } else if (column == "name") {
        listType.items.sort((a, b) => (a.name > b.name) ? 1 : -1);
        console.log(listType.items);
    } else if (column == "tag") {
        listType.items.sort((a, b) => (a.tag > b.tag) ? 1 : -1);
        console.log(listType.items);
    } else if (column == "dateFrom") {
        console.log("listtype-from:");
        console.log(listType.items[0].from);
        console.log(listType.items[1].from);
        console.log(listType.items[2].from);
        console.log(listType.items[3].from);

        listType.items.sort((a, b) => (b.from - a.from) ? 1 : -1);
        console.log(listType.items);
    } else if (column == "daysRemaining" || column == "dateUntil") {
        listType.items.sort((a, b) => (b.until - a.until) ? 1 : -1);
        console.log(listType.items);
    }

}

/* const sortListUrgency = (listType) => {
    listType.items.sort((a, b) => a.urgency - b.urgency);
    console.log("sorted-urgency:++++++++++++++");
    console.log(state.todoList.items);
}

const sortListName = (listType) => {
    listType.items.sort((a, b) => (a.name > b.name) ? 1 : -1);
    console.log("sorted-name:++++++++++++++");
    console.log(listType.items);
}

const sortListTag = (listType) => {
    listType.items.sort((a, b) => (a.tag > b.tag) ? 1 : -1);
    console.log("sorted-tag:++++++++++++++");
    console.log(listType.items);
}
 */

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