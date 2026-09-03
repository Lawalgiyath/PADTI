export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-14 flex items-center gap-4">
      <div className="h-px flex-1 bg-border" />
      <span className="whitespace-nowrap font-body text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
