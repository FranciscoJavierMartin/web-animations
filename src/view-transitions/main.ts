document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')!;
  const header = document.querySelector('.header')!;
  const gridOuter = document.querySelector('.grid-outer')!;
  const main = document.querySelector('.main .item')!;
  const gridButton = document.querySelector('.grid-view-button')!;

  function populateGridItemViewTransitionName(clear?: boolean): void {
    grid.querySelectorAll('.grid-item').forEach((item, index) => {
      item.style.viewTransitionName = clear ? 'none' : `grid-item-${index}`;
    });
  }

  populateGridItemViewTransitionName();

  function expandImage(item) {
    const title = item.querySelector('h3').innerText;
    const largeImage = item.dataset.largeImage;
    main.querySelector('h2')!.innerText = title;
    main.querySelector('img')!.src = largeImage;
    gridButton.style.display = 'block';
    header.classList.add('expanded');
    gridOuter.classList.add('expanded');

    grid
      .querySelectorAll('.active')
      .forEach((e) => e.classList.remove('active'));
    item.classList.add('active');
    grid.style.viewTransitionName = 'grid';
  }

  function displayGrid() {
    document.documentElement.scrollTop = 0;
    grid.style.viewTransitionName = 'none';
    gridButton.style.display = 'none';
    gridOuter.classList.remove('expanded');
    header.classList.remove('expanded');
    grid
      .querySelectorAll('.active')
      .forEach((e) => e.classList.remove('active'));
  }

  grid.addEventListener('click', async (e) => {
    const item = e.target.closest('.grid-item');
    if (!item || item.classList.contains('active')) return;

    if (document.startViewTransition) {
      const thumbnail = item.querySelector('img');
      const largeImage = main.querySelector('img')!;

      thumbnail.style.viewTransitionName = 'image';
      largeImage.style.viewTransitionName = 'none';

      const transition = document.startViewTransition(() => {
        thumbnail.style.viewTransitionName = 'none';
        largeImage.style.viewTransitionName = 'image';
        expandImage(item);
      });

      await transition.finished;
      populateGridItemViewTransitionName(true);

      // largeImage.style.viewTransitionName = 'none';

      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  });

  gridButton.addEventListener('click', async (e) => {
    if (document.startViewTransition) {
      const activeThumbnail = grid.querySelector('.active img');
      const largeImage = main.querySelector('img')!;

      populateGridItemViewTransitionName();

      const transition = document.startViewTransition(() => {
        activeThumbnail.style.viewTransitionName = 'image';
        largeImage.style.viewTransitionName = 'none';
        displayGrid();
      });

      await transition.finished;
      activeThumbnail.style.viewTransitionName = 'none';
    } else {
      displayGrid();
    }
  });
});
