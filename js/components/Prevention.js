class PreventionComponent extends HTMLElement {
  constructor() {
    super();
    this.preventionTips = [
      {
        title: "Create Defensible Space",
        icon: "shield",
        content: "Maintain at least 100 feet of defensible space around your home by clearing away dead vegetation and creating proper spacing between trees and shrubs."
      },
      {
        title: "Fire-Resistant Landscaping",
        icon: "tree",
        content: "Use fire-resistant plants and materials in the area immediately surrounding your home. Avoid highly flammable vegetation like eucalyptus and pine."
      },
      {
        title: "Home Hardening",
        icon: "home",
        content: "Upgrade to fire-resistant building materials for roofs, siding, and windows. Install mesh screens over vents to prevent ember intrusion."
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.initializeSimulator();
  }

  render() {
    this.innerHTML = `
      <div class="prevention-container">
        <div class="prevention-tips">
          ${this.preventionTips.map(tip => `
            <div class="prevention-tip">
              <div class="tip-icon">${this.getIcon(tip.icon)}</div>
              <div class="tip-content">
                <h3>${tip.title}</h3>
                <p>${tip.content}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="climate-data">
          <h3>Climate Trends & Fire Risk</h3>
          <div class="climate-chart-container">
            <div class="chart-placeholder">
              <p>Temperature Anomalies in Southern California (1950-present)</p>
              <div class="temp-bars">
                <div class="temp-bar" style="height: 20px;"></div>
                <div class="temp-bar" style="height: 25px;"></div>
                <div class="temp-bar" style="height: 30px;"></div>
                <div class="temp-bar" style="height: 40px;"></div>
                <div class="temp-bar" style="height: 50px;"></div>
                <div class="temp-bar" style="height: 65px;"></div>
                <div class="temp-bar" style="height: 85px;"></div>
                <div class="temp-bar" style="height: 100px;"></div>
              </div>
              <div class="chart-years">
                <span>1950</span>
                <span>1970</span>
                <span>1990</span>
                <span>2010</span>
                <span>2023</span>
              </div>
            </div>
          </div>
          <p class="chart-caption">Warming temperatures correlate with increased fire frequency and intensity</p>
        </div>
        
        <div class="fire-simulator">
          <h3>Interactive Fire Prevention Simulator</h3>
          <div class="simulator-controls">
            <div class="control-group">
              <label for="defensible-space">Defensible Space</label>
              <input type="range" min="0" max="100" value="30" id="defensible-space">
            </div>
            <div class="control-group">
              <label for="home-hardening">Home Hardening</label>
              <input type="range" min="0" max="100" value="20" id="home-hardening">
            </div>
            <div class="control-group">
              <label for="community-preparation">Community Preparation</label>
              <input type="range" min="0" max="100" value="10" id="community-preparation">
            </div>
          </div>
          <div class="simulator-visualization" id="simulator-visualization">
            <!-- Simulation visualization will be updated dynamically -->
          </div>
          <div class="simulator-result">
            <div class="result-label">Estimated Protection Level:</div>
            <div class="result-value" id="protection-level">35%</div>
          </div>
        </div>
      </div>
    `;
  }

  getIcon(iconName) {
    // Simple SVG icons based on the icon name
    const icons = {
      shield: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>`,
      tree: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M12 22v-8m0 0l-4-4m4 4l4-4m-4-4V3"></path>
              <path d="M9.5 9L6 6m8.5 3L18 6"></path>
            </svg>`,
      home: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
              <path d="M9 22V12h6v10"></path>
            </svg>`
    };
    return icons[iconName] || '';
  }

  initializeSimulator() {
    // Set up simulator interactive elements
    const defensibleSpace = this.querySelector('#defensible-space');
    const homeHardening = this.querySelector('#home-hardening');
    const communityPreparation = this.querySelector('#community-preparation');
    const protectionLevel = this.querySelector('#protection-level');

    const updateSimulation = () => {
      // Simple calculation for demonstration purposes
      const ds = parseInt(defensibleSpace.value);
      const hh = parseInt(homeHardening.value);
      const cp = parseInt(communityPreparation.value);

      // Calculate weighted protection level
      const protection = Math.round((ds * 0.5) + (hh * 0.3) + (cp * 0.2));
      protectionLevel.textContent = `${protection}%`;

      // Update visualization colors based on protection level
      this.updateVisualization(protection);
    };

    // Add event listeners to update simulation when controls change
    defensibleSpace.addEventListener('input', updateSimulation);
    homeHardening.addEventListener('input', updateSimulation);
    communityPreparation.addEventListener('input', updateSimulation);

    // Initial update
    updateSimulation();
  }

  updateVisualization(protectionLevel) {
    // Update visualization based on protection level
    const visualization = this.querySelector('#simulator-visualization');

    // For simplicity, just change background color based on protection level
    // In a real implementation, this would be a more sophisticated visualization
    let backgroundColor;
    let status;

    if (protectionLevel < 30) {
      backgroundColor = '#d32f2f'; // High risk - red
      status = 'High Risk';
    } else if (protectionLevel < 60) {
      backgroundColor = '#ff9800'; // Medium risk - orange
      status = 'Medium Risk';
    } else {
      backgroundColor = '#4caf50'; // Low risk - green
      status = 'Low Risk';
    }

    visualization.style.backgroundColor = backgroundColor;
    visualization.innerHTML = `
      <div class="visualization-content">
        <h4 class="protection-status">${status}</h4>
        <p class="protection-description">
          ${protectionLevel < 30
        ? 'Your home is at high risk during a wildfire event. Significant improvements needed.'
        : protectionLevel < 60
          ? 'Your home has moderate protection. Additional measures recommended.'
          : 'Your home has good protection against wildfires. Maintain these standards.'}
        </p>
      </div>
    `;
  }
}

customElements.define('prevention-component', PreventionComponent);

export default PreventionComponent; 