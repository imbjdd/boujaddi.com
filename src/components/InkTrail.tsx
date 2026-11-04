import { useEffect, useRef } from 'react'

type Point = { x: number; y: number; time: number; color: string }

const LIFETIME_MS = 800
const COBALT = '#1f3bff'
const YELLOW = '#efe08d'

/** The cursor leaves a pen stroke that fades on its own. Mouse only. */
export function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const points: Point[] = []
    let frame = 0

    function resize() {
      const ratio = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * ratio
      canvas!.height = window.innerHeight * ratio
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
      context!.lineCap = 'round'
    }

    function draw() {
      const now = performance.now()
      while (points.length && now - points[0].time > LIFETIME_MS) points.shift()
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = 1; i < points.length - 1; i++) {
        const previous = points[i - 1]
        const point = points[i]
        const next = points[i + 1]
        const life = 1 - (now - point.time) / LIFETIME_MS
        context!.beginPath()
        context!.moveTo((previous.x + point.x) / 2, (previous.y + point.y) / 2)
        context!.quadraticCurveTo(
          point.x,
          point.y,
          (point.x + next.x) / 2,
          (point.y + next.y) / 2,
        )
        context!.strokeStyle = point.color
        context!.globalAlpha = life
        context!.lineWidth = 0.8 + life * 2
        context!.stroke()
      }

      // The loop only runs while there is ink left to fade.
      frame = points.length ? requestAnimationFrame(draw) : 0
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return
      const overCobalt =
        event.target instanceof Element &&
        event.target.closest('.band--cobalt') !== null
      points.push({
        // A small wobble makes the line look hand-drawn.
        x: event.clientX + Math.sin(event.timeStamp / 45) * 1.6,
        y: event.clientY + Math.cos(event.timeStamp / 60) * 1.6,
        time: performance.now(),
        color: overCobalt ? YELLOW : COBALT,
      })
      if (!frame) frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="ink-trail" aria-hidden="true" />
}
