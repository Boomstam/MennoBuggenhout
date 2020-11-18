const name = "mailto:mennobuggenhout";
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

    /*while (link === undefined) {
        link = document.body.getElementsByTagName('contactinfo')[0];
        await sleep(1);
    }*/
    link.onclick = function linkClicked() {
        toggleOverlay();
    }
    setUpContactWindow();
    setUpSubmitButton()
}

function setUpContactWindow() {
    let contactWindow = document.body.getElementsByTagName('contactwindow')[0];
    console.log(contactWindow);
    setUpCross(contactWindow);

    let mailLink = contactWindow.getElementsByClassName('mailLink')[0];
    mailLink.href = name + mailSuffix;
    console.log(contactWindow);
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
        //Passing contact window as a parameter produced a reaaaaly weird heisenbug where contactWindow logged fine,
        //but threw an 'undefined' error when used...?
        let contactWindow = document.body.getElementsByTagName('contactwindow')[0];
        console.log(contactWindow);
        contact.getElementsByClassName('replyInfo')[0];
    */
    let contactForm = document.body.getElementsByTagName('contactform')[0];
    let message = document.getElementById('message');
    let replyInfo = contactForm.getElementsByClassName('replyInfo')[0];
    defaultMessage = copyString(message.innerHTML);
    defaultReplyInfo = copyString(replyInfo.value);
    let button = contactForm.getElementsByClassName('submitButton')[0];
    console.log(defaultMessage + defaultReplyInfo);
    button.onclick = function buttonClicked() {
        alert(messageSentAlert);

        console.log(defaultMessage + message.innerHTML);
        /*
            Want to read the hardcoded content of textarea => 'innerHTML'
            Want to edit it realtime => 'value'
            https://stackoverflow.com/questions/1927593/cant-update-textarea-with-javascript-after-writing-to-it-manually
        */
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