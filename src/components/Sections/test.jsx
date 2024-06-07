import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ContentActions from "./ContentActions";
import ProfileInfos from "./ProfileInfos";
import SectionMoreInfo from "./SectionMoreInfo";
import WhereToWatch from "./WhereToWatch";

test('Renderiza contentActions', () => {
  render(
    <BrowserRouter>
      <ContentActions tipo="movie" id="123" />
    </BrowserRouter>
  );

  const trailerElement = screen.getByText(/Ver trailer/i);
  const markAsSeenElement = screen.getByText(/Marcar como visto/i);
  const eyeElement = screen.getByTestId('eye-icon');

  expect(trailerElement).toBeInTheDocument();
  expect(markAsSeenElement).toBeInTheDocument();
  expect(eyeElement).toBeInTheDocument();
});

test('Verifica se contentActions tem botão de marcar como visto', () => {
  render(
    <BrowserRouter>
      <ContentActions tipo="movie" id="123" />
    </BrowserRouter>
  );

  const markAsSeenElement = screen.getByText(/Marcar como visto/i);

  expect(markAsSeenElement).toHaveTextContent('Marcar como visto');
});

test('Renderiza ProfileInfos', () => {
  render(
    <BrowserRouter>
      <ProfileInfos
        username="JohnDoe"
        tvShows={10}
        movies={5}
        showEdit={true}
        showLogout={true}
      />
    </BrowserRouter>
  );

  const usernameElement = screen.getByText(/JohnDoe/i);
  const tvShowsElement = screen.getByText(/10/i);
  const moviesElement = screen.getByText(/5/i);
  const editButtonElement = screen.getByText(/Editar/i);
  const logoutButtonElement = screen.getByText(/Sair/i);

  expect(usernameElement).toBeInTheDocument();
  expect(tvShowsElement).toBeInTheDocument();
  expect(moviesElement).toBeInTheDocument();
  expect(editButtonElement).toBeInTheDocument();
  expect(logoutButtonElement).toBeInTheDocument();
});
