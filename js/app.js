import FireMap from './map.js';

async function initializeApp() {
  try {
    const fireMap = new FireMap('map');
    await fireMap.initialize();

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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Experiences data for all sections
  const experiences = [
    {
      id: 1,
      title: "The Spark",
      stage: {
        type: "image",
        content: "assets/images/spark/utility-pole.jpg",
        alt: "Utility pole in Altadena"
      },
      sidebar: {
        title: "The Eaton Fire Begins",
        timestamp: "October 1, 2024 - 2:15 PM",
        content: "Strong Santa Ana winds reaching speeds of 72mph caused a utility pole failure in the foothills of Altadena. Downed power lines ignited dry brush, quickly spreading fire through the canyon."
      }
    },
    {
      id: 2,
      title: "Timeline",
      stage: {
        type: "timeline",
        content: "timeline-component"
      },
      sidebar: {
        title: "Fire Progression",
        timestamp: "October 1-7, 2024",
        content: "The Eaton Fire grew rapidly due to strong winds and dry conditions. Track how the fire spread and was eventually contained over seven critical days."
      }
    },
    {
      id: 3,
      title: "3D Experience",
      stage: {
        type: "gaussian-splat",
        content: "gaussian-splat-component"
      },
      sidebar: {
        title: "Walk Through the Aftermath",
        timestamp: "Present Day",
        content: "Explore key locations affected by the Eaton Fire through 3D photogrammetry captures. Move between different areas to see the full impact and early recovery efforts."
      }
    },
    {
      id: 4,
      title: "Community Stories",
      stage: {
        type: "stories",
        content: "stories-component"
      },
      sidebar: {
        title: "Voices from the Community",
        timestamp: "Personal Accounts",
        content: "Hear from those who experienced the Eaton Fire firsthand. These personal stories highlight the human impact of wildfires and showcase the community's resilience."
      }
    },
    {
      id: 5,
      title: "Environmental Impact",
      stage: {
        type: "impact",
        content: "impact-component"
      },
      sidebar: {
        title: "Environmental Consequences",
        timestamp: "Ongoing Assessment",
        content: "The Eaton Fire dramatically altered the local ecosystem. Examine before and after comparisons, and learn about the ongoing recovery process for this sensitive habitat."
      }
    },
    {
      id: 6,
      title: "Prevention & Future",
      stage: {
        type: "prevention",
        content: "prevention-component"
      },
      sidebar: {
        title: "Preventing Future Disasters",
        timestamp: "Looking Forward",
        content: "Learn essential wildfire prevention techniques for your home and community. Use the interactive simulator to assess and improve your wildfire readiness."
      }
    },
    {
      id: 7,
      title: "Memorial",
      stage: {
        type: "memorial",
        content: "memorial-component"
      },
      sidebar: {
        title: "Remembrance & Reflection",
        timestamp: "Community Memorial",
        content: "A space to honor what was lost and celebrate the community's resilience. Read reflections from community members and share your own thoughts about the Eaton Fire."
      }
    }
  ];

  let currentExperience = 0;
  const stage = document.getElementById('stage');
  const sidebar = document.getElementById('sidebar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.getElementById('progressFill');
  const progressLabels = document.querySelectorAll('.progress-labels span');

  function updateProgress(index) {
    // Update progress bar
    const progress = ((index) / (experiences.length - 1)) * 100;
    progressFill.style.width = `${progress}%`;

    // Update active label
    progressLabels.forEach((label, i) => {
      if (i === index) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });
  }

  function updateExperience(direction = null) {
    const experience = experiences[currentExperience];

    // Add transition class based on direction
    if (direction) {
      stage.classList.add(`experience-transition`);
      stage.classList.add(direction);

      setTimeout(() => {
        updateContent(experience);
        stage.classList.remove('experience-transition', direction);
      }, 300);
    } else {
      updateContent(experience);
    }

    // Update navigation buttons
    prevBtn.disabled = currentExperience === 0;
    nextBtn.disabled = currentExperience === experiences.length - 1;

    // Update progress indicator
    updateProgress(currentExperience);

    // Update document title
    document.title = `The Eaton Fire - ${experience.title}`;
  }

  function updateContent(experience) {
    // Update sidebar content
    sidebar.innerHTML = `
      <h1>${experience.sidebar.title}</h1>
      <p class="timestamp">${experience.sidebar.timestamp}</p>
      <p>${experience.sidebar.content}</p>
    `;

    // Prepare content based on experience type
    let stageContent;

    switch (experience.stage.type) {
      case 'image':
        stageContent = `
          <div class="image-container">
            <img src="${experience.stage.content}" 
                 alt="${experience.stage.alt}" 
                 class="full-image">
          </div>
        `;
        break;
      case 'timeline':
        stageContent = `<timeline-component></timeline-component>`;
        break;
      case 'gaussian-splat':
        stageContent = `<gaussian-splat-component></gaussian-splat-component>`;
        break;
      case 'stories':
        stageContent = `<stories-component></stories-component>`;
        break;
      case 'impact':
        stageContent = `<impact-component></impact-component>`;
        break;
      case 'prevention':
        stageContent = `<prevention-component></prevention-component>`;
        break;
      case 'memorial':
        stageContent = `<memorial-component></memorial-component>`;
        break;
      default:
        stageContent = `<div class="error-message">Unknown experience type</div>`;
    }

    // Update stage content
    stage.innerHTML = stageContent;
  }

  // Navigation event listeners
  prevBtn.addEventListener('click', () => {
    if (currentExperience > 0) {
      currentExperience--;
      updateExperience('prev');
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentExperience < experiences.length - 1) {
      currentExperience++;
      updateExperience('next');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentExperience > 0) {
      currentExperience--;
      updateExperience('prev');
    } else if (e.key === 'ArrowRight' && currentExperience < experiences.length - 1) {
      currentExperience++;
      updateExperience('next');
    }
  });

  // Initialize first experience
  updateExperience();

  // Progress label navigation
  progressLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
      if (index !== currentExperience) {
        const direction = index > currentExperience ? 'next' : 'prev';
        currentExperience = index;
        updateExperience(direction);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', initializeApp); 