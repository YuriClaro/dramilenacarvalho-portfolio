import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { portfolioCases } from "@/data/portfolio";

import { PortfolioCase } from "./portfolio-case";

const item = portfolioCases[0];

describe("PortfolioCase", () => {
  it("abre o pop-up com o slider ampliado ao clicar em expandir", async () => {
    const user = userEvent.setup();
    render(<PortfolioCase item={item} />);

    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(
      screen.getByRole("button", { name: `Ampliar ${item.title}` }),
    );

    const dialog = screen.getByRole("dialog", { name: item.title });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getAllByRole("slider")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Fechar" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("fecha com Esc e devolve o foco ao botão de expandir", async () => {
    const user = userEvent.setup();
    render(<PortfolioCase item={item} />);

    const expand = screen.getByRole("button", {
      name: `Ampliar ${item.title}`,
    });
    await user.click(expand);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(expand).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("fecha pelo botão X", async () => {
    const user = userEvent.setup();
    render(<PortfolioCase item={item} />);

    await user.click(
      screen.getByRole("button", { name: `Ampliar ${item.title}` }),
    );
    await user.click(screen.getByRole("button", { name: "Fechar" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("portfolioCases", () => {
  it("tem os 4 casos clínicos", () => {
    expect(portfolioCases).toHaveLength(4);
  });
});
