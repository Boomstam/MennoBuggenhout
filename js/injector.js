const charset = 'utf-8';
const rel = 'stylesheet';
const googleFontFamilies = ['Peddana', 'Raleway', 'Gudea', 'Roboto', 'Oswald', 'Staatliches', 'Poiret One'];
const googleFontLink = 'https://fonts.googleapis.com/css?family=';

const pages = ['Menno Buggenhout', 'CV', 'Projects', 'ToDo', 'Evolute'];
const globalStyles = ['global'];
const styleSheetNames = [
    ['home'],
    ['cv'],
    [],
    ['names', 'details', 'json', 'newButtons', 'collEditor', 'finished', 'models', 'miscToDo'],
    []
];
const globalScripts = ['menuManager'];
const scriptNames = [
    ['contact'],
    [],
    [],
    ['models', 'helpers', 'jsonManager', 'collEditor', 'detailHider', 'modelManager', 'modelParser', 'main'],
    ['shapes', 'actors', 'clickDetection', 'gameState', 'gameStarter']
];
const loadDelay = 1;

inject();

/* Wait time needed to ensure scripts are loaded*/
async function inject() {

    injectFonts();

    let pageIndex = getPageIndex();
    await injectCss(pageIndex);
    await injectJs(pageIndex);
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

async function injectCss(pageIndex) {
    let styles = styleSheetNames[pageIndex];
    let prefix = getFolderPrefix(pageIndex);
    for (i = 0; i < styles.length; i++) {
        let style = 'css/' + prefix + styles[i] + '.css';
        createCssLink(style);
        await sleep(loadDelay);
    }
    for (const gbStyle of globalStyles) {
        let style = 'css/' + gbStyle + '.css';
        createCssLink(style);
        await sleep(loadDelay);
    }
}

async function injectJs(pageIndex) {
    let scripts = scriptNames[pageIndex];
    let prefix = getFolderPrefix(pageIndex);
    for (const scrpt of scripts) {
        let source = 'js/' + prefix + scrpt + '.js';
        createJsScript(source);
        await sleep(loadDelay);
    }
    for (const gbScrpt of globalScripts) {
        let source = 'js/' + gbScrpt + '.js';
        createJsScript(source);
        await sleep(loadDelay);
    }
}

function createJsScript(source) {
    let script = document.createElement('script');
    script.src = source;
    document.body.appendChild(script);
}

function getPageIndex() {
    let title = document.title;
    let index = pages.indexOf(title);
    return index;
}

function createCssLink(style) {
    let link = document.createElement('link');
    link.href = style;
    link.rel = rel;
    document.head.appendChild(link);
}