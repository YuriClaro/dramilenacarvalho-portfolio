import Image from "next/image";

import { portfolioCases, portfolioContent } from "@/data/portfolio";

import { Reveal } from "./reveal";

export function Portfolio() {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="section-header">
          <h2>{portfolioContent.heading}</h2>
          <p>{portfolioContent.subheading}</p>
        </div>
        <div className="portfolio-grid">
          {portfolioCases.map((item) => (
            <Reveal key={item.title}>
              <div className="portfolio-item">
                {item.before && item.after ? (
                  <div className="portfolio-compare">
                    <figure>
                      <Image
                        src={item.before}
                        alt={`${item.title} - antes`}
                        sizes="(max-width: 768px) 50vw, 20vw"
                        placeholder="blur"
                      />
                      <figcaption>Antes</figcaption>
                    </figure>
                    <figure>
                      <Image
                        src={item.after}
                        alt={`${item.title} - depois`}
                        sizes="(max-width: 768px) 50vw, 20vw"
                        placeholder="blur"
                      />
                      <figcaption>Depois</figcaption>
                    </figure>
                  </div>
                ) : (
                  <div className="portfolio-image-placeholder">
                    <i className="fas fa-camera" />
                    <span>
                      Espaço para foto
                      <br />
                      Antes/Depois
                    </span>
                  </div>
                )}
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="portfolio-tag">{item.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
