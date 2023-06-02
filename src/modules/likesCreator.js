import heartLiked from '../../assets/images/heartLiked.png';
import getShows from './retrieve.js';
import displayShows from './display.js';

// create a like
const createLike = async (showID) => {
  const appID = localStorage.getItem('uniqueId');
  const resource = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes/`;

  const init = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      {
        item_id: showID,
      },
    ),
  };

  const crelikes = await fetch(resource, init);
  const responce = await crelikes.text();
};

const getLikes = async () => {
  const appID = localStorage.getItem('uniqueId');
  const resource = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`;

  const request = await fetch(resource);
  const response = await request.json();
  return response;
};

const updater = async () => {
  try {
    const currentShows = document.querySelectorAll('.likeBefore');
    const allLikes = await getLikes();
    const filteredlikes = allLikes.filter((likes) => likes.item_id <= currentShows.length);

    for (let j = 0; j <= filteredlikes.length; j++) {
      const likesData = filteredlikes[j];
      const { item_id: itemID, likes } = likesData;

      // update the likes counter om screen
      const likesCounter = document.querySelector(`.likesCounter[data-index="${itemID}"]`);
      likesCounter.textContent = `likes(${likes})`;

      // Update the liked show icons
      const iconUpdater = document.querySelector(`.likeBefore[data-index="${itemID}"]`);
      iconUpdater.src = heartLiked;
    }
  } catch (error) {
    return error;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const handleClick = async (event) => {
    try {
      const button = event.target.closest('.likeBefore');
      const buttonID = button.dataset.index;
      await createLike(buttonID);
      await updater();
    } catch (error) {
      return error;
    }
  };

  const buttonContainer = document.getElementById('container');
  buttonContainer.addEventListener('click', handleClick);
});

export default getLikes;
export { updater };
