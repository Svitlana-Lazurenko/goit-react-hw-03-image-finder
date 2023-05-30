const API_KEY = '35568856-099cdd83ac58028a9b45ec202';

function fetchImages(name, number) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${number}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No images ${name}`));
  });
}

const api = {
  fetchImages,
};

export default api;
