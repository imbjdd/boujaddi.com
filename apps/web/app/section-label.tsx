export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[10px] pb-[2px]">
      <div className="h-px w-full bg-gray-200" />
      <p className="text-xs font-medium tracking-[0.09em] text-black/50">
        {children}
      </p>
    </div>
  );
}
