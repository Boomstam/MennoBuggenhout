const hamburgerKey = 'hamburgerOpen';
const defaultOpenState = false;
const navAnimations = ['showNav', 'hideNav'];
const animationPrefix = 'animation: '
const animationSuffix = ' 0.5s forwards;'

setUpHamburgerClick();

async function setUpHamburgerClick() {
    let hamburger = document.body.getElementsByTagName('hamburger')[0];
    while (hamburger === undefined) {
        hamburger = document.body.getElementsByTagName('hamburger')[0];
        await sleep(1);
    }
    let navcontent = document.body.getElementsByTagName('navcontent')[0];
    let nav = navcontent.getElementsByTagName('nav')[0];

    if (localStorage.getItem(hamburgerKey) === undefined) {
        setHamburgerOpen(defaultOpenState);
    }
    let isOpen = getHamburgerOpen();
    if (isOpen) {
        setNavStartState(nav);
    }
    hamburger.onclick = function hamburgerClicked() {
        toggleHamburger();
        moveNav(nav);
    }
}

function setNavStartState(nav) {
    nav.style.opacity = "1";
    nav.style.marginLeft = "75px";
    nav.style.zIndex = "1";
}

function moveNav(nav) {
    let style = animationPrefix + getNavAnimation() + animationSuffix;
    nav.style = style;
}

function getNavAnimation() {
    let isOpen = getHamburgerOpen();
    if (isOpen) {
        return navAnimations[0];
    }
    return navAnimations[1];
}

function getHamburgerOpen() {
    let isOpen = localStorage.getItem(hamburgerKey);
    isOpen = JSON.parse(isOpen);
    return isOpen;
}

function setHamburgerOpen(openState) {
    localStorage.setItem(hamburgerKey, JSON.stringify(openState));
}

function toggleHamburger() {
    let isOpen = getHamburgerOpen();
    isOpen = !isOpen;
    setHamburgerOpen(isOpen);
}