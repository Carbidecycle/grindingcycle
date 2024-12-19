let calculatedTime = '';

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

    // Common formula for grinding time
    let time = (length * diameter) / (feedRate * speed);
    
    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Calculated Time: ${time.toFixed(2)} minutes</p>`;

    // Show the download button after calculation
    document.getElementById('download-button').classList.remove('hidden');

    // Save calculated time for PDF download
    calculatedTime = time.toFixed(2);
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Calculated Time: ${calculatedTime} minutes`, 10, 10);
    doc.save('calculation_result.pdf');
}

// Automatically refresh the page when operation type is changed
document.getElementById('operation-type').addEventListener('change', function() {
    location.reload();
});
