import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Separador from "./Separador";
import Ticket from "./Ticket";
import Person from "./Person";

it("deve renderizar um separador", () => {
  render(
    <BrowserRouter>
      <Separador nome="Teste" />
    </BrowserRouter>
  );
  const separador = screen.getByRole("separator");
  expect(separador).toBeInTheDocument();
});

it("deve renderizar um ticket", () => {
  render(
    <BrowserRouter>
      <Ticket
        title={"Filme Teste"}
        rate={4}
        backDrop={"link-do-backdrop"}
        poster={"link-do-poster"}
        DiaMes={"01-01"}
        ano={"2024"}
        id={"12345"}
      />
    </BrowserRouter>
  );

  const ticketTitle = screen.getByText("Filme Teste");
  const ticketRate = screen.getByText(4);
  const ticketDiaMes = screen.getByText("01-01");
  const ticketAno = screen.getByText("2024");

  expect(ticketTitle).toBeInTheDocument();
  expect(ticketRate).toBeInTheDocument();
  expect(ticketDiaMes).toBeInTheDocument();
  expect(ticketAno).toBeInTheDocument();
});

it("deve renderizar uma pessoa", () => {
  render(
    <BrowserRouter>
      <Person
        name="Teste"
        image="link-do-perfil"
        id={12345}
      />
    </BrowserRouter>
  )

  const nome = screen.getByText("Teste");
  const imagem = screen.getByRole("img");

  expect(nome).toBeInTheDocument();
  expect(imagem).toBeInTheDocument();
})