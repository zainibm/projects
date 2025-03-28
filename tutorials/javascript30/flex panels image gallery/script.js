const panels = document.querySelectorAll(".panel");

// Add (or remove) open from a <div class="panel"> element
function toggleOpen() {
    this.classList.toggle("open");
}

// Add (or remove) open-active from a <div class="panel"> element
function toggleActive(e) {
    if (e.propertyName.includes("flex")) {
        this.classList.toggle("open-active");
    }
}

panels.forEach(panel => panel.addEventListener("click", toggleOpen));
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));
