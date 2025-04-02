const cats = [
    { name: "Nardo", age: 4 },
    { name: "Kuro", age: 121 },
];

/*
By inspecting a webpage, right clicking an element, and checking break on attribute modifications,
you can find which function is being called.
*/
function makeGreen() {
    const p = document.querySelector("p");
    p.style.color = "#BADA55";
    p.style.fontSize = "50px";
}

// Regular
console.log("Hai");

// Interpolated
console.log("Hai! This is a %s string!", "new");
// Alternatively => ES6 back ticks
// console.log(`Hai! This is a ${randomVar}`);

// Style
console.log("%cStylized text incoming :D", "font-size: 50px; background: red; text-shadow: 10px 10px 0 blue;");

// Warning (displays a warning icon)
console.warn("Uh Oh!");

// Error (displays an error icon)
console.error("Welp! What happened here...");

// Info (displays an exclamation icon)
console.info("Did you know the fear of long words is called hippopotomonstrosesquippedaliophobia?");

// Testing (displays an error icon if false)
console.assert(1 === 2, "Wrong! Try again.");
const p = document.querySelector("p");
console.assert(p.classList.contains("ouch"), "Incorrect element was selected");

// Clearing
// console.clear();

// Viewing DOM elements
// Displays an element
console.log(p);
// Displays an element's properties (classList, style, etc.)
console.dir(p);

// Grouping
cats.forEach(cat => {
    console.group(`${cat.name}`);
    // .groupCollapsed => defaults to collapsed
    // console.groupCollapsed(`${cat.name}`);
    console.log(`This is ${cat.name}`);
    console.log(`${cat.name} is ${cat.age} years old`);
    console.log(`${cat.name} is ${cats.age * 4} cat years old`);
    console.groupEnd(`${cat.name}`);
});

// Counting
console.count("Zainib");
console.count("Zainib");
console.count("Naruto");
console.count("Zainib");
console.count("Zainib");
console.count("Naruto");

// Timing => how long does a process take?
console.time("Fetching data...");
fetch("https://api.github.com/users/zainibm")
    .then(data => data.json())
    .then(data => {
        console.timeEnd("Fetching data...");
        console.log(data);
    });

// Table
console.table(cats);
