import axios from "axios";
export const postMovies = async ({ name, genres, image, premiered }) => {
  const date = new Date(premiered);
  const array = genres.trim().split(",").map((genre) => genre.trim())
  const movie = await axios.post("http://localhost:3001/movies/", {
    name,
    genres: array,
    image,
    premiered: date,
  });
  return movie.data;
};

export const getMovies = async () => {
  const movies = await axios.get("http://localhost:3001/movies/");
  return movies.data;
};

export const updateMovie = async ({ id, name, genres, image, premiered }) => {
  const date = new Date(premiered);
  const array = genres.trim().split(",").map((genre) => genre.trim())
  const movies = await axios.put(`http://localhost:3001/movies/${id}`, {
    name,
    genres: array,
    image,
    premiered: date,
  });
  return movies.data;
};
export const deleteMovie = async (movieId) => {
  const movies = await axios.delete(`http://localhost:3001/movies/${movieId}`);
  return movies.data;
};
