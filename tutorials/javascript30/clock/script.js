const secHand = document.querySelector(".sec-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
  const now = new Date();
  console.log(now);
  const seconds = now.getSeconds();
  // + 90 because it was rotated by 90
  const secDegrees = (seconds / 60) * 360 + 90;
  // Update transform attribute for .sec-hand
  secHand.style.transform = `rotate(${secDegrees}deg)`;

  const minutes = now.getMinutes();
  const minDegrees = (minutes / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = (hour / 60) * 360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
