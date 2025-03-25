class ImpactComponent extends HTMLElement {
  constructor() {
    super();
    this.stats = [
      { value: "8,500+", label: "Acres Burned" },
      { value: "132", label: "Native Plant Species Affected" },
      { value: "Thousands", label: "Wildlife Displaced" }
    ];
    this.recoveryPhases = [
      { time: "3 months", description: "Initial regrowth of fire-adapted species begins" },
      { time: "1 year", description: "Pioneer plants establish across burned areas" },
      { time: "3 years", description: "Small mammals return to recovering habitat" },
      { time: "5+ years", description: "Native vegetation begins to mature" }
    ];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="impact-container">
        <div class="before-after-container">
          <div class="before-after-slider">
            <img class="before-image" src="assets/images/environment/before.jpg" alt="Before the Eaton Fire">
            <div class="after-image-container">
              <img class="after-image" src="assets/images/environment/after.jpg" alt="After the Eaton Fire">
            </div>
            <input type="range" min="0" max="100" value="50" class="slider" id="comparison-slider">
            <div class="slider-button"></div>
          </div>
          <p class="slider-instruction">Drag the slider to compare before and after</p>
        </div>
        
        <div class="impact-statistics">
          ${this.stats.map(stat => `
            <div class="stat-card">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="recovery-timeline">
          <h3>Ecosystem Recovery Timeline</h3>
          <div class="timeline-phases">
            ${this.recoveryPhases.map(phase => `
              <div class="timeline-phase">
                <div class="phase-time">${phase.time}</div>
                <div class="phase-description">${phase.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const slider = this.querySelector('#comparison-slider');
    const afterContainer = this.querySelector('.after-image-container');
    const sliderButton = this.querySelector('.slider-button');

    slider.addEventListener('input', (e) => {
      const sliderValue = e.target.value;
      afterContainer.style.width = `${sliderValue}%`;
      sliderButton.style.left = `calc(${sliderValue}% - 18px)`;
    });
  }
}

customElements.define('impact-component', ImpactComponent);

export default ImpactComponent; 