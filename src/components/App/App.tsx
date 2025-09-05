import { useCallback, useState, type JSX } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";

export default function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    setError(null);
    setMovies([]); // очистка попередніх результатів
    setLoading(true);

    try {
      const data = await fetchMovies(query);

      if (!data.length) {
        toast("No movies found for your request.");
      }

      setMovies(data);
    } catch (e) {
      console.error("fetchMovies error:", e);
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {loading && <Loader />}
        {!loading && error && <ErrorMessage />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={setSelected} />
        )}
      </main>

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
