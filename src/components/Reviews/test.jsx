import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CardReviews from "./CardReviews";
import Review from "./Review";

it('Renderiza cardView', () => {
  render(
    <BrowserRouter>
      <CardReviews id={123} type="movie" title="Test Movie" />
    </BrowserRouter>
  );

  const titleElement = screen.getByText('Avaliações');
  const inputElement = screen.getByPlaceholderText('Adicione uma avaliação');
  const spoilerCheckbox = screen.getByLabelText('Spoiler');
  const sendButton = screen.getByText('Enviar');

  expect(titleElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(spoilerCheckbox).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();
});

it('Renderizando uma review vazia', () => {
  render(
    <BrowserRouter>
      <CardReviews id={123} type="movie" title="Test Movie" />
    </BrowserRouter>
  );

  const noReviewsElement = screen.getByText('Nenhuma avaliação.');
  expect(noReviewsElement).toBeInTheDocument();
});