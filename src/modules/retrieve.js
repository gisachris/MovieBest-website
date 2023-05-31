// Function to retrieve shows from the TVmaze API.
const getShows = async() => {
  const showsEndpoint = 'https://api.tvmaze.com/shows';

  const request = await fetch(showsEndpoint);
  const response = await request.json();
  return response;
}

export default getShows;