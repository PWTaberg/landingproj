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

// components modal
const componentsClose = document.getElementById('components-close');
const componentsOpen = document.getElementById('components-open');
const componentsModal = document.getElementById('components-modal');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
//open.addEventListener('click', () => modal.classList.add('show-modal'));
// Show games-modal
gamesOpen.addEventListener('click', () => {
  clearAllModals();
  gamesModal.classList.add('show-games-modal');
});
// Show voice-video-modal
voiceVideoOpen.addEventListener('click', () => {
  clearAllModals();
  voiceVideoModal.classList.add('show-voice-video-modal');
});
// Show apps-modal
appsOpen.addEventListener('click', () => {
  clearAllModals();
  appsModal.classList.add('show-apps-modal');
});
// Show components-modal
componentsOpen.addEventListener('click', () => {
  clearAllModals();
  componentsModal.classList.add('show-components-modal');
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
// Hide components-modal
componentsClose.addEventListener('click', () =>
  componentsModal.classList.remove('show-components-modal')
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

  // apps-modal
  if (e.target === appsModal) {
    appsModal.classList.remove('show-apps-modal');
  }

  // components-modal
  if (e.target === componentsModal) {
    componentsModal.classList.remove('show-components-modal');
  }
  /*
  e.target == modal ? modal.classList.remove('show-modal') : false;
  */
});

function clearAllModals() {
  if (gamesModal.classList.contains('show-games-modal')) {
    gamesModal.classList.remove('show-games-modal');
  }

  if (voiceVideoModal.classList.contains('show-voice-video-modal')) {
    voiceVideoModal.classList.remove('show-voice-video-modal');
  }

  if (appsModal.classList.contains('show-apps-modal')) {
    appsModal.classList.remove('show-apps-modal');
  }

  if (componentsModal.classList.contains('show-components-modal')) {
    componentsModal.classList.remove('show-components-modal');
  }
}
