import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from "slim-select";


const breedSelectElement = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader")

breedSelectElement.classList.add("hidden");

function displayCatInfo(catData) {
  const markup = catData
  .map(({breeds:[{temperament,description,name}],url})=>{
    return `
       <img class="cat-image" src="${url}" alt="Cat Image">
       <div class="cat-text">
         <p><strong>Breed:</strong> ${name}</p>
         <p><strong>Description:</strong> ${description}</p>
         <p><strong>Temperament:</strong> ${temperament}</p>
       </div>
     `
  }).join("")
  catInfoDiv.insertAdjacentHTML('beforeend',markup)
}

function handleBreedSelectError(error) {
  loader.classList.add("hidden")
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
  console.error(error)
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelectElement.value;
  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      if (catData.length === 0){
        catInfoDiv.innerHTML = "";
        Notify.failure('Oops! Something went wrong! Try reloading the page!')
      } else {
        catInfoDiv.innerHTML = "";
        displayCatInfo(catData)
      }
      })
    .catch(handleBreedSelectError);
}

function fillBreedSelect(breeds) {
  const breedOptions = breeds.map(({name,id}) => ({ text: name, value: id }));
  const breedSelect = new SlimSelect({
    select: ".breed-select",
    placeholder: "Select a breed",
    data: breedOptions,
  });

  breedSelectElement.addEventListener("change", handleBreedSelectChange);
}

function initializePage() {
  fetchBreeds()
    .then((breeds) => {
      if (breeds){
        loader.classList.add("hidden")
        fillBreedSelect(breeds)
      }
      })
    .catch((error) => {
      loader.classList.add("hidden")
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
      console.error(error)
    }
    );
}

initializePage();

