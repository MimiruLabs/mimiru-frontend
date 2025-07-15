import React, { useState } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative w-full">
      <div className="flex justify-center items-center">
        {children[current]}
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800 rounded-full"
        onClick={prev}
        aria-label="Previous"
      >
        &#8592;
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800 rounded-full"
        onClick={next}
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
  );
};

export { Carousel };
