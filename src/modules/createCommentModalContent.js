import { submitComment } from './commentModal.js';
// import { displayModal, closeModal } from './modalHelpers.js';

const createCommentModalContent = (showDetails, appID) => {
  const modal = document.createElement('div');
  modal.classList.add('comment-modal');

  modal.innerHTML = `
    <div class="modal-header">
    <button class="close-button">X</button>
      <img class="show-image" src="${showDetails.image.medium}" alt="${showDetails.name}">
      <h2 class="show-name">${showDetails.name}</h2>
      <h3 class="sub-heading language">Language: ${showDetails.language}</h3>
      <h3 class="sub-heading genre">Genres: ${showDetails.genres.join(', ')}</h3>
    </div>
    <div class="modal-body">
      <h3 class="sub-heading schedule">Schedule: ${showDetails.schedule.time} on ${showDetails.schedule.days.join(', ')}</h3>
      <div class="total-comments-section">
        <h3 class="sub-heading totalComments">Total comments: <span id="comments-counter">${showDetails.comments ? showDetails.comments.length : 0}</span></h3>
        <div id="comments-section" class="comments-section">${createCommentSection(showDetails.comments)}</div>
      </div>
      <div class="add-comment-section">
        <h3 class="sub-heading addComment">Add a comment</h3>
        <form id="comment-form" class="comment-form">
          <input type="text" id="name-input" class="name-input" placeholder="Your name" required>
          <textarea id="comment-input" class="comment-input" placeholder="Your comment (max 500 characters)" maxlength="500" required></textarea>
          <button type="submit" class="submit-button">Submit</button>
        </form>
      </div>
    </div>
  `;

  const commentForm = modal.querySelector('#comment-form');
  commentForm.addEventListener('submit', (event) => submitComment(event, appID, showDetails.id));

  return modal;
};

const createCommentSection = (comments) => {
  if (!comments || comments.length === 0) {
    return '<p>No comments yet.</p>';
  }

  const commentItems = comments.map((comment) => {
    const { username, comment: text, creation_date: creationDate } = comment;
    return `
      <div class="comment-item">
        <span class="comment-username">${username}</span>
        <p class="comment-text">${text}</p>
        <span class="comment-date">${formatDate(creationDate)}</span>
      </div>
    `;
  });

  return commentItems.join('');
};

export { createCommentModalContent };
