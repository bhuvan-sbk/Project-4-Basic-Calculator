const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// Update the display
function updateDisplay() {
    display.textContent = currentInput;
}

// Handle number inputs
function inputNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Handle decimal point
function inputDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Handle operations
function handleOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

// Calculate result
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    updateDisplay();
}

// Clear the calculator
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Toggle positive/negative
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value >= '0' && value <= '9') {
            inputNumber(value);
        } else if (value === '.') {
            inputDecimal();
        } else if (value === 'AC') {
            clearAll();
        } else if (value === '+/-') {
            toggleSign();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperation(value);
        }
    });
});