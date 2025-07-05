export interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

/**
 * Smooth scroll to a specific element
 */
export const scrollToElement = (
  element: HTMLElement | string,
  options: ScrollOptions = {}
) => {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: options.behavior || 'smooth',
      block: options.block || 'start',
      inline: options.inline || 'nearest',
    });
  }
};

/**
 * Smooth scroll to top of page
 */
export const scrollToTop = (options: ScrollOptions = {}) => {
  window.scrollTo({
    top: 0,
    behavior: options.behavior || 'smooth',
  });
};

/**
 * Smooth scroll to a specific position
 */
export const scrollToPosition = (
  position: number,
  options: ScrollOptions = {}
) => {
  window.scrollTo({
    top: position,
    behavior: options.behavior || 'smooth',
  });
};

/**
 * Get current scroll position
 */
export const getScrollPosition = () => {
  return window.scrollY;
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scroll to element with offset (useful for fixed headers)
 */
export const scrollToElementWithOffset = (
  element: HTMLElement | string,
  offset: number = 0,
  options: ScrollOptions = {}
) => {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;

  if (targetElement) {
    const elementPosition = targetElement.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: options.behavior || 'smooth',
    });
  }
}; 