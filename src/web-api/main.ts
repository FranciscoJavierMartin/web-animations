document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.square');
  const squareAnimation = element?.animate(
    // {
    //   transform: [
    //     'translateX(0)',
    //     'translateX(calc(100vw - 100px)) rotate(360deg)',
    //   ],
    //   backgroundColor: ['gold', 'blue', 'crimson'],
    //   offset: [0, 0.3, 1],
    //   easing: ['ease-in', 'linear'],
    //   composite: ['add', 'replace', 'add'],
    // },
    [
      {
        transform: 'translateX(0)',
        easing: 'ease-in',
      },
      {
        backgroundColor: 'blue',
        offset: 0.8,
        composite: 'replace',
      },
      {
        transform: 'translateX(calc(100vw - 100px)) rotate(360deg)',
        backgroundColor: 'crimson',
      },
    ],
    {
      duration: 3000,
      delay: 1000,
      direction: 'alternate',
      fill: 'both',
      iterations: 1,
      easing: 'linear',
      composite: 'add',
      iterationComposite: 'accumulate',
      timeline: document.timeline,
    },
  );
  // const squareAnimationKeyframes = new KeyframeEffect(
  //   element,
  //   [
  //     {
  //       transform: 'translateX(0)',
  //     },
  //     {
  //       backgroundColor: 'blue',
  //       offset: 0.8,
  //     },
  //     {
  //       transform: 'translateX(calc(100vw - 100px)) rotate(360deg)',
  //       backgroundColor: 'crimson',
  //     },
  //   ],
  //   {
  //     duration: 3000,
  //     delay: 1000,
  //     direction: 'alternate',
  //     fill: 'both',
  //     iterations: Infinity,
  //     easing: 'linear',
  //     composite: 'add',
  //   },
  // );
  // const squareAnimation = new Animation(
  //   squareAnimationKeyframes,
  //   document.timeline,
  // );

  squareAnimation?.pause();

  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('play')) {
        squareAnimation?.play();
      }

      if (button.classList.contains('pause')) {
        squareAnimation?.pause();
      }

      if (button.classList.contains('cancel')) {
        squareAnimation?.cancel();
      }

      if (button.classList.contains('reverse')) {
        squareAnimation?.reverse();
      }

      if (button.classList.contains('finish')) {
        squareAnimation?.finish();
      }
    });
  });

  const playbackRateInput = document.getElementById('playbackRateInput');
  const playbackRateInputValue = document.getElementById(
    'playbackRateInputValue',
  );

  playbackRateInput?.addEventListener('input', (e) => {
    squareAnimation?.updatePlaybackRate(e.target.value);
    playbackRateInputValue.value = e.target.value;
  });
});
