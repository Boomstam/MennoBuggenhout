var ctx;
var lastTimeStamp = 0;
var deltaTime = 0;

startGame();

requestAnimationFrame(draw);

function startGame() {
    let canvas = document.body.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext('2d');
    console.log("startGame" + canvas);
    console.log(ctx);

    let circle = new Circle(
        new Shape(
            new Point(50, 50)), 20, new Drawable(2, 'red', 'black')
    );
    circle.draw(ctx);

    draw();

    /*ctx.beginPath();
    ctx.rect(275, 35,  , 50);
    ctx.fill();
    ctx.stroke();*/
}

function draw(timestamp) {
    //console.log("draw" + timestamp);
    setDeltaTime(timestamp);
    requestAnimationFrame(draw);

}

function setDeltaTime(timestamp) {
    deltaTime = timestamp - lastTimeStamp;
    lastTimeStamp = timestamp;
}