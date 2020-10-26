function parseModels() {
    let htmlDomains = document.body.getElementsByTagName("domain");
    let domains = [];
    for (const htmlDomain of htmlDomains) {
        domains = domains.concat(getDomain(htmlDomain));
    }
    domainColl = new DomainColl(domains);
}

function getDomain(htmlDomain) {
    let level = levels[0];
    let placeholder = {};
    let htmlTasks = htmlDomain.getElementsByTagName("task");
    setNameShowDetails(placeholder, htmlDomain, level);

    let tasks = [];
    for (const htmlTask of htmlTasks) {
        let task = getTask(htmlTask);
        tasks = tasks.concat(task);
    }
    let domain = new Domain(placeholder.name, tasks, placeholder.showDetails);

    return domain;
}

function getTask(htmlTask) {
    let level = levels[1];
    let placeholder = {};
    setNameShowDetails(placeholder, htmlTask, level);
    setFinishedTimings(placeholder, htmlTask, level);
    let importance = htmlTask.getElementsByClassName("importance")[0].value;
    let deadline = htmlTask.getElementsByClassName("deadline")[0].value;

    let htmlActions = htmlTask.getElementsByTagName("action");
    let actions = [];
    for (const htmlAction of htmlActions) {
        let action = getAction(htmlAction);
        actions = actions.concat(action);
    }
    let timings = new Timings(placeholder.estDur, placeholder.dur);
    let task = new Task(importance, placeholder.name, actions, timings, deadline, placeholder.finished, placeholder.showDetails);

    return task;
}

function getAction(htmlAction) {
    let level = levels[2];
    let placeholder = {};
    setNameShowDetails(placeholder, htmlAction, level);
    setFinishedTimings(placeholder, htmlAction, level);

    let timings = new Timings(placeholder.estDur, placeholder.dur);
    let action = new Action(placeholder.name, timings, placeholder.finished, placeholder.showDetails);

    return action;
}

function setNameShowDetails(placeholder, htmlElement, level) {
    let className = lowerCaseFirstLetter(level) + "Name";
    placeholder.name = htmlElement.getElementsByClassName(className)[0].value;
    placeholder.showDetails = getShowDetails(htmlElement);
}

function setFinishedTimings(placeholder, htmlElement, level) {
    let finishedClass = lowerCaseFirstLetter(level) + "Finished";
    let estDurClass = lowerCaseFirstLetter(level) + "EstDuration";
    let durClass = lowerCaseFirstLetter(level) + "Duration";
    placeholder.finished = htmlElement.getElementsByClassName(finishedClass)[0].checked;
    placeholder.estDur = htmlElement.getElementsByClassName(estDurClass)[0].value;
    placeholder.dur = htmlElement.getElementsByClassName(durClass)[0].value;
}