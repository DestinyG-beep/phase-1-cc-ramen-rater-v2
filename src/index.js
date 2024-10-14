// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const nameDisplay = document.querySelector('.name');
  const restaurantDisplay = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameDisplay.textContent = ramen.name;
  restaurantDisplay.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};


const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page refresh

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target['new-comment'].value,
    };
    
    displayRamen(newRamen);
    handleClick(newRamen);

  });
};
const displayRamen = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenImage = document.createElement('img');

  ramenImage.src = ramen.image;
  ramenImage.alt = ramen.name;
  // Add click event to show details when clicked
  ramenImage.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(ramenImage);
};

// Function to make preloaded ramen clickable
const makePreloadedRamensClickable = () => {
  const preloadedImages = document.querySelectorAll('#ramen-menu img');

  preloadedImages.forEach((image) => {
    const ramen = {
      name: image.getAttribute('data-name'),
      restaurant: image.getAttribute('data-restaurant'),
      image: image.src,
      rating: image.getAttribute('data-rating'),
      comment: image.getAttribute('data-comment'),
    };

    image.addEventListener('click', () => handleClick(ramen));
  });
};

const displayRamens = async () => {
  const response = await fetch('http://localhost:3000/ramens');
  const ramens = await response.json();

  ramens.forEach((ramen) => displayRamen(ramen));
};

// Main function to set up event listeners and load ramen


const main = () => {
  displayRamens(); // Invoke displayRamens here
  addSubmitListener(); // Invoke addSubmitListener here
  makePreloadedRamensClickable()
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
