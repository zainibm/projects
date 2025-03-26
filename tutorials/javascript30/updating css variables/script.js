const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
    // dataset is an object that contains all data attributes for a specific element (in this case, sizing)
    // || "" is included to handle hex values
    const suffix = this.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener("change", handleUpdate));
