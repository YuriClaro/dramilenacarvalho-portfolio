import Image from "next/image";

import logoLight from "@/images/logos/logo_light.png";
import { site, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <Image
            src={logoLight}
            alt=""
            className="footer-logo-img"
            width={72}
            height={72}
          />
          <div className="footer-logo">{site.name}</div>
          <p className="footer-tagline">{site.footerText}</p>
          <div className="footer-social">
            {socialLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="social-link"
                  aria-label={link.label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <i className={link.icon} />
                </a>
              );
            })}
          </div>
          <div className="footer-divider" />
          <p className="footer-text">
            © {site.year} {site.name}. Todos os direitos reservados. |{" "}
            {site.cro}
          </p>
        </div>
      </div>
    </footer>
  );
}
