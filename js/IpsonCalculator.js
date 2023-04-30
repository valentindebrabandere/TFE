import IpsonWindow from "./IpsonWindow.js";

export default class IpsonCalculator extends IpsonWindow {
  constructor(windowId, currentStyle) {
    let iconPath =
      "/IpsonSystem/img/" + currentStyle + "/dockIcons/calculator.png";
    // construire la window sous-jacente : extends IpsonWindow
    super(windowId, "calculator", iconPath);
  }

  // redefinir uniquement ce qui doit l'etre
  buildContent() {
    const calculetteHtml = document.createElement("div");
    calculetteHtml.classList.add("c-calculator");

    calculetteHtml.innerHTML = `
    <div class="c-calculator__screen">
        <div data-previous-operand class="c-screen__previous"></div>
        <div data-current-operand class="c-screen__current"></div>
      </div>
      <button data-all-clear class="c-calculator__btn c-span--two">AC</button>
      <button data-delete class="c-calculator__btn">DEL</button>
      <button data-operation class="c-calculator__btn">÷</button>
      <button data-number class="c-calculator__btn">1</button>
      <button data-number class="c-calculator__btn">2</button>
      <button data-number class="c-calculator__btn">3</button>
      <button data-operation class="c-calculator__btn">*</button>
      <button data-number class="c-calculator__btn">4</button>
      <button data-number class="c-calculator__btn">5</button>
      <button data-number class="c-calculator__btn">6</button>
      <button data-operation class="c-calculator__btn">+</button>
      <button data-number class="c-calculator__btn">7</button>
      <button data-number class="c-calculator__btn">8</button>
      <button data-number class="c-calculator__btn">9</button>
      <button data-operation class="c-calculator__btn">-</button>
      <button data-number class="c-calculator__btn">.</button>
      <button data-number class="c-calculator__btn">0</button>
      <button
        data-equals
        class="c-calculator__btn c-span--two c-calculator__btn--equals"
      >
        =
      </button>
    `;
    calculetteHtml.instance = this;
    calculetteHtml.setAttribute("data-type", "application");
    //make the keboard input work

    this.numbersKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    this.operationKeys = ["+", "-", "/", "*", "x"];

    return calculetteHtml;
  }

  addContentInteractivity() {
    this.numbersBtn = this.content.querySelectorAll("[data-number]");
    this.operationBtn = this.content.querySelectorAll("[data-operation]");
    this.equalsBtn = this.content.querySelector("[data-equals]");
    this.deleteBtn = this.content.querySelector("[data-delete]");
    this.allClearBtn = this.content.querySelector("[data-all-clear]");
    this.previousOperandText = this.content.querySelector(
      "[data-previous-operand]"
    );
    this.currentOperandText = this.content.querySelector(
      "[data-current-operand]"
    );

    this.currentOperand = this.currentOperandText.innerText;
    this.previousOperand = this.previousOperandText.innerText;

    this.numbersBtn.forEach((button) => {
      button.addEventListener("click", () => {
        this.appendNumber(button.innerText);
        this.updateDisplay();
      });
    });

    this.operationBtn.forEach((button) => {
      button.addEventListener("click", () => {
        this.chooseOperation(button.innerText);
        this.updateDisplay();
      });
    });

    this.equalsBtn.addEventListener("click", (button) => {
      this.compute();
      this.updateDisplay();
    });

    this.allClearBtn.addEventListener("click", (button) => {
      this.clear();
      this.updateDisplay();
    });

    this.deleteBtn.addEventListener("click", (button) => {
      this.delete();
      this.updateDisplay();
    });
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("fr", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = "";
    }
  }

  handleKeyUp(evt) {
    this.numbersKeys.forEach((number) => {
      if (evt.key == number) {
        this.appendNumber(evt.key);
        this.updateDisplay();
      }
    });

    this.operationKeys.forEach((operation) => {
      var myOperation = operation;
      if (evt.key == "/") {
        myOperation = "÷";
      }
      if (evt.key == operation) {
        this.chooseOperation(myOperation);
        this.updateDisplay();
      }
    });

    if (evt.key == "=") {
      this.compute();
      this.updateDisplay();
    }
  }
}