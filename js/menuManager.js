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

    setHamburgerOpen(defaultOpenState);

    hamburger.onclick = function hamburgerClicked() {
        toggleHamburger();
        let style = animationPrefix + getNavAnimation(getHamburgerOpen()) + animationSuffix;
        nav.style = style;
    }
}

function getNavAnimation(show) {
    if (show) {
        return navAnimations[0];
    }
    return navAnimations[1];
}

function getHamburgerOpen() {
    let isOpen = localStorage.getItem(hamburgerKey);
    isOpen = JSON.parse(isOpen);
    console.log(isOpen);
    return isOpen;
}

function setHamburgerOpen(openState) {
    console.log(openState);
    localStorage.setItem(hamburgerKey, JSON.stringify(openState));
}

function toggleHamburger() {
    let isOpen = getHamburgerOpen();
    isOpen = !isOpen;
    console.log(isOpen);
    setHamburgerOpen(isOpen);

}