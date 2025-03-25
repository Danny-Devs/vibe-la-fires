class FireMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      center: [-118.1445, 34.1970], // Altadena coordinates
      zoom: 12,
      minZoom: 10,
      maxZoom: 16,
      pitch: 30,
      bearing: -15,
      ...options
    };

    this.map = null;
    this.firePerimeters = new Map(); // Store fire perimeter data by day
    this.currentDay = 0;
  }

  async initialize() {
    try {
      // Initialize map
      mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
      this.map = new mapboxgl.Map({
        container: this.containerId,
        style: 'mapbox://styles/your-custom-style/eaton-fire-theme',
        ...this.options
      });

      // Wait for map to load
      await new Promise(resolve => this.map.on('load', resolve));

      // Add terrain
      await this.setupTerrain();

      // Load initial fire perimeter
      await this.loadFirePerimeter(0);

      // Hide loading overlay
      document.getElementById('loading-overlay').style.display = 'none';

      // Setup event listeners
      this.setupEventListeners();

    } catch (error) {
      console.error('Failed to initialize map:', error);
      this.handleMapError(error);
    }
  }

  async setupTerrain() {
    this.map.addSource('terrain', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.terrain-rgb'
    });

    this.map.setTerrain({
      source: 'terrain',
      exaggeration: 1.5
    });
  }

  async loadFirePerimeter(dayIndex) {
    try {
      // Check if we already have this day's data
      if (!this.firePerimeters.has(dayIndex)) {
        const response = await fetch(`/data/fire-day-${dayIndex}.geojson`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        this.firePerimeters.set(dayIndex, data);
      }

      const sourceId = `fire-day-${dayIndex}`;
      const layerId = `fire-perimeter-${dayIndex}`;

      // Add/update source
      if (!this.map.getSource(sourceId)) {
        this.map.addSource(sourceId, {
          type: 'geojson',
          data: this.firePerimeters.get(dayIndex)
        });
      }

      // Add/update layer
      if (!this.map.getLayer(layerId)) {
        this.map.addLayer({
          id: layerId,
          type: 'fill',
          source: sourceId,
          paint: {
            'fill-color': '#EF4444',
            'fill-opacity': 0.3,
            'fill-outline-color': '#B91C1C'
          }
        });
      }

      this.currentDay = dayIndex;

    } catch (error) {
      console.error(`Failed to load fire perimeter for day ${dayIndex}:`, error);
      throw error;
    }
  }

  setupEventListeners() {
    // Monitor performance
    this.performanceMetrics = {
      fps: 0,
      lastFrameTime: performance.now(),
      frameCount: 0
    };

    const monitorPerformance = () => {
      const now = performance.now();
      const delta = now - this.performanceMetrics.lastFrameTime;

      if (delta >= 1000) {
        this.performanceMetrics.fps = Math.round((this.performanceMetrics.frameCount * 1000) / delta);
        this.performanceMetrics.frameCount = 0;
        this.performanceMetrics.lastFrameTime = now;

        // Log performance metrics
        console.debug('Map FPS:', this.performanceMetrics.fps);
      }

      this.performanceMetrics.frameCount++;
      requestAnimationFrame(monitorPerformance);
    };

    requestAnimationFrame(monitorPerformance);
  }

  handleMapError(error) {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.innerHTML = `
      <div class="error-message">
        <p>Failed to load map: ${error.message}</p>
        <button onclick="location.reload()">Retry</button>
      </div>
    `;
  }
}

// Export for use in main app
export default FireMap; 