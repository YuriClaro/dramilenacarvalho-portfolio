import { services, servicesContent } from "@/data/services";

import { Reveal } from "./reveal";

export function Services() {
  return (
    <section id="servicos" className="services">
      <div className="container">
        <div className="section-header">
          <h2>{servicesContent.heading}</h2>
          <p>{servicesContent.subheading}</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <Reveal key={service.title}>
              <div className="service-card">
                <div className="service-icon">
                  <i className={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.items.length > 0 && (
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
