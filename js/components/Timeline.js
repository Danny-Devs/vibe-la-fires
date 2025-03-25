class TimelineComponent extends HTMLElement {
  constructor() {
    super();
    this.days = [
      {
        day: 1,
        date: "October 1",
        title: "Ignition",
        image: "assets/images/timeline/day1.jpg",
        description: "Utility pole failure during strong Santa Ana winds ignites dry brush in the foothills of Altadena."
      },
      {
        day: 2,
        date: "October 2",
        title: "Initial Spread",
        image: "assets/images/timeline/day2.jpg",
        description: "Fire grows to 1,200 acres overnight as winds continue to push flames eastward into the Angeles National Forest."
      },
      {
        day: 3,
        date: "October 3",
        title: "Evacuation Orders",
        image: "assets/images/timeline/day3.jpg",
        description: "Mandatory evacuations issued for 2,500 residents as the fire reaches 3,000 acres with only 5% containment."
      },
      {
        day: 4,
        date: "October 4",
        title: "Containment Efforts",
        image: "assets/images/timeline/day4.jpg",
        description: "Over 800 firefighters deployed; air support drops fire retardant along eastern flank as winds begin to subside."
      },
      {
        day: 5,
        date: "October 5",
        title: "Progress Made",
        image: "assets/images/timeline/day5.jpg",
        description: "Containment reaches 35% as firefighters establish control lines along the southern edge of the fire."
      },
      {
        day: 6,
        date: "October 6",
        title: "Returning Home",
        image: "assets/images/timeline/day6.jpg",
        description: "Some evacuation orders lifted as containment reaches 60%; damage assessment teams begin work in affected areas."
      },
      {
        day: 7,
        date: "October 7",
        title: "Final Containment",
        image: "assets/images/timeline/day7.jpg",
        description: "Fire reaches 85% containment at 8,500 acres; all evacuation orders lifted as residents return to assess damage."
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="timeline-container">
        <div class="timeline-slider">
          <input 
            type="range" 
            min="0" 
            max="${this.days.length - 1}" 
            value="0" 
            class="slider" 
            id="day-slider"
            aria-label="Timeline day selector"
          >
          <div class="timeline-markers">
            ${this.days.map((day, index) => `
              <div class="timeline-marker ${index === 0 ? 'active' : ''}">
                <span class="day-number">Day ${day.day}</span>
                <span class="day-date">${day.date}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="timeline-content">
          <div class="timeline-image-container">
            <img src="${this.days[0].image}" alt="Day 1: ${this.days[0].title}" id="timeline-image">
          </div>
          <div class="timeline-info">
            <h3 id="timeline-title">${this.days[0].title}</h3>
            <p id="timeline-description">${this.days[0].description}</p>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const slider = this.querySelector('#day-slider');
    const image = this.querySelector('#timeline-image');
    const title = this.querySelector('#timeline-title');
    const description = this.querySelector('#timeline-description');
    const markers = this.querySelectorAll('.timeline-marker');

    slider.addEventListener('input', (e) => {
      const index = parseInt(e.target.value);
      const day = this.days[index];

      // Update content
      image.src = day.image;
      image.alt = `Day ${day.day}: ${day.title}`;
      title.textContent = day.title;
      description.textContent = day.description;

      // Update markers
      markers.forEach((marker, i) => {
        if (i === index) {
          marker.classList.add('active');
        } else {
          marker.classList.remove('active');
        }
      });
    });
  }
}

customElements.define('timeline-component', TimelineComponent);

export default TimelineComponent; 