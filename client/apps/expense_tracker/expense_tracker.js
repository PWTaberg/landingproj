const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Back to front button
const backBtn = document.getElementById('back-btn');


// Not used any longer
/*  
const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

//let transactions = dummyTransactions;
*/

// Local storage is a string, we need to get the object
const localStorageTransaction = JSON.parse(
  localStorage.getItem('transactions')
);

// if loca storage exists, use it otherwise set to []
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get the sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on sign
  // get sign
  const classString = transaction.amount < 0 ? 'minus' : 'plus';
  item.classList.add(classString);

  // strip of sign from amount, since we have '+' and '-' on string
  const transactionString = `${Math.abs(transaction.amount)}`;
  item.innerHTML = `
    ${transaction.text} <span>${sign}${transactionString}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  // Append to list
  list.appendChild(item);
}

// Update balance income, expense
function updateValues() {
  // get amaunts gfrom transactions
  const amounts = transactions.map((transaction) => transaction.amount);

  // acc accumulator, set to 0 from start
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  // filter out amounts > 0, accumulate them, keep 2-decimals
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and an amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// generate random id
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Remove transaction by ID
function removeTransaction(id) {
  console.log(id);
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update Local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach((transaction) => addTransactionDOM(transaction));
  // eller kortare
  //  transactions.forEach(addTransactionDOM);

  // Update amounts
  updateValues();
}

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});

init();

form.addEventListener('submit', addTransaction);
