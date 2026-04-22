import { motion } from 'framer-motion'

const SIZES = {
    sm: { w: 32, h: 16, thumb: 12, offset: 2, travel: 16 },
    md: { w: 44, h: 24, thumb: 18, offset: 3, travel: 20 },
    lg: { w: 56, h: 30, thumb: 22, offset: 4, travel: 26 },
}

export function Toggle({ checked = false, onChange, label, disabled = false, size = 'md' }) {
    const t = SIZES[size]
    return (
        <label className={`flex items-center gap-3 select-none ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
            <motion.button type="button" role="switch" aria-checked={checked}
                onClick={() => !disabled && onChange?.(!checked)}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                className="relative flex-shrink-0 rounded-full overflow-hidden"
                style={{
                    width: t.w, height: t.h,
                    background: checked
                        ? 'var(--accent-color)'
                        : 'rgba(255,255,255,0.02)',
                    border: checked ? '1px solid rgba(220,230,255,0.45)' : '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(calc(var(--glass-blur) * 0.4)) saturate(var(--glass-saturation))',
                    WebkitBackdropFilter: 'blur(calc(var(--glass-blur) * 0.4)) saturate(var(--glass-saturation))',
                    boxShadow: checked
                        ? '0 0 28px rgba(100,150,255,0.45), 0 1px 0 rgba(255,255,255,0.5) inset'
                        : '0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 10px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                }}>
                {/* Gloss sheen on track */}
                <div className="absolute inset-x-0 top-0 pointer-events-none"
                    style={{ height: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)', borderRadius: 'inherit' }} />
                {/* Thumb — frosted glass pill */}
                <motion.div
                    animate={{ x: checked ? t.travel : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute rounded-full"
                    style={{
                        width: t.thumb, height: t.thumb, top: t.offset, left: t.offset,
                        background: 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(220,228,255,0.90) 100%)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.80) inset',
                    }}
                />
            </motion.button>
            {label && <span className="text-sm font-medium tracking-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>}
        </label>
    )
}
