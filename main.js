const notificationMessageSuccess = document.getElementById(
  'notification-message-success',
);
const notificationCloseSuccess = document.querySelector(
  '.notification-close-success',
);
const notificationBlockSuccess = document.querySelector(
  '.notification-block-success',
);

const notificationMessageError = document.getElementById(
  'notification-message-error',
);
const notificationCloseError = document.querySelector(
  '.notification-close-error',
);
const notificationBlockError = document.querySelector(
  '.notification-block-error',
);
const showNotificationSuccess = document.getElementById(
  'show-notification-success',
);
const showNotificationError = document.getElementById(
  'show-notification-error',
);

notificationMessageSuccess.textContent = 'Напоминание об успешном выполнении!';
notificationMessageError.textContent = 'Напоминание об ошибочном выполнении!';

function successMessage() {
  notificationBlockSuccess.removeAttribute('hidden');
  setTimeout(() => {
    notificationBlockSuccess.setAttribute('active', '');
  }, 1);
}

function errorMessage(err) {
  notificationMessageError.textContent = `Ошибка ${err}`;
  notificationBlockError.removeAttribute('hidden');
  setTimeout(() => {
    notificationBlockError.setAttribute('active', '');
  }, 1);
}

notificationCloseSuccess.addEventListener('click', () => {
  notificationBlockSuccess.removeAttribute('active');
  setTimeout(() => {
    notificationBlockSuccess.setAttribute('hidden', '');
  }, 300);
});

showNotificationSuccess.addEventListener('click', successMessage);

notificationCloseError.addEventListener('click', () => {
  notificationBlockError.removeAttribute('active');
  setTimeout(() => {
    notificationBlockError.setAttribute('hidden', '');
  }, 300);
});

showNotificationError.addEventListener('click', errorMessage);

function loadImages(retryCount = 0) {
  const maxRetry = 3;
  const gallery = document.getElementById('gallery');

  fetch('http://127.0.0.1:8000/images')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }
      return response.json();
    })
    .then((images) => {
      if (images.length === 0) {
        gallery.innerHTML = '<p>Изображения не найдены</p>';
      } else {
        renderImages(images);
      }
    })
    .catch((error) => {
      if (retryCount < maxRetry) {
        setTimeout(() => loadImages(retryCount + 1), 1000);
      } else {
        errorMessage('Не удалось загрузить изображения');
      }
    });
}

function renderImages(images) {
  const container = document.querySelector('.images');
  container.innerHTML = images
    .map(
      (img) => `
        <img class="image-item" src="${img.url}" alt="${img.alt}" />
    `,
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  loadImages();
});
