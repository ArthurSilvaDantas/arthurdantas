export default function SectionDivider() {
  return (
    <div aria-hidden className="site-container">
      <div className="flex h-4 items-center gap-4">
        <div className="relative h-px flex-1 bg-line">
          <div className="absolute -top-px left-0 h-[3px] w-[120px] rounded-[2px] bg-accent" />
        </div>
        <span className="font-mono text-xs leading-[normal] text-accent">✦</span>
      </div>
    </div>
  );
}
