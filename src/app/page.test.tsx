import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { site } from "@/data/site";

import Home from "./page";

describe("Home", () => {
  it("renderiza todas as seções da página", () => {
    const { container } = render(<Home />);

    for (const id of [
      "inicio",
      "sobre",
      "servicos",
      "portfolio",
      "depoimentos",
      "contato",
    ]) {
      expect(container.querySelector(`section#${id}`)).toBeInTheDocument();
    }
  });

  it("mostra o título principal e o rodapé com o CRO", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /sorrisos saudáveis/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(site.cro))).toBeInTheDocument();
  });

  it("renderiza os e-mails de contato como links mailto", () => {
    render(<Home />);

    for (const email of site.contact.emails) {
      expect(screen.getByRole("link", { name: email })).toHaveAttribute(
        "href",
        `mailto:${email}`,
      );
    }
  });

  it("abre e fecha o menu mobile", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    const toggle = screen.getByRole("button", { name: /abrir menu/i });
    const menu = container.querySelector(".nav-links");

    expect(menu).not.toHaveClass("is-open");

    await user.click(toggle);
    expect(menu).toHaveClass("is-open");
    expect(
      screen.getByRole("button", { name: /fechar menu/i }),
    ).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /fechar menu/i }));
    expect(menu).not.toHaveClass("is-open");
  });
});
