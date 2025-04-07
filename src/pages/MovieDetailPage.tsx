import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";

export default function MovieDetailPage() {
  const { id } = useParams(); // URL에서 id 파라미터 가져오기
  const [movie, setMovie] = useState<Movie | null>(null); // 영화 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!movie) {
    return <div>영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
        className="mb-4"
      />
      <p className="text-lg">{movie.overview}</p>
    </div>
  );
}
