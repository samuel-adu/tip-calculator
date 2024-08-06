const billInput = document.getElementById('bill');
const numberOfPeopleInput = document.getElementById('num-of-people');
const customTipInput = document.getElementById('custom-tip');
const tipButtons = document.querySelectorAll('.tip-btn');
const totalAmountEl = document.getElementById('total-amount-per-person');
const tipAmountEl = document.getElementById('tip-amount-per-person');
const resetBtn = document.getElementById('reset-btn');

let billAmount = 0;
let tipPecent = 0.15;
let numberOfPeople = 1;

resetBtn.addEventListener('click', handleReset);

billInput.addEventListener('input', function () {
  billAmount = parseFloat(billInput.value);
  updateResultBoard();
});

numberOfPeopleInput.addEventListener('input', function () {
  numberOfPeople = Number(numberOfPeopleInput.value);
  validateInput(numberOfPeople);
  updateResultBoard();
});

tipButtons.forEach((btn) => {
  btn.addEventListener('click', selectTip);
});

customTipInput.addEventListener('input', function () {
  tipButtons.forEach((btn) => btn.classList.remove('active'));
  tipPecent = customTipInput.value / 100;
  updateResultBoard();
});

function selectTip(event) {
  tipButtons.forEach((btn) => {
    btn.classList.remove('active');

    if (event.target.dataset.percent === btn.dataset.percent) {
      btn.classList.add('active');
      tipPecent = event.target.dataset.percent / 100;
    }
  });

  updateResultBoard();
}

function updateResultBoard() {
  const tipAmount = tipPecent * billAmount;
  const total = billAmount + tipAmount;
  const totalPerPerson = total / numberOfPeople;
  const tipAmountPerPerson = tipAmount / numberOfPeople;

  const tipAmountText = tipAmountPerPerson
    ? `$${tipAmountPerPerson.toFixed(2)}`
    : '$0.00';

  const totalAmountText = totalPerPerson
    ? `$${totalPerPerson.toFixed(2)}`
    : '$0.00';

  tipAmountEl.innerText = tipAmountText;
  totalAmountEl.innerText = totalAmountText;
}

function handleReset() {
  billAmount = 0;
  tipPecent = 0;
  billInput.value = '';
  customTipInput.value = '';
  numberOfPeopleInput.value = '';
  tipButtons.forEach((btn) => btn.classList.remove('active'));
  updateResultBoard();
}

function validateInput(input) {
  const errorMessage = document.getElementById('error-message');
  if (input === 0) {
    numberOfPeopleInput.classList.add('error');
    errorMessage.innerText = "Can't be zero";
  } else {
    numberOfPeopleInput.classList.remove('error');
    errorMessage.innerText = '';
  }
}
