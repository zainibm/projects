function draw_on_canvas() {
    document.body.style.backgroundColor = "mediumpurple";
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // Background color
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // JSON array of fruits
    var fruit = '{"fruit": [' +
        '{"name": "Apple", "quantity": 20, "color": "red"},' +
        '{"name": "Orange", "quantity": 10, "color": "orange"},' +
        '{"name": "Banana", "quantity": 15, "color": "yellow"},' +
        '{"name": "Kiwi", "quantity": 5, "color": "green"},' +
        '{"name": "Blueberry", "quantity": 5, "color": "blue"},' +
        '{"name": "Grapes", "quantity": 10, "color": "purple"}]}';
    // Converting JSON array to JavaScript object
    const obj = JSON.parse(fruit);
    let y_pos = 0, y_text = 44.4;
    // Bar graph
    for (let k = 0; k < obj.fruit.length; k++) {
        ctx.fillStyle = obj.fruit[k].color;
        ctx.fillRect(0, y_pos, (obj.fruit[k].quantity * 30), 400 / 6);
        // Text showing fruit[k] name and quantity
        ctx.font = "22.2px Lucida Console";
        ctx.fillStyle = "black";
        let msg = obj.fruit[k].name + ": " + obj.fruit[k].quantity;
        ctx.fillText(msg, 20, y_text);
        y_pos += 400 / 6, y_text += 400 / 6;
    }
}

document.addEventListener('DOMContentLoaded', draw_on_canvas);
