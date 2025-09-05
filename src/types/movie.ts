interface Movie {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string;
  release_date: string; // e.g., "2024-03-01"
  vote_average: number; // 0..10
}

export default Movie;
