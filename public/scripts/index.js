const searchButton = document.querySelector('.search-button');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('.close-button');

function handleModal() {
  modal.classList.toggle('hide');
}

searchButton.addEventListener('click', handleModal);
closeButton.addEventListener('click', handleModal);
