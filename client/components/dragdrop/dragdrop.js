const draggableList = document.getElementById('draggable-list');

// Back to front button
const backBtn = document.getElementById('back-btn');

const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store  listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  // richestPeople array is not changed

  [...richestPeople]
    // to scramble add random number in .sort
    .map((a) => ({ value: a, sort: Math.random() }))
    // sort the list based on a.sort - b.sort
    .sort((a, b) => a.sort - b.sort)
    // remap the list bring back list of person that is sorted
    .map((a) => a.value)

    // handle list
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `;

      // Add to array
      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // make string to number
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.closest('li').getAttribute('data-index');

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  // DOM items being swapped
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  // DOM items after swapped
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

  // richestPeople array not changed !
}

// Check order of list items on button click
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName != richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}


// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});

check.addEventListener('click', checkOrder);
