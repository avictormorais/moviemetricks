import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
import NavBar from "./Navbar";

it('Renderizar o footer', async () => {
  render(
    <BrowserRouter>
        <Footer />
    </BrowserRouter>
  );
  const footer = await screen.findByRole('contentinfo');
  expect(footer).toBeInTheDocument();
});

it('Renderizar Loading', async () => {
  render(
    <BrowserRouter>
      <Loading />
    </BrowserRouter>
  );

  const msg = screen.getByTestId('msg');
  expect(msg).toBeInTheDocument();
});

it('Renderizar Navbar', async () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  const logoElement = screen.getByAltText('Logo');
  const profile = screen.getByTestId('btn-profile');
  const search = screen.getByTestId('btn-search');

  expect(logoElement).toBeInTheDocument();
  expect(profile).toBeInTheDocument();
  expect(search).toBeInTheDocument();
});
