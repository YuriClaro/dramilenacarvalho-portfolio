import { testimonials, testimonialsContent } from "@/data/testimonials";

import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <section id="depoimentos" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>{testimonialsContent.heading}</h2>
          <p>{testimonialsContent.subheading}</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.name}>
              <div className="testimonial-card">
                <div
                  className="stars"
                  role="img"
                  aria-label={`${testimonial.rating} de 5 estrelas`}
                >
                  {Array.from({ length: testimonial.rating }, (_, index) => (
                    <i className="fas fa-star" key={index} />
                  ))}
                </div>
                <p className="testimonial-text">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.initials}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
