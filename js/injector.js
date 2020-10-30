const charset = "utf-8";
const rel = "stylesheet";
const googleFontFamilies = ["Peddana"];
const googleFontLink = "https://fonts.googleapis.com/css?family=";
const jQueryLink = "https://code.jquery.com/jquery-3.5.1.min.js";
const integrity = "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=";
const crossOrigin = "anonymous"

const pages = ["Menno Buggenhout", "CV", "Projecten", "ToDo", "Evolute"];
const globalStyles = ["global"];
const styleSheetNames = [
    ["home"],
    ["cv"],
    [],
    ["names", "details", "json", "newButtons", "collEditor", "finished", "models", "miscToDo"],
    []
];
const scriptNames = [
    ["contact"],
    [],
    [],
    ["models", "helpers", "jsonManager", "collEditor", "detailHider", "modelManager", "modelParser", "main"],
    ["shapes", "actors", "clickDetection", "gameState", "gameStarter"]
];
const loadDelay = 1;
const jQueryLoadDelay = 100;

inject();

/* Wait time needed to ensure scripts are loaded*/
async function inject() {
    await injectJQuery();
    await injectNavbar();
    injectFonts();

    let pageIndex = getPageIndex();
    await injectCss(pageIndex);
    await injectJs(pageIndex);
}

async function injectJQuery() {
    let script = document.createElement('script');
    script.src = jQueryLink;
    script.integrity = integrity;
    script.crossOrigin = crossOrigin;
    document.head.appendChild(script);
    console.log();
    await sleep(jQueryLoadDelay);
    /* 
        This arbitrary delay is NOT IDEAL yet because of potentially too slow hardware/connection.
        Make bottleneck-dependend some way or put in loop that can check if jQuery was loaded.
    */
}

async function injectNavbar() {
    $.get("nav.html", function(my_var) {
        console.log(my_var);
    });
}

function injectFonts() {
    for (const font of googleFontFamilies) {
        let link = document.createElement('link');
        link.href = googleFontLink + font;
        link.rel = rel;
        document.head.appendChild(link);
    }
}

function getFolderPrefix(pageIndex) {
    let folderPrefix = pages[pageIndex];
    folderPrefix = folderPrefix + "/";

    return folderPrefix;
}

async function injectCss(pageIndex) {
    let styles = styleSheetNames[pageIndex];
    let prefix = getFolderPrefix(pageIndex);
    for (i = 0; i < styles.length; i++) {
        let style = "css/" + prefix + styles[i] + ".css";
        createCssLink(style);
        await sleep(loadDelay);
    }
    for (const gbStyle of globalStyles) {
        let style = "css/" + gbStyle + ".css";
        createCssLink(style);
        await sleep(loadDelay);
    }
}

function createCssLink(style) {
    let link = document.createElement('link');
    link.href = style;
    link.rel = rel;
    document.head.appendChild(link);
}

async function injectJs(pageIndex) {
    let scripts = scriptNames[pageIndex];
    let prefix = getFolderPrefix(pageIndex);
    for (const scrpt of scripts) {
        let source = "js/" + prefix + scrpt + ".js";
        createJsScript(source);
        await sleep(loadDelay);
    }
}

function createJsScript(source) {
    let script = document.createElement('script');
    script.src = source;
    document.body.appendChild(script);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getPageIndex() {
    let title = document.title;
    let index = pages.indexOf(title);
    return index;
}