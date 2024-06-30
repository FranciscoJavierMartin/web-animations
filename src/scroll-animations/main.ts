document.addEventListener('DOMContentLoaded', () => {
  const container1 = document.querySelector('.c-1')!;
  const container2 = document.querySelector('.c-2')!;

  const timeline = new ScrollTimeline({
    source: container2,
    axis: 'block',
  });

  container1.animate(
    [
      {
        backgroundColor: 'salmon',
      },
    ],
    {
      fill: 'both',
      rangeStart: '30%',
      rangeEnd: '70%',
      timeline,
    },
  );
});
