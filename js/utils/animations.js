import { ANIMATION_DURATION } from '../config/constants.js';

/**
 * Fades in an element using opacity transition
 * @param {HTMLElement} element - The element to fade in
 * @param {number} duration - Duration in milliseconds (optional)
 * @returns {Promise} Resolves when animation completes
 */
export function fadeIn(element, duration = ANIMATION_DURATION.NORMAL) {
  return new Promise(resolve => {
    element.style.opacity = '0';
    element.style.display = '';

    // Trigger reflow
    element.offsetHeight;

    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = '1';

    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * Fades out an element using opacity transition
 * @param {HTMLElement} element - The element to fade out
 * @param {number} duration - Duration in milliseconds (optional)
 * @returns {Promise} Resolves when animation completes
 */
export function fadeOut(element, duration = ANIMATION_DURATION.NORMAL) {
  return new Promise(resolve => {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = '0';

    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * Slides an element in from a specified direction
 * @param {HTMLElement} element The element to slide
 * @param {string} direction 'left', 'right', 'top', or 'bottom'
 * @param {number} duration Duration in milliseconds
 * @returns {Promise} Resolves when animation is complete
 */
export function slideIn(element, direction = 'left', duration = 500) {
  return new Promise(resolve => {
    const originalDisplay = getComputedStyle(element).display;
    element.style.display = originalDisplay === 'none' ? 'block' : originalDisplay;

    const start = {
      left: { transform: 'translateX(-100%)' },
      right: { transform: 'translateX(100%)' },
      top: { transform: 'translateY(-100%)' },
      bottom: { transform: 'translateY(100%)' }
    }[direction];

    element.style.transform = start.transform;
    element.style.transition = `transform ${duration}ms ease-out`;

    // Force reflow
    element.offsetHeight;

    element.style.transform = 'translate(0)';

    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * Slides an element out in a specified direction
 * @param {HTMLElement} element The element to slide
 * @param {string} direction 'left', 'right', 'top', or 'bottom'
 * @param {number} duration Duration in milliseconds
 * @returns {Promise} Resolves when animation is complete
 */
export function slideOut(element, direction = 'left', duration = 500) {
  return new Promise(resolve => {
    const end = {
      left: { transform: 'translateX(-100%)' },
      right: { transform: 'translateX(100%)' },
      top: { transform: 'translateY(-100%)' },
      bottom: { transform: 'translateY(100%)' }
    }[direction];

    element.style.transition = `transform ${duration}ms ease-out`;
    element.style.transform = end.transform;

    setTimeout(() => {
      element.style.display = 'none';
      element.style.transition = '';
      element.style.transform = '';
      resolve();
    }, duration);
  });
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function call
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} The throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
} 