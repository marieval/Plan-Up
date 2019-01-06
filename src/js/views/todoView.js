 import { elements } from "./base";

export const renderTodoItem = (todoItem) => {
    const markup = `
        <div class="item" data-itemid=${todoItem.id}>                
            <input class="item__checkbox--btn" type="checkbox" name="done"></input>
            <div class="item__urgency">${todoItem.urgency}</div>
            <div class="item__name">${todoItem.name}</div>
            <div class="item__tags">${todoItem.tag}</div>
            <div class="item__dateFrom">${todoItem.from}</div>
            <div class="item__dateUntil">${todoItem.until}</div>
            <div class="item__daysRemaining">150 years</div>
            <button class="item__delete--btn">Delete</button>
            <button class="item__edit--btn">Edit</button>
        </div>    
    `; 
    elements.tasksList.insertAdjacentHTML("beforeend", markup);
}

export const deleteItem = id => {
    const todoItem = document.querySelector(`[data-itemid="${id}"]`);
    if (todoItem) todoItem.parentElement.removeChild(todoItem);
}

export const clearInput = () => {    
    elements.taskName.value = "",
    elements.taskTag.value = "",
    elements.taskPerson.value = "",
    elements.taskUntil.value = "",
    elements.taskUrgency.value = ""
}
