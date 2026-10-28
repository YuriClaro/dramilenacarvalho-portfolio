"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

type CarouselHook = UseEmblaCarouselType;
export type CarouselApi = CarouselHook[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];

type CarouselContextValue = {
  viewportRef: CarouselHook[0];
  api: CarouselApi;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "Os componentes do carrossel precisam estar dentro de <Carousel />",
    );
  }
  return context;
}

/** Le um valor do Embla e re-renderiza quando o carrossel muda de slide. */
function useEmblaValue(
  api: CarouselApi,
  read: (api: NonNullable<CarouselApi>) => number,
): number {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onChange).on("reInit", onChange);
      return () => {
        api.off("select", onChange).off("reInit", onChange);
      };
    },
    [api],
  );

  return useSyncExternalStore(
    subscribe,
    () => (api ? read(api) : 0),
    () => 0,
  );
}

/** Slide atual, quantidade de slides e a API do Embla. */
export function useCarouselState() {
  const { api } = useCarousel();
  const selected = useEmblaValue(api, (a) => a.selectedScrollSnap());
  const count = useEmblaValue(api, (a) => a.scrollSnapList().length);
  return { api, selected, count };
}

type CarouselProps = ComponentProps<"div"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  setApi?: (api: NonNullable<CarouselApi>) => void;
};

export function Carousel({
  opts,
  plugins,
  setApi,
  className,
  children,
  onKeyDownCapture,
  ...props
}: CarouselProps) {
  const [viewportRef, api] = useEmblaCarousel({ ...opts, axis: "x" }, plugins);

  useEffect(() => {
    if (api) setApi?.(api);
  }, [api, setApi]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDownCapture?.(event);
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  const value = useMemo(() => ({ viewportRef, api }), [viewportRef, api]);

  return (
    <CarouselContext.Provider value={value}>
      <div
        role="region"
        aria-roledescription="carousel"
        className={cn("carousel", className)}
        onKeyDownCapture={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  ...props
}: ComponentProps<"div">) {
  const { viewportRef } = useCarousel();

  return (
    <div ref={viewportRef} className="carousel-viewport">
      <div className={cn("carousel-content", className)} {...props} />
    </div>
  );
}

export function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("carousel-item", className)}
      {...props}
    />
  );
}

/** Bolinhas de paginacao: a ativa fica alongada e clicavel leva ao slide. */
export function CarouselDots({ className, ...props }: ComponentProps<"div">) {
  const { api, selected, count } = useCarouselState();

  if (count < 2) return null;

  return (
    <div className={cn("carousel-dots", className)} {...props}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          className={cn("carousel-dot", index === selected && "is-active")}
          aria-label={`Ir para o slide ${index + 1}`}
          aria-current={index === selected ? "true" : undefined}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  );
}
