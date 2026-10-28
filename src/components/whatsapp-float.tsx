import { site } from "@/data/site";

/** Botao flutuante fixo no canto inferior direito, abrindo o WhatsApp. */
export function WhatsAppFloat() {
  return (
    <a
      href={site.contact.whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp (abre em nova aba)"
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </a>
  );
}
