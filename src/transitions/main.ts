document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.square')!;

  document.onclick = (event: MouseEvent) => {
    element.style.transform = `translateY(${event.clientY - element.clientHeight / 2}px) translateX(${event.clientX - element.clientWidth / 2}px)`;
  };
});
