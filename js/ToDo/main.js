startApp();

function startApp() {
    saveNewButtonPrototypes();

    draw();

    parseModels();

    createUploadLink();
    createDownloadLink();
}

function draw() {
    setUpCollEditor();
    setUpDetailHider();
}

function removeTask(task) {
    let index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    } else {
        console.error("Couldn't remove task_" + task);
    }
}