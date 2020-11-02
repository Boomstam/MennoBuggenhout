const jQueryLink = 'https://code.jquery.com/jquery-3.5.1.min.js';
const integrity = 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=';
const crossOrigin = 'anonymous';
const navKey = 'nav';
const textKey = 'text';
const maxLoadTime = 5000;

injectHead();

async function injectHead() {
    loadLanguageScript();

    if (jQueryLoaded() === false) {
        await injectJQuery();
    }
    let nav = localStorage.getItem(navKey);

    await loadText();

    //Don't check in development, but maybe enable for production?
    //if (nav === null) {
    await loadNavbar();
    //}
    nav = localStorage.getItem(navKey);
    //console.log(nav);
    nav = JSON.parse(nav);
    //console.log(nav);

    let mynavbar = document.createElement('mynavbar');
    mynavbar.innerHTML = nav;

    document.body.insertBefore(mynavbar, document.body.firstChild);
}

function loadLanguageScript() {
    let script = document.createElement('script');
    script.src = 'language.js';
    let headInjector = document.head.getElementsByTagName('script')[0];
    document.head.insertBefore(script, headInjector);
}

async function injectJQuery() {
    //console.log('injectJQuery');
    let script = document.createElement('script');
    script.src = jQueryLink;
    script.integrity = integrity;
    script.crossOrigin = crossOrigin;
    document.head.appendChild(script);
    await waitForJQuery();
}

async function loadNavbar() {
    $.get('nav.html', function(nav) {
        //console.log('loadNavBar');
        //console.log(nav);

        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(nav, 'text/html');
        let navbarHTML = htmlDoc.body.getElementsByTagName('mynavbar')[0];
        //console.log(navbarHTML);
        let navString = JSON.stringify(navbarHTML.innerHTML);
        //console.log(navString);
        localStorage.setItem(navKey, navString);
    }).fail(function() {
        alert('Serious error occurred: Failed to load navigation bar.');
        console.log('Failed to load nav.html file');
    });;
}

async function loadText() {
    $(document).ready(function() {
        $.getJSON('text.json', function(data) {
            console.log(data.en);
            console.log(data.nl);
        }).fail(function() {
            alert('Serious error occurred: Failed to load text');
            console.log('Failed to load text.json file');
        });
    });

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
    //console.log(loaded);
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