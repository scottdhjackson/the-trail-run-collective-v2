import { Clock } from 'lucide-react'

type LoopCutoff = { _key: string; timePerLoop: string; cutoff?: string }

type EventLoopCutoffsProps = {
  rows: LoopCutoff[]
  note?: string
  /** One loop's length in metres (from the GPX), used to show running totals */
  loopDistanceM?: number
  distUnit?: 'km' | 'mi'
}

const GREEN = '#2D5C26'
const NAVY = '#0C0F1E'
const MUTED = '#6B6558'

export function EventLoopCutoffs({ rows, note, loopDistanceM, distUnit = 'mi' }: EventLoopCutoffsProps) {
  if (!rows?.length) return null

  const totalFor = (loops: number) => {
    if (!loopDistanceM) return null
    const total = (loopDistanceM * loops) / (distUnit === 'mi' ? 1609.344 : 1000)
    return `${Math.round(total)} ${distUnit}`
  }

  return (
    <div id="cutoffs">
      <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-3" style={{ color: NAVY }}>
        Loop Times &amp; Cutoffs
      </h2>
      <p className="text-sm md:text-base leading-relaxed mb-6 max-w-2xl" style={{ color: MUTED }}>
        Each row shows the average time per loop if you&apos;re aiming for that many loops, and the latest time you can
        set off on it.
      </p>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Column headings */}
        <div
          className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] gap-3 px-4 md:px-6 py-3 border-b text-[10px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: MUTED, borderColor: 'rgba(12,15,30,0.08)' }}
        >
          <span>Loops</span>
          <span>Time per loop</span>
          <span className="text-right">Cutoff</span>
        </div>

        <ol>
          {rows.map((row, i) => {
            const loops = i + 1
            const total = totalFor(loops)
            return (
              <li
                key={row._key}
                className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] gap-3 items-center px-4 md:px-6 py-3.5"
                style={{ backgroundColor: i % 2 === 0 ? 'rgba(45,92,38,0.06)' : undefined }}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full shrink-0 font-heading font-black text-sm text-white"
                    style={{ backgroundColor: GREEN }}
                    aria-label={`${loops} ${loops === 1 ? 'loop' : 'loops'}`}
                  >
                    {loops}
                  </span>
                  {total && (
                    <span className="text-xs md:text-sm tabular-nums whitespace-nowrap" style={{ color: MUTED }}>
                      {total}
                    </span>
                  )}
                </span>
                <span className="text-sm md:text-base" style={{ color: NAVY }}>
                  {row.timePerLoop}
                </span>
                <span className="text-right">
                  {row.cutoff && (
                    <span className="font-heading font-black text-base md:text-lg tracking-tight whitespace-nowrap" style={{ color: GREEN }}>
                      {row.cutoff}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ol>

        {note && (
          <p
            className="flex items-center gap-2 px-4 md:px-6 py-4 border-t text-sm font-semibold"
            style={{ color: GREEN, borderColor: 'rgba(12,15,30,0.08)' }}
          >
            <Clock size={16} className="shrink-0" />
            {note}
          </p>
        )}
      </div>
    </div>
  )
}
