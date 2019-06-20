export const fetchMovies = async searchQuery => {
  const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=9da72a8f`;
  const response = await fetch(url).then(res => res.json());
  return response.Search;
};

export const fetchDetails = async imdbID => {
  const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=9da72a8f`;
  const response = await fetch(url).then(res => res.json());
  return response;
};

//additional state of loading: true, false
// before fetching set loading to true
//after fetching,
