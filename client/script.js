const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// games modal
const gamesClose = document.getElementById('games-close');
const gamesOpen = document.getElementById('games-open');
const gamesModal = document.getElementById('games-modal');

// voice video modal
const voiceVideoClose = document.getElementById('voice-video-close');
const voiceVideoOpen = document.getElementById('voice-video-open');
const voiceVideoModal = document.getElementById('voice-video-modal');

// apps modal
const appsClose = document.getElementById('apps-close');
const appsOpen = document.getElementById('apps-open');
const appsModal = document.getElementById('apps-modal');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
//open.addEventListener('click', () => modal.classList.add('show-modal'));
// Show games-modal
gamesOpen.addEventListener('click', () =>
  gamesModal.classList.add('show-games-modal')
);
// Show voice-video-modal
voiceVideoOpen.addEventListener('click', () =>
  voiceVideoModal.classList.add('show-voice-video-modal')
);
// Show apps-modal
appsOpen.addEventListener('click', () => {
  console.log('appsOpen');
  appsModal.classList.add('show-apps-modal');
});

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));
// Hide games-modal
gamesClose.addEventListener('click', () =>
  gamesModal.classList.remove('show-games-modal')
);
// Hide voice-video-modal
voiceVideoClose.addEventListener('click', () =>
  voiceVideoModal.classList.remove('show-voice-video-modal')
);
// Hide apps-modal
appsClose.addEventListener('click', () =>
  appsModal.classList.remove('show-apps-modal')
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

  // voice-video-modal
  if (e.target === voiceVideoModal) {
    voiceVideoModal.classList.remove('show-voice-video-modal');
  }

  // voice-video-modal
  if (e.target === appsModal) {
    appsModal.classList.remove('show-apps-modal');
  }
  /*
  e.target == modal ? modal.classList.remove('show-modal') : false;
  */
});
