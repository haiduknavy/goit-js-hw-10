import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");

breedSelect.classList.add("hidden");

fetchBreeds()
  .then((response) => {
    if (response) {
        breedsList(response)
      loader.classList.add("hidden");
      breedSelect.classList.remove("hidden");
    }
  })
  .catch((err) => {
    loader.classList.add("hidden");
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    console.error("Oops! Something went wrong! Try reloading the page!", err);
  });

function breedsList(response) {
const markup = response
.map(({name,id}) => {
  return `<option value="${id}">${name}</option>`;
})
.join("");
breedSelect.insertAdjacentHTML('beforeend',markup)
}

breedSelect.addEventListener('change', onChange);

function onChange() {
  fetchCatByBreed(breedSelect.value)
    .then((catInfo) => {
        
      renderCatInfo(catInfo);
    })
    .catch((err) => {
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.error("Oops! Something went wrong! Try reloading the page!", err);
        });
}

function renderCatInfo(catInfo) {
  let markup = catInfo.map(({ breeds: [{ temperament, description, name }], url }) => {
    return `
      <img class="cat-image" src="${url}" alt="Котик">
      <div class="cat-text">
      <h2>${name}</h2>
      <p><b>Опис:</b> ${description}</p>
      <p><b>Темперамент:</b> ${temperament}</p>
      </div>
    `;
  }).join("");
  catInfoDiv.innerHTML = markup;
}

