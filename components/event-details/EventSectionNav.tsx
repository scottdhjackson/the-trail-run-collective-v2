'use client'

export type SectionLink = { id: string; label: string }

/**
 * Mobile-only, horizontally scrolling "jump to section" bar shown under the event banner.
 * Sits in the page flow (not sticky) so it never overlaps the fixed site header.
 */
export function EventSectionNav({ sections }: { sections: SectionLink[] }) {
  const jumpTo = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    // Land just below the fixed header, whatever its height at this breakpoint
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 64
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16
    // 'instant' rather than 'auto' — the site sets `scroll-behavior: smooth` globally, which 'auto' would inherit
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  if (sections.length < 2) return null

  return (
    <nav
      aria-label="Jump to section"
      className="lg:hidden relative border-b"
      style={{ backgroundColor: '#F2EDE3', borderColor: 'rgba(12,15,30,0.08)' }}
    >
      <div className="flex items-center gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => jumpTo(e, id)}
            className="shrink-0 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap border border-[#0C0F1E]/15 bg-white text-[#0C0F1E] transition-colors active:bg-[#2D5C26] active:text-white active:border-[#2D5C26]"
          >
            {label}
          </a>
        ))}
        {/* Trailing spacer so the last pill isn't flush against the edge */}
        <span className="shrink-0 w-2" aria-hidden />
      </div>
      {/* Fade hints that the row scrolls sideways */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10"
        style={{ background: 'linear-gradient(to right, rgba(242,237,227,0), #F2EDE3)' }}
      />
    </nav>
  )
}
