const url = 'https://api.thecatapi.com/v1';
const api_key = "live_HWMbYBj5ZJcb0fEWSvi4KFYLUmGTZTpPYr3ccou0HOK6X8S9Vyqzft2YOkZxalTg";

export function fetchBreeds() {
    return fetch(`${url}/breeds`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
                .catch(error => console.log(error));
        });       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
                .catch(error => console.log(error));
        });  
};