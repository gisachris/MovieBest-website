import getShows from './retrieve.js';
import heart from '../../assets/images/heart.png';

let itemsPerPage = 6;
const currentPage = 1;

const movieSection = document.querySelector('.movieSection');
const moreShows = document.querySelector('.moreShows');

const showCounter = (initialValue) => {
  let value = initialValue;

  const increment = () => {
    value += initialValue;
    return value;
  };

  const reset = () => {
    value = initialValue;
    return value;
  };

  return {
    increment,
    reset,
  };
};

const counter = showCounter(6);

const homeCounter = (itemsPerPage) => {
  movieSection.textContent = `movies(${itemsPerPage})`;
};

// Call the getShows() function on page load
document.addEventListener('DOMContentLoaded', getShows);

const displayShows = async () => {
  const response = await getShows();

  const container = document.querySelector('.container');
  container.innerHTML = '';

  // start and end index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  // Create a single showholder
  for (let i = startIndex; i < endIndex && i < response.length; i++) {
    const show = response[i];

    const singleShow = document.createElement('article');
    singleShow.classList.add('singleShow');
    container.appendChild(singleShow);

    // Create the show's image
    const showImage = document.createElement('img');
    showImage.classList.add('showImage');
    showImage.src = show.image.medium;
    singleShow.appendChild(showImage);

    // Create the show's name
    const showTitle = document.createElement('h2');
    showTitle.classList.add('showTitle');
    showTitle.textContent = show.name;
    singleShow.appendChild(showTitle);

    // create list of actions for shows
    const showActions = document.createElement('ul');
    showActions.classList.add('showActions');
    singleShow.appendChild(showActions);

    // Create the like action
    const action1 = document.createElement('li');
    action1.classList.add('action');
    const like = document.createElement('img');
    like.classList.add('likeBefore');
    like.src = heart;
    action1.appendChild(like);
    showActions.appendChild(action1);

    // Create the comment button
    const action2 = document.createElement('li');
    action2.classList.add('action');
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment');
    commentButton.textContent = 'Comment';
    action2.appendChild(commentButton);
    showActions.appendChild(action2);
  }
};

moreShows.addEventListener('click', () => {
  counter.increment();
  itemsPerPage = counter.increment();
  displayShows();
  homeCounter(itemsPerPage);
});

window.addEventListener('load', () => {
  counter.reset();
  itemsPerPage = counter.reset();
  displayShows();
  homeCounter(itemsPerPage);
});

// Call to display shows on page load
document.addEventListener('DOMContentLoaded', () => {
  homeCounter(itemsPerPage);
  displayShows();
});
