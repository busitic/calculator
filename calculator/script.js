// Select elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;

// Update the display
function updateDisplay() {
    display.textContent = displayValue;
}

// Clear the display and reset the calculator
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Handle number input
function handleNumber(number) {
    if (displayValue === '0' || shouldResetDisplay) {
        displayValue = number;
        shouldResetDisplay = false;
    } else {
        displayValue += number;
    }
    updateDisplay();
    
}

// Handle operation input
function handleOperation(operation) {
    if (currentOperation !== null && !shouldResetDisplay) {
        secondOperand = parseFloat(displayValue.split(currentOperation).pop().trim());
        displayValue = operate(firstOperand, secondOperand, currentOperation).toString();
        updateDisplay();
        firstOperand = parseFloat(displayValue);
    } else {
        firstOperand = parseFloat(displayValue);
    }
    currentOperation = operation;
    displayValue += ` ${operation} `;
    shouldResetDisplay = false;
    updateDisplay();
}

function handleEquals(){
    if(currentOperation !== null) {
        secondOperand = parseFloat(displayValue.split(currentOperation).pop().trim());
        displayValue = operate(firstOperand, secondOperand, currentOperation).toString();
        currentOperation = null;
        updateDisplay();
        shouldResetDisplay = true;
    }
}

// Perform calculation based on the operation
function operate(first, second, operation) {
    switch (operation) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        const operation = button.getAttribute('data-operation');
        if (number) {
            handleNumber(number);
        } else if (operation) {
            handleOperation(operation);
        } else if (button.id === 'equal') {
            handleEquals();
            currentOperation = null;
        } else if (button.id === 'clear') {
            clearDisplay();
        }
    });
});

// Initialize the display
updateDisplay();
