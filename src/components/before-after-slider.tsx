"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type Ref,
} from "react";

type BeforeAfterSliderProps = {
  before: StaticImageData;
  after: StaticImageData;
  title: string;
  initial?: number;
  /** Versao ampliada (pop-up): mostra a foto inteira. */
  large?: boolean;
  /** Quando informado, exibe o botao de expandir. */
  onExpand?: () => void;
  expandButtonRef?: Ref<HTMLButtonElement>;
};

const STEP = 5;
const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Comparador antes/depois: arraste com mouse ou dedo, ou use as setas.
 * A imagem "Antes" fica por cima, recortada ate a posicao do divisor.
 */
export function BeforeAfterSlider({
  before,
  after,
  title,
  initial = 50,
  large = false,
  onExpand,
  expandButtonRef,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(clamp(initial));
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);

  const updateFromPointer = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(Math.round(((clientX - rect.left) / rect.width) * 100)));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    inputRef.current?.focus({ preventScroll: true });
    updateFromPointer(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateFromPointer(event.clientX);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const keys: Record<string, (value: number) => number> = {
      ArrowRight: (value) => value + STEP,
      ArrowUp: (value) => value + STEP,
      ArrowLeft: (value) => value - STEP,
      ArrowDown: (value) => value - STEP,
      PageUp: (value) => value + STEP * 4,
      PageDown: (value) => value - STEP * 4,
      Home: () => 0,
      End: () => 100,
    };
    const next = keys[event.key];
    if (!next) return;
    event.preventDefault();
    setPosition((value) => clamp(next(value)));
  };

  const sizes = large ? "100vw" : "(max-width: 768px) 100vw, 40vw";

  return (
    <div
      ref={containerRef}
      className={`ba-slider ${large ? "is-large" : ""}`.trim()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <Image
        src={after}
        alt={`${title} - depois`}
        className="ba-img"
        sizes={sizes}
        placeholder="blur"
        draggable={false}
      />
      <div
        className="ba-before"
        data-testid="ba-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${title} - antes`}
          className="ba-img"
          sizes={sizes}
          placeholder="blur"
          draggable={false}
        />
      </div>

      <span className="ba-label ba-label-before" aria-hidden="true">
        Antes
      </span>
      <span className="ba-label ba-label-after" aria-hidden="true">
        Depois
      </span>

      <div
        className="ba-handle-track"
        aria-hidden="true"
        style={{ transform: `translateX(${position}%)` } as CSSProperties}
      >
        <span className="ba-line" />
        <span className="ba-handle">
          <i className="fas fa-chevron-left" />
          <i className="fas fa-chevron-right" />
        </span>
      </div>

      <input
        ref={inputRef}
        type="range"
        className="ba-range"
        min={0}
        max={100}
        step={1}
        value={position}
        aria-label={`Comparar antes e depois: ${title}`}
        aria-valuenow={position}
        aria-valuetext={`${position}% antes, ${100 - position}% depois`}
        onChange={(event) => setPosition(clamp(Number(event.target.value)))}
        onKeyDown={handleKeyDown}
      />

      {onExpand && (
        <button
          ref={expandButtonRef}
          type="button"
          className="ba-expand"
          aria-label={`Ampliar ${title}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onExpand}
        >
          <i className="fas fa-expand" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
