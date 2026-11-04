import { useEffect, useState } from 'react'

import { installSound, isMuted, setMuted } from '#/sound'

/**
 * Turns interface sounds on and off, and remembers the choice. It only appears
 * once JavaScript runs, and never with reduced motion, where sounds stay off.
 */
export function SoundToggle() {
  const [on, setOn] = useState<boolean | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const uninstall = installSound()
    setOn(!isMuted())
    return uninstall
  }, [])

  if (on === null) return null

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={on}
      data-sound="none"
      onClick={() => {
        setMuted(on)
        setOn(!on)
      }}
    >
      sound <span aria-hidden="true">{on ? 'on' : 'off'}</span>
    </button>
  )
}
