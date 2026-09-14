import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'none';
    switch (direction) {
      case 'up':
        return 'translateY(20px)';
      case 'down':
        return 'translateY(-20px)';
      case 'left':
        return 'translateX(20px)';
      case 'right':
        return 'translateX(-20px)';
      case 'none':
      default:
        return 'none';
    }
  };

  // Cap delay on mobile for instant snappiness
  const effectiveDelay = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.min(delay, 100) : delay;

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-box ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: isVisible ? 'blur(0px)' : 'blur(3px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}ms, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}ms`,
      }}
    >
      {children}
    </div>
  );
};
