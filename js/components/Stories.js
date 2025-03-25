class StoriesComponent extends HTMLElement {
  constructor() {
    super();
    this.stories = [
      {
        id: "maria",
        title: "We Had Five Minutes to Leave",
        author: "Maria Gutierrez",
        image: "assets/images/stories/maria-gutierrez.jpg",
        content: "Maria Gutierrez was preparing dinner when the evacuation order came through her phone. 'I grabbed my two kids, our dog, and a box of family photos. That was all we had time for,' she recalls. Within minutes, they were in their car heading down the canyon as ash rained from the sky. 'Looking back at our home through the rear window, I didn't know if we'd ever see it again.' Three days later, she would learn that firefighters had managed to save her home, though many of her neighbors weren't as fortunate.",
        location: { lat: 34.191, lng: -118.136 }
      },
      {
        id: "david",
        title: "Watching from a Distance",
        author: "David Thompson",
        image: "assets/images/stories/david-thompson.jpg",
        content: "From the safety of a friend's home in Pasadena, David Thompson watched as the hills where he'd lived for 15 years burned on the news. 'It was surreal. I grew up in those mountains, hiked those trails thousands of times,' he says. Having evacuated early, he'd taken his most precious belongings, but the uncertainty was overwhelming. 'Not knowing if your home is still standing is a special kind of torture.' David's house survived with minimal damage, but he's now actively involved in community fire preparation efforts.",
        location: { lat: 34.188, lng: -118.142 }
      },
      {
        id: "ramirez",
        title: "The Firefighters Who Saved Our Block",
        author: "The Ramirez Family",
        image: "assets/images/stories/ramirez-family.jpg",
        content: "When flames crested the ridge above their home, the Ramirez family thought all was lost. But as they sheltered with relatives in Monrovia, a crew of firefighters from Station 11 made a heroic stand on their street. 'They created a fire break using our garden hoses and whatever they could find,' explains Carlos Ramirez. 'Those men and women stood their ground as embers flew everywhere.' The crew saved all but two homes on the block. The Ramirez family has since hosted an annual thank-you barbecue for Station 11 firefighters.",
        location: { lat: 34.195, lng: -118.128 }
      },
      {
        id: "james",
        title: "Rebuilding From Ashes",
        author: "James Wilson",
        image: "assets/images/stories/james-wilson.jpg",
        content: "James Wilson lost everything when the Eaton Fire swept through his neighborhood. 'Thirty-eight years of memories, reduced to ash,' he says solemnly. Despite the devastation, James sees a silver lining in the community response. 'Neighbors I barely knew showed up with clothing, food, and offers of places to stay.' Now in the process of rebuilding, James has incorporated numerous fire-resistant features into his new home design. 'This experience taught me that people are incredibly resilient, and that preparation matters.'",
        location: { lat: 34.187, lng: -118.131 }
      }
    ];
    this.activeStory = this.stories[0];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="stories-container">
        <div class="stories-featured">
          <div class="featured-image">
            <img src="${this.activeStory.image}" alt="${this.activeStory.title}" id="featured-image">
          </div>
          <div class="featured-content">
            <h2 id="featured-title">${this.activeStory.title}</h2>
            <h3 id="featured-author">${this.activeStory.author}</h3>
            <p id="featured-content">${this.activeStory.content}</p>
          </div>
        </div>
        
        <div class="stories-grid">
          ${this.stories.map(story => `
            <div class="story-card ${story.id === this.activeStory.id ? 'active' : ''}" data-story="${story.id}">
              <div class="story-image">
                <img src="${story.image}" alt="${story.title}">
              </div>
              <div class="story-preview">
                <h4>${story.title}</h4>
                <p>${story.author}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="stories-map">
          <div id="stories-map-container" class="map-placeholder">
            <div class="map-overlay">
              <p>Map of story locations in Altadena</p>
              <p class="small-text">In the final implementation, this would display an interactive map showing the exact locations of each story.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const storyCards = this.querySelectorAll('.story-card');
    storyCards.forEach(card => {
      card.addEventListener('click', () => {
        const storyId = card.getAttribute('data-story');
        this.changeStory(storyId);

        // Update active card state
        storyCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  changeStory(storyId) {
    const story = this.stories.find(s => s.id === storyId);
    if (story) {
      this.activeStory = story;

      // Update featured content
      this.querySelector('#featured-image').src = story.image;
      this.querySelector('#featured-title').textContent = story.title;
      this.querySelector('#featured-author').textContent = story.author;
      this.querySelector('#featured-content').textContent = story.content;

      // In a real implementation, you would update the map to focus on this story's location
      console.log(`Map would update to focus on: lat: ${story.location.lat}, lng: ${story.location.lng}`);
    }
  }
}

customElements.define('stories-component', StoriesComponent);

export default StoriesComponent; 