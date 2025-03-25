// Common JavaScript for all experience pages

// Helper function to get elements by ID/class
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Initialize the page based on which experience we're on
document.addEventListener('DOMContentLoaded', () => {
  // Determine which experience page we're on by checking the title
  const pageTitle = document.title;
  const experienceNumber = pageTitle.match(/Experience (\d+)/i) ?
    parseInt(pageTitle.match(/Experience (\d+)/i)[1]) :
    0;

  // Initialize common controls
  initNavigation();

  // Initialize specific experience features
  switch (experienceNumber) {
    case 1:
      initExperience1();
      break;
    case 2:
      initExperience2();
      break;
    case 3:
      initExperience3();
      break;
    case 4:
      initExperience4();
      break;
    case 5:
      initExperience5();
      break;
    case 6:
      initExperience6();
      break;
    default:
      // On the home page or other page
      break;
  }
});

// Initialize navigation buttons
function initNavigation() {
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = prevBtn.getAttribute('onclick').match(/href='([^']+)'/)[1];
      window.location.href = href;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = nextBtn.getAttribute('onclick').match(/href='([^']+)'/)[1];
      window.location.href = href;
    });
  }
}

// Experience 1: The Spark
function initExperience1() {
  console.log('Initializing Experience 1: The Spark');

  // Example: Animate elements in as they appear in viewport
  const animatedElements = $$('.animate-on-scroll');
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
  }
}

// Experience 2: Timeline
function initExperience2() {
  console.log('Initializing Experience 2: Timeline');

  // Handle timeline slider functionality
  const timelineSlider = $('#time-slider');
  if (timelineSlider) {
    timelineSlider.addEventListener('input', (e) => {
      const day = parseInt(e.target.value);
      updateTimelineDay(day);
    });
  }

  // Initialize timeline at day 0
  updateTimelineDay(0);
}

function updateTimelineDay(day) {
  console.log(`Updating timeline to day ${day}`);

  // Example: Update the visualization, details, and stats based on day
  const dayLabels = ['Day 1: Ignition', 'Day 2: Initial Spread', 'Day 3: Evacuation Orders',
    'Day 4: Containment Efforts', 'Day 5: Major Wind Event',
    'Day 6: Additional Resources', 'Day 7: Containment'];

  const dayTitle = $('.timeline-day-title');
  if (dayTitle) {
    dayTitle.textContent = dayLabels[day] || `Day ${day + 1}`;
  }

  // Toggle active class on timeline days
  $$('.timeline-day').forEach((dayEl, index) => {
    if (index === day) {
      dayEl.classList.add('active');
    } else {
      dayEl.classList.remove('active');
    }
  });
}

// Experience 3: 3D Visualization
function initExperience3() {
  console.log('Initializing Experience 3: 3D Visualization');

  // Toggle between different view options
  const viewControls = $$('.view-control');
  viewControls.forEach(control => {
    control.addEventListener('click', () => {
      // Remove active class from all controls
      viewControls.forEach(c => c.classList.remove('active'));
      // Add active class to clicked control
      control.classList.add('active');

      // Handle view change
      const viewName = control.textContent.trim();
      changeView(viewName);
    });
  });
}

function changeView(viewName) {
  console.log(`Changing 3D view to: ${viewName}`);
  // In the actual implementation, this would change the 3D visualization
  // For now, we just update the mock content
}

// Experience 4: Stories
function initExperience4() {
  console.log('Initializing Experience 4: Stories');

  // Filter stories by category
  const filterButtons = $$('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      // Filter stories
      const category = button.textContent.trim();
      filterStories(category);
    });
  });

  // Initialize story card click handlers
  $$('.story-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if they clicked the button directly
      if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
        const storyTitle = card.querySelector('.story-title').textContent;
        const readMoreBtn = card.querySelector('button');
        if (readMoreBtn) {
          readMoreBtn.click();
        }
      }
    });
  });
}

function filterStories(category) {
  console.log(`Filtering stories by category: ${category}`);
  // In the actual implementation, this would filter the stories
  // For now we just log the category
}

// Experience 5: Impact
function initExperience5() {
  console.log('Initializing Experience 5: Impact & Assessment');

  // Handle tab switching
  const impactTabs = $$('.impact-tab');
  impactTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      impactTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      // Update content
      const category = tab.textContent.trim();
      updateImpactContent(category);
    });
  });
}

function updateImpactContent(category) {
  console.log(`Updating impact content to: ${category}`);

  // Update heading
  const impactHeading = $('.impact-content h2');
  if (impactHeading) {
    impactHeading.textContent = `${category} Impact`;
  }

  // In the actual implementation, this would update the content
  // For now we just update the heading
}

// Experience 6: Memorial
function initExperience6() {
  console.log('Initializing Experience 6: Memorial & Remembrance');

  // Example: Gallery image popup
  $$('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const imageSrc = item.dataset.src || '#';
      // Would typically open a modal with the full image
      console.log(`Opening memorial image: ${imageSrc}`);
    });
  });

  // Form submission handling
  const tributeForm = $('.tribute-form');
  if (tributeForm) {
    const submitBtn = tributeForm.querySelector('button');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Tribute form submitted');
        // In actual implementation, would submit the form
        alert('Thank you for your tribute. It will be added to our memorial after review.');
      });
    }
  }
}

// General utility functions that might be used across experiences
function fadeIn(element, duration = 500) {
  element.style.opacity = 0;
  element.style.display = 'block';

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.min(progress / duration, 1);

    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function fadeOut(element, duration = 500) {
  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.max(1 - progress / duration, 0);

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  }

  requestAnimationFrame(animate);
}

// Handle window resize events
window.addEventListener('resize', debounce(() => {
  console.log('Window resized');
  // Adjust any visualizations or layouts here
}, 250));

// Debounce function to limit how often a function is called
function debounce(func, wait) {
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