export const smoothScrollTo = (targetId: any, targetDuration: any) => {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return; // Ensure target exists

  // Get the target element's position relative to the top of the page
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - 20;
  const duration = targetDuration ? targetDuration : 3000;
  let startTime = null;

  const ease = (t: any, b: any, c: any, d: any) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime: any) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};
