"use strict";


// Dom Elements
const $currentOperandText = document.getElementById('current-operand');

const $clearButton = document.getElementById('clear');
const $toggleSignButton = document.getElementById('toggle-sign');
const $deleteButton = document.getElementById('delete');
const $calculateButton = document.getElementById('calculate');
const $decimalButton = document.getElementById('decimal');

const $operationButtons = document.querySelectorAll('[data-operation]');

const $numberButtons = document.querySelectorAll('[data-number]');


class Calculator {

    constructor() {
        this.clear();
        this.updateDisplay();
    }


    // Sets event listeners for buttons
    initialize() {
        $numberButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.appendNumber(e.target.innerText);
                this.updateDisplay();
            });
        });


        $operationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setOperation(e.target.innerText);
                this.removeOperatorButtonSelectedStyles();
                this.updateDisplay();
                e.target.classList.add('button--selected');
            });
        });


        $toggleSignButton.addEventListener('click', () => {
            this.toggleSign();
            this.updateDisplay();
        });


        $clearButton.addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
            this.removeOperatorButtonSelectedStyles();
        });


        $deleteButton.addEventListener('click', () => {
            this.removeLastNumber();
            this.updateDisplay();
        });


        $decimalButton.addEventListener('click', () => {
            this.addDecimal();
            this.updateDisplay();
        });


        $calculateButton.addEventListener('click', () => {
            this.calculate();
            this.updateDisplay();
        });
    }


    setOperation(operation) {


        // If there is a concatenation of calculations
        if (this.operation) {
            this.calculate();
        }

        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.currentOperand = '0';
    }


    appendNumber(number) {
        if (this.currentOperand === '0') this.currentOperand = '';

        this.currentOperand += String(number);
    }


    removeLastNumber() {

        // If NaN / Infinity / one digit number, converts to 0
        if (!this.currentOperand.length || this.currentOperand.length === 1) {
            this.currentOperand = '0';
            return;
        }

        this.currentOperand = this.currentOperand.slice(0, -1);
    }


    addDecimal() {
        if (this.currentOperand.includes('.')) return;

        this.currentOperand += '.';
    }


    toggleSign() {
        if (this.currentOperand === '0') return;

        if (this.currentOperand.at(0) === '-') {
            this.currentOperand = this.currentOperand.slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
    }


    updateDisplay() {
        $currentOperandText.innerText = this.currentOperand;
    }


    removeOperatorButtonSelectedStyles() {
        $operationButtons.forEach(button => {
            button.classList.remove('button--selected');
        });
    }


    // Clears all operands and operation stored in memory
    clear() {
        this.currentOperand = '0';
        this.previousOperand = null;
        this.operation = null;
    }


    calculate() {
        let result;

        switch (this.operation) {
            // Round result to 4 decimals max using EPSILON 
            // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)

            case '+':
                result = Number(this.previousOperand) + Number(this.currentOperand);
                this.currentOperand = Math.round((result + Number.EPSILON) * 10000) / 10000;
                break;

            case '-':
                result = Number(this.previousOperand) - Number(this.currentOperand);
                this.currentOperand = Math.round((result + Number.EPSILON) * 10000) / 10000;
                break;

            case '÷':
                if (this.currentOperand === '0') return; // Does not allow to divide by 0

                result = Number(this.previousOperand) / Number(this.currentOperand);
                this.currentOperand = Math.round((result + Number.EPSILON) * 10000) / 10000;
                break;

            case 'x':
                result = Number(this.previousOperand) * Number(this.currentOperand);
                this.currentOperand = Math.round((result + Number.EPSILON) * 10000) / 10000;
                break;

            default:
                break;
        }
    }
}



const main = () => {
    const calculator = new Calculator();
    calculator.initialize();
};


main();