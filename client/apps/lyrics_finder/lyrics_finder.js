const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// Back to front button
const backBtn = document.getElementById('back-btn');


const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

/* Fetch/promises way of doing it
function searchSongs(term) {


  fetch(`${apiURL}/suggest/${term}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
*/

// Show song and artist in DOM
// Map version
function showData(data) {
  /* ***
   map will extract the song info and put each li string in an element array.
   Each array element is then joined to a string
   *** */
  result.innerHTML = `
    <ul class="songs">
     ${data.data
       .map(
         (song) => `
     <li>
     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
     </li>`
       )
       .join('')}
    </ul>`;

  // Pagination
  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ''
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ''
        }

      `;
  } else {
    more.innerHTML = '';
  }
}

// Get More Songs
async function getMoreSongs(url) {
  // To avoid CORS problem send via heroku proxy
  // Then learn about proxies
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Show song and artist in DOM
// old way of doing it
/*
function showData(data) {
  let output = '';

  data.data.forEach((song) => {
    output += `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`;
  });

  result.innerHTML = `
    <ul class="songs">${output}</ul>
  `;
}
*/

// Get Lyrics

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // replace CR/LF , CR, LF with <br> g - globally (in the entire text)
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `<h2><strong>${artist} - ${songTitle}</strong></h2>
  <span>${lyrics}</span>`;

  // Clear pagination buttons
  more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', (e) => {
  const clickEl = e.target;

  if (clickEl.tagName === 'BUTTON') {
    const artist = clickEl.getAttribute('data-artist');
    const songTitle = clickEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});