import { fireEvent, render, screen } from "@testing-library/react";

import { equipamentos, equipamentosContent } from "@/data/equipamentos";

import { Equipamentos } from "./equipamentos";

describe("Equipamentos", () => {
  it("renderiza título, texto da seção e a região do carrossel", () => {
    render(<Equipamentos />);

    expect(
      screen.getByRole("heading", { name: equipamentosContent.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(equipamentosContent.subheading),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: equipamentosContent.heading }),
    ).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("renderiza um slide com card por equipamento, com nome e descrição", () => {
    render(<Equipamentos />);

    expect(screen.getAllByRole("group")).toHaveLength(equipamentos.length);
    for (const item of equipamentos) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    }
  });

  it("alterna o card aberto ao clicar, com aria-expanded", () => {
    render(<Equipamentos />);

    const [first, second] = screen.getAllByRole("button", {
      expanded: false,
    });
    expect(first).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveClass("is-open");

    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });
});
