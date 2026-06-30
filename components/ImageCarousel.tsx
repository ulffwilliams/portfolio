"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const single = images.length <= 1;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative border-4 bg-white">
        <img
          src={images[index]}
          alt={`${alt} screenshot ${index + 1}`}
          className="w-full object-contain max-h-[55vh]"
        />

        {!single && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 border-4 bg-white text-black p-1 hover:bg-black hover:text-white transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 border-4 bg-white text-black p-1 hover:bg-black hover:text-white transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 border-2 bg-white text-black text-xs font-bold px-2 py-0.5">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {!single && (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`border-2 overflow-hidden w-16 h-12 ${
                i === index ? "border-black" : "border-gray-300 opacity-60"
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
