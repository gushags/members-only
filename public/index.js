// index.js

// Post modal
const postDialog = document.querySelector('#post-modal');
const postOpenDialog = document.querySelector('#post-open-modal');
const postCloseBtn = document.querySelector('#post-close');

// "Show the dialog" button opens the dialog modally
postOpenDialog.addEventListener('click', () => {
  postDialog.showModal();
});

// "Close" button closes the dialog
postCloseBtn.addEventListener('click', () => {
  postDialog.close();
});
