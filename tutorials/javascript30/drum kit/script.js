function removeTransition(e) {
  // transform is unique to playing
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function playSound(e) {
  // audio[data-key="${e.keyCode}"] is an attribute selector
  // audio stores the audio element corresponding to a pressed key
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  // Return if pressed key does not have an audio element
  if (!audio) return;

  // Adds playing to <div class="key">
  // This changes a pressed key's appearance
  key.classList.add("playing");
  // Restarts audio file if a key is pressed repeatedly
  // Otherwise, nothing will happen until the audio file finishes
  audio.currentTime = 0;
  audio.play();
}

// NodeList of <div class="key"> elements
const keys = document.querySelectorAll(".key");
// Loop through keys to attach an event listener to each key
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
