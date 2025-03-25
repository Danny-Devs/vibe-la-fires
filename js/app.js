import FireMap from './map.js';
import { experiences } from './data/experiences.js';

class ExperienceManager {
  constructor() {
    this.currentExperience = 0;
    this.stage = document.getElementById('stage');
    this.sidebar = document.getElementById('sidebar');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.progressFill = document.getElementById('progressFill');
    this.progressLabels = document.querySelectorAll('.progress-labels span');

    this.initializeEventListeners();
    this.updateExperience();
  }

  initializeEventListeners() {
    // Navigation event listeners
    this.prevBtn?.addEventListener('click', () => this.navigate('prev'));
    this.nextBtn?.addEventListener('click', () => this.navigate('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.navigate('prev');
      if (e.key === 'ArrowRight') this.navigate('next');
    });

    // Progress label navigation
    this.progressLabels?.forEach((label, index) => {
      label.addEventListener('click', () => {
        const direction = index > this.currentExperience ? 'next' : 'prev';
        this.currentExperience = index;
        this.updateExperience(direction);
      });
    });
  }

  navigate(direction) {
    if (direction === 'prev' && this.currentExperience > 0) {
      this.currentExperience--;
      this.updateExperience(direction);
    } else if (direction === 'next' && this.currentExperience < experiences.length - 1) {
      this.currentExperience++;
      this.updateExperience(direction);
    }
  }

  updateProgress(index) {
    if (!this.progressFill || !this.progressLabels) return;

    const progress = ((index) / (experiences.length - 1)) * 100;
    this.progressFill.style.width = `${progress}%`;

    this.progressLabels.forEach((label, i) => {
      label.classList.toggle('active', i === index);
    });
  }

  updateExperience(direction = null) {
    try {
      const experience = experiences[this.currentExperience];
      if (!experience) throw new Error('Experience not found');

      if (direction && this.stage) {
        this.stage.classList.add('experience-transition', direction);
        setTimeout(() => {
          this.updateContent(experience);
          this.stage.classList.remove('experience-transition', direction);
        }, 300);
      } else {
        this.updateContent(experience);
      }

      // Update navigation state
      if (this.prevBtn) this.prevBtn.disabled = this.currentExperience === 0;
      if (this.nextBtn) this.nextBtn.disabled = this.currentExperience === experiences.length - 1;

      this.updateProgress(this.currentExperience);
      document.title = `The Eaton Fire - ${experience.title}`;

    } catch (error) {
      console.error('Failed to update experience:', error);
      this.showErrorState();
    }
  }

  updateContent(experience) {
    if (!this.sidebar || !this.stage) return;

    // Update sidebar content
    this.sidebar.innerHTML = `
      <h1>${experience.sidebar.title}</h1>
      <p class="timestamp">${experience.sidebar.timestamp}</p>
      <p>${experience.sidebar.content}</p>
    `;

    // Prepare content based on experience type
    const stageContent = this.getStageContent(experience);
    this.stage.innerHTML = stageContent;
  }

  getStageContent(experience) {
    const contentMap = {
      'image': () => `
        <div class="image-container">
          <img src="${experience.stage.content}" 
               alt="${experience.stage.alt}" 
               class="full-image">
        </div>
      `,
      'timeline': () => `<timeline-component></timeline-component>`,
      'gaussian-splat': () => `<gaussian-splat-component></gaussian-splat-component>`,
      'stories': () => `<stories-component></stories-component>`,
      'impact': () => `<impact-component></impact-component>`,
      'prevention': () => `<prevention-component></prevention-component>`,
      'memorial': () => `<memorial-component></memorial-component>`
    };

    const contentGenerator = contentMap[experience.stage.type];
    return contentGenerator ? contentGenerator() : `<div class="error-message">Unknown experience type</div>`;
  }

  showErrorState() {
    if (this.stage) {
      this.stage.innerHTML = `
        <div class="error-state">
          <h2>Something went wrong</h2>
          <p>We're having trouble loading this experience. Please try refreshing the page.</p>
        </div>
      `;
    }
  }
}

// Initialize the app
async function initializeApp() {
  try {
    // Initialize map if on the appropriate page
    if (document.getElementById('map')) {
      const fireMap = new FireMap('map');
      await fireMap.initialize();
    }

    // Initialize experience manager if on an experience page
    if (document.getElementById('stage')) {
      new ExperienceManager();
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/service-worker.js');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }

  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Show user-friendly error message
    document.body.innerHTML = `
      <div class="critical-error">
        <h1>Unable to Load Application</h1>
        <p>We're experiencing technical difficulties. Please try again later.</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', initializeApp); 