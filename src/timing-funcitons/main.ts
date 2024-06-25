document.addEventListener('DOMContentLoaded', () => {
  const progressCount = 10;
  const ball = document.querySelector('.element')!;
  const progress = document.querySelector('.progress')!;
  const button = document.querySelector('.move-button')!;

  Array(progressCount + 1)
    .fill(null)
    .forEach((_null, i) => {
      const node = document.createElement('div');
      node.classList.add('progress-value');
      node.innerHTML = `<div class="number">${(i / progressCount) * 100}%<div>`;
      progress.append(node);
    });

  button.addEventListener('click', () => {
    ball.classList.toggle('move');
  });
});
