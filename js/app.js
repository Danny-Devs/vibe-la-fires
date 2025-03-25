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

// Theme toggle functionality
function initializeTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return; // Exit if toggle doesn't exist

  // Function to set theme
  function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Set initial theme (default to light)
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'dark');

  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme first
  initializeTheme();

  // Then initialize the rest of the app
  // Mock experiences data
  const experiences = [
    {
      id: 1,
      title: "The Spark",
      stage: {
        type: "image",
        content: "https://images.unsplash.com/photo-1542396601-dca920ea2807?auto=format&fit=crop&q=80",
        alt: "Utility pole in Altadena"
      },
      sidebar: {
        title: "The Eaton Fire Begins",
        timestamp: "October 1, 2024 - 2:15 PM",
        content: "Strong Santa Ana winds reaching speeds of 72mph caused a utility pole failure in the foothills of Altadena."
      }
    },
    // Add more experiences here
  ];

  let currentExperience = 0;
  const stage = document.getElementById('stage');
  const sidebar = document.getElementById('sidebar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const navHint = document.getElementById('navHint');

  // Show navigation hint
  setTimeout(() => {
    navHint.classList.add('visible');
    setTimeout(() => {
      navHint.classList.remove('visible');
    }, 3000);
  }, 1000);

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
  }

  function updateContent(experience) {
    // Update stage content
    stage.innerHTML = `
            <img src="${experience.stage.content}" 
                 alt="${experience.stage.alt}" 
                 style="width: 100%; height: 100%; object-fit: cover;">
        `;

    // Update sidebar content
    sidebar.innerHTML = `
            <h1>${experience.sidebar.title}</h1>
            <p class="timestamp">${experience.sidebar.timestamp}</p>
            <p>${experience.sidebar.content}</p>
        `;
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

  // Start experience button
  const startBtn = document.getElementById('startExperience');
  const splash = document.getElementById('splash');
  const experience = document.getElementById('experience');

  startBtn.addEventListener('click', () => {
    splash.style.display = 'none';
    experience.style.display = 'block';
  });

  // Experience Navigation
  function initExperience() {
    const enterButton = document.getElementById('enterExperience');
    const splashPage = document.getElementById('splash');
    const experiencePage = document.getElementById('experience');
    const nextBtn = document.getElementById('nextBtn');

    enterButton.addEventListener('click', () => {
      splashPage.classList.add('hidden');
      experiencePage.classList.remove('hidden');
    });

    let currentSlide = 0;
    const totalSlides = 6;

    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        if (currentSlide === totalSlides - 1) {
          nextBtn.classList.add('hidden');
        }
        // Add your slide transition logic here
      }
    });
  }

  // Initialize everything
  initExperience();
});

document.addEventListener('DOMContentLoaded', initializeApp); 