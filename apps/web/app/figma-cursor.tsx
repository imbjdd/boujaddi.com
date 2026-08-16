"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Black, matching the rest of the site rather than Figma's own blue. */
const COLOR = "#000000";

/** The visitor is the one holding the cursor, so this is what Figma would show. */
const LABEL = "you";

/**
 * Anything that should read as clickable. Hiding the native cursor also hid the
 * `pointer` affordance, so this list is what puts it back.
 */
const INTERACTIVE = 'a, button, summary, label, select, [role="button"]';

export function FigmaCursor() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  // Mirrors the current state so the handler only touches the DOM when the
  // pointer actually crosses in or out of something clickable.
  const hotRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  // Sanity Studio is a real editing tool; hiding its native cursors there would
  // fight the app rather than decorate it.
  const active = enabled && !pathname?.startsWith("/studio");

  useEffect(() => {
    // Coarse pointers have nothing to decorate, so this stays off phones and
    // tablets entirely.
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!active) return;

    // Hidden from here rather than from the stylesheet: if this component never
    // mounts — JS disabled, hydration error — the visitor keeps a real cursor
    // instead of a blank screen.
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      // Written straight to the node, deliberately not through React state or a
      // spring: the arrow and its label land on the exact pixel the pointer is
      // on, in the same frame, with no easing to lag behind it.
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      el.style.opacity = "1";

      // event.target is the element under the pointer because the cursor layer
      // is pointer-events:none — so this needs no elementFromPoint hit-test.
      const target = event.target as Element | null;
      const hot = Boolean(target?.closest?.(INTERACTIVE));
      if (hot === hotRef.current) return;
      hotRef.current = hot;

      // Swapping two custom properties flips the arrow and its label together,
      // so the pill always mirrors the arrow instead of drifting out of sync.
      el.style.setProperty("--cur-fill", hot ? "#FFFFFF" : COLOR);
      el.style.setProperty("--cur-line", hot ? COLOR : "#FFFFFF");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    // opacity-0 until the first move, otherwise it would sit in the top-left
    // corner until the visitor happens to touch the mouse.
    <div
      ref={ref}
      aria-hidden="true"
      style={{ "--cur-fill": COLOR, "--cur-line": "#FFFFFF" } as React.CSSProperties}
      className="pointer-events-none fixed left-0 top-0 z-[1000] opacity-0 will-change-transform [filter:drop-shadow(0_1px_2px_rgb(0_0_0/0.28))]"
    >
      {/* Figma's own silhouette: the tail curves in rather than meeting at a
          hard point, which is what stops it reading as a generic OS arrow. The
          white outline is what keeps it visible over the dark video thumbnails. */}
      <svg width="19" height="22" viewBox="0 0 15 18" className="block">
        <path
          d="M0.93 2.18C0.79 1.2 1.88 0.52 2.71 1.07L13.73 8.37C14.6 8.94 14.4 10.26 13.41 10.56L8.36 12.06L6.45 17.03C6.09 17.93 4.76 17.8 4.58 16.85L0.93 2.18Z"
          fill="var(--cur-fill)"
          stroke="var(--cur-line)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {/* Same two variables as the arrow, so the pill inverts with it and the
          pair always reads as one object changing state. */}
      <span
        // Padding is deliberately lopsided. "you" has no capital or ascender but
        // the y descends, so its visible ink sits 2.5px below the middle of a
        // symmetrically padded pill — measured, not guessed. Taking 2px off the
        // top and adding it back at the bottom optically centres the word while
        // keeping the pill exactly the same height.
        className="absolute left-[17px] top-[19px] whitespace-nowrap rounded-full border pb-[5px] pl-2.5 pr-2.5 pt-px text-[11px] font-medium leading-none"
        style={{
          backgroundColor: "var(--cur-fill)",
          color: "var(--cur-line)",
          borderColor: "var(--cur-line)",
        }}
      >
        {LABEL}
      </span>
    </div>
  );
}
