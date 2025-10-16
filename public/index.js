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

// Delete buttons
const deleteForm = document.querySelectorAll('.deleteBtn');
deleteForm.forEach((form) => {
  form.addEventListener('click', (e) => {
    e.preventDefault();
    const userConfirm = confirm(
      `Are you sure you want to delete this post? \nThis cannot be undone.`
    );
    if (userConfirm) {
      form.submit();
    }
  });
});
