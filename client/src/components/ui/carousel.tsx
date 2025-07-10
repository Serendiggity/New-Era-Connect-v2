import { useState, useEffect, useRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface CarouselProps {
  children: ReactNode[];
  autoRotateInterval?: number; // in milliseconds
  className?: string;
  showControls?: boolean;
  itemsPerView?: number;
}

export function Carousel({ 
  children, 
  autoRotateInterval = 4000, 
  className = "", 
  showControls = true,
  itemsPerView = 1 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Handle mounting
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Auto-rotate functionality
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start auto-rotation if:
    // 1. Component is mounted
    // 2. Not hovered
    // 3. Auto-rotation is enabled (autoRotateInterval > 0)
    // 4. There are more items than what's visible
    if (isMounted && !isHovered && autoRotateInterval > 0 && totalItems > itemsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoRotateInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isMounted, isHovered, autoRotateInterval, totalItems, itemsPerView, maxIndex]);

  // Reset to first slide when props change
  useEffect(() => {
    setCurrentIndex(0);
  }, [totalItems, itemsPerView]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  if (totalItems === 0) return null;

  // If only one item or itemsPerView >= totalItems, show without carousel
  if (totalItems <= itemsPerView) {
    return (
      <div className={`grid gap-4 ${
        itemsPerView === 1 ? 'grid-cols-1' : 
        itemsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' :
        itemsPerView === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      } ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-xl relative" style={{ minHeight: '300px' }}>
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${totalItems * (100 / itemsPerView)}%`,
            minHeight: '300px'
          }}
        >
          {children.map((child, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 px-2 flex flex-col"
              style={{ 
                width: `${100 / itemsPerView}%`,
                minHeight: '300px'
              }}
            >
              <div className="flex-1">
                {child}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {showControls && totalItems > itemsPerView && (
          <>
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 z-10"
              onClick={goToNext}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {totalItems > itemsPerView && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-lime-500 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Specialized carousel for horizontal cards
export function HorizontalCardCarousel({ 
  children, 
  autoRotateInterval = 4000,
  className = "" 
}: {
  children: ReactNode[];
  autoRotateInterval?: number;
  className?: string;
}) {
  return (
    <Carousel
      key={`horizontal-${children.length}-${autoRotateInterval}`}
      itemsPerView={1}
      autoRotateInterval={autoRotateInterval}
      className={className}
      showControls={true}
    >
      {children}
    </Carousel>
  );
}

// Specialized carousel for grid cards
export function GridCardCarousel({ 
  children, 
  autoRotateInterval = 5000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  className = "" 
}: {
  children: ReactNode[];
  autoRotateInterval?: number;
  itemsPerView?: { mobile: number; tablet: number; desktop: number };
  className?: string;
}) {
  // Initialize with correct value based on current screen size
  const getInitialItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    
    if (window.innerWidth >= 1024) {
      return itemsPerView.desktop;
    } else if (window.innerWidth >= 768) {
      return itemsPerView.tablet;
    } else {
      return itemsPerView.mobile;
    }
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(getInitialItemsPerView);

  useEffect(() => {
    const updateItemsPerView = () => {
      const newItemsPerView = window.innerWidth >= 1024 
        ? itemsPerView.desktop
        : window.innerWidth >= 768 
        ? itemsPerView.tablet 
        : itemsPerView.mobile;
      
      // Only update if the value actually changed to prevent unnecessary re-renders
      setCurrentItemsPerView(prev => prev !== newItemsPerView ? newItemsPerView : prev);
    };

    // Use a small delay to prevent flickering on initial load
    const timeoutId = setTimeout(updateItemsPerView, 100);
    
    window.addEventListener('resize', updateItemsPerView);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateItemsPerView);
    };
  }, [itemsPerView.desktop, itemsPerView.tablet, itemsPerView.mobile]);

  return (
    <Carousel
      itemsPerView={currentItemsPerView}
      autoRotateInterval={autoRotateInterval}
      className={className}
      showControls={true}
    >
      {children}
    </Carousel>
  );
} 