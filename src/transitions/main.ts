document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('square')!;

  document.onclick = (event: MouseEvent) => {
    element.style.transform = `translateY(${event.clientY - element.clientHeight / 2}px) translateX(${event.clientX - element.clientWidth / 2}px)`;
  };

  document.ontransitionrun = (event: TransitionEvent) => {
    console.log(event);
  };

  document.ontransitionstart = (event: TransitionEvent) => {
    console.log(event);
  };

  document.ontransitionend = (event: TransitionEvent) => {
    if (event.propertyName === 'transform') {
      element.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
  };
});
