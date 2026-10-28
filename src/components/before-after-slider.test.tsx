import { fireEvent, render, screen } from "@testing-library/react";

import before from "@/images/canal/14inicial.png";
import after from "@/images/canal/14final.png";

import { BeforeAfterSlider } from "./before-after-slider";

function renderSlider() {
  render(<BeforeAfterSlider before={before} after={after} title="Caso 1" />);
  return screen.getByRole("slider", { name: /comparar antes e depois/i });
}

describe("BeforeAfterSlider", () => {
  it("renderiza as duas imagens e os rótulos Antes/Depois", () => {
    renderSlider();

    expect(screen.getByAltText("Caso 1 - antes")).toBeInTheDocument();
    expect(screen.getByAltText("Caso 1 - depois")).toBeInTheDocument();
    expect(screen.getByText("Antes")).toBeInTheDocument();
    expect(screen.getByText("Depois")).toBeInTheDocument();
  });

  it("começa no meio e é acessível", () => {
    const slider = renderSlider();

    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveAttribute("aria-valuetext", "50% antes, 50% depois");
  });

  it("atualiza a posição e o recorte ao mudar o valor", () => {
    const slider = renderSlider();

    fireEvent.change(slider, { target: { value: "80" } });

    expect(slider).toHaveAttribute("aria-valuenow", "80");
    expect(screen.getByTestId("ba-before")).toHaveStyle({
      clipPath: "inset(0 20% 0 0)",
    });
  });

  it("responde às setas, Home e End do teclado", () => {
    const slider = renderSlider();

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");

    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "45");

    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");

    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
  });
});
