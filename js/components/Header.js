class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
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
      
      <!-- Share modal -->
      <div class="share-modal">
        <div class="share-modal-content">
          <div class="share-modal-header">
            <h3>Share This Experience</h3>
            <button class="close-modal-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p>Help others learn about the Eaton Fire by sharing this experience:</p>
          <div class="share-options">
            <button class="share-option instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Instagram</span>
            </button>
            <button class="share-option tiktok">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.59-1.16-2.59-2.5 0-1.4 1.16-2.5 2.59-2.5.27 0 .51.1.75.21v-3.49c-.25-.05-.46-.09-.75-.09C6.4 9.53 3.5 12.4 3.5 15.9s2.9 6.5 6.36 6.5c3.5 0 6.36-2.9 6.36-6.5V9.65c1.14.83 2.46 1.33 3.9 1.33v-3.1c-.79-.02-1.37-.2-2.02-.28"/>
              </svg>
              <span>TikTok</span>
            </button>
            <button class="share-option facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span>Facebook</span>
            </button>
            <button class="share-option twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
              <span>Twitter</span>
            </button>
            <button class="share-option email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Email</span>
            </button>
          </div>
          <div class="share-link">
            <button class="copy-link-btn">Copy Link to Share</button>
          </div>
        </div>
      </div>
    `;

    // Initialize theme toggle after content is rendered
    this.initializeTheme();
    this.initializeShareFunctionality();
  }

  initializeTheme() {
    const themeToggle = this.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Function to set theme
    const setTheme = (isDark) => {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Set initial theme (default to light)
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark');

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(!isDark);
    });
  }

  initializeShareFunctionality() {
    const shareButton = this.querySelector('.share-btn');
    const shareModal = this.querySelector('.share-modal');
    const closeModalBtn = this.querySelector('.close-modal-btn');
    const copyLinkBtn = this.querySelector('.copy-link-btn');
    const shareOptions = this.querySelectorAll('.share-option');

    if (!shareButton || !shareModal) return;

    // Open share modal
    shareButton.addEventListener('click', () => {
      shareModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close modal function
    const closeModal = () => {
      shareModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Close modal on close button click
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal on click outside
    shareModal.addEventListener('click', (event) => {
      if (event.target === shareModal) {
        closeModal();
      }
    });

    // Copy link functionality
    copyLinkBtn.addEventListener('click', () => {
      // Create temporary input to copy the URL
      const tempInput = document.createElement('input');
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      // Show feedback
      const originalText = copyLinkBtn.textContent;
      copyLinkBtn.textContent = '✓ Link Copied!';

      // Add success class
      copyLinkBtn.classList.add('success');

      setTimeout(() => {
        copyLinkBtn.textContent = originalText;
        copyLinkBtn.classList.remove('success');
      }, 2000);
    });

    // Social sharing functionality
    shareOptions.forEach(option => {
      option.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('The Eaton Fire Experience');
        let shareUrl;

        if (option.classList.contains('facebook')) {
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (option.classList.contains('twitter')) {
          shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        } else if (option.classList.contains('instagram')) {
          // Instagram doesn't have a direct sharing API from web
          // Redirect to Instagram with a suggestion to share
          alert('Copy the link and share it on your Instagram story or post!');
          return;
        } else if (option.classList.contains('tiktok')) {
          // TikTok doesn't have a direct sharing API from web
          // Open TikTok app or website
          alert('Copy the link and share it on your TikTok!');
          return;
        } else if (option.classList.contains('email')) {
          shareUrl = `mailto:?subject=${title}&body=Check out this experience about the Eaton Fire: ${window.location.href}`;
        }

        if (shareUrl) {
          window.open(shareUrl, '_blank');
        }
      });
    });
  }
}

customElements.define('site-header', Header); 