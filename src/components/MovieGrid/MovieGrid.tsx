import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { getImageUrl } from "../../utils/imageUrl";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => {
        // використання локального плейсхолдера
        const imageSrc =
          getImageUrl(m.poster_path) ??
          getImageUrl(m.backdrop_path) ??
          "/no-image.png"; // картинка з папки public

        return (
          <li key={m.id}>
            <div
              className={css.card}
              onClick={() => onSelect(m)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelect(m);
              }}
            >
              <img
                className={css.image}
                src={imageSrc}
                alt={m.title || "No title"}
                loading="lazy"
              />
              <h2 className={css.title}>{m.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieGrid;
