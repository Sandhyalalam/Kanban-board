import { useEffect, useRef } from 'react';

export const useFocusTrap = <T extends HTMLElement>() => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const all = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
      );
      if (all.length === 0) return;

      const first = all[0];
      const last = all[all.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return containerRef;
};