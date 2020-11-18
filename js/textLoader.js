const projectsKey = 'projects';
const classicKey = 'classic';

loadText();

async function loadText() {
    await waitForJQuery();
    $(document).ready(function() {
        $.getJSON('../text/en/articles.json', function(data) {
            localStorage.setItem(projectsKey, JSON.stringify(data.projects));
        }).fail(function() {
            alert('Serious error occurred: Failed to load json articles file.');
            console.log('Failed to load articles.json file');
        });
    });
    $(document).ready(function() {
        $.getJSON('../text/en/game.json', function(data) {
            localStorage.setItem(classicKey, JSON.stringify(data.classic));
        }).fail(function() {
            alert('Serious error occurred: Failed to load json game file.');
            console.log('Failed to load classic.json file');
        });
    });
    textLoaderLoaded = true;
}

function getArticles() {
    let projects = JSON.parse(localStorage.getItem(projectsKey));
    return projects;
}

function getClassic() {
    let classic = JSON.parse(localStorage.getItem(classicKey));
    return classic;
}