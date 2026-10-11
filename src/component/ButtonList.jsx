import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ButtonList = () => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const buttons = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "Mixes",
    "News",
    "Cricket",
    "Football",
    "React",
    "JavaScript",
    "Podcasts",
    "Recently uploaded",
    "Watched",
    "New to you",
  ];

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);

    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1,
    );
  };

  const scroll = (direction) => {
    const container = scrollRef.current;

    if (!container) return;

    const amount = direction === "left" ? -400 : 400;

    container.scrollBy({
      left: amount,
      behavior: "smooth",
    });

    setTimeout(updateScrollButtons, 300);
  };

  return (
    <div className="relative flex items-center w-full bg-white">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="
            absolute
            left-0
            z-10
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            bg-white
            shadow-md
            hover:bg-gray-100
          "
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Button Container */}
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className="
          flex
          gap-3
          overflow-x-auto
          scroll-smooth
          button-scroll
          px-2
          py-3
          w-full
        "
      >
        {buttons.map((button, index) => (
          <button
            key={button}
            type="button"
            className={`
              shrink-0
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              whitespace-nowrap
              transition
              ${
                index === 0
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            {button}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="
            absolute
            right-0
            z-10
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            bg-white
            shadow-md
            hover:bg-gray-100
          "
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ButtonList;
