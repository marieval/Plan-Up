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

    /* elements.inputs.addEventlistener("invalid", () => {
        const invalidClassName = "invalid";
        input.classList.add(invalidClassName);
    })

    elements.inputs.addEventListener("input", () => {
        if (input.validity.valid) {
            const invalidClassName = "invalid";
            input.classList.remove(invalidClassName);
        }
    })
 */
    // REACTION ON CLICKING THE ADD-BTN:
    elements.addBtn.addEventListener("click", () => {
        addToTodoList();
        todoView.clearInput();
        console.log("AddBtn state:");
        console.log(state);
        //updateListsStorage(); // ! 
        //console.log(localStorage.todoDoneLists); // ! 
    });

    // REACTION ON CLICKING DELETE-ALL-LISTS BUTTON
    elements.deleteListsBtnAll.addEventListener("click", () => {
        removeList("done");   // remove from state and DOM
        removeList("todo");   // remove from state and DOM
        //updateListsStorage(); // ! 
    });

    // REACTION ON CLICKING DELETE-TODO-LIST BUTTON
    elements.deleteListsBtnTodo.addEventListener("click", () => {
        removeList("todo");   // remove from state and DOM
        //updateListsStorage();  // ! 
    });

    // REACTION ON CLICKING DELETE-DONE-LIST BUTTON
    elements.deleteListsBtnDone.addEventListener("click", () => {
        removeList("done");   // remove from state and DOM
        //updateListsStorage();  // ! 
    });

    // ! REACTION ON CLICKING THE ICON => SORTING ITEMS

    elements.listIconsTodo.addEventListener("click", e => {
        if (state.todoList) {
            console.log("****** e.target in TODO-LIST");
            console.log(e.target);

            const closestParentList = e.target.closest(".wrapper"); // find if it´s TODO or DONE
            let sList = undefined;
            if (closestParentList.id == "wrapper__todo-list") {
                listType = "todo";
                console.log("***** it´s todoList!!!!!!!!!!");
            } else if (closestParentList.id == "wrapper__done-list") {
                listType = "done";
                console.log("***** it´s doneList!!!!!!!!!!");
            }


            const elem = e.target.closest(".lists-icons__item");
            if (elem.classList.contains("lists-icons__urgency")) {
                sortList(listType, "urgency");
                console.log("sortList todo called");
            } else if (elem.classList.contains("lists-icons__name")) {
                sortList(sLlistTypeist, "name");
            } else if (elem.classList.contains("lists-icons__tag")) {
                sortList(listType, "tag");
            } else if (elem.classList.contains("lists-icons__dateFrom")) {
                console.log("**** dateFrom icon clicked");
                sortList(listType, "dateFrom");
            } else if (elem.classList.contains("lists-icons__dateUntil")) {
                console.log("**** dateUntil icon clicked");
                sortList(listType, "dateUntil");
            } else if (elem.classList.contains("lists-icons__daysRemaining")) {
                sortList(listType, "daysRemaining");
                console.log("**** daysRemaining icon clicked");
            }
            // ! createNewListView();
        }
    })

    elements.listIconsDone.addEventListener("click", e => {
        if (state.doneList) {
            console.log("e.target in DONE-LIST");
            console.log(e.target);

            const closestParentList = e.target.closest(".wrapper"); // find if it´s TODO or DONE
            let sList = undefined;
            console.log("closestParentList.id")
            console.log(closestParentList.id)
            if (closestParentList.id == "wrapper__todo-list") {
                listType = "todo";
                console.log("***** it´s todoList!!!!!!!!!!");
            } else if (closestParentList.id == "wrapper__done-list") {
                listType = "todo";
                console.log("***** it´s doneList!!!!!!!!!!");
            }

            const elem = e.target.closest(".lists-icons__item");
            console.log("eventListener on DoneList started +++++++++++++++");
            if (elem.classList.contains("lists-icons__urgency")) {
                sortList("done", "urgency");
                console.log("urgency triggered +++++++++++++++");
            } else if (elem.classList.contains("lists-icons__name")) {
                sortList("done", "name");
                console.log("name triggered +++++++++++++++");
            } else if (elem.classList.contains("lists-icons__tag")) {
                sortList("done", "tag");
            } else if (elem.classList.contains("lists-icons__dateFrom")) {
                console.log("**** dateFrom icon clicked");
                sortList("done", "dateFrom");
            } else if (elem.classList.contains("lists-icons__dateUntil")) {
                console.log("**** dateUntil icon clicked");
                sortList("done", "dateUntil");
            } else if (elem.classList.contains("lists-icons__daysRemaining")) {
                sortList("done", "daysRemaining");
                console.log("**** daysRemaining icon clicked");
            }
            // ! createNewListView();
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
            if (!state.doneList) state.doneList = new TodoList(); // ! 
            moveItem(tagId, "todo", "done");

        } else if (e.target.matches(".item__checkbox--btn") && (e.target.checked === false)) {
            if (!state.todoList) state.todoList = new TodoList();
            moveItem(tagId, "done", "todo");
        }
        //updateListsStorage();  // ! 
    })
}

const moveItem = (tagId, listTypeFrom, listTypeTo) => {
    const sListFrom = whichStateList(listTypeFrom);
    const sListTo = whichStateList(listTypeTo);
    const newItem = sListFrom.getTodoItem(tagId);   // get copy of the item  
    switchChecked(newItem);     // change CHECKED x UNCHECKED 
    sListTo.items.push(newItem);     // add to state.doneList  
    removeFromList(tagId, listTypeFrom);      // remove from the first list
    createListMarkup(listTypeTo);       // add the markup and put it to the correct list
}

const removeList = (listType) => {
    clearViewList(listType);
    clearStateList(listType);
}

const clearStateList = (listType) => {
    const sList = whichStateList(listType);
    sList.deleteList();
}

const clearViewList = (listType) => {
    const eList = whichElemList(listType);
    eList.innerHTML = "";
}


const addToTodoList = () => {
    if (!state.todoList) state.todoList = new TodoList(); // ! 
    addFromFormToTodoState();       // add to state.todoList as a new item
    createListMarkup("todo");
}

const createLists = () => {
    if (localStorage.getItem("todoDoneLists")) {
        JSON.parse(localStorage.getItem("todoDoneLists"));
        //const todoListStorage = state.todoList;
        //const doneListStorage = state.doneList;
        //createListMarkup("todo");  // ! 
        //createListMarkup("done");  // ! 
    }
    if (!state.todoList) state.todoList = new TodoList();
    if (!state.doneList) state.doneList = new TodoList();
    console.log("state after loclaStorage.getItem:");
    console.log(state);

}

/* const updateListsStorage = () => {  // ! 
    localStorage.setItem("todoDoneLists", JSON.stringify(state));
    console.log("LocalStorage:");  // ! 
    console.log(localStorage.todoDoneLists);  // ! 
} */

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
    const sList = whichStateList(listType);
    const eList = whichElemList(listType);
    const listLength = sList.items.length;
    const addedMarkup = todoView.renderItem(sList.items[listLength - 1]);
    eList.insertAdjacentHTML("beforeend", addedMarkup);
}

// FUNCTION TRIGGERED AFTER PUSHING THE DELETE-ITEM-BUTTON:
const removeFromList = (id, listType) => {
    const sList = whichStateList(listType);
    sList.deleteListItem(id);
    todoView.deleteItem(id);
}


const whichElemList = (listType) => {
    let elemList = undefined;  // ! ? Must be assigned???
    if (listType === "todo") {
        elemList = elements.tasksList;
    } else if (listType === "done") {
        elemList = elements.doneList;
    }
    return elemList;
}

const whichStateList = (listType) => {
    let stateList = undefined;  // ! ? Must be assigned???
    if (listType === "todo") {
        stateList = state.todoList;
    } else if (listType === "done") {
        stateList = state.doneList;
    }
    return stateList;
}




// ! SORTING §§§§§§§§§§§§§§§

const sortList = (listType, column) => {
    // elements.tasksList.innerHTML = "";
    clearViewList(listType);
    const sortList = whichStateList(listType);

    if (column == "urgency") {

        sList.sort((a, b) => a.urgency - b.urgency);
        // listType.items.sort((a, b) => a.urgency - b.urgency);
    } else if (column == "name") {
        sList.items.sort((a, b) => (a.name > b.name) ? 1 : -1);
        // listType.items.sort((a, b) => (a.name > b.name) ? 1 : -1);

    } else if (column == "tag") {
        sList.items.sort((a, b) => (a.tag > b.tag) ? 1 : -1);
        // listType.items.sort((a, b) => (a.tag > b.tag) ? 1 : -1);
    } else if (column == "dateFrom") { // ! TODO !!!! From - not working!!!!
        //listType.items.sort((a, b) => (b.from - a.from) ? 1 : -1);
    } else if (column == "daysRemaining" || column == "dateUntil") {
        // listType.items.sort((a, b) => (b.until - a.until) ? 1 : -1);
    }

    //const sList = findWhichList(listType, "state");

    listType.items.forEach(el => {
        //todoView.renderItem(sList.items)
        const newMarkup = todoView.renderItem(el);
        elements.tasksList.insertAdjacentHTML("beforeend", newMarkup);
    })

}

const setUntilDate = () => {
    restrictPastDates();
}

const restrictPastDates = () => {
    let today = new Date().toISOString().substr(0, 10);  // ! same as: new Date().toISOString().split('T')[0];
    elements.taskUntil.setAttribute('min', today);
}


// INITIALIZATION FUNCTION:
const init = () => {
    console.log("App has started");
    //console.log("LocalStorage:"); // ! 
    //console.log(localStorage.todoDoneLists); // ! 
    //createLists();  // ! added
    setupEventListeners();
    todoView.clearInput();
    setUntilDate();
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