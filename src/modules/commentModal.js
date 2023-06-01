/* eslint-disable no-use-before-define, no-unused-vars */
import fetchShowDetails from './fetchShowDetails.js';
import createCommentModalContent from './createCommentModalContent.js';
import { displayModal, closeModal } from './modalHelpers.js';
import { generateUniqueId } from './createID.js';

const openCommentModal = async (itemID) => {
  try {
    let appID = localStorage.getItem('uniqueId');
    if (!appID) {
      appID = generateUniqueId();
      localStorage.setItem('uniqueId', appID);
    }

    const showDetails = await fetchShowDetails(itemID);

    const modalContent = createCommentModalContent(showDetails, appID, submitComment, itemID);
    displayModal(modalContent);
    displayComments(appID, itemID);
  } catch (error) {
    // console.error('Error submitting comment:', error);
  }
};

const submitComment = async (event, appID, itemID) => {
  event.preventDefault();
  const commentForm = event.target;
  const nameInput = commentForm.querySelector('#name-input');
  const commentInput = commentForm.querySelector('#comment-input');

  const username = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (username === '' || comment === '') {
    alert('Please enter your name and comment');
    return;
  }

  try {
    const commentData = {
      item_id: itemID,
      username,
      comment,
    };

    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }

    nameInput.value = '';
    commentInput.value = '';

    // Clear the comments section to prevent duplication of comments
    const commentsSection = document.querySelector('#comments-section');
    commentsSection.innerHTML = '';

    displayComments(appID, itemID);
    updateCommentsCounter(appID, itemID);
  } catch (error) {
    // console.error('Error submitting comment:', error);
  }
};

const displayComments = async (appID, itemID) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${itemID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const comments = await response.json();

    const commentsSection = document.querySelector('#comments-section');
    commentsSection.innerHTML = '';

    if (comments.length === 0) {
      commentsSection.innerHTML = 'No comments yet.';
      // updateCommentsCounter(appID, itemID);
      return;
    }
    comments.forEach((comment) => {
      const commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');
      commentItem.innerHTML = `
        <span class="comment-username">${comment.username}</span>
        <p class="comment-text">${comment.comment}</p>
        <span class="comment-date">${comment.creation_date}</span>
      `;
      commentsSection.appendChild(commentItem);
    });

    updateCommentsCounter(appID, itemID);
  } catch (error) {
    // console.error('Error submitting comment:', error);
  }
};

const updateCommentsCounter = async (appID, itemID) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${itemID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const comments = await response.json();
    const commentsCounter = document.querySelector('#comments-counter');
    commentsCounter.textContent = comments.length.toString();
  } catch (error) {
    // console.error('Error submitting comment:', error);
  }
};

export {
  openCommentModal, submitComment, displayComments, updateCommentsCounter,
};
