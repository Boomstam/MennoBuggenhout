const mailName = "mailto:mennobuggenhout";
const mailSuffix = "@gmail.com";
const messageSentAlert = "Thank you!";
const openDisplay = 'block';
const closedDisplay = 'none';
const disableScroll = 'hidden';
const enableScroll = 'auto';
var contactOpen = false;
var defaultMessage;
var defaultReplyInfo;

setUpContactForm();

async function setUpContactForm() {
    await waitForHeaderFooter();
    let link = document.body.getElementsByTagName('contactinfo')[0];
    link.onclick = function linkClicked() {
        toggleOverlay();
    }
    setUpContactWindow();
    setUpSubmitButton()
}

function setUpContactWindow() {
    let contactWindow = document.body.getElementsByTagName('contactwindow')[0];
    setUpCross(contactWindow);
    let mailLink = contactWindow.getElementsByClassName('mailLink')[0];
    mailLink.href = mailName + mailSuffix;
    setUpSubmitButton(contactWindow);
}

function setUpCross(contactWindow) {
    let cross = contactWindow.getElementsByTagName('cross')[0];
    cross.onclick = function crossClicked() {
        toggleOverlay();
    };
}

function setUpSubmitButton() {
    /*
        //Passing contact window as a parameter produced a reeeealy weird heisenbug where contactWindow logged fine,
        //but threw an 'undefined' error when used...?
        let contactWindow = document.body.getElementsByTagName('contactwindow')[0];
        console.log(contactWindow);//everything tip top
        contactWindow.getElementsByClassName('replyInfo')[0];// contactWindow = undefined?
    */
    let contactForm = document.body.getElementsByTagName('contactform')[0];
    let message = document.getElementById('message');
    let replyInfo = contactForm.getElementsByClassName('replyInfo')[0];
    defaultMessage = copyString(message.innerHTML);
    defaultReplyInfo = copyString(replyInfo.value);
    let button = contactForm.getElementsByClassName('submitButton')[0];
    button.onclick = function buttonClicked() {
        /*
            Read the hardcoded content of textarea => 'innerHTML'
            Edit it realtime => 'value'
            https://stackoverflow.com/questions/1927593/cant-update-textarea-with-javascript-after-writing-to-it-manually
        */
        alert(messageSentAlert);
        message.value = defaultMessage;
        replyInfo.value = defaultReplyInfo;
        toggleOverlay();
    }
}

function resetForm(contactWindow) {

}

function toggleOverlay() {
    contactOpen = !contactOpen;
    setOverlayDisplay();
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

function copyString(str) {
    let copy = (' ' + str).slice(1);
    return copy;
}