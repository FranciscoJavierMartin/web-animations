document.addEventListener('DOMContentLoaded', () => {
  console.log('hello');
  const character = document.querySelector('.character')!;
  const street = document.querySelector('.street')!;
  const background = document.querySelector('.background')!;
  const foreground = document.querySelector('.foreground')!;
  const carWrapper = document.querySelector('.car-wrapper')!;

  const characterAnimation = character.animate(
    [
      {
        backgroundPosition: '0 0',
      },
      {
        backgroundPosition: 'calc(var(--char-width) * -7) 0',
      },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: 'steps(8, jump-none)',
    },
  );

  const streetAnimation = street.animate(
    [
      {
        transform: 'translateX(0)',
      },
      {
        transform: 'translateX(-50%)',
      },
    ],
    {
      easing: 'linear',
      duration: 12_000,
      iterations: Infinity,
    },
  );

  const backgroundAnimation = background.animate(
    [
      {
        transform: 'translateX(100%)',
      },
      {
        transform: 'translateX(-100%)',
      },
    ],
    {
      easing: 'linear',
      duration:
        +(streetAnimation.effect?.getComputedTiming().duration || 0) * 2,
      iterations: Infinity,
    },
  );

  const foregroundAnimation = foreground.animate(
    [
      {
        transform: 'translateX(200%)',
      },
      {
        transform: 'translateX(-200%)',
      },
    ],
    {
      easing: 'linear',
      duration:
        +(streetAnimation.effect?.getComputedTiming().duration || 0) * 1.5,
      iterations: Infinity,
    },
  );

  async function jump(): Promise<void> {
    if (
      streetAnimation.playState === 'running' &&
      !character.getAnimations().some((animation) => animation.id === 'jump')
    ) {
      characterAnimation.pause();
      character.classList.add('jump');
      const jumpAnimation = character.animate(
        [
          {
            transform: 'translateY(0)',
          },
          {
            transform: 'translateY(-70px)',
          },
        ],
        {
          id: 'jump',
          duration: 500,
          iterations: 2,
          direction: 'alternate',
          easing: 'ease-in-out',
        },
      );

      const { duration, iterations, easing, direction } =
        jumpAnimation.effect!.getComputedTiming();
      document.querySelector('.shadow')?.animate(
        [
          {
            transform: 'scale(1)',
          },
          {
            transform: 'scale(1.15)',
          },
        ],
        {
          duration,
          iterations,
          easing,
          direction,
        },
      );

      await jumpAnimation.finished;
      character.classList.remove('jump');
      characterAnimation.play();
    }
  }

  function togglePlayState(): void {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === 'running') {
        animation.pause();
      } else {
        animation.play();
      }
    });
    addNewCar();
  }

  async function addNewCar(): Promise<void> {
    if (
      streetAnimation.playState === 'running' &&
      !document.querySelector('.car')
    ) {
      const car = document.createElement('div');
      car.classList.add('car');
      const carAnimation = car.animate(
        [
          {
            transform: 'translateX(-100vw)',
          },
          {
            transform: 'translateX(100vw)',
          },
        ],
        {
          id: 'car',
          duration: Math.random() * 4_000 + 2_000,
          easing: 'linear',
        },
      );

      [':after', ':before'].forEach((pseudoElement) => {
        car.animate(
          [
            {
              transform: 'rotate(0)',
            },
            {
              transform: 'rotate(360deg)',
            },
          ],
          {
            id: 'car',
            pseudoElement,
            iterations: Infinity,
            easing: 'linear',
            duration:
              +(carAnimation.effect?.getComputedTiming().duration || 0) / 4,
          },
        );
      });

      carWrapper.appendChild(car);
      await carAnimation.finished;
      car.remove();

      setTimeout(
        () => {
          if (streetAnimation.playState === 'running') {
            addNewCar();
          }
        },
        Math.floor(Math.random() * 4_000),
      );
    }
  }

  streetAnimation.ready.then(() => {
    if (streetAnimation.playState === 'running') {
      addNewCar();
    }
  });

  function runFaster(): void {
    if (streetAnimation.playbackRate < 3) {
      document.getAnimations().forEach((animation) => {
        if (animation.id !== 'car') {
          animation.updatePlaybackRate(animation.playbackRate * 1.1);
        }
      });
    }
  }

  function runSlower(): void {
    if (streetAnimation.playbackRate > 0.8) {
      document.getAnimations().forEach((animation) => {
        if (animation.id !== 'car') {
          animation.updatePlaybackRate(animation.playbackRate * 0.9);
        }
      });
    }
  }

  setInterval(() => {
    if (streetAnimation.playState === 'running') {
      runSlower();
    }
  }, 5000);

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        jump();
        break;
      case 'ArrowRight':
        runFaster();
        break;
      case 'ArrowLeft':
        runSlower();
        break;
      case 'Space':
        togglePlayState();
        break;
      default:
        break;
    }
  });
});
