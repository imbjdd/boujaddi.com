export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pb-[2px] text-xs font-medium tracking-[0.09em] text-black/60">
      {children}
    </h2>
  );
}
