import { aboutContent, credentials, site } from "@/data/site";

export function About() {
  return (
    <section id="sobre">
      <div className="container">
        <div className="section-header">
          <h2>{aboutContent.heading}</h2>
          <p>{aboutContent.subheading}</p>
        </div>
        <div className="about-content">
          <div className="about-image">
            <div className="about-image-placeholder">
              <i className="fas fa-user-md" />
              <span>
                Espaço para foto
                <br />
                Profissional
              </span>
            </div>
          </div>
          <div className="about-text">
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
          </div>
        </div>
      </div>
    </section>
  );
}
