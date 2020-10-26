var domainColl;

function setFromModel() {
    deleteAllCurrentDomains();
    for (const domain of domainColl.domains) {
        createDomain(domain);
    }
    draw();
}

function deleteAllCurrentDomains() {
    let domains = document.body.getElementsByTagName("domain");
    for (let i = domains.length - 1; i >= 0; i--) {
        let domain = domains[i];
        let deleteButton = domain.getElementsByClassName("removeDomain")[0];
        deleteButton.onclick.apply(deleteButton);
    }
}

function createDomain(domain) {
    let level = levels[0];
    let nextLevel = levels[1];
    let domainElement = getNewElement(document.body, level);
    setName(domain, domainElement, level);
    removeEmptyPrototype(domainElement, nextLevel);

    for (const task of domain.tasks) {
        createTask(task, domainElement, nextLevel);
    }
    updateShowDetails(domain, domainElement);
}

function createTask(task, domainElement, level) {
    let nextLevel = levels[2];
    let taskElement = getNewElement(domainElement, level);
    setName(task, taskElement, level);
    setFinished(task, taskElement, level);
    let importance = taskElement.getElementsByClassName("importance")[0];
    importance.value = task.importance;
    setTimings(task, taskElement, level);
    let deadline = taskElement.getElementsByClassName("deadline")[0];
    let formattedDate = formatDateForInputValue(task.deadline);
    deadline.value = formattedDate;
    removeEmptyPrototype(taskElement, nextLevel);

    for (const action of task.actions) {
        createAction(action, taskElement, nextLevel);
    }
    updateShowDetails(task, taskElement);
}

function createAction(action, taskElement, level) {
    let actionElement = getNewElement(taskElement, level);
    setName(action, actionElement, levels[2]);
    setFinished(action, actionElement, level);
    setTimings(action, actionElement, level);

    updateShowDetails(action, actionElement);
}

function getNewElement(parent, level) {
    let buttonName = "new" + level;
    let newButton = parent.getElementsByClassName(buttonName)[0];
    let element = newButton.onclick.apply(newButton);

    return element;
}

function setName(model, element, level) {
    let className = lowerCaseFirstLetter(level) + "Name";
    let name = element.getElementsByClassName(className)[0];
    name.value = model.name;
}

function setFinished(model, element, level) {
    let className = lowerCaseFirstLetter(level) + "Finished";
    let finished = element.getElementsByClassName(className)[0];
    finished.checked = model.finished;
}

function setTimings(model, element, level) {
    let estDurClassName = lowerCaseFirstLetter(level) + "EstDuration";
    let durClassName = lowerCaseFirstLetter(level) + "Duration";
    let estDuration = element.getElementsByClassName(estDurClassName)[0];
    estDuration.value = model.timings.estDuration;
    let duration = element.getElementsByClassName(durClassName)[0];
    duration.value = model.timings.duration;
}

function removeEmptyPrototype(element, nextLevel) {
    let removeName = "remove" + nextLevel;
    let tagName = lowerCaseFirstLetter(nextLevel);
    let protoElement = element.getElementsByTagName(tagName)[0];
    let removeButton = protoElement.getElementsByClassName(removeName)[0];
    removeButton.onclick.apply(removeButton);
}

function updateShowDetails(model, element) {
    let showDetails = model.showDetails;
    setShowDetails(element, showDetails);
}