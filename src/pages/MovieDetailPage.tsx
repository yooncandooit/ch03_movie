import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_language: string;
  adult: boolean;
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]); // moveId를 의존성 배열에

  if (isLoading) return <div className="p-8">
    <LoadingSpinner />
  </div>;
  if (error || !movie) return <div className="text-red-500 p-8">에러!</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 포스터 사진`}
        className="mb-4 rounded-lg"
      />
      <p className="mb-2">개봉일: {movie.release_date}</p>
      <p className="mb-2">평점: {movie.vote_average}</p>
      <p className="mb-2">언어: {movie.original_language}</p>

      <p className="mt-4">{movie.overview}</p>
    </div>
  );
}
