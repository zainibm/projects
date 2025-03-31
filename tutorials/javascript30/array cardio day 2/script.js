const people = [
    { name: "Zainib", year: 1988 },
    { name: "Umbween", year: 1986 },
    { name: "Hafeefa", year: 1970 },
    { name: "Naruto", year: 2015 }
];

const comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 203842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 }
];

// .some() => does at least one element meet a given condition
const isAdult = people.some(function (person) {
    const currentYear = new Date().getFullYear();
    return (currentYear - person.year) >= 19;
});
console.log(isAdult); // true

// .every() => do all elements meet a given condition
const allAdults = people.every(person => (new Date().getFullYear() - person.year) >= 19);
console.log(allAdults); // false

// .find() => returns the element you are searching for
// Find the comment where ID = 823423
const findID = comments.find(comment => comment.id === 823423);
console.log(findID); // { text: "Super good", id: 823423 }

// .findIndex() => returns the index of the element you are searching for
// Find the index where ID = 823423
const index = comments.findIndex(comment => comment.id === 823423);
console.log(index);

// Remove element where ID = 823423
// comments.splice(index, 1);
const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
];
console.table(newComments);
