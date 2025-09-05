import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

const token = import.meta.env.VITE_TMDB_TOKEN;
if (!token) {
  throw new Error("Missing VITE_TMDB_TOKEN");
}

//TMDB
interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<TMDBResponse>(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.results;
}
