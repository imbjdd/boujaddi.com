export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="pb-[2px] text-xs font-medium tracking-[0.09em] text-black/40">
      {children}
    </p>
  );
}
