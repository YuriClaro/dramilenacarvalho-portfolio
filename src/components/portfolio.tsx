import { portfolioCases, portfolioContent } from "@/data/portfolio";

import { PortfolioCase } from "./portfolio-case";
import { Reveal } from "./reveal";

export function Portfolio() {
  return (
    <section id="portfolio">
      <div className="container">
        <Reveal className="section-header">
          <h2>{portfolioContent.heading}</h2>
          <p>{portfolioContent.subheading}</p>
        </Reveal>
        <div className="portfolio-grid">
          {portfolioCases.map((item, index) => (
            <Reveal key={item.title} delay={(index % 2) * 100}>
              <PortfolioCase item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
