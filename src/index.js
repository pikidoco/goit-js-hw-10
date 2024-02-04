import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';;
import SlimSelect from 'slim-select'
import './slimselect.css';
import './loaders.css'

import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = "live_HWMbYBj5ZJcb0fEWSvi4KFYLUmGTZTpPYr3ccou0HOK6X8S9Vyqzft2YOkZxalTg";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector('.error');
const catInfo = document.querySelector(".cat-info");

loader.classList.add('is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let breedIds = [];

fetchBreeds()
  .then(data => {
    breedSelect.hidden = false;
    breedIds = data.map(element => ({ text: element.name, value: element.id }));
    new SlimSelect({
      select: breedSelect,
      data: breedIds
    });
  })
  .catch(handleError);

breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  const breedId = event.currentTarget.value;
  showCat(breedId);
}

function showCat(breedId) {
  loader.classList.remove('is-hidden');
  error.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  fetchCatByBreed(breedId)
    .then(data => {
      console.log(data);
      const catCard = createCatCard(data[0]);
      catInfo.innerHTML = catCard;
      loader.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
    })
    .catch(handleError);
}

function createCatCard(cat) {
  const breed = cat.breeds[0];

  return `<div class="cat-card">
            <img class="cat-img" src="${cat.url}" alt="${breed.name}" width="300">
            <div class="cat-text">
              <h1 class="cat-header">${breed.name}</h1>
              <p>${breed.description}</p>
              <p><span class="cat-temperament">Temperament:&nbsp;</span>${breed.temperament}</p>
            </div>
          </div>`;
}

function handleError(error) {
  console.error(error);
  loader.classList.add('is-hidden');
  breedSelect.classList.remove('is-hidden');
  error.classList.remove('is-hidden');
  Notiflix.Notify.failure('Oops! Something went wrong. Try reloading the page or selecting another cat breed!');
}