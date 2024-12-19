document.addEventListener('DOMContentLoaded', () => {
    const operationType = document.getElementById('operation-type');
    const odParameters = document.getElementById('od-parameters');
    const idParameters = document.getElementById('id-parameters');
    const taperingParameters = document.getElementById('tapering-parameters');
    const surfaceParameters = document.getElementById('surface-parameters');
    const calculateButton = document.getElementById('calculate-button');
    const resultDiv = document.getElementById('result');
    const downloadButton = document.getElementById('download-button');

    operationType.addEventListener('change', () => {
        const operation = operationType.value;

        // Hide all sections by default
        odParameters.classList.add('hidden');
        idParameters.classList.add('hidden');
        taperingParameters.classList.add('hidden');
        surfaceParameters.classList.add('hidden');

        // Show the corresponding section based on the operation type selected
        if (operation === 'od') {
            odParameters.classList.remove('hidden');
        } else if (operation === 'id') {
            idParameters.classList.remove('hidden');
        } else if (operation === 'tapering') {
            taperingParameters.classList.remove('hidden');
        } else if (operation === 'surface') {
            surfaceParameters.classList.remove('hidden');
        }
    });

    calculateButton.addEventListener('click', () => {
        const operation = operationType.value;
        let result = 0;

        // Get values from the form depending on the selected operation
        const length = parseFloat(document.getElementById(operation + '-length').value);
        const diameter = parseFloat(document.getElementById(operation + '-diameter').value);
        const feedRate = parseFloat(document.getElementById(operation + '-feed-rate').value);
        const speed = parseFloat(document.getElementById(operation + '-speed').value);
        let taperDiameter = 0;
        if (operation === 'tapering') {
            taperDiameter = parseFloat(document.getElementById('taper-diameter').value);
        }

        // Perform calculation based on operation type
        if (operation === 'od' || operation === 'id' || operation === 'surface') {
            result = (length * diameter) / (feedRate * speed);
        } else if (operation === 'tapering') {
            result = (length * (diameter + taperDiameter)) / (feedRate * speed);
        }

        // Display the result
        resultDiv.innerHTML = `<p>Calculated Time: ${result.toFixed(2)} minutes</p>`;

        // Show the download button
        downloadButton.classList.remove('hidden');
    });

    // Download the result as a PDF
    window.downloadPDF = function () {
        const pdfContent = `Grinding Operation Result\n\n${resultDiv.innerText}`;
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.pdf';
        a.click();
    };
});

function refreshPage() {
    window.location.reload();
}
