const openSymbol = "v";
const closedSymbol = ">";

const hideStyle = "none";
const showStyle = "inherit";

function setUpDetailHider() {
    for (const level of levels) {
        let details = lowerCaseFirstLetter(level) + "Details";
        let detailButtons = document.getElementsByClassName(details);
        setUpDetailsButtons(detailButtons, level);
    }
}

function setUpDetailsButtons(detailsButtons, level) {
    for (const button of detailsButtons) {
        let modelParent = getModelParent(button, level);
        button.onclick = function toggleVisibility() {
            let showDetails = getShowDetails(modelParent);
            let opposite = !showDetails;
            setShowDetails(modelParent, opposite);
        }
    }
}

function setShowDetails(modelParent, showDetails) {
    let button = getDetailsButton(modelParent);
    button.innerHTML = getDetailsSymbol(showDetails);
    for (const child of modelParent.children) {
        showOrHideElement(child, showDetails);
    }
    let header = modelParent.getElementsByTagName("levelHeader")[0];
    header.style.display = getDetailsStyle(true);
}

function showOrHideElement(element, showDetails) {
    let style = getDetailsStyle(showDetails);
    element.style.display = style;
}