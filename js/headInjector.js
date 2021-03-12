const navKey = 'nav';
const footerKey = 'footer';
const maxLoadTime = 5000;
var textLoaderLoaded = false;
var headerFooterLoaded = false;

injectHead();

async function injectHead() {

    await injectJQuery();

    //loadLanguageScript();
    
    //NEXT 2 LINES ARE DISABLED TEMPORARILY FOR SOLLICITATION => NO NAVBAR
    await loadNavbar();

    createNavbar();

    await loadFooter();

    createFooter();
}

async function injectJQuery() {
    let script = document.createElement('script');
    script.src = 'js/external/jquery-3.5.1.js';
    document.head.appendChild(script);
    await waitForJQuery();
}

async function waitForJQuery() {
    let time = 0;
    while (jQueryLoaded() === false) {
        time++;
        await sleep(1);
        if (time > maxLoadTime) {
            //alert('Serious error occurred: Failed to load jQuery');
            throw 'Failed to load jQuery';
        }
    }
}

function jQueryLoaded() {
    let loaded = window.jQuery !== undefined;
    return loaded;
}

function loadLanguageScript() {
    let script = document.createElement('script');
    script.src = 'js/language.js';
    let headInjector = document.head.getElementsByTagName('script')[0];
    document.head.insertBefore(script, headInjector);
}

async function loadNavbar() {
    $.get('nav.html', function(nav) {
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(nav, 'text/html');
        let navbarHTML = htmlDoc.body.getElementsByTagName('mynavbar')[0];
        let navString = JSON.stringify(navbarHTML.innerHTML);
        localStorage.setItem(navKey, navString);
    }).fail(function() {
        //alert('Serious error occurred: Failed to load navigation bar.');
        console.log('Failed to load nav.html file');
    });;
    while (localStorage.getItem(navKey) === null) {
        await sleep(1);
    }
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

async function loadFooter() {
    $.get('footer.html', function(footer) {
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(footer, 'text/html');
        let footerHTML = htmlDoc.body.getElementsByTagName('footer')[0];
        let footerString = JSON.stringify(footerHTML.innerHTML);
        localStorage.setItem(footerKey, footerString);
    }).fail(function() {
        //alert('Serious error occurred: Failed to load footer.');
        console.log('Failed to load footer.html file');
    });;
    while (localStorage.getItem(footerKey) === null) {
        await sleep(1);
    }
}

function createFooter() {
    let savedFooter = localStorage.getItem(footerKey);
    let footer = document.createElement('footer');
    savedFooter = localStorage.getItem(footerKey);
    savedFooter = JSON.parse(savedFooter);
    footer.innerHTML = savedFooter;
    $(document).ready(function() {
        document.body.appendChild(footer, document.body.firstChild);
        headerFooterLoaded = true;
    });
}

async function waitForTextLoader() {
    while (textLoaderLoaded === false) {
        await sleep(1);
    }
}

async function waitForHeaderFooter() {
    while (headerFooterLoaded === false) {
        await sleep(1);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomIntInRange(minIncl, maxIncl) {
    let range = maxIncl - minIncl;
    let nextRand = Math.floor(Math.random() * range) + minIncl;
    return nextRand;
}