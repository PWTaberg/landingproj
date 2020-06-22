const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Back to front button
const backBtn = document.getElementById('back-btn');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random usr and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');

  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    // copy user
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort by richest
// Plain sort will only sort by string 0 1 110 2 3
// compare b-a will result in descending, a-b in ascending
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionairs
// return those that are "true"
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Calculate Wealth
// acc = acc + user.money (acc += user.money ), for all users in array
// starting at 0
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  data = data.filter((user) => user.money > 1000000);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth <strong>${formatMoney(
    wealth
  )}</strong>`;

  main.appendChild(wealthElement);
}

// Add new obj todata array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person </strong>Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>
    ${formatMoney(item.money)}`;
    console.log(item.name);
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);

sortBtn.addEventListener('click', sortByRichest);

showMillionairesBtn.addEventListener('click', showMillionaires);

calculateWealthBtn.addEventListener('click', calculateWealth);

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});
