"use client";

import Image from "next/image";
import { useState } from "react";

import { equipamentos, equipamentosContent } from "@/data/equipamentos";

import { Reveal } from "./reveal";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./ui/carousel";

export function Equipamentos() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="equipamentos" className="equipamentos">
      <div className="container">
        <Reveal className="section-header">
          <h2>{equipamentosContent.heading}</h2>
          <p>{equipamentosContent.subheading}</p>
        </Reveal>
        <Reveal>
          <Carousel
            className="equip-carousel"
            aria-label={equipamentosContent.heading}
            opts={{ align: "center" }}
            setApi={(api) => {
              api.on("select", () => setOpenIndex(null));
            }}
          >
            <CarouselContent>
              {equipamentos.map((item, index) => {
                const open = openIndex === index;
                return (
                  <CarouselItem key={item.name}>
                    <div className="equip-slide">
                      <Card className="equip-frame">
                        <button
                          type="button"
                          className={`equip-card ${open ? "is-open" : ""}`.trim()}
                          aria-expanded={open}
                          onClick={() => setOpenIndex(open ? null : index)}
                        >
                          <span className="equip-photo">
                            <Image
                              src={item.image}
                              alt=""
                              className="equip-img"
                              sizes="(max-width: 768px) 80vw, 360px"
                            />
                          </span>
                          <span className="equip-info">
                            <span className="equip-name">{item.name}</span>
                            <span className="equip-desc">
                              {item.description}
                            </span>
                          </span>
                        </button>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </Reveal>
        <p className="equip-hint">{equipamentosContent.hint}</p>
      </div>
    </section>
  );
}
