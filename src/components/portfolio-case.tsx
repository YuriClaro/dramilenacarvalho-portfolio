"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { PortfolioCase as PortfolioCaseData } from "@/data/portfolio";

import { BeforeAfterSlider } from "./before-after-slider";

type PortfolioCaseProps = {
  item: PortfolioCaseData;
};

/** Card de um caso clinico com slider e ampliacao em pop-up. */
export function PortfolioCase({ item }: PortfolioCaseProps) {
  const [open, setOpen] = useState(false);
  const expandRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    expandRef.current?.focus();
  };

  return (
    <div className="portfolio-item">
      <BeforeAfterSlider
        before={item.before}
        after={item.after}
        title={item.title}
        onExpand={() => setOpen(true)}
        expandButtonRef={expandRef}
      />
      <div className="portfolio-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="portfolio-tag">{item.tag}</span>
      </div>
      {open && <PortfolioLightbox item={item} onClose={close} />}
    </div>
  );
}

type PortfolioLightboxProps = {
  item: PortfolioCaseData;
  onClose: () => void;
};

function PortfolioLightbox({ item, onClose }: PortfolioLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    closeRef.current?.focus();

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const titleId = `lightbox-${item.title.replace(/\s+/g, "-").toLowerCase()}`;

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-panel">
        <div className="lightbox-header">
          <h3 id={titleId}>{item.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="lightbox-close"
            aria-label="Fechar"
            onClick={onClose}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>
        <BeforeAfterSlider
          before={item.before}
          after={item.after}
          title={item.title}
          large
        />
        <p className="lightbox-hint">Arraste para comparar antes e depois</p>
      </div>
    </div>,
    document.body,
  );
}
