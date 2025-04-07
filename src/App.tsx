import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

//createBrowserRouter v6

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId', // 이해 안됨!
        element: <MovieDetailPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
