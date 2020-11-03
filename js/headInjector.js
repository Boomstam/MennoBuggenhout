const navKey = 'nav';
const maxLoadTime = 5000;

injectHead();

async function injectHead() {
    await injectJQuery();

    loadLanguageScript();

    await loadNavbar();

    createNavbar();
}

function createNavbar() {
    let nav = localStorage.getItem(navKey);
    let mynavbar = document.createElement('mynavbar');
    nav = localStorage.getItem(navKey);
    nav = JSON.parse(nav);
    mynavbar.innerHTML = nav;
    $(document).ready(function() {
        document.body.insertBefore(mynavbar, document.body.firstChild);
    });
}

function loadLanguageScript() {
    let script = document.createElement('script');
    script.src = 'js/language.js';
    let headInjector = document.head.getElementsByTagName('script')[0];
    document.head.insertBefore(script, headInjector);
}

async function injectJQuery() {
    let script = document.createElement('script');
    script.src = 'js/external/jquery-3.5.1.js';
    document.head.appendChild(script);
    await waitForJQuery();
}

async function loadNavbar() {
    $.get('nav.html', function(nav) {
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(nav, 'text/html');
        let navbarHTML = htmlDoc.body.getElementsByTagName('mynavbar')[0];
        let navString = JSON.stringify(navbarHTML.innerHTML);
        localStorage.setItem(navKey, navString);
    }).fail(function() {
        alert('Serious error occurred: Failed to load navigation bar.');
        console.log('Failed to load nav.html file');
    });;
    while (localStorage.getItem(navKey) === null) {
        await sleep(1);
    }
}

async function waitForJQuery() {
    let time = 0;
    while (jQueryLoaded() === false) {
        time++;
        await sleep(1);
        if (time > maxLoadTime) {
            alert('Serious error occurred: Failed to load jQuery');
            throw 'Failed to load jQuery';
        }
    }
}

function jQueryLoaded() {
    let loaded = window.jQuery !== undefined;
    return loaded;
}

function createCssLink(style) {
    let link = document.createElement('link');
    link.href = style;
    link.rel = rel;
    document.head.appendChild(link);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}