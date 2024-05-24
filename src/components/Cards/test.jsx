import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CardDaily from "./CardDaily";
import CardEpisode from "./CardEpisode";
import CardPoster from "./CardPoster";
import CardsByGenre from "./CardsByGenre";
import CardTrend from "./CardTrend";
import CardTrendVid from "./CardTrendVid";

it('Renderizar card diário', () => {
  render(
    <BrowserRouter>
      <CardDaily
        tipo="movie"
        id={1}
        overview="This is a movie overview"
        vote_average={8.5}
        original_language="en"
        release_date="2022-01-01"
        backdrop_path="/path/to/backdrop.jpg"
        title="Movie Title"
      />
    </BrowserRouter>
  );

  const cardTitle = screen.getByText("Movie Title");
  const cardOverview = screen.getByText("This is a movie overview");
  const cardVoteAverage = screen.getByText("8.5");
  const cardLanguage = screen.getByText("en");
  const cardReleaseDate = screen.getByText("2022-01-01");

  expect(cardTitle).toBeInTheDocument();
  expect(cardOverview).toBeInTheDocument();
  expect(cardVoteAverage).toBeInTheDocument();
  expect(cardLanguage).toBeInTheDocument();
  expect(cardReleaseDate).toBeInTheDocument();
});

it('Renderizar card de episódio', () => {
  const episode = {
    still_path: '/path/to/image.jpg',
    runtime: 45,
    name: 'Episode Title',
    overview: 'This is the episode overview',
    air_date: '2023-05-01',
    vote_average: 8.7
  };

  render(<CardEpisode episode={episode} />);

  const episodeTitle = screen.getByText('Episode Title');
  const episodeOverview = screen.getByText('This is the episode overview');
  const episodeAirDate = screen.getByText('2023-05-01');
  const episodeVoteAverage = screen.getByText('8.7');
  const episodeRuntime = screen.getByText('45 Mins');

  expect(episodeTitle).toBeInTheDocument();
  expect(episodeOverview).toBeInTheDocument();
  expect(episodeAirDate).toBeInTheDocument();
  expect(episodeVoteAverage).toBeInTheDocument();
  expect(episodeRuntime).toBeInTheDocument();
});

it('Renderizar card poster', () => {
  render(
    <BrowserRouter>
      <CardPoster
        img="/path/to/image.jpg"
        title="Season Title"
        data="2023-01-01"
        eps={10}
        tipo="season"
      />
      <CardPoster
        img="/path/to/image.jpg"
        title="Movie Title"
        estrelas={5}
        tipo="movie"
        id={123}
      />
    </BrowserRouter>
  );

  const seasonTitle = screen.getByText('Season Title');
  const movieTitle = screen.getByText('Movie Title');

  expect(seasonTitle).toBeInTheDocument();
  expect(movieTitle).toBeInTheDocument();
});

it('Renderizar o container por generos', () => {
  render(
    <BrowserRouter>
      <CardsByGenre title="Test" type="movie" />
    </BrowserRouter>
  );

  const container = screen.getByText("Test");
  expect(container).toBeInTheDocument();
});

it('Renderizar card trend', () => {
  render(
    <BrowserRouter>
      <CardTrend
        id={123}
        tipo="movie"
        isMiddlePage={false}
        isDetails={false}
      />
    </BrowserRouter>
  );

  const cardTrendElement = screen.getByTestId('card-trend');
  expect(cardTrendElement).toBeInTheDocument();

  render(
    <BrowserRouter>
      <CardTrend
        id={123}
        tipo="movie"
        isMiddlePage={false}
        isDetails={true}
      />
    </BrowserRouter>
  );

  const cardTrendElement2 = screen.getByTestId('card-trend-details');
  expect(cardTrendElement2).toBeInTheDocument();
});

it('Renderizar card trendVid', () => {
  render(
    <BrowserRouter>
      <CardTrendVid
        id={123}
        tipo="movie"
        isMiddlePage={false}
        isDetails={true}
      />
    </BrowserRouter>
  );

  const cardTrendElement = screen.getByTestId('card-trend-details');
  expect(cardTrendElement).toBeInTheDocument();
});