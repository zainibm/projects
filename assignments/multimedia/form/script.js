document.getElementById("display").innerHTML = localStorage.getItem("lastTemp");

function tempCalc() {
    const conversionType = document.getElementsByName("tempOptions");
    var temp = parseInt(document.getElementById("tempValue").value);
    let tempString = "";
    if (!Number.isInteger(temp)) {
        tempString = "\"" + String(document.getElementById("tempValue").value) + "\" is an invalid input for temperature conversion :(";
        document.getElementById("display").innerHTML = tempString;
        localStorage.setItem("lastTemp", tempString);
    }
    else if (conversionType[0].checked) {
        tempString = temp;
        temp = (temp - 32) * (5 / 9);
        tempString += " in Fahrenheit is " + temp + " in Celsius";
        document.getElementById("display").innerHTML = tempString;
        localStorage.setItem("lastTemp", tempString);
    }
    else if (conversionType[1].checked) {
        tempString = temp;
        temp = (temp * (9 / 5)) + 32;
        tempString += " in Celsius is " + temp + " in Fahrenheit";
        document.getElementById("display").innerHTML = tempString;
        localStorage.setItem("lastTemp", tempString);
    }
}

function resetCalc() {
    localStorage.removeItem("lastTemp");
}
