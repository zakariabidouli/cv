export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 py-6 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
          &copy; {year} Zakaria Bidouli
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/40">
          Next.js · Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
