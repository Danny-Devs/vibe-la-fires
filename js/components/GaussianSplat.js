class GaussianSplatComponent extends HTMLElement {
  constructor() {
    super();
    this.locations = [
      { id: "residential", label: "Residential Area", position: { x: 0, y: 0, z: 0 } },
      { id: "trail", label: "Hiking Trail", position: { x: 10, y: 0, z: 10 } },
      { id: "fireline", label: "Fire Line", position: { x: -10, y: 0, z: 5 } },
      { id: "recovery", label: "Recovery Zone", position: { x: 5, y: 0, z: -5 } }
    ];
    this.currentLocation = this.locations[0];
    this.isLoaded = false;
  }

  connectedCallback() {
    this.render();
    this.loadSplatViewer();
  }

  render() {
    this.innerHTML = `
      <div class="gaussian-splat-container">
        <div class="location-selector">
          ${this.locations.map(location => `
            <button data-location="${location.id}" class="location-button ${location.id === this.currentLocation.id ? 'active' : ''}">
              ${location.label}
            </button>
          `).join('')}
        </div>
        
        <div class="splat-viewer-container">
          <div id="splat-viewer" class="splat-viewer"></div>
          <div id="splat-loading" class="splat-loading">
            <div class="spinner"></div>
            <p>Loading 3D Experience...</p>
          </div>
        </div>
        
        <div class="splat-controls">
          <div class="control-hint">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
            <span>Use WASD or arrow keys to move, drag to look around, scroll to zoom</span>
          </div>
        </div>
      </div>
    `;

    // Add event listeners after rendering
    this.addEventListeners();
  }

  addEventListeners() {
    const locationButtons = this.querySelectorAll('.location-button');
    locationButtons.forEach(button => {
      button.addEventListener('click', () => {
        const locationId = button.getAttribute('data-location');
        this.changeLocation(locationId);

        // Update active button state
        locationButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  async loadSplatViewer() {
    try {
      // This is a placeholder for the actual Gaussian Splat loading code
      // In a real implementation, you would initialize a 3D rendering library 
      // like Three.js and load your splat data
      const loadingEl = this.querySelector('#splat-loading');
      const viewerEl = this.querySelector('#splat-viewer');

      // Simulate loading delay for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show placeholder content until real data is available
      viewerEl.innerHTML = `
        <div class="placeholder-3d">
          <div class="placeholder-content">
            <h3>${this.currentLocation.label}</h3>
            <p>3D visualization of the ${this.currentLocation.label.toLowerCase()} would appear here.</p>
            <p class="placeholder-note">In the final implementation, this would be a real-time 3D Gaussian Splat rendering.</p>
          </div>
        </div>
      `;

      this.isLoaded = true;
      loadingEl.style.display = 'none';

    } catch (error) {
      console.error('Failed to load Gaussian Splat viewer:', error);
      this.querySelector('#splat-loading').innerHTML = `
        <p class="error-message">Failed to load 3D experience. Please try again later.</p>
      `;
    }
  }

  changeLocation(locationId) {
    const location = this.locations.find(loc => loc.id === locationId);
    if (location && this.isLoaded) {
      this.currentLocation = location;

      // Update the placeholder content with the new location
      const placeholderEl = this.querySelector('.placeholder-content');
      if (placeholderEl) {
        placeholderEl.innerHTML = `
          <h3>${location.label}</h3>
          <p>3D visualization of the ${location.label.toLowerCase()} would appear here.</p>
          <p class="placeholder-note">In the final implementation, this would be a real-time 3D Gaussian Splat rendering.</p>
        `;
      }

      // In a real implementation, you would update the camera position in your 3D scene
      console.log(`Moving camera to ${location.label} at position:`, location.position);
    }
  }
}

customElements.define('gaussian-splat-component', GaussianSplatComponent);

export default GaussianSplatComponent; 