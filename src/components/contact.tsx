import { site } from "@/data/site";

import { ContactForm } from "./contact-form";

export function Contact() {
  const { contact } = site;

  return (
    <section id="contato">
      <div className="container">
        <div className="section-header">
          <h2>Entre em Contato</h2>
          <p>Agende sua consulta e transforme seu sorriso hoje mesmo</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
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
                <i className="fas fa-phone" />
              </div>
              <div className="contact-details">
                <h4>Telefone</h4>
                <p>
                  {contact.phone}
                  <br />
                  WhatsApp: {contact.whatsapp}
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
                  {contact.emails.map((email, index) => (
                    <span key={email}>
                      {index > 0 && <br />}
                      <a href={`mailto:${email}`}>{email}</a>
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-clock" />
              </div>
              <div className="contact-details">
                <h4>Horário de Atendimento</h4>
                <p>
                  {contact.hours.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
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
