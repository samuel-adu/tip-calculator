const billInput = document.getElementById('bill');
const numberOfPeopleInput = document.getElementById('num-of-people');
const customTipInput = document.getElementById('custom-tip');
const tipButtons = document.querySelectorAll('.tip-btn');
const totalAmountEl = document.getElementById('total-amount-per-person');
const tipAmountEl = document.getElementById('tip-amount-per-person');
const resetBtn = document.getElementById('reset-btn');

let bill = parseFloat(billInput.value);
let numberOfPeople = parseFloat(numberOfPeopleInput.value);
let tipPercent = customTipInput.value / 100;

function showError(element, message) {
  element.classList.remove('success');
  element.classList.add('error');
  element.nextElementSibling.innerText = message;
}

function showSuccess(element) {
  element.classList.remove('error');
  element.classList.add('success');
  element.nextElementSibling.innerText = '';
}

function validateInput(input) {
  let isValidInput = false;
  if (parseFloat(input.value) === 0) {
    showError(input, "can't be zero");
  } else if (input.value === '') {
    showError(input, "can't be zero");
  } else {
    showSuccess(input);
    isValidInput = true;
  }
  return isValidInput;
}

function validateBill() {
  return validateInput(billInput);
}

function validateNumberOfPeople() {
  return validateInput(numberOfPeopleInput);
}

function validateTipPercent() {
  return validateInput(customTipInput);
}

function selectTip(event) {
  showSuccess(customTipInput);
  tipButtons.forEach((btn) => {
    btn.classList.remove('active');

    if (event.target.dataset.percent === btn.dataset.percent) {
      btn.classList.add('active');
      tipPercent = event.target.dataset.percent;
      calculateAmount();
    }
  });
}

billInput.addEventListener('input', function () {
  if (validateBill()) {
    bill = parseFloat(billInput.value);
    calculateAmount();
  }
});

numberOfPeopleInput.addEventListener('input', function () {
  if (validateNumberOfPeople()) {
    numberOfPeople = parseFloat(numberOfPeopleInput.value);
    calculateAmount();
  }
});

customTipInput.addEventListener('input', function () {
  tipButtons.forEach((btn) => btn.classList.remove('active'));
  if (validateTipPercent()) {
    tipPercent = parseFloat(customTipInput.value);
    calculateAmount();
  }
});

tipButtons.forEach((btn) => {
  btn.addEventListener('click', selectTip);
});

function calculateAmount() {
  let isBillValid = validateBill();
  let isTipPercentValid = tipPercent > 0 || validateTipPercent();
  let isNumberOfPeopleValid = validateNumberOfPeople();
  let totalPerPerson = 0;
  let tipPerPerson = 0;

  let isFormValid = isBillValid && isNumberOfPeopleValid && isTipPercentValid;

  console.log(`isFormValid: ${isFormValid}`);

  if (isFormValid) {
    tipPerPerson = (bill * (tipPercent / 100)) / numberOfPeople;
    totalPerPerson = (bill + bill * (tipPercent / 100)) / numberOfPeople;
    totalAmountEl.innerText = `$${totalPerPerson.toFixed(2)}`;
    tipAmountEl.innerText = `$${tipPerPerson.toFixed(2)}`;
  }
}

resetBtn.addEventListener('click', function () {
  billAmount = 0;
  tipPercent = 0;
  billInput.value = '';
  customTipInput.value = '';
  numberOfPeopleInput.value = '';
  tipButtons.forEach((btn) => btn.classList.remove('active'));
  totalAmountEl.innerText = `$0.00`;
  tipAmountEl.innerText = `$0.00`;
});
