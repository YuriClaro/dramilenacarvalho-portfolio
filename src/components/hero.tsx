import Image from "next/image";
import type { CSSProperties } from "react";

import doctorPhoto from "@/images/dramilena/dramilenalegenda.png";
import { heroContent, site } from "@/data/site";

const delay = (step: number) => ({ "--d": step }) as CSSProperties;

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-blobs" aria-hidden="true">
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-blob hero-blob-3" />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="subtitle hero-stagger" style={delay(0)}>
              {site.tagline}
            </p>
            <h1 className="hero-stagger" style={delay(1)}>
              {heroContent.title}
            </h1>
            <p className="hero-stagger" style={delay(2)}>
              {heroContent.description}
            </p>
            <div className="hero-buttons hero-stagger" style={delay(3)}>
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
          <div className="hero-image hero-stagger" style={delay(2)}>
            <div className="hero-photo-frame">
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
      </div>
    </section>
  );
}
