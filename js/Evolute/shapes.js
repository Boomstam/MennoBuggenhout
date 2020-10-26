class Circle {
    constructor(shape, radius, drawable) {
        this.shape = shape;
        this.radius = radius;
        this.drawable = drawable;
    }

    draw() {
        this.drawable.setStyles();

        ctx.beginPath();
        ctx.arc(this.shape.position.x, this.shape.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    clickDetected(point) {
        console.log(point);
    }
}

class Shape {
    constructor(position, onClick) {
        this.position = position;
        this.onClick = onClick;
    }
}

class Drawable {
    constructor(strokeWidth, fillColor, strokeColor) {
        this.strokeWidth = strokeWidth;
        this.color = fillColor;
        this.strokeColor = strokeColor;
    }

    setStyles() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}