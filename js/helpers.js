/*const newButtonPrefix = "new";

function lowerCaseFirstLetter(word) {
    let newWord = word.charAt(0).toLowerCase() + word.slice(1);
    return newWord;
}

function removeElement(element) {
    if (element === null) {
        return;
    }
    if (element.parentNode === null) {
        element = null;
        return;
    }
    element.parentNode.removeChild(element);
}

function getToday() {
    var today = new Date();
    var date = formatDateForInputValue(today);
    return date;
}

function formatDateForInputValue(date) {
    var yyyy = date.getFullYear();
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate()).padStart(2, '0');
    var formattedDate = yyyy + '-' + mm + '-' + dd;
    return formattedDate;
}

function deepCopy(obj) {
    let copy = JSON.parse(JSON.stringify(obj));
    return copy;
}

function getModelParent(element, level) {
    if (element === undefined) {
        return undefined;
    }
    let name = lowerCaseFirstLetter(level);
    let parent = element.closest(name);
    return parent;
}

function getNewButton(modelElement) {
    let parent = modelElement.parentNode;
    let name = newButtonPrefix + parent;
    let newButton = parent.getchi
}

function getShowDetails(modelElement) {
    let firstBorn = modelElement.childNodes[0];
    let hidden = firstBorn.style.display === "none";
    return hidden === false;
}*/

/*if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};*/