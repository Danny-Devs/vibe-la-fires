// Common JavaScript for all experience pages
import { debounce } from './utils/debounce.js';

class ExperienceController {
  constructor() {
    this.$ = (selector) => document.querySelector(selector);
    this.$$ = (selector) => document.querySelectorAll(selector);
    this.experienceNumber = this.getExperienceNumber();
    this.observers = new Map();
  }

  getExperienceNumber() {
    const pageTitle = document.title;
    const match = pageTitle.match(/Experience (\d+)/i);
    return match ? parseInt(match[1]) : 0;
  }

  initialize() {
    this.initNavigation();
    this.initializeExperience();
  }

  initNavigation() {
    const prevBtn = this.$('#prevBtn');
    const nextBtn = this.$('#nextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const href = prevBtn.getAttribute('onclick')?.match(/href='([^']+)'/)?.[1];
        if (href) window.location.href = href;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const href = nextBtn.getAttribute('onclick')?.match(/href='([^']+)'/)?.[1];
        if (href) window.location.href = href;
      });
    }
  }

  initializeExperience() {
    const experienceInitializers = {
      1: () => this.initExperience1(),
      2: () => this.initExperience2(),
      3: () => this.initExperience3(),
      4: () => this.initExperience4(),
      5: () => this.initExperience5(),
      6: () => this.initExperience6()
    };

    const initializer = experienceInitializers[this.experienceNumber];
    if (initializer) {
      try {
        initializer();
      } catch (error) {
        console.error(`Failed to initialize experience ${this.experienceNumber}:`, error);
        this.showErrorState();
      }
    }
  }

  // Experience 1: The Spark
  initExperience1() {
    console.log('Initializing Experience 1: The Spark');

    const animatedElements = this.$$('.animate-on-scroll');
    if (animatedElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      animatedElements.forEach(el => observer.observe(el));
      this.observers.set('animation', observer);
    }
  }

  // Experience 2: Timeline
  initExperience2() {
    console.log('Initializing Experience 2: Timeline');

    const timelineSlider = this.$('#time-slider');
    if (timelineSlider) {
      timelineSlider.addEventListener('input', (e) => {
        this.updateTimelineDay(parseInt(e.target.value));
      });
      this.updateTimelineDay(0);
    }
  }

  updateTimelineDay(day) {
    const dayLabels = [
      'Day 1: Ignition',
      'Day 2: Initial Spread',
      'Day 3: Evacuation Orders',
      'Day 4: Containment Efforts',
      'Day 5: Major Wind Event',
      'Day 6: Additional Resources',
      'Day 7: Containment'
    ];

    const dayTitle = this.$('.timeline-day-title');
    if (dayTitle) {
      dayTitle.textContent = dayLabels[day] || `Day ${day + 1}`;
    }

    this.$$('.timeline-day').forEach((dayEl, index) => {
      dayEl.classList.toggle('active', index === day);
    });
  }

  // Experience 3: 3D Visualization
  initExperience3() {
    console.log('Initializing Experience 3: 3D Visualization');

    this.$$('.view-control').forEach(control => {
      control.addEventListener('click', () => {
        this.$$('.view-control').forEach(c => c.classList.remove('active'));
        control.classList.add('active');
        this.changeView(control.textContent.trim());
      });
    });
  }

  changeView(viewName) {
    console.log(`Changing 3D view to: ${viewName}`);
    // Implementation will be added when 3D visualization is ready
  }

  // Experience 4: Stories
  initExperience4() {
    console.log('Initializing Experience 4: Stories');

    this.$$('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.$$('.filter-btn').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        this.filterStories(button.textContent.trim());
      });
    });

    this.$$('.story-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
          const readMoreBtn = card.querySelector('button');
          readMoreBtn?.click();
        }
      });
    });
  }

  filterStories(category) {
    const storyCards = this.$$('.story-card');
    storyCards.forEach(card => {
      const cardCategory = card.dataset.category;
      card.style.display = category === 'All' || cardCategory === category ? 'block' : 'none';
    });
  }

  // Experience 5: Impact
  initExperience5() {
    console.log('Initializing Experience 5: Impact & Assessment');

    this.$$('.impact-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.$$('.impact-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.updateImpactContent(tab.textContent.trim());
      });
    });
  }

  updateImpactContent(category) {
    const impactHeading = this.$('.impact-content h2');
    if (impactHeading) {
      impactHeading.textContent = `${category} Impact`;
    }

    // Update content based on category
    const contentMap = {
      'Environmental': () => this.showEnvironmentalImpact(),
      'Economic': () => this.showEconomicImpact(),
      'Social': () => this.showSocialImpact()
    };

    const updateFunction = contentMap[category];
    if (updateFunction) updateFunction();
  }

  // Experience 6: Memorial
  initExperience6() {
    console.log('Initializing Experience 6: Memorial & Remembrance');

    this.$$('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const imageSrc = item.dataset.src;
        if (imageSrc) this.openGalleryModal(imageSrc);
      });
    });

    const tributeForm = this.$('.tribute-form');
    if (tributeForm) {
      tributeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTributeSubmission(e.target);
      });
    }
  }

  openGalleryModal(imageSrc) {
    // Implementation will be added when gallery modal is ready
    console.log(`Opening memorial image: ${imageSrc}`);
  }

  async handleTributeSubmission(form) {
    try {
      const formData = new FormData(form);
      // Implementation will be added when backend is ready
      console.log('Tribute form submitted:', Object.fromEntries(formData));
      alert('Thank you for your tribute. It will be added to our memorial after review.');
    } catch (error) {
      console.error('Failed to submit tribute:', error);
      alert('Sorry, there was an error submitting your tribute. Please try again later.');
    }
  }

  showErrorState() {
    const container = this.$('.experience-container') || document.body;
    container.innerHTML = `
      <div class="error-state">
        <h2>Something went wrong</h2>
        <p>We're having trouble loading this experience. Please try refreshing the page.</p>
        <button onclick="window.location.reload()">Refresh Page</button>
      </div>
    `;
  }

  cleanup() {
    // Cleanup observers and event listeners when navigating away
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Initialize experience controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const controller = new ExperienceController();
  controller.initialize();

  // Cleanup when navigating away
  window.addEventListener('beforeunload', () => controller.cleanup());
}); 