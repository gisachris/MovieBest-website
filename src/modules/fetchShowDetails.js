const fetchShowDetails = async (showId) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch show details');
  }
  const data = await response.json();
  return data;
};

export { fetchShowDetails };
