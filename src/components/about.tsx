import { aboutContent, credentials, experiences, site } from "@/data/site";

import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="sobre">
      <div className="container">
        <Reveal className="section-header">
          <h2>{aboutContent.heading}</h2>
          <p>{aboutContent.subheading}</p>
        </Reveal>
        <div className="about-text about-single">
          <h3>{site.fullName}</h3>
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="credentials">
            {credentials.map((credential, index) => (
              <Reveal key={credential.title} delay={index * 80}>
                <div className="credential-item">
                  <i className={credential.icon} />
                  <div>
                    <h4>{credential.title}</h4>
                    <p>{credential.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <h3 className="experience-heading">
            {aboutContent.experienceHeading}
          </h3>
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <Reveal
                key={`${experience.place}-${experience.period}`}
                className="reveal-slide"
                delay={index * 120}
              >
                <div className="experience-item">
                  <span className="experience-period">{experience.period}</span>
                  <h4>
                    {experience.role} · {experience.place}
                  </h4>
                  <p>{experience.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
