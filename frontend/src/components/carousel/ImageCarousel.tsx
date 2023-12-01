// src/ImageCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import './ImageCarousel.css';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      const handleScroll = () => {
        const preloadHeight = 300; // Adjust this value as needed

        const scrollPosition = container.scrollTop + preloadHeight;

        for (let i = 0; i < images.length; i++) {
          const imageElement = imageRefs.current[i];

          if (imageElement) {
            const imageTop = imageElement.offsetTop;
            const imageBottom = imageTop + imageElement.clientHeight;

            if (scrollPosition >= imageTop && scrollPosition < imageBottom) {
              setCurrentImageIndex(i);
              break;
            }
          }
        }
      };

      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [images.length]);

  return (
    <div className="image-carousel" ref={containerRef}>
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
            src={image}
            alt={`Image ${index + 1}`}
            ref={(ref) => (imageRefs.current[index] = ref)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
