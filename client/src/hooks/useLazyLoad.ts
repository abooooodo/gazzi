import { useEffect, useRef, useState } from "react";

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyLoad<T extends HTMLElement>(
  options: UseLazyLoadOptions = {}
) {
  const { threshold = 0.1, rootMargin = "50px" } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { elementRef, isVisible };
}

export function useLazyImage(src: string, options?: UseLazyLoadOptions) {
  const { elementRef, isVisible } = useLazyLoad<HTMLImageElement>(options);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !imageSrc) {
      setImageSrc(src);
    }
  }, [isVisible, src, imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return {
    elementRef,
    imageSrc,
    isLoaded,
    handleLoad,
  };
}
