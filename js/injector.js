const charset = 'utf-8';
const rel = 'stylesheet';
const googleFontFamilies = ['Peddana', 'Raleway', 'Gudea', 'Roboto', 'Oswald', 'Staatliches', 'Poiret One'];
const googleFontLink = 'https://fonts.googleapis.com/css?family=';

const pages = ['Menno Buggenhout', 'CV', 'Projects', 'ToDo', 'Evolute', 'Autopoly'];
const globalStyles = ['global'];
const styleSheetNames = [
    ['home'],
    ['cv'],
    ['projects'],
    ['names', 'details', 'json', 'newButtons', 'collEditor', 'finished', 'models', 'miscToDo'],
    [],
    ['board', 'gameElements']
];
const globalScripts = ['menuManager', 'contact', 'language', 'textLoader'];
const scriptNames = [
    [],
    [],
    ['helpers', 'projects'],
    ['models', 'helpers', 'jsonManager', 'collEditor', 'detailHider', 'modelManager', 'modelParser', 'main'],
    ['shapes', 'actors', 'clickDetection', 'gameState', 'gameStarter'],
    ['board', 'gameElements']
];
const loadDelay = 1;

inject();

async function inject() {

    injectFonts();

    let pageIndex = getPageIndex();
    await injectCSS(pageIndex);
    await injectJS(pageIndex);
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
    folderPrefix = folderPrefix + '/';

    return folderPrefix;
}

async function injectCSS(pageIndex) {
    let styles = styleSheetNames[pageIndex];
    let prefix = getFolderPrefix(pageIndex);
    for (i = 0; i < styles.length; i++) {
        let style = 'css/' + prefix + styles[i] + '.css';
        createCSSLink(style);
        await sleep(loadDelay);
    }
    for (const gbStyle of globalStyles) {
        let style = 'css/' + gbStyle + '.css';
        createCSSLink(style);
        await sleep(loadDelay);
    }
}

async function injectJS(pageIndex) {
    let scripts = scriptNames[pageIndex];
    let prefix = getFolderPrefix(pageIndex);
    for (const scrpt of scripts) {
        let source = 'js/' + prefix + scrpt + '.js';
        createJSScript(source);
        await sleep(loadDelay);
    }
    for (const gbScrpt of globalScripts) {
        let source = 'js/' + gbScrpt + '.js';
        createJSScript(source);
        await sleep(loadDelay);
    }
}

function createJSScript(source) {
    let script = document.createElement('script');
    script.src = source;
    document.body.appendChild(script);
}

function getPageIndex() {
    let title = document.title;
    let index = pages.indexOf(title);
    return index;
}

function createCSSLink(style) {
    let link = document.createElement('link');
    link.href = style;
    link.rel = rel;
    document.head.appendChild(link);
}