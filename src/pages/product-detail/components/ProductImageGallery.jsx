import React, { useState, useRef, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ images = [], productName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrevious = () => {
    setCurrentImageIndex(prev => prev === 0 ? images?.length - 1 : prev - 1);
    setIsZoomed(false);
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => prev === images?.length - 1 ? 0 : prev + 1);
    setIsZoomed(false);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef?.current) return;
    
    const rect = imageRef?.current?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e?.touches?.[0]?.clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e?.changedTouches?.[0]?.clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX?.current - touchEndX?.current;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'ArrowLeft') handlePrevious();
      if (e?.key === 'ArrowRight') handleNext();
      if (e?.key === 'Escape') setIsZoomed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!images?.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-muted rounded-lg overflow-hidden w-full max-w-md mx-auto h-90 md:h-100">

        <div 
          ref={imageRef}
          className={`relative w-full h-full cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} transition-transform duration-300`}
          onClick={() => setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
  src={images?.[currentImageIndex]}
  alt={`${productName} - Image ${currentImageIndex + 1}`}
  className={`w-full h-full object-contain transition-transform duration-300 ${
    isZoomed ? 'scale-150' : 'scale-100'
  }`}
  style={isZoomed ? { transformOrigin: `${zoomPosition?.x}% ${zoomPosition?.y}%` } : {}}
/>

          
          {/* Navigation Arrows - Desktop */}
          {images?.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handlePrevious();
                }}
                className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface/80 hover:bg-surface rounded-full items-center justify-center shadow-elevation-2 transition-all duration-200"
                aria-label="Previous image"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handleNext();
                }}
                className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface/80 hover:bg-surface rounded-full items-center justify-center shadow-elevation-2 transition-all duration-200"
                aria-label="Next image"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}
          
          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-surface/80 px-3 py-1 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {images?.length}
            </div>
          )}
          
          {/* Zoom Indicator - Desktop */}
          <div className="hidden md:block absolute top-4 right-4 bg-surface/80 px-3 py-1 rounded-full text-xs text-muted-foreground">
            Click to {isZoomed ? 'zoom out' : 'zoom in'}
          </div>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary shadow-elevation-2'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Mobile Swipe Indicator */}
      {images?.length > 1 && (
        <div className="md:hidden flex justify-center space-x-2">
          {images?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;