import { motion } from 'framer-motion'

const COLORS = {
    purple: { bg: 'rgba(147,51,234,0.14)', border: 'rgba(200,160,255,0.28)', text: 'rgba(220,190,255,0.95)', dot: 'rgba(200,160,255,0.9)', glow: 'rgba(160,100,255,0.35)' },
    blue: { bg: 'rgba(59,130,246,0.14)', border: 'rgba(147,197,253,0.28)', text: 'rgba(160,210,255,0.95)', dot: 'rgba(147,197,253,0.9)', glow: 'rgba(80,160,255,0.35)' },
    green: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(134,239,172,0.26)', text: 'rgba(160,245,185,0.95)', dot: 'rgba(134,239,172,0.9)', glow: 'rgba(34,197,94,0.35)' },
    red: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(252,165,165,0.26)', text: 'rgba(255,180,180,0.95)', dot: 'rgba(252,165,165,0.9)', glow: 'rgba(239,68,68,0.35)' },
    amber: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(253,230,138,0.26)', text: 'rgba(255,235,150,0.95)', dot: 'rgba(253,230,138,0.9)', glow: 'rgba(245,158,11,0.35)' },
    cyan: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(103,232,249,0.26)', text: 'rgba(130,240,255,0.95)', dot: 'rgba(103,232,249,0.9)', glow: 'rgba(6,182,212,0.35)' },
    gray: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.14)', text: 'rgba(255,255,255,0.55)', dot: 'rgba(255,255,255,0.4)', glow: 'rgba(255,255,255,0.20)' },
}
const SIZES = { sm: 'px-2 py-0.5 text-xs rounded-[6px]', md: 'px-2.5 py-1 text-xs rounded-[8px]', lg: 'px-3 py-1 text-sm rounded-[10px]', xs: 'px-1.5 py-0.5 text-[10px] rounded-[6px]' }

export function Badge({ children, color = 'purple', size = 'md', dot = false, outline = false, className = '' }) {
    const c = COLORS[color] || COLORS.purple
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
                scale: 1.07,
                y: -1,
                boxShadow: `0 4px 16px ${c.glow}, 0 1px 0 rgba(255,255,255,0.28) inset`,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-flex items-center gap-1.5 font-medium relative overflow-hidden ${SIZES[size]} ${className}`}
            style={{
                background: outline ? 'transparent' : c.bg,
                border: `1px solid ${c.border}`,
                color: c.text,
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                boxShadow: `0 1px 0 rgba(255,255,255,0.20) inset, 0 2px 8px rgba(0,0,0,0.20)`,
            }}
        >
            {/* Gloss sheen */}
            <span className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 55%)', borderRadius: 'inherit' }} />
            {dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: c.dot }} />}
            {children}
        </motion.span>
    )
}
