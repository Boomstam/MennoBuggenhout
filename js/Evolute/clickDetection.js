setUpClickDetection();

function setUpClickDetection() {
    document.addEventListener("click", printClicked);
}

function getDistance(point1, point2) {
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;

    var distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
}

function printClicked(event) {
    console.log("CLICKED" + event.clientX + "_" + event.clientY);
}