import { site } from "@/data/site";

import { ContactForm } from "./contact-form";

export function Contact() {
  const { contact } = site;

  return (
    <section id="contato">
      <div className="container">
        <div className="section-header">
          <h2>Entre em Contato</h2>
          <p>Agende sua consulta e cuide do seu sorriso</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <a
              href={contact.whatsappUrl}
              className="btn btn-primary btn-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp" />
              Falar no WhatsApp
            </a>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div className="contact-details">
                <h4>Endereço</h4>
                <p>
                  {contact.addressLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-whatsapp" />
              </div>
              <div className="contact-details">
                <h4>WhatsApp</h4>
                <p>
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.whatsapp}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope" />
              </div>
              <div className="contact-details">
                <h4>E-mail</h4>
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-instagram" />
              </div>
              <div className="contact-details">
                <h4>Instagram</h4>
                <p>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.instagram}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
