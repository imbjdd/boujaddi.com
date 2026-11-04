import { useEffect, useRef } from 'react'

/**
 * Holds an element back until it is properly on screen, then marks it as landed
 * so its CSS animation plays once. Without JavaScript, with reduced motion, or
 * if the element is already visible on load, it simply stays as it is.
 */
export function useLanding<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (element.getBoundingClientRect().top < window.innerHeight * 0.88) return

    element.dataset.pending = 'true'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        delete element.dataset.pending
        element.dataset.landed = 'true'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.2 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled])

  return ref
}
