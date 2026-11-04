import { useEffect, useRef } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'

import { useLanding } from '#/useLanding'

let topLayer = 10

type PrintProps = {
  src: string
  alt: string
  /** Silent looping video shown instead of the image, which becomes its poster. */
  video?: string
  /** Position and width in the 1440px desktop layout. */
  x: number
  y: number
  w: number
  /** Image width divided by image height, as displayed. */
  ratio: number
  /** Tilt in degrees. */
  tilt: number
  focus?: string
  tape?: boolean
  draggable?: boolean
  eager?: boolean
  /** The cutout variant has no white frame and a cobalt background. */
  cutout?: boolean
  /** Order in the hero's entrance animation. */
  entrance?: number
  children?: ReactNode
}

/** Plays only while on screen. With reduced motion it stays on its poster. */
function LoopingVideo({
  src,
  poster,
  label,
}: {
  src: string
  poster: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // React doesn't render `muted` on the server, and browsers only autoplay muted video.
    video.muted = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
    />
  )
}

export function Print({
  src,
  alt,
  video,
  x,
  y,
  w,
  ratio,
  tilt,
  focus,
  tape,
  draggable = true,
  eager,
  cutout,
  entrance,
  children,
}: PrintProps) {
  // Hero prints have their own entrance on page load.
  const landing = useLanding<HTMLElement>(entrance === undefined)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const offset = useRef({ x: 0, y: 0 })

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    // Touch keeps scrolling the page instead of moving the photo.
    if (!draggable || event.pointerType === 'touch' || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.style.zIndex = String(++topLayer)
    event.currentTarget.dataset.dragging = 'true'
    drag.current = {
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    }
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!drag.current) return
    offset.current = {
      x: event.clientX - drag.current.x,
      y: event.clientY - drag.current.y,
    }
    event.currentTarget.style.translate = `${offset.current.x}px ${offset.current.y}px`
  }

  function onPointerEnd(event: PointerEvent<HTMLElement>) {
    drag.current = null
    delete event.currentTarget.dataset.dragging
  }

  const classes = ['print']
  if (cutout) classes.push('print--cutout')
  if (draggable) classes.push('print--draggable')
  if (entrance !== undefined) classes.push('print--entrance')

  return (
    <figure
      ref={landing}
      className={classes.join(' ')}
      style={
        {
          '--x': x,
          '--y': y,
          '--w': w,
          '--ratio': ratio,
          '--tilt': `${tilt}deg`,
          '--entrance': entrance ?? 0,
          '--focus': focus ?? '50% 50%',
        } as CSSProperties
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      {tape ? <span className="tape" aria-hidden="true" /> : null}
      {video ? (
        <LoopingVideo src={video} poster={src} label={alt} />
      ) : (
        <img
          src={src}
          alt={alt}
          draggable={false}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
      {children}
    </figure>
  )
}
