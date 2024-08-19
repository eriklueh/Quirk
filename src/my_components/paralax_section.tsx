import React, { useEffect, useMemo, useRef, useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface Styles {
  [key: string]: string | number;
}

const ParallaxSection: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateLayersPosition = () => {
      if (parallaxRef.current) {
        const parallaxElement = parallaxRef.current;
        const layers = parallaxElement.querySelectorAll<HTMLElement>(".parallax-layer");
        const { width, height } = parallaxElement.getBoundingClientRect();

        layers.forEach((layer, index) => {
          let scrollSpeed: number, mouseSpeed: number;
          switch (index) {
            case 0:
              scrollSpeed = 0.05;
              mouseSpeed = 0.02;
              break;
            case 1:
              scrollSpeed = 0.03;
              mouseSpeed = 0.04;
              break;
            case 2:
              scrollSpeed = 0.6;
              mouseSpeed = 0.06;
              break;
            default:
              scrollSpeed = 0.2;
              mouseSpeed = 0.03;
          }

          const yScrollOffset = -(scrollPosition * scrollSpeed);
          const xMouseOffset = (mousePosition.x - width / 2) * mouseSpeed;
          const yMouseOffset = (mousePosition.y - height / 2) * mouseSpeed;

          layer.style.transform = `translate3d(${xMouseOffset}px, ${yScrollOffset + yMouseOffset}px, 0)`;
        });
      }
      rafId = requestAnimationFrame(updateLayersPosition);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    updateLayersPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [mousePosition, scrollPosition]);

  const renderImages = (images: Image[], styles: Styles[]) => {
    return images.map((image, index) => {
      const style: React.CSSProperties = {
        ...styles[index],
        position: "absolute",
        willChange: "transform",
      };
      return (
          <img
              key={index}
              src={image.src}
              alt={image.alt}
              style={style}
              className="parallax-layer"
          />
      );
    });
  };

  const firstLayerImages: Image[] = [
    { src: "assets/stars/Asset 34.png", alt: "Blue 4-sided star" },
    { src: "assets/stars/Asset 38.png", alt: "Purple star" },
    { src: "assets/stars/Asset 31.png", alt: "Orange star" },
    { src: "assets/stars/Asset 28.png", alt: "Blue 5-sided star" },
  ];

  const secondLayerImages: Image[] = [
    { src: "assets/circles/Asset 15.png", alt: "Top left oval" },
    { src: "assets/stars/Asset 25.png", alt: "Orange star" },
    { src: "assets/circles/Asset 13.png", alt: "Bottom oval" },
  ];

  const thirdLayerImages: Image[] = [
    { src: "assets/zig/Asset 10.png", alt: "Zig shape" },
    { src: "assets/zig/Asset 1.png", alt: "Orange zig" },
    { src: "assets/stars/Asset 28.png", alt: "Star" },
  ];

  const firstLayerStyles: Styles[] = [
    { left: "15%", top: "25%", rotate: "-10deg", height: "100px", filter: "blur(3px)" },
    { left: "7%", top: "80%", rotate: "-10deg", height: "100px", filter: "blur(3px)" },
    { left: "73%", top: "30%", rotate: "-10deg", height: "100px", filter: "blur(3px)" },
    { left: "43%", top: "70%", rotate: "-15deg", height: "100px", filter: "blur(3px)" },
  ];

  const secondLayerStyles: Styles[] = [
    { left: "-5%", top: "0%", rotate: "-10deg", height: "540px", filter: "blur(3px)" },
    { left: "5%", top: "80%", rotate: "30deg", height: "350px", filter: "blur(2px)" },
    { left: "30%", top: "55%", rotate: "120deg", height: "540px", filter: "blur(5px)" },
  ];

  const thirdLayerStyles: Styles[] = [
    { left: "78%", top: "40%", rotate: "-10deg", height: "600px", filter: "blur(5px)" },
    { left: "40%", top: "0%", rotate: "30deg", height: "500px", filter: "drop-shadow(15px 0px 5px magenta) blur(2px)" },
    { left: "80%", top: "25%", rotate: "20deg", height: "100px", filter: "drop-shadow(5px 0px 1px magenta) blur(1px)" },
  ];

  const memoizedLayers = useMemo(
      () => [
        renderImages(firstLayerImages, firstLayerStyles),
        renderImages(secondLayerImages, secondLayerStyles),
        renderImages(thirdLayerImages, thirdLayerStyles),
      ],
      [],
  );

  return (
      <div
          ref={parallaxRef}
          className="relative h-screen overflow-hidden"
      >
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
              style={{
                height: '100px',
                width: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
                WebkitBackdropFilter: 'blur(50px)',
              }}
          />
          <div
              style={{
                position: 'absolute',
                bottom: 0,
                height: '100px',
                width: '100%',
                background: 'linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
                WebkitBackdropFilter: 'blur(50px)',
              }}
          />
        </div>
        <div className="parallax-layer absolute inset-0">{memoizedLayers[0]}</div>
        <div className="parallax-layer absolute inset-0 flex items-center justify-center">
          {memoizedLayers[1]}
          <div className="z-20 p-4">
            <img
                src="/assets/large_logo.png"
                alt="logo"
                className="h-[200px] sm:h-[800px]"
            />
          </div>
        </div>
        <div className="parallax-layer absolute inset-0">{memoizedLayers[2]}</div>
      </div>
  );
};

export default ParallaxSection;