const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

const gamesClose = document.getElementById('games-close');
const gamesOpen = document.getElementById('games-open');
const gamesModal = document.getElementById('games-modal');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));
// Show games-modal
gamesOpen.addEventListener('click', () =>
  gamesModal.classList.add('show-games-modal')
);

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));
// Hide games-modal
gamesClose.addEventListener('click', () =>
  gamesModal.classList.remove('show-games-modal')
);

// Hide modal on outside click
window.addEventListener('click', (e) => {
  // modal is the const -> document.getElementById('modal);
  console.log(e.target);
  if (e.target === modal) {
    modal.classList.remove('show-modal');
  }

  // games-modal
  if (e.target === gamesModal) {
    gamesModal.classList.remove('show-games-modal');
  }
  /*
  e.target == modal ? modal.classList.remove('show-modal') : false;
  */
});

getDeliveryDate = (days) => {
  let today = new Date();
  let temp = today.setDate(today.getDate() + days);
  let deliveryDay = new Date(temp).toLocaleDateString();
  return deliveryDay;
};

console.log(`Levereras senast ${getDeliveryDate(days)}`);

//`Levereras senast ${getDeliveryDate()}`
