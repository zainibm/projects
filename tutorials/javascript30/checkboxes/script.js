const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");
let lastChecked;

function handleCheck(e) {
    // Check if shift key was pressed && checkbox is being checked
    let inBetween = false;
    if (e.shiftKey && this.checked) {
        // Loop through each checkbox
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
                console.log("Starting to check inBetween");
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));
