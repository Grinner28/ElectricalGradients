document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    setupInitialScenario();
    setupEventListeners();
    displayInstructions();
});

function setupEventListeners() {
    document.getElementById('next-button').addEventListener('click', function() {
        if (currentInstructionIndex < instructions.length - 1) {
            currentInstructionIndex++; // Move to the next instruction
            displayInstructions(); // Update the displayed instruction
        }
    });
    
    document.getElementById('see-instructions-btn').addEventListener('click', function() {
        currentInstructionIndex = 0; // Reset to the first instruction
        displayInstructions(); // Show the first instruction again
    });

    document.getElementById('into-cell-button').addEventListener('click', () => checkAnswer('into'));
    document.getElementById('out-cell-button').addEventListener('click', () => checkAnswer('out'));
    document.getElementById('new-question-btn').addEventListener('click', setupInitialScenario);
    
    // Add other event listeners as needed
}

const ions = [
    { name: 'Sodium', symbol: 'Na+' },
    { name: 'Chloride', symbol: 'Cl-' },
    { name: 'Potassium', symbol: 'K+' },
    { name: 'Calcium', symbol: 'Ca2+' }
];

let currentIon;

function selectRandomIonAndUpdateDisplay() {
    // Randomly select an ion
    currentIon = ions[Math.floor(Math.random() * ions.length)];
    
    // Update the HTML to display the selected ion's symbol
    document.querySelector('.ion-concentration-outer').innerHTML = `${currentIon.symbol}`;
}


let currentMembranePotential;

function setupInitialScenario() {
    generateRandomMembranePotentialAndUpdateDisplay();
    selectRandomIonAndUpdateDisplay();
}

function generateRandomMembranePotentialAndUpdateDisplay() {
    // Example range: -100mV to 100mV
    currentMembranePotential = Math.floor(Math.random() * 201) - 100;

    // Determine the sign of the membrane potential
    let sign = currentMembranePotential > 0 ? "+" : "";

    currentMembranePotential = Math.round(currentMembranePotential / 5) * 5;

    if (currentMembranePotential === 0) {
        // Option 1: Adjust up to 5 if the result is 0
        currentMembranePotential = 5;
        // Option 2: Adjust down to -5 if you prefer a negative adjustment
        // currentMembranePotential = -5;
    }
        
    document.querySelector('.membrane-potential').textContent = `${sign}${currentMembranePotential}mV`;
}

function checkAnswer(direction) {
    let isIonPositive = currentIon.symbol.includes('+');
    let feedback;

    // Positive Ion Scenarios
    if (isIonPositive) {
        if (currentMembranePotential > 0 && direction === 'out') {
            feedback = "Correct! Since the membrane is positively charged, positive ions like " + currentIon.name + " will move out of the cell.";
        } else if (currentMembranePotential < 0 && direction === 'into') {
            feedback = "Correct! Positive ions like " + currentIon.name + " move into the cell when the membrane potential is negative.";
        } else if (currentMembranePotential > 0 && direction === 'into') {
            feedback = "Incorrect. Positive ions like " + currentIon.name + " tend to move out of the cell when the membrane potential is positive.";
        } else if (currentMembranePotential < 0 && direction === 'out') {
            feedback = "Incorrect. With a negative membrane potential, positive ions like " + currentIon.name + " are drawn into, not out of, the cell.";
        }
    }
    // Negative Ion Scenarios
    else {
        if (currentMembranePotential > 0 && direction === 'into') {
            feedback = "Correct! Negative ions like " + currentIon.name + " move into the cell to balance a positive membrane potential.";
        } else if (currentMembranePotential < 0 && direction === 'out') {
            feedback = "Correct! Negative ions like " + currentIon.name + " move out of the cell when the membrane potential is negative.";
        } else if (currentMembranePotential > 0 && direction === 'out') {
            feedback = "Incorrect. Negative ions like " + currentIon.name + " are attracted into the cell by a positive membrane potential.";
        } else if (currentMembranePotential < 0 && direction === 'into') {
            feedback = "Incorrect. Negative ions like " + currentIon.name + " move out of the cell to balance a negative membrane potential, not into it.";
        }
    }

    document.querySelector('.instruction-box p').textContent = feedback;
}

const instructions = [
    "Welcome to the Electrical Gradient Explorer. Here you can test your understanding of electrical gradients.",
    "The program is designed to be used after you have completed Clinic 1 (Equilibrium Potential).",
    "You will be presented with a cell at a given membrane potential and an ion.",
    "Using the 'Into the cell' and 'Out of the cell' buttons indicate the direction of the ion's electrical gradient",
    "After each submission, you'll receive feedback based on your response",
    "Clicking on new question will change the membrane potential and/or the ion",
    "If you have feedback or issues using this program please post them in the BMS206 discussion page",
    "To see these instructions again simply press 'See instructions' Good Luck!",
    ""
];

let currentInstructionIndex = 0; // Tracks which instruction to display

function displayInstructions() {
    const instructionBox = document.querySelector('.instruction-box p');
    instructionBox.innerHTML = instructions[currentInstructionIndex];
    
    // Hide the "Next" button if on the last instruction
    const nextButton = document.getElementById('next-button');
    if (currentInstructionIndex >= instructions.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline'; // Show the button if not on the last instruction
    }
}



