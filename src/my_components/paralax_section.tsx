import React, { useEffect, useMemo, useRef } from "react";

const ParallaxSection = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        const parallaxElement = parallaxRef.current;
        const layers = parallaxElement.querySelectorAll(".parallax-layer");
        layers.forEach((layer, index) => {
          let speed;
          switch (index) {
            case 0:
              speed = 0.05;
              break;
            case 1:
              speed = 0.5;
              break;
            case 2:
              speed = 0.1;
              break;
            default:
              speed = 0.2;
          }
          const yOffset = -(scrollPosition * speed);
          layer.style.transform = `translateY(${yOffset}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderImages = (images, styles) => {
    return images.map((image, index) => {
      const style = {
        ...styles[index],
        position: "absolute",
        transform: "translate(-50%, -50%)",
      };
      return (
        <img
          key={index}
          src={image}
          alt={`Parallax Layer ${index}`}
          style={style}
          className="parallax-layer"
        />
      );
    });
  };

  const firstLayerStyles = [
    {
      left: "15%",
      top: "25%",
      rotate: "-10deg",
      height: "100px",
      filter: "blur(3px)",
    }, //estrella 4 lados azul
    {
      left: "7%",
      top: "50%",
      rotate: "-10deg",
      height: "100px",
      filter: "blur(3px)",
    }, //estrella violeta
    {
      left: "73%",
      top: "30%",
      rotate: "-10deg",
      height: "100px",
      filter: "blur(3px)",
    }, //estrella naranja
    {
      left: "43%",
      top: "70%",
      rotate: "-15deg",
      height: "100px",
      filter: "blur(3px)",
    }, //estrella 5 lados azul
  ];

  const secondLayerStyles = [
    {
      left: "-5%",
      top: "0%",
      rotate: "-10deg",
      height: "540px",
      filter: "blur(1px)",
    }, //óvalo de la esquina superior izquierda
    {
      left: "5%",
      top: "80%",
      rotate: "30deg",
      height: "350px",
      filter: "blur(1px)",
    },
    {
      left: "-5%",
      top: "0%",
      rotate: "-10deg",
      height: "540px",
      filter: "blur(1px)",
    },
  ];

  const thirdLayerStyles = [
    { left: "78%", top: "30%", rotate: "-10deg", height: "600px" },
  ];

  const firstLayerImages = [
    "assets/stars/Asset 34.png",
    "assets/stars/Asset 38.png",
    "assets/stars/Asset 31.png",
    "assets/stars/Asset 28.png",
  ];

  const secondLayerImages = ["assets/circles/Asset 15.png", "assets/stars/Asset 25.png"];

  const thirdLayerImages = ["assets/zig/Asset 10.png"];

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
      className="relative h-screen overflow-hidden bg-black"
    >
      <div className="parallax-layer absolute inset-0">{memoizedLayers[0]}</div>
      <div className="parallax-layer absolute inset-0 flex items-center justify-center">
        {memoizedLayers[1]}
        <div className="z-10 p-4">
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
