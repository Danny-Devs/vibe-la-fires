import { THEME, STORAGE_KEYS } from '../config/constants.js';
import './ShareModal.js';

class Header extends HTMLElement {
  constructor() {
    super();
    this.handleThemeToggle = this.handleThemeToggle.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.initializeTheme();
    this.initializeShareButton();
  }

  disconnectedCallback() {
    const themeToggle = this.querySelector('.theme-toggle');
    const shareButton = this.querySelector('.share-btn');

    themeToggle?.removeEventListener('click', this.handleThemeToggle);
    shareButton?.removeEventListener('click', this.handleShareClick);
  }

  render() {
    this.innerHTML = `
      <header class="header">
        <a href="index.html" class="logo-link">
          <div class="logo">The Eaton Fire</div>
          <div class="ember-3"></div>
          <div class="ember-4"></div>
          <div class="ember-5"></div>
        </a>
        <div class="nav-group">
          <a href="about.html">About</a>
          <a href="resources.html">Resources</a>
          <button class="share-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Share
          </button>
          <button class="theme-toggle" aria-label="Toggle dark/light mode">
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </header>
      <share-modal></share-modal>
    `;
  }

  initializeTheme() {
    const themeToggle = this.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Set initial theme
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || THEME.LIGHT;
    this.setTheme(savedTheme === THEME.DARK);

    // Add event listener
    themeToggle.addEventListener('click', this.handleThemeToggle);
  }

  handleThemeToggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === THEME.DARK;
    this.setTheme(!isDark);
  }

  setTheme(isDark) {
    try {
      document.documentElement.setAttribute('data-theme', isDark ? THEME.DARK : THEME.LIGHT);
      localStorage.setItem(STORAGE_KEYS.THEME, isDark ? THEME.DARK : THEME.LIGHT);
    } catch (error) {
      console.error('Failed to set theme:', error);
      // Continue without saving to localStorage if it fails
      document.documentElement.setAttribute('data-theme', isDark ? THEME.DARK : THEME.LIGHT);
    }
  }

  initializeShareButton() {
    const shareButton = this.querySelector('.share-btn');
    if (!shareButton) return;

    shareButton.addEventListener('click', this.handleShareClick);
  }

  handleShareClick() {
    const shareModal = this.querySelector('share-modal');
    if (shareModal) {
      shareModal.show();
    }
  }
}

customElements.define('site-header', Header); 