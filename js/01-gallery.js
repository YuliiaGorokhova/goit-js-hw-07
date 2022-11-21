import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));
gallery.addEventListener('click', onClickImageModal);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
    </a> </div>`;
    })
    .join('');
}

function onClickImageModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') return;

  const instance = basicLightbox.create(
    `<div class="modal">
      <img class="modal__image"
      src="${evt.target.dataset.source}"
      />
    </div>`,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', closeModalEsc);
        instance.element().querySelector('img').onclick = instance.close;
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', closeModalEsc);
      },
    }
  );

  function closeModalEsc(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }
  instance.show();
}
