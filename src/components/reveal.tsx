"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso da animacao em ms, para aparicoes escalonadas. */
  delay?: number;
};

/**
 * Anima o elemento quando ele entra na viewport.
 * O estilo vive em globals.css (.reveal / .reveal.is-visible).
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      // Sem suporte: mostra direto, sem disparar re-render
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
