import { useEffect, useRef, type RefObject } from 'react';
import type { CarRaceState } from '../store/race/raceSlice';

type CarAnimationRefs = {
  carRef: RefObject<HTMLDivElement | null>;
  roadRef: RefObject<HTMLDivElement | null>;
};

export default function useCarAnimation({ status, duration }: CarRaceState): CarAnimationRefs {
  const carRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const car = carRef.current;
    const road = roadRef.current;
    if (status === 'running' && car && road) {
      const distance = road.clientWidth - car.offsetWidth;
      animationRef.current?.cancel();
      animationRef.current = car.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(${distance}px)` }],
        { duration, easing: 'linear', fill: 'forwards' },
      );
      return;
    }
    if (status === 'broken' || status === 'stopping') {
      animationRef.current?.pause();
      return;
    }
    if (status === 'idle') {
      animationRef.current?.cancel();
      animationRef.current = null;
    }
  }, [status, duration]);

  return { carRef, roadRef };
}
