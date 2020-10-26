function createUploadLink() {
    let uploadLink = document.body.getElementsByClassName("uploadFile")[0];
    let uploadButton = document.body.getElementsByClassName("uploadButton")[0];

    var rawJSON;

    uploadLink.oninput = function inputReceived() {
        let jsonFile = uploadLink.files[0];
        jsonFile.text().then(successCallback, failureCallback);

        function successCallback(result) {
            rawJSON = result;
        }

        function failureCallback(error) {
            console.error("Error reading file_" + error);
        }
    }
    uploadButton.onclick = function buttonClicked() {
        if (fillDomainColl(rawJSON) !== null) {
            setFromModel();

            draw();
        }
    }
}

function fillDomainColl(rawJSON) {
    var rawDomainColl;
    try {
        rawDomainColl = JSON.parse(rawJSON);
    } catch (err) {
        alert("No valid file uploaded_" + err);
        return null;
    }
    let domains = [];
    for (const domain of rawDomainColl.domains) {
        domains = domains.concat(getDomainModel(domain));
    }
    domainColl = new DomainColl(domains);
}

function getDomainModel(domain) {
    let tasks = [];
    for (const task of domain.tasks) {
        tasks = tasks.concat(getTaskModel(task));
    }
    let domainModel = new Domain(domain.name, tasks, domain.showDetails);

    return domainModel;
}

function getTaskModel(task) {
    let actions = [];
    for (const action of task.actions) {
        actions = actions.concat(getActionModel(action));
    }
    let taskModel = new Task(task.importance, task.name, actions,
        new Timings(task.timings.estDuration, task.timings.duration),
        new Date(task.deadline), task.finished, task.showDetails);

    return taskModel;
}

function getActionModel(action) {
    let actionModel = new Action(action.name,
        new Timings(action.timings.estDuration, action.timings.duration),
        action.finished, action.showDetails);

    return actionModel;
}

function createDownloadLink() {
    let downloadLink = document.body.getElementsByClassName("downloadLink")[0];

    downloadLink.onclick = function updateDownloadLink() {
        parseModels();

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(domainColl));
        downloadLink.setAttribute("href", dataStr);
        downloadLink.setAttribute("download", "todo.json");
    }
}