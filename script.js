const animalInfo = {
  Dog: {
    title: "Dog",
    text: "Dogs are loyal, playful, and social animals. They can be loving companions and enjoy spending time with people."
  },
  Cat: {
    title: "Cat",
    text: "Cats are curious and independent. They can be calm one moment and playful the next."
  },
  Rabbit: {
    title: "Rabbit",
    text: "Rabbits are gentle and adorable animals. Their energetic little hops make them especially charming."
  },
  Panda: {
    title: "Panda",
    text: "Pandas are peaceful-looking animals known for their distinctive black-and-white appearance."
  },
  Fox: {
    title: "Fox",
    text: "Foxes are clever and adaptable animals with distinctive features and interesting behavior."
  },
  Penguin: {
    title: "Penguin",
    text: "Penguins are fascinating birds adapted to life in and around cold water."
  }
};

const slides = Array.from(document.querySelectorAll(".gallery figure"));
const modal = document.getElementById("animal-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");
const carouselStatus = document.getElementById("carousel-status");
const previousButton = document.getElementById("carousel-prev");
const nextButton = document.getElementById("carousel-next");

let currentSlide = 0;
let lastFocusedElement = null;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    const isActive = i === currentSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  const name = slides[currentSlide].querySelector("figcaption").textContent.trim();
  if (carouselStatus) {
    carouselStatus.textContent = `Showing ${name}, image ${currentSlide + 1} of ${slides.length}`;
  }
}

function openAnimalModal(index) {
  if (!slides.length || !modal) return;

  const slide = slides[index];
  const image = slide.querySelector("img");
  const name = slide.querySelector("figcaption").textContent.trim();
  const info = animalInfo[name] || { title: name, text: "Learn more about this animal in the gallery." };

  currentSlide = index;
  lastFocusedElement = document.activeElement;
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalTitle.textContent = info.title;
  modalText.textContent = info.text;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeAnimalModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

if (slides.length) {
  showSlide(0);

  slides.forEach((slide, index) => {
    const image = slide.querySelector("img");
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `View details about ${slide.querySelector("figcaption").textContent.trim()}`);

    image.addEventListener("click", () => openAnimalModal(index));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openAnimalModal(index);
      }
    });
  });
}

if (previousButton) {
  previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
}

if (nextButton) {
  nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
}

if (modalClose) {
  modalClose.addEventListener("click", closeAnimalModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeAnimalModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) {
    closeAnimalModal();
  }

  if (event.key === "ArrowLeft" && !modal?.classList.contains("is-open")) {
    showSlide(currentSlide - 1);
  }

  if (event.key === "ArrowRight" && !modal?.classList.contains("is-open")) {
    showSlide(currentSlide + 1);
  }
});
