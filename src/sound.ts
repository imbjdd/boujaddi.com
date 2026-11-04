/**
 * Interface sounds, synthesised on the spot with the Web Audio API, so there
 * are no audio files to download. The approach follows sensory-ui
 * (https://sensory-ui.com): every cue answers an interaction, small actions get
 * small sounds. Nothing plays before the first click, tap or key press, with
 * reduced motion, or once the visitor has turned sounds off.
 */

export type Cue =
  'tap' | 'jump' | 'forward' | 'backward' | 'lift' | 'drop' | 'on' | 'off'

const STORAGE_KEY = 'sound'
const VOLUME = 0.2
/** Quicker repeats of the same cue are dropped, so double clicks stay quiet. */
const REPEAT_MS = 60

let context: AudioContext | undefined
let output: GainNode
let noise: AudioBuffer
let reducedMotion: MediaQueryList | undefined
let muted = false
const lastPlayed = new Map<Cue, number>()

export function isMuted() {
  return muted
}

/** Turning sounds off is the only thing ever written to local storage. */
export function setMuted(value: boolean) {
  if (value) play('off')
  muted = value
  try {
    if (value) localStorage.setItem(STORAGE_KEY, 'off')
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be blocked; the choice then lasts for this page only.
  }
  if (!value) {
    unlock()
    play('on')
  }
}

/** Browsers only let audio start from a user gesture, so the context waits for one. */
function unlock() {
  if (muted || reducedMotion?.matches !== false) return
  if (!context) {
    context = new AudioContext()
    output = context.createGain()
    output.gain.value = VOLUME
    output.connect(context.destination)
    noise = context.createBuffer(1, context.sampleRate / 4, context.sampleRate)
    const samples = noise.getChannelData(0)
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1
  }
  if (context.state === 'suspended') void context.resume()
}

/** A gain node with a quick attack and an exponential fade, already wired to the output. */
function envelope(start: number, length: number, level: number) {
  const gain = context!.createGain()
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.linearRampToValueAtTime(level, start + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + length)
  gain.connect(output)
  return gain
}

function release(source: AudioScheduledSourceNode, nodes: AudioNode[]) {
  source.onended = () => {
    for (const node of nodes) node.disconnect()
  }
}

/** A pitched blip gliding from one frequency to another. */
function tone(
  from: number,
  to: number,
  delay: number,
  length: number,
  level: number,
  type: OscillatorType = 'sine',
) {
  const start = context!.currentTime + delay
  const oscillator = context!.createOscillator()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(from, start)
  oscillator.frequency.exponentialRampToValueAtTime(to, start + length)
  const gain = envelope(start, length, level)
  oscillator.connect(gain)
  oscillator.start(start)
  oscillator.stop(start + length + 0.02)
  release(oscillator, [oscillator, gain])
}

/** Filtered noise: paper, a pen, a photo sliding on a table. */
function hiss(
  type: BiquadFilterType,
  from: number,
  to: number,
  delay: number,
  length: number,
  level: number,
) {
  const start = context!.currentTime + delay
  const source = context!.createBufferSource()
  source.buffer = noise
  const filter = context!.createBiquadFilter()
  filter.type = type
  filter.Q.value = 0.8
  filter.frequency.setValueAtTime(from, start)
  filter.frequency.exponentialRampToValueAtTime(to, start + length)
  const gain = envelope(start, length, level)
  source.connect(filter).connect(gain)
  source.start(start)
  source.stop(start + length + 0.02)
  release(source, [source, filter, gain])
}

const cues: Record<Cue, () => void> = {
  // A soft pen click for buttons and links that leave the site.
  tap: () => {
    tone(1100, 720, 0, 0.05, 0.5)
    hiss('bandpass', 3200, 2600, 0, 0.02, 0.2)
  },
  // Moving to another section of the same page.
  jump: () => tone(700, 1050, 0, 0.09, 0.3),
  // A page turning to a new page, or back.
  forward: () => {
    hiss('bandpass', 900, 2600, 0, 0.16, 0.35)
    tone(660, 990, 0.03, 0.1, 0.2)
  },
  backward: () => {
    hiss('bandpass', 2600, 900, 0, 0.16, 0.35)
    tone(990, 660, 0.03, 0.1, 0.2)
  },
  // Picking a photo up off the wall and putting it back down.
  lift: () => {
    hiss('highpass', 2400, 3600, 0, 0.07, 0.25)
    tone(300, 420, 0, 0.06, 0.2)
  },
  drop: () => {
    tone(180, 80, 0, 0.12, 0.6)
    hiss('lowpass', 900, 400, 0, 0.05, 0.25)
  },
  on: () => {
    tone(660, 660, 0, 0.06, 0.35)
    tone(990, 990, 0.07, 0.09, 0.35)
  },
  off: () => {
    tone(990, 990, 0, 0.06, 0.35)
    tone(660, 660, 0.07, 0.09, 0.35)
  },
}

export function play(cue: Cue) {
  if (!context || muted || reducedMotion?.matches) return
  const now = performance.now()
  if (now - (lastPlayed.get(cue) ?? -Infinity) < REPEAT_MS) return
  lastPlayed.set(cue, now)
  cues[cue]()
}

/** Which cue a clicked element gets. `data-sound` overrides it; `none` stays silent. */
function cueFor(element: Element): Cue | undefined {
  const override = element.getAttribute('data-sound')
  if (override) return override === 'none' ? undefined : (override as Cue)
  if (!(element instanceof HTMLAnchorElement)) return 'tap'
  const url = new URL(element.href)
  if (url.origin !== location.origin) return 'tap'
  const samePage =
    url.pathname === location.pathname && url.search === location.search
  if (samePage && url.hash) return 'jump'
  return 'forward'
}

const clickable = 'a[href], button, [data-sound]'

/**
 * Everything that reacts to the mouse ticks when the pointer reaches it. The
 * first matching row sets the pitch: the bigger the thing, the lower the tick.
 * Photos also rustle a little, like paper.
 */
const hoverKinds: [selector: string, pitch: number, paper?: true][] = [
  ['.print, .project-caption__name', 880, true],
  ['.button, button', 1320],
  ['.job, .entries li, .note', 1480],
  ['.nav a, .socials a', 1760],
  ['a[href]', 2090],
]
const hoverable = hoverKinds.map(([selector]) => selector).join(', ')
/** Hover ticks are at least this far apart, whatever the pointer crosses. */
const HOVER_GAP_MS = 120
/**
 * Pointer speed, in px/ms, above which the mouse is sweeping: crossings wait
 * for it to slow down on an element. Landing on a target is well below this.
 */
const SWEEP_SPEED = 1.5

function hover(element: Element) {
  if (!context || muted || reducedMotion?.matches) return
  const [, pitch, paper] = hoverKinds.find(([selector]) =>
    element.matches(selector),
  )!
  // A slight random detune keeps repeated ticks from sounding mechanical.
  const from = pitch * (0.98 + Math.random() * 0.04)
  tone(from, from * 0.92, 0, 0.04, 0.32, 'triangle')
  if (paper) hiss('highpass', 3000, 4200, 0, 0.05, 0.12)
}

/** Listens for interactions across the whole document. Returns the cleanup. */
export function installSound() {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  try {
    muted = localStorage.getItem(STORAGE_KEY) === 'off'
  } catch {
    muted = false
  }

  function onClick(event: MouseEvent) {
    unlock()
    const target =
      event.target instanceof Element ? event.target.closest(clickable) : null
    const cue = target ? cueFor(target) : undefined
    if (cue) play(cue)
  }

  // Hover follows the mouse itself: pointerover also fires when the page
  // scrolls under a still cursor, which would tick through every link.
  let hovered: Element[] = []
  // The element entered while the mouse was still sweeping, waiting to tick
  // once the pointer slows down on it.
  let pending: Element | undefined
  let lastTarget: EventTarget | null = null
  let last = { x: 0, y: 0, time: 0 }
  let speed = 0
  let lastHover = -Infinity
  function onPointerMove(event: PointerEvent) {
    // Touch and pen have no hover to speak of.
    if (event.pointerType !== 'mouse') return
    const elapsed = event.timeStamp - last.time
    const step =
      Math.hypot(event.clientX - last.x, event.clientY - last.y) /
      Math.max(elapsed, 1)
    speed = elapsed > 100 ? 0 : (speed + step) / 2
    last = { x: event.clientX, y: event.clientY, time: event.timeStamp }

    if (event.target !== lastTarget) {
      lastTarget = event.target
      // Hoverable elements nest (a link on a card); only the newly entered
      // one ticks, so coming back from the link to its card stays quiet.
      const chain: Element[] = []
      let element =
        event.target instanceof Element ? event.target.closest(hoverable) : null
      while (element) {
        chain.push(element)
        element = element.parentElement?.closest(hoverable) ?? null
      }
      pending =
        chain.find((candidate) => !hovered.includes(candidate)) ??
        (pending && chain.includes(pending) ? pending : undefined)
      hovered = chain
    }

    if (!pending) return
    // Dragging a photo across the page, or audio still locked: drop it.
    if (event.buttons || context?.state !== 'running') {
      pending = undefined
      return
    }
    // Sweeping across links stays quiet until the mouse settles on one.
    if (speed > SWEEP_SPEED) return
    if (event.timeStamp - lastHover < HOVER_GAP_MS) return
    lastHover = event.timeStamp
    hover(pending)
    pending = undefined
  }

  const options = { capture: true, passive: true }
  document.addEventListener('pointerdown', unlock, options)
  document.addEventListener('keydown', unlock, options)
  document.addEventListener('click', onClick, options)
  document.addEventListener('pointermove', onPointerMove, options)
  return () => {
    document.removeEventListener('pointerdown', unlock, options)
    document.removeEventListener('keydown', unlock, options)
    document.removeEventListener('click', onClick, options)
    document.removeEventListener('pointermove', onPointerMove, options)
  }
}
