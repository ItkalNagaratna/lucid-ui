import { motion } from 'framer-motion'

const VARIANTS = {
    default: {
        background: 'rgba(255,255,255,var(--glass-opacity))',
        border: '1px solid rgba(255,255,255,var(--glass-border))',
        boxShadow: '0 20px 60px rgba(0,0,0,0.45), 0 6px 20px rgba(0,0,0,0.25), 0 2px 0 rgba(255,255,255,0.45) inset, 0 -1px 0 rgba(255,255,255,0.05) inset',
        backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturation))',
        highlight: true,
        hoverShadow: '0 28px 70px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.30), 0 2px 0 rgba(255,255,255,0.55) inset',
    },
    elevated: {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.24)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 10px 30px rgba(0,0,0,0.30), 0 2px 0 rgba(255,255,255,0.58) inset, 0 -1px 0 rgba(255,255,255,0.06) inset',
        backdropFilter: 'blur(calc(var(--glass-blur) * 1.2)) saturate(calc(var(--glass-saturation) * 1.1))',
        highlight: true,
        hoverShadow: '0 44px 100px rgba(0,0,0,0.65), 0 14px 36px rgba(0,0,0,0.35), 0 2px 0 rgba(255,255,255,0.65) inset',
    },
    flat: {
        background: 'rgba(255,255,255,var(--glass-opacity))',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.20) inset',
        backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturation))',
        highlight: false,
        hoverShadow: '0 12px 32px rgba(0,0,0,0.32), 0 1px 0 rgba(255,255,255,0.30) inset',
    },
    border: {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset',
        backdropFilter: 'blur(10px)',
        highlight: false,
        hoverShadow: '0 8px 24px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.22) inset',
    },
}
const PADDING = { none: 'p-0', sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({ children, variant = 'default', padding = 'md', className = '', style = {}, onClick }) {
    const v = VARIANTS[variant]
    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{
                y: -4,
                boxShadow: v.hoverShadow,
                borderColor: 'rgba(255,255,255,0.28)',
                transition: { duration: 0.25, ease: 'easeOut' },
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl relative overflow-hidden ${PADDING[padding]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            style={{
                background: v.background, border: v.border, boxShadow: v.boxShadow,
                backdropFilter: v.backdropFilter, WebkitBackdropFilter: v.backdropFilter,
                ...style,
            }}
        >
            {/* Bright top specular line */}
            {v.highlight && (
                <div className="absolute top-0 left-3 right-3 h-px pointer-events-none z-10"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)' }} />
            )}
            {/* Diagonal gloss sheen */}
            {v.highlight && (
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)', borderRadius: 'inherit' }} />
            )}
            {children}
        </motion.div>
    )
}
