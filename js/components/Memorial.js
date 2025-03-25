class MemorialComponent extends HTMLElement {
  constructor() {
    super();
    this.reflections = [
      {
        author: "David T.",
        location: "Altadena Resident",
        content: "The community came together in ways I never expected. Neighbors I'd never spoken to before became like family overnight. We shared resources, opened our homes, and supported each other through the darkest days. This tragedy revealed the true character of Altadena."
      },
      {
        author: "Sarah L.",
        location: "Firefighter",
        content: "In my 15 years of service, I've never seen a community bounce back with such resilience. It gives me hope for the future. What stands out most was how residents stayed to help us create firebreaks and protect homes when they could have fled. That courage saved lives."
      },
      {
        author: "Miguel R.",
        location: "Community Organizer",
        content: "We've learned that preparedness is everything. Our community is stronger and more united in our commitment to protection. The fire changed our landscape, but it also changed how we see ourselves – as guardians of this special place we call home."
      },
      {
        author: "Emma K.",
        location: "Local Teacher",
        content: "My students' drawings after the fire told stories words couldn't express. They drew flames, but also helpers, heroes, and hope. Children understand renewal in ways adults sometimes forget. They see the new growth already emerging from the ashes."
      }
    ];
    this.currentReflection = 0;
  }

  connectedCallback() {
    this.render();
    this.initMemorial();
  }

  render() {
    this.innerHTML = `
      <div class="memorial-container">
        <div class="memorial-image-container">
          <img src="assets/images/memorial/candles.jpg" alt="Memorial candles for the Eaton Fire" class="memorial-image">
          <div class="image-overlay"></div>
        </div>
        
        <div class="reflections-container">
          <h3>Community Reflections</h3>
          <div class="reflections-carousel">
            <div class="reflections-track" id="reflections-track">
              ${this.reflections.map(reflection => `
                <div class="reflection-card">
                  <div class="reflection-content">"${reflection.content}"</div>
                  <div class="reflection-author">- ${reflection.author}</div>
                  <div class="reflection-location">${reflection.location}</div>
                </div>
              `).join('')}
            </div>
            <div class="carousel-controls">
              <button class="carousel-button prev" id="reflection-prev">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button class="carousel-button next" id="reflection-next">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="share-reflection">
          <h3>Share Your Reflection</h3>
          <form class="reflection-form">
            <div class="form-group">
              <label for="reflection-name">Name</label>
              <input type="text" id="reflection-name" placeholder="Your name">
            </div>
            <div class="form-group">
              <label for="reflection-location">Connection to Altadena</label>
              <input type="text" id="reflection-location" placeholder="Resident, Visitor, etc.">
            </div>
            <div class="form-group">
              <label for="reflection-message">Your Reflection</label>
              <textarea id="reflection-message" placeholder="Share your experience or thoughts..."></textarea>
            </div>
            <button type="button" class="submit-reflection">Submit Reflection</button>
          </form>
        </div>
      </div>
    `;
  }

  initMemorial() {
    // Set up carousel functionality
    const track = this.querySelector('#reflections-track');
    const prevBtn = this.querySelector('#reflection-prev');
    const nextBtn = this.querySelector('#reflection-next');

    const updateCarousel = () => {
      const cardWidth = this.querySelector('.reflection-card').offsetWidth;
      track.style.transform = `translateX(-${this.currentReflection * cardWidth}px)`;

      // Update button states
      prevBtn.disabled = this.currentReflection === 0;
      nextBtn.disabled = this.currentReflection === this.reflections.length - 1;
    };

    prevBtn.addEventListener('click', () => {
      if (this.currentReflection > 0) {
        this.currentReflection--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (this.currentReflection < this.reflections.length - 1) {
        this.currentReflection++;
        updateCarousel();
      }
    });

    // Initialize carousel
    updateCarousel();

    // Handle reflection submission
    const submitBtn = this.querySelector('.submit-reflection');
    submitBtn.addEventListener('click', () => {
      const name = this.querySelector('#reflection-name').value;
      const location = this.querySelector('#reflection-location').value;
      const message = this.querySelector('#reflection-message').value;

      if (name && location && message) {
        // In a real application, this would send the data to a server
        alert('Thank you for sharing your reflection. It will be reviewed and added to the memorial.');

        // Clear form
        this.querySelector('#reflection-name').value = '';
        this.querySelector('#reflection-location').value = '';
        this.querySelector('#reflection-message').value = '';
      } else {
        alert('Please fill out all fields to share your reflection.');
      }
    });
  }
}

customElements.define('memorial-component', MemorialComponent);

export default MemorialComponent; 