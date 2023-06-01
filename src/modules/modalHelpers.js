// Function to display the comment pop-up modal
export const displayModal = (content) => {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');
  document.body.appendChild(modalOverlay);

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.appendChild(content);
  modalOverlay.appendChild(modalContainer);

  const closeModalButton = modalContainer.querySelector('.close-button');
  closeModalButton.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', closeModal);
};

// Function to close the comment pop-up modal
export const closeModal = (event) => {
  const modal = event.target.closest('.modal-container');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (modal) {
    modal.remove();
  }

  if (modalOverlay) {
    modalOverlay.remove();
  }
};
