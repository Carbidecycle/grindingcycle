let calculatedTime = '';
let enteredValues = '';

function calculateTime() {
    const operationType = document.getElementById('operation-type').value;
    const length = parseFloat(document.getElementById('length').value);
    const diameter = parseFloat(document.getElementById('diameter').value);
    const feedRate = parseFloat(document.getElementById('feed-rate').value);
    const speed = parseFloat(document.getElementById('speed').value);

    // Check if the required fields are filled
    if (!length || !diameter || !feedRate || !speed) {
        alert('Please fill in all required fields.');
        return;
    }

    // Calculating time based on operation type
    let time = 0;
    let operation = '';

    if (operationType === 'od') {
        // Outer Diameter Grinding Formula
        time = (length * diameter) / (feedRate * speed);
        operation = "OD Grinding";
    } else if (operationType === 'id') {
        // Inner Diameter Grinding Formula
        time = (length * diameter) / (feedRate * speed);
        operation = "ID Grinding";
    } else if (operationType === 'tapering') {
        // Tapering Grinding Formula (using average diameter)
        const averageDiameter = (diameter + parseFloat(document.getElementById('taper-diameter').value)) / 2;
        time = (length * averageDiameter) / (feedRate * speed);
        operation = "Tapering Grinding";
    } else if (operationType === 'surface') {
        // Surface Grinding Formula
        time = (length * diameter) / (feedRate * speed); // Placeholder formula
        operation = "Surface Grinding";
    }

    // Store entered values and time
    enteredValues = `Operation Type: ${operation}\nLength: ${length} mm\nDiameter: ${diameter} mm\nFeed Rate: ${feedRate} mm/min\nSpeed: ${speed} rpm`;

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Calculated Time: ${time.toFixed(2)} minutes</p>`;

    // Show the download button after calculation
    document.getElementById('download-button').classList.remove('hidden');

    // Save calculated time
    calculatedTime = time.toFixed(2);

    // Automatically refresh the page after calculation (only once the result is shown)
    setTimeout(() => {
        location.reload(); // This will reload the page after the result is displayed and download button appears
    }, 5000);  // Delay to give user time to see the result
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Calculation Result:`, 10, 10);
    doc.text(`Operation Type: ${enteredValues}`, 10, 20);
    doc.text(`Calculated Time: ${calculatedTime} minutes`, 10, 30);
    doc.save('grinding_calculation_result.pdf');
}

// Prevent page reload until calculation is done
document.getElementById('operation-type').addEventListener('change', function() {
    // Reset and hide result section after operation type change
    document.getElementById('result').innerHTML = '';
    document.getElementById('download-button').classList.add('hidden');
});
