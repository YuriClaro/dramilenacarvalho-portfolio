import { render, screen } from "@testing-library/react";

import { site } from "@/data/site";

import { WhatsAppFloat } from "./whatsapp-float";

describe("WhatsAppFloat", () => {
  it("aponta para o WhatsApp e abre em nova aba", () => {
    render(<WhatsAppFloat />);

    const link = screen.getByRole("link", { name: /falar no whatsapp/i });
    expect(link).toHaveAttribute("href", site.contact.whatsappUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("whatsapp-float");
  });

  it("tem rótulo acessível informando a nova aba", () => {
    render(<WhatsAppFloat />);

    expect(
      screen.getByRole("link", { name: /abre em nova aba/i }),
    ).toBeInTheDocument();
  });
});
