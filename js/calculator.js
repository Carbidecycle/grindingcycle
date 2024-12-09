function showCalculator() {
    document.getElementById("calculatorForm").style.display = "block";
}

document.getElementById("operation").addEventListener("change", function() {
    let operation = this.value;
    if (operation === "cylindrical") {
        document.getElementById("cylindricalOptions").style.display = "block";
        document.getElementById("surfaceOptions").style.display = "none";
    } else {
        document.getElementById("surfaceOptions").style.display = "block";
        document.getElementById("cylindricalOptions").style.display = "none";
    }
});

function calculateSurface() {
    let stock = parseFloat(document.getElementById("stock").value);
    let speed = parseFloat(document.getElementById("speed").value);
    let feedrate = parseFloat(document.getElementById("feedrate").value);
    let depthOfCut = parseFloat(document.getElementById("depthOfCut").value);
    let depthPerPass = parseFloat(document.getElementById("depthPerPass").value);
    
    let result = (stock * (depthOfCut / depthPerPass)) / (feedrate * speed);
    document.getElementById("result").innerText = "Machining Time: " + result + " minutes";
}

function calculateCylindrical() {
    let grindingType = document.getElementById("grindingType").value;
    let result;
    
    if (grindingType === "outer" || grindingType === "inner") {
        let stock = parseFloat(document.getElementById("stock").value);
        let speed = parseFloat(document.getElementById("speed").value);
        let feedrate = parseFloat(document.getElementById("feedrate").value);
        let diameter = parseFloat(document.getElementById("diameter").value);
        let length = parseFloat(document.getElementById("length").value);
        result = (stock / (feedrate * ((60 * speed) / ((22 / 7) * diameter * length)))) * 10;
    } else {
        let length = parseFloat(document.getElementById("length").value);
        let majorDiameter = parseFloat(document.getElementById("taperingMajor").value);
        let minorDiameter = parseFloat(document.getElementById("taperingMinor").value);
        let feedrate = parseFloat(document.getElementById("feedrate").value);
        let speed = parseFloat(document.getElementById("speed").value);
        result = Math.sqrt(Math.pow(length, 2) + Math.pow(((majorDiameter - minorDiameter) / 2), 2)) / (feedrate * speed);
    }
    
    document.getElementById("result").innerText = "Machining Time: " + result + " minutes";
}
