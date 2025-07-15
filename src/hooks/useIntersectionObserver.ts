"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = "100px",
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (!freezeOnceVisible || !isIntersecting) {
          setIntersecting(isElementIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [freezeOnceVisible, isIntersecting, threshold, rootMargin]);

  return { ref, isIntersecting };
}
