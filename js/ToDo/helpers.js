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

function lowerCaseFirstLetter(word) {
    let newWord = word.charAt(0).toLowerCase() + word.slice(1);

    return newWord;
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


function getDetailsButton(modelElement) {
    let levelHeader = modelElement.getElementsByTagName("levelHeader")[0];
    let level = modelElement.tagName.toLowerCase();
    let buttonName = level + "Details";
    let detailsButton = levelHeader.getElementsByClassName(buttonName)[0];

    return detailsButton;
}

function getShowDetails(modelElement) {
    let detailsButton = getDetailsButton(modelElement);
    let showDetails = detailsButton.innerHTML === openSymbol;

    return showDetails;
}

function setDetailsButtonSymbol(modelElement, showDetails) {
    let detailsButton = getDetailsButton(modelElement);
    detailsButton.innerHTML = getDetailsSymbol(showDetails);
}

function getDetailsSymbol(showDetails) {
    if (showDetails) {
        return openSymbol;
    }
    return closedSymbol;
}

function getDetailsStyle(showDetails) {
    if (showDetails) {
        return showStyle;
    }
    return hideStyle;
}