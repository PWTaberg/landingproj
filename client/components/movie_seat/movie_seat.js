const container = document.querySelector('.container');
// list of seats that are not occupied
// Obs  '.row .seat... ej .row.seat, dvs space mellan .row och .seat
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// Back to front button
const backBtn = document.getElementById('back-btn');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi();

// movieSelect.value is a string
// instead of parseInt(movieSelect.value) => +movieSelect...
let ticketPrice = +movieSelect.value;

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  // Not needed ?
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into arr
  // Map through array
  //return new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // store in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Event listener

// Get data from localstorage and populate UI
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // populate dropdown with selected value
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('click', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // instead of .add/.remove
    // set/unset seat as selected
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});

// Initial count and total set
updateSelectedCount();
