document.addEventListener('DOMContentLoaded', () => {
  const character = document.querySelector('.character');

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' && !character?.classList.contains('jump')) {
      character?.classList.add('jump');
    }
  });

  character?.addEventListener('animationend', (event) => {
    if (event.animationName === 'jump') {
      character?.classList.remove('jump');
    }
  });
});
