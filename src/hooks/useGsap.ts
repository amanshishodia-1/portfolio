import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom React hook to safely register and revert GSAP ScrollTrigger contexts.
 * Helps prevent memory leaks and animation glitches under React StrictMode and HMR.
 *
 * @param animationFn Callback containing GSAP animations/timelines.
 * @param scopeRef React Ref defining the container scope for selector queries.
 * @param deps Dependency list to re-trigger compilation when updated.
 */
export function useGsapContext(
  animationFn: (ctx: gsap.Context) => void,
  scopeRef?: RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically register the ScrollTrigger plugin on client-side
    gsap.registerPlugin(ScrollTrigger);

    // Setup scoped context
    const ctx = gsap.context(animationFn, scopeRef || undefined);

    // Revert context on cleanup
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
