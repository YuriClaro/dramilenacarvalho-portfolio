import Image from "next/image";

import doctorPhoto from "@/images/dramilena.png";
import { heroContent, site } from "@/data/site";

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fade-in-up">
            <p className="subtitle">{site.tagline}</p>
            <h1>{heroContent.title}</h1>
            <p>{heroContent.description}</p>
            <div className="hero-buttons">
              <a
                href={site.contact.whatsappUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp" />
                Agendar Consulta
              </a>
              <a href="#portfolio" className="btn btn-secondary">
                <i className="fas fa-images" />
                Ver Casos
              </a>
            </div>
          </div>
          <div className="hero-image animate-fade-in-up">
            <Image
              src={doctorPhoto}
              alt={`Foto de ${site.name}`}
              className="hero-photo"
              priority
              sizes="(max-width: 968px) 100vw, 40vw"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
