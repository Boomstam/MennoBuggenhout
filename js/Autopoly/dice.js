const minPos = 10;
const maxPos = 90;
const speed = 10;

setUpDiceAnim();

function setUpDiceAnim() {
    let diceWrapper = document.body.getElementsByTagName('dicewrapper')[0];
    let dice = diceWrapper.children;

    dice.


    startAnim();
}

async function startAnim() {

}

function nextRandPos() {
    let x = randomIntInRange(minPos, maxPos);
    let y = randomIntInRange(minPos, maxPos);
}

function moveToPos(element, x, y) {
    element.style.left = x + '%';
    element.style.top = y + '%';
    //https: //stackoverflow.com/questions/11849654/interpolate-or-tween-between-two-values-but-not-animating/11849880
}