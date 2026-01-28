class Calculator {
    constructor (historyDisplayText,currentDisplayText) {
        this.historyDisplayText = historyDisplayText;
        this.currentDisplayText = currentDisplayText;
        this.clear();
    }

    clear () {

        this.historyDisplay = ``;
        this.currentDisplay = ``;
        this.operation = undefined;
        this.allowAppend = true;
   
    }

    delete () {
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
    }

    appendNumbers (number) {

        if (this.currentDisplay === `Error`) {
            this.currentDisplay = ``;
        }

        if (this.allowAppend === false) {
            this.currentDisplay = ``;
            this.allowAppend = true;
        }

        if (number === `.` && this.currentDisplay.includes `.`) return;
        this.currentDisplay = this.currentDisplay.toString() + number.toString();
        
    }

    addOperator (operation) {
        if (this.currentDisplay === ``) {

        if (this.historyDisplay !== ``) {
            this.operation = operation;
        } 
            return;
    }

        if (this.historyDisplay !== ``) {
            this.calculate();
        }

        this.operation = operation;
        this.historyDisplay = this.currentDisplay;
        this.currentDisplay = ``;
        this.allowAppend = true;
    }

    calculate () {

        const prev = parseFloat(this.historyDisplay);
        const cur = parseFloat(this.currentDisplay);

        if (isNaN(prev) || isNaN(cur)) return;
       
        if (this.operation === `÷` && cur === 0){
            this.currentDisplay = `Error`;
            this.historyDisplay = ``;
            this.operation = undefined;
            return;
        }
            
            let calculation;

        switch (this.operation) {
            case `+`:
              calculation =   prev + cur;
                break;
            case `-`:
              calculation =   prev - cur;
                break;
            case `÷`:
              calculation =   prev / cur;
                break;
            case `*`:
              calculation =   prev * cur;
                break;    
            default:
                return;      
        }
    this.currentDisplay = calculation;
    this.operation = undefined;
    this.historyDisplay = ``;
    this.allowAppend = false;

        
    }

    formatDisplayNumber (number) {
        const stringNumber = number.toString();

        if (number ===`` || number ===`Error` || stringNumber.endsWith (`.`)) {
            return stringNumber;
        }

        const integerDigits = parseFloat(stringNumber.split(`.`)[0]);
        const decimalDigits = stringNumber.split(`.`)[1];

        let integerDisplay;
        if (isNaN(integerDigits)){
            integerDisplay = ``;
        } else {
            integerDisplay = integerDigits.toLocaleString(`en`);
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay (){
       
        this.currentDisplayText.innerText = this.formatDisplayNumber(this.currentDisplay);
            
            if (this.operation != null) {
                this.historyDisplayText.innerText = `${this.formatDisplayNumber(this.historyDisplay)} ${this.operation}`
             } else {
                this.historyDisplayText.innerText = ``;
             }
    
    }
}

const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const historyDisplayText = document.querySelector(`[data-history-display]`);
const currentDisplayText = document.querySelector(`[data-current-display]`);

const calculator = new Calculator(historyDisplayText, currentDisplayText);

    numberButtons.forEach (button => {
    
        button.addEventListener (`click`, () => {
            calculator.appendNumbers (button.innerText);
            calculator.updateDisplay();
    });
});

    operationButtons.forEach (button => {
        
            button.addEventListener (`click`, () => {
                calculator.addOperator (button.innerText);
                calculator.updateDisplay();
        });
    });

    allClearButton.addEventListener (`click`, () => {
            calculator.clear();
            calculator.updateDisplay();
});

    equalsButton.addEventListener (`click`, () => {
                calculator.calculate();
                calculator.updateDisplay();
    });

    deleteButton.addEventListener (`click`, () => {
                calculator.delete();
                calculator.updateDisplay();
    });

    // keyboard functionality

    document.addEventListener ("keydown", (KeyboardEvent) => {
    
        //numbers 0-9
        if (KeyboardEvent.key >= `0` && KeyboardEvent.key <= `9`) {
            calculator.appendNumbers(KeyboardEvent.key);
            calculator.updateDisplay();
        }
        //operators
        if (KeyboardEvent.key === `+`) {
            calculator.addOperator(`+`);
            calculator.updateDisplay();
        }
        if (KeyboardEvent.key === `-`) {
            calculator.addOperator(`-`);
            calculator.updateDisplay();
        }
        if (KeyboardEvent.key === `*`) {
            calculator.addOperator(`*`);
            calculator.updateDisplay();
        }
        if (KeyboardEvent.key === `/` || KeyboardEvent.key === `÷`) {
            KeyboardEvent.preventDefault(); 
            calculator.addOperator(`÷`);
            calculator.updateDisplay();
        }
        //decimals
        if (KeyboardEvent.key === `.` || KeyboardEvent.key === `,`) {
            calculator.appendNumbers(`.`);
            calculator.updateDisplay();
        }
        //equals
        if (KeyboardEvent.key === `=` || KeyboardEvent.key === `Enter`) {
            calculator.calculate();
            calculator.updateDisplay();
        }
        //clear
        if (KeyboardEvent.key === `C` || KeyboardEvent.key === `c` || KeyboardEvent.key === `Escape`) {
            calculator.clear();
            calculator.updateDisplay();
        }
        //delete
        if (KeyboardEvent.key === `Delete` || KeyboardEvent.key === `Backspace`) {
            calculator.delete ();
            calculator.updateDisplay();
        }
        
    
    });