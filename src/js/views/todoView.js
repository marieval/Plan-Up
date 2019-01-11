import { elements } from "./base";

export const getDaysDifference = (from, until) => {
    const diffDays = Math.ceil(Math.abs((from - until) / (24 * 60 * 60 * 1000)));
    return diffDays;
}

export const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayDate = `${day}.${month}.${year}`;
    return dayDate;
}

export const renderTodoItem = (todoItem) => {
    const dayFrom = getDate(todoItem.from);
    const dayUntil = getDate(todoItem.until);
    const daysBetween = getDaysDifference((new Date().getTime()), todoItem.until);
    const markup = `
        <div class="item" data-itemid=${todoItem.id}>                
            <input class="item__checkbox--btn" type="checkbox" name="done"></input>
            <div class="item__urgency">${todoItem.urgency}</div>
            <div class="item__name">${todoItem.name}</div>
            <div class="item__tags">${todoItem.tag}</div>
            <div class="item__dateFrom">${dayFrom}</div>
            <div class="item__dateUntil">${dayUntil}</div>
            <div class="item__daysRemaining">${daysBetween} days</div>
            <button class="item__delete--btn">Delete</button>
            <button class="item__edit--btn">Edit</button>
        </div>    
    `;
    return markup;
    // elements.todoItems.insertAdjacentHTML("beforeend", markup);
}

export const deleteItem = id => {
    const todoItem = document.querySelector(`[data-itemid="${id}"]`);
    if (todoItem) todoItem.parentElement.removeChild(todoItem);
}

export const clearInput = () => {
    // console.log("ClearInput called");  
    elements.taskName.value = "",
        elements.taskTag.value = "",
        elements.taskPerson.value = "",
        elements.taskUntil.value = "",
        elements.taskUrgency.value = ""
}
