document.addEventListener('DOMContentLoaded', () => {
  const logoSVG = document.getElementById('logo')!;
  const logoSVGPath = document.querySelector('.cls-1')!;
  logoSVGPath.addEventListener('animationend', () => {
    logoSVG.classList.remove('animate');
    setTimeout(() => {
      logoSVG.classList.add('animate');
    }, 5_000);
  });

  const mediaQuery = matchMedia('(prefers-reduced-motion)');

  function checkReducedMotion(): void {
    const video = document.querySelectorAll<HTMLVideoElement>('.bg-video');
    if (mediaQuery.matches) {
      video.forEach((v: HTMLVideoElement) => v.pause());
    } else {
      video.forEach((v: HTMLVideoElement) => v.play());
    }
  }

  checkReducedMotion();
  mediaQuery.addEventListener('change', checkReducedMotion);
});
