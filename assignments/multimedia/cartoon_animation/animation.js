var canvas = document.getElementById("top");
var ctx = canvas.getContext("2d");
canvas.width = 800, canvas.height = 400;
// Coordinates for space() placement
let x = -40, y = 85;
let value = true;

function animate() {
    // Clears the canvas (thus removing the previous space() shape)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Spaceship!!!
    document.addEventListener("DOMContentLoaded", space(ctx, x, y));
    // Update horizontal placement
    x += 2;
    // Update vertical placement
    if (y == 105) value = false;
    else if (y == 85) value = true;
    if (value) y += 0.25;
    else y -= 0.25;
    // Resets space() placement
    if (x > (canvas.width + 40)) x = -40;
    requestAnimationFrame(animate);
}

function space(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 23, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 1 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    x -= 25;
    ctx.moveTo(x, y);
    x += 50;
    ctx.lineTo(x, y);
    x += 30, y += 15;
    ctx.lineTo(x, y);
    x -= 110;
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
}

animate();
