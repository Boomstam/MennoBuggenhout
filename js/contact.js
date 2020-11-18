const name = "mennobuggenhout";
const mailSuffix = "@gmail.com";
const submittedTextAlert = "Het bericht is verstuurd!";
const openDisplay = 'block';
const closedDisplay = 'none';
const disableScroll = 'hidden';
const enableScroll = 'auto';
var contactOpen = false;

setUpContactForm();

async function setUpContactForm() {
    let link = document.body.getElementsByTagName('contactinfo')[0];

    while (link === undefined) {
        link = document.body.getElementsByTagName('contactinfo')[0];
        await sleep(1);
    }
    link.onclick = function linkClicked() {
        console.log('button clicked');
        contactOpen = !contactOpen;
        setOverlayDisplay();
    }
}

function setOverlayDisplay() {
    let contactOverlay = document.body.getElementsByTagName('contactoverlay')[0];
    let html = document.getElementsByTagName('html')[0];

    if (contactOpen) {
        contactOverlay.style.display = openDisplay;
        html.style.overflow = disableScroll;
    } else {
        contactOverlay.style.display = closedDisplay;
        html.style.overflow = enableScroll;
    }
}

/*let form = document.body.getElementsByTagName("form")[0];

form.onsubmit = function onsubmit() {
    alert(submittedTextAlert);
    let mail = name + mailSuffix;

    window.open('mailto:test@example.com?subject=subject&body=body');
}*/