import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hptQADGwU9Zhy6D66TDw1aqUdaHRfruiGco99o25Jc1yQxGpDWxxQN1VmGyllc6d";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching cat data:", error);
      throw error;
    });
}