var levelPrototypes = [];

function setUpCollEditor() {
    for (const level of levels) {
        let duplicate = "duplicate" + level;
        let remove = "remove" + level;
        let newCreators = "new" + level;
        let up = "up" + level;
        let down = "down" + level;

        let duplicateButtons = document.getElementsByClassName(duplicate);
        let removeButtons = document.getElementsByClassName(remove);
        let newButtons = document.getElementsByClassName(newCreators);
        let upButtons = document.getElementsByClassName(up);
        let downButtons = document.getElementsByClassName(down);

        setUpDuplicateButtons(duplicateButtons, level);
        setUpRemoves(removeButtons, level);
        setUpNewButtons(newButtons, level);
        setUpElementMovers(upButtons, downButtons, level);
    }
}

function setUpDuplicateButtons(duplicateButtons, level) {
    for (const button of duplicateButtons) {
        let modelParent = getModelParent(button, level);

        button.onclick = function duplicate() {
            let copy = modelParent.cloneNode(true);
            modelParent.parentNode.insertBefore(copy, modelParent);

            draw();
        }
    }
}

function setUpRemoves(removeButtons, level) {
    for (const button of removeButtons) {
        let modelParent = getModelParent(button, level);

        button.onclick = function remove() {
            removeElement(modelParent);

            draw();
        }
    }
}

function setUpNewButtons(newButtons, level) {
    let levelIndex = levels.indexOf(level);
    for (const button of newButtons) {
        let parent = button.parentNode;

        button.onclick = function newButton() {
            let levelProto = levelPrototypes[levelIndex];
            let levelProtoClone = levelProto.cloneNode(parent);
            parent.insertBefore(levelProtoClone, button);

            draw();

            return levelProtoClone;
        }
    }
}

function saveNewButtonPrototypes() {
    for (let i = 0; i < levels.length; i++) {
        let level = levels[i];
        let levelPrototype = document.getElementsByTagName(level)[0];
        let parent = levelPrototype.parentNode;
        levelPrototypes[i] = levelPrototype.cloneNode(parent);
    }
}

function setUpElementMovers(upButtons, downButtons, level) {
    for (const upButton of upButtons) {
        upButton.onclick = function move() {
            moveElement(upButton, true, level);
        }
    }
    for (const downButton of downButtons) {
        downButton.onclick = function move() {
            moveElement(downButton, false, level);
        }
    }
}

function moveElement(button, moveUp, level) {
    let modelParent = getModelParent(button, level);
    let parentParent = modelParent.parentNode;
    let upperCaseLevel = level.toUpperCase();
    let elementToInsertBefore = null;
    if (moveUp) {
        let previousSibling = modelParent.previousElementSibling;
        if (previousSibling.tagName === upperCaseLevel) {
            elementToInsertBefore = previousSibling;
        }
    } else {
        let nextSibling = modelParent.nextElementSibling;
        if (nextSibling.tagName === upperCaseLevel) {
            elementToInsertBefore = nextSibling.nextElementSibling;
        }
    }
    if (elementToInsertBefore !== null) {
        parentParent.insertBefore(modelParent, elementToInsertBefore);
    }
    draw();
}