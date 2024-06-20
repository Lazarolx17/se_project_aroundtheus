const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ELEMENTS
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(
  "#profile-edit-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardModal = document.querySelector("#profile-add-modal");
const addNewCardForm = addNewCardModal.querySelector("#add-card-form");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardCloseButton = document.querySelector(
  "#add-profile-edit-close-button"
);
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardLinkInput = document.querySelector("#card-link-input");
const previewImageModal = document.querySelector("#modal__image-preview");
const previewImageClose = document.querySelector(".modal__close-preview");
const previewImageTitle = document.querySelector(".modal__preview-title");
const previewImagePic = document.querySelector(".preview__image");

// FUNCTIONS
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  // event listener for the like button
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // listener for the delete button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImagePic.src = data.link;
    previewImagePic.alt = data.name;
    previewImageTitle.textContent = data.name;
    openPopup(previewImageModal);
  });

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  return cardElement;
}

function renderCardElement(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// EVENT HANDLERS
function handleProfileEditFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCardElement({ name, link }, cardListEl);

  addNewCardForm.reset();
  closePopup(addNewCardModal);
}

// EVENT LISTENERS
// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openPopup(profileEditModal);
// });

// Refactored EVENT LISTENERS with separate functions

// Function to fill profile form fields
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Function to open edit profile modal and fill form
function openEditProfileModal() {
  fillProfileForm();
  openPopup(profileEditModal);
}

// Event listeners using the refactored functions
profileEditButton.addEventListener("click", openEditProfileModal);

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

previewImageClose.addEventListener("click", () => {
  closePopup(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

initialCards.forEach((cardData) => renderCardElement(cardData, cardListEl));

addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardModal);
});

addNewCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardCloseButton.addEventListener("click", () => {
  closePopup(addNewCardModal);
});
