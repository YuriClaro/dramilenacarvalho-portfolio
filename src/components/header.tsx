"use client";

import { useState } from "react";

import { navItems, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="container">
        <a href="#inicio" className="logo">
          {site.name}
        </a>
        <ul className={`nav-links ${open ? "is-open" : ""}`.trim()}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={open ? "fas fa-times" : "fas fa-bars"} />
        </button>
      </nav>
    </header>
  );
}
