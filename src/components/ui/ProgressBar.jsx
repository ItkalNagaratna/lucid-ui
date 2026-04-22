import { motion } from 'framer-motion'

const COLORS = {
    blue: { track: 'rgba(100,140,255,0.10)', fill: 'linear-gradient(90deg,rgba(120,160,255,0.80),rgba(160,100,255,0.70))', glow: 'rgba(120,160,255,0.50)' },
    green: { track: 'rgba(34,197,94,0.10)', fill: 'linear-gradient(90deg,rgba(80,220,140,0.80),rgba(34,197,94,0.70))', glow: 'rgba(74,222,128,0.50)' },
    red: { track: 'rgba(239,68,68,0.10)', fill: 'linear-gradient(90deg,rgba(255,100,100,0.80),rgba(220,50,50,0.70))', glow: 'rgba(248,113,113,0.50)' },
    amber: { track: 'rgba(245,158,11,0.10)', fill: 'linear-gradient(90deg,rgba(255,180,60,0.80),rgba(200,120,20,0.70))', glow: 'rgba(251,191,36,0.50)' },
}
const HEIGHTS = { sm: 4, md: 6, lg: 8 }

export function ProgressBar({ value = 0, color = 'blue', size = 'md', showLabel = false, animated = true, className = '' }) {
    const c = COLORS[color] || COLORS.blue
    const h = HEIGHTS[size]
    const pct = Math.min(100, Math.max(0, value))
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {showLabel && (
                <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>
                    <span>Progress</span><span>{pct}%</span>
                </div>
            )}
            {/* Liquid glass track */}
            <div className="relative w-full rounded-full overflow-hidden"
                style={{
                    height: h,
                    background: c.track,
                    border: '1px solid rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset',
                }}>
                <motion.div
                    initial={{ width: animated ? 0 : `${pct}%` }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                        background: c.fill,
                        boxShadow: `0 0 12px ${c.glow}, 0 1px 0 rgba(255,255,255,0.30) inset`,
                    }}
                />
            </div>
        </div>
    )
}
