import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CardsByGenre from "./CardsByGenre";
import CardsSeasons from "./CardsSeasons";
import DailyGrid from "./DailyGrid";

it('Renderizar cardsByGenre', () => {
  render(
    <BrowserRouter>
      <CardsByGenre
        title="Test"
        type="movie"
        showGenres={true}
        list={[
          {
            id: 1,
            title: "Movie 1",
            vote_average: 8.2,
            poster_path: "/path/to/poster1.jpg",
            tmdb_id: 101,
            media_type: "movie"
          },
          {
            id: 2,
            title: "Movie 2",
            vote_average: 7.8,
            poster_path: "/path/to/poster2.jpg",
            tmdb_id: 102,
            media_type: "movie"
          }
        ]}
      />
    </BrowserRouter>
  );

  const titleElement = screen.getByText("Test");

  expect(titleElement).toBeInTheDocument();
});

it('Renderizar cardsSeasons', () => {
  const temporadas = [
    { season_number: 1, name: "Season 1", poster_path: "/path/to/poster1.jpg", air_date: "2023-01-01", episode_count: 10 },
    { season_number: 2, name: "Season 2", poster_path: "/path/to/poster2.jpg", air_date: "2023-01-15", episode_count: 12 },
    { season_number: 3, name: "Season 3", poster_path: "/path/to/poster3.jpg", air_date: "2023-02-01", episode_count: 8 },
  ];

  render(
    <BrowserRouter>
      <CardsSeasons temporadas={temporadas} id={123} />
    </BrowserRouter>
  );

  const seasonTitle1 = screen.getByText("Season 1");
  const seasonTitle2 = screen.getByText("Season 2");
  const seasonTitle3 = screen.getByText("Season 3");

  expect(seasonTitle1).toBeInTheDocument();
  expect(seasonTitle2).toBeInTheDocument();
  expect(seasonTitle3).toBeInTheDocument();
});

it('Renderizar dailyGrid', async () => {
  render(<DailyGrid tipo="tv" />);

  const container = await screen.findByTestId("daily-grid");

  expect(container).toBeInTheDocument();
});