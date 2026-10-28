import { aboutContent, credentials, experiences, site } from "@/data/site";

export function About() {
  return (
    <section id="sobre">
      <div className="container">
        <div className="section-header">
          <h2>{aboutContent.heading}</h2>
          <p>{aboutContent.subheading}</p>
        </div>
        <div className="about-text about-single">
          <h3>{site.fullName}</h3>
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="credentials">
            {credentials.map((credential) => (
              <div className="credential-item" key={credential.title}>
                <i className={credential.icon} />
                <div>
                  <h4>{credential.title}</h4>
                  <p>{credential.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="experience-heading">
            {aboutContent.experienceHeading}
          </h3>
          <div className="experience-list">
            {experiences.map((experience) => (
              <div
                className="experience-item"
                key={`${experience.place}-${experience.period}`}
              >
                <span className="experience-period">{experience.period}</span>
                <h4>
                  {experience.role} · {experience.place}
                </h4>
                <p>{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
