const languages = ['en', 'nl'];
const defaultLanguage = 0;
const languageKey = 'language';

function setUpClickHandlers() {
    let flags = document.body.getElementsByTagName('flags')[0];
    for (let languageIndex = 0; languageIndex < languages.length; languageIndex++) {
        let flag = flags.children[languageIndex];
        console.log(flag);
        flag.onclick = function flagClicked() {
            setCurrentLanguage(languageIndex);
        }
    }
}

function setCurrentLanguage(languageIndex) {
    localStorage.setItem(navKey, languageIndex);
}

function getCurrentLanguage() {
    let language = localStorage.getItem(navKey);
    if (language === null) {
        setCurrentLanguage(defaultLanguage);
    }
    return language;
}

function getText() {
    //let text = 
}