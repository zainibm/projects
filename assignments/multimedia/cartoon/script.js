function draw_on_canvas() {
    document.body.style.backgroundColor = "pink";
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // Background gradient
    const bg_grd = ctx.createLinearGradient(100, 250, 100, 0);
    bg_grd.addColorStop(0, "orange");
    bg_grd.addColorStop(1, "purple");
    ctx.fillStyle = bg_grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Stars
    let s1 = 10, s2 = -20;
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 80; j++) {
            ctx.beginPath();
            ctx.arc(s1, s2, 0.5, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
            s1 += 20;
        }
        s1 = 5 * (i - 15), s2 += 15;
    }
    // Moon (and its gradient)
    const moon_grd = ctx.createRadialGradient(750, 150, 120, 700, 150, 0);
    moon_grd.addColorStop(0, "gray");
    moon_grd.addColorStop(1, "white");
    ctx.beginPath();
    ctx.arc(650, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = moon_grd;
    ctx.fill();
    // Buildings
    let x_pos = 0, y_pos = 150;
    for (let k = 0; k < 4; k++) {
        ctx.fillStyle = "black";
        // Taller buildings
        ctx.fillRect(x_pos, y_pos, 100, 400);
        x_pos += 100, y_pos += 50;
        // Shorter buildings
        ctx.fillRect(x_pos, y_pos, 100, 350);
        x_pos += 100, y_pos -= 50;
    }
    // Windows
    const colors = ["yellow", "yellow", "orange", "orange", "red", "red", "purple", "purple", "blue"];
    let first_win = 10, second_win = 42, third_win = 74, win_height = 160;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 4; j++) {
            // Windows for taller buildings
            ctx.fillStyle = colors[i];
            ctx.fillRect(first_win, win_height, 16, 16);
            ctx.fillRect(second_win, win_height, 16, 16);
            ctx.fillRect(third_win, win_height, 16, 16);
            first_win += 100, second_win += 100, third_win += 100, win_height += 50;
            // Windows for shorter buildings
            ctx.fillRect(first_win, win_height, 16, 16);
            ctx.fillRect(second_win, win_height, 16, 16);
            ctx.fillRect(third_win, win_height, 16, 16);
            first_win += 100, second_win += 100, third_win += 100, win_height -= 50;
        }
        first_win = 10, second_win = 42, third_win = 74, win_height += 26;
    }
    // Bars
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 300, 800, 10);
    ctx.fillRect(0, 320, 800, 10);
    ctx.fillRect(0, 370, 800, 30);
    let bar = -5;
    for (k = 0; k < 9; k++) {
        ctx.fillStyle = "gray";
        ctx.fillRect(bar, 320, 10, 50);
        bar = 95 + (100 * k);
    }
    // Bench
    ctx.fillStyle = "violet";
    ctx.fillRect(250, 320, 300, 20);
    ctx.fillRect(260, 320, 10, 60);
    ctx.fillRect(530, 320, 10, 60);
    // Text
    ctx.fillStyle = "white";
    ctx.fillRect(300, 378, 200, 15);
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "purple";
    ctx.fillText("in another universe, we're two cats", 400, 390);
    // Kitties!
    document.addEventListener("DOMContentLoaded", kitties(ctx, 370, 320, "green"));
    document.addEventListener("DOMContentLoaded", kitties(ctx, 410, 320, "yellow"));
    // Horts
    document.addEventListener("DOMContentLoaded", hearts(ctx, 255, 323, "white"));
    document.addEventListener("DOMContentLoaded", hearts(ctx, 528, 323, "white"));
}

function kitties(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y); // Start
    ctx.lineTo(x - 10, y - 10); // Bottom left
    ctx.lineTo(x, y - 40); // Top left
    ctx.lineTo(x + 20, y - 40); // Top
    ctx.lineTo(x + 30, y - 10); // Top right
    ctx.lineTo(x + 20, y); // Bottom right
    ctx.closePath();
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(x + 10, y - 50, 15, 0, 2 * Math.PI);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.moveTo(x - 5, y - 50);
    ctx.lineTo(x - 10, y - 60)
    ctx.lineTo(x + 30, y - 60);
    ctx.lineTo(x + 25, y - 50);
    ctx.closePath();
    ctx.fill();
    // Tail
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x + 10, y - 2);
    ctx.lineTo(x + 18, y + 12);
    ctx.lineTo(x + 10, y + 24);
    ctx.lineTo(x + 18, y + 36);
    ctx.stroke();
}

function hearts(ctx, x, y, color) {
    ctx.fillStyle = color;
    // Left half
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 5.5, y);
    ctx.lineTo(x + 8.5, y + 4);
    ctx.lineTo(x + 8.5, y + 15);
    ctx.lineTo(x, y + 10);
    ctx.lineTo(x - 2.5, y + 5);
    // Right half
    ctx.moveTo(x + 8.5, y + 4);
    ctx.lineTo(x + 12.5, y);
    ctx.lineTo(x + 17, y);
    ctx.lineTo(x + 20, y + 5);
    ctx.lineTo(x + 17, y + 10);
    ctx.lineTo(x + 8.5, y + 15);
    ctx.closePath();
    ctx.fill();
}

document.addEventListener('DOMContentLoaded', draw_on_canvas);
