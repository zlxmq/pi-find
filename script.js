let piDigits = '';
let digitsLoaded = false;

async function findSequence() {
    if (!digitsLoaded) {
        await loadPiDigits();
    }

    var sequence = document.getElementById("sequenceInput").value;

    var index = piDigits.indexOf(sequence);
    if (index !== -1) {
        var result = document.getElementById("result");
        var highlightedResult = document.createElement("span");
        highlightedResult.id = "highlightedResult";
        highlightedResult.innerText = sequence;
        var digitNumber = index + 1;
        result.innerHTML = `The sequence <span id="highlightedResult">${sequence}</span> was found at position ${index} (digit ${digitNumber} in pi).`;

        var digitsBefore = piDigits.substring(0, index);
        result.innerHTML += `<br>Digits before the sequence: ${digitsBefore}`;
    } else {
        document.getElementById("result").innerText = `The sequence ${sequence} was not found in the digits of pi.`;
    }
}

async function loadPiDigits() {
    try {
        document.getElementById('progressBar').style.display = 'block';
        const response = await fetch('pi_digits.txt');
        const text = await response.text();
        // Extract only the digits
        piDigits = text.replace(/\D/g, '');
        digitsLoaded = true;
        // Hide progress bar once loading is complete
        document.getElementById('progressBar').style.display = 'none';
    } catch (error) {
        console.error("Failed to fetch pi digits:", error);
        throw error;
    }
}