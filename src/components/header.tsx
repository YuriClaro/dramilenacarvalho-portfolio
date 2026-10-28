"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import logoLight from "@/images/logos/logo2_light.png";
import { navItems, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={headerRef} className={open ? "menu-open" : undefined}>
      <nav className="container">
        <a href="#inicio" className="logo">
          <Image src={logoLight} alt="" className="logo-img" priority />
          <span>{site.name}</span>
        </a>
        <ul
          id="menu-principal"
          className={`nav-links ${open ? "is-open" : ""}`.trim()}
        >
          {navItems.map((item, index) => (
            <li key={item.href} style={{ "--i": index } as CSSProperties}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`mobile-menu-btn ${open ? "is-active" : ""}`.trim()}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="burger" aria-hidden="true">
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </span>
        </button>
      </nav>
    </header>
  );
}
