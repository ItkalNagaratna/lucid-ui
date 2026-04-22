import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* Liquid Glass Alerts — transparent panels with color-tinted blur */
const CONFIG = {
    info: {
        bg: 'rgba(59,130,246,0.08)',
        border: 'rgba(147,197,253,0.22)',
        icon: 'rgba(147,197,253,0.95)',
        text: 'rgba(186,220,254,0.80)',
        label: 'rgba(219,234,254,0.95)',
        emoji: 'ℹ',
        glow: 'rgba(59,130,246,0.12)',
    },
    success: {
        bg: 'rgba(34,197,94,0.08)',
        border: 'rgba(134,239,172,0.22)',
        icon: 'rgba(134,239,172,0.95)',
        text: 'rgba(167,243,208,0.80)',
        label: 'rgba(209,250,229,0.95)',
        emoji: '✓',
        glow: 'rgba(34,197,94,0.12)',
    },
    warning: {
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(253,230,138,0.22)',
        icon: 'rgba(253,230,138,0.95)',
        text: 'rgba(254,243,199,0.80)',
        label: 'rgba(255,251,235,0.95)',
        emoji: '⚠',
        glow: 'rgba(245,158,11,0.12)',
    },
    error: {
        bg: 'rgba(239,68,68,0.08)',
        border: 'rgba(252,165,165,0.22)',
        icon: 'rgba(252,165,165,0.95)',
        text: 'rgba(254,202,202,0.80)',
        label: 'rgba(254,226,226,0.95)',
        emoji: '✕',
        glow: 'rgba(239,68,68,0.12)',
    },
}

export function Alert({ type = 'info', title, message, dismissible = false, className = '' }) {
    const [visible, setVisible] = useState(true)
    const c = CONFIG[type] || CONFIG.info
    return (
        <AnimatePresence>
            {visible && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                    className={`relative flex items-start gap-3 p-4 rounded-xl overflow-hidden ${className}`}
                    style={{
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        backdropFilter: 'blur(30px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                        boxShadow: `0 1px 0 rgba(255,255,255,0.18) inset, 0 4px 20px rgba(0,0,0,0.22), 0 0 30px ${c.glow}`,
                    }}>
                    {/* Gloss sheen */}
                    <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)', borderRadius: 'inherit' }} />
                    <span className="text-base leading-none flex-shrink-0 mt-0.5 relative z-10 font-semibold" style={{ color: c.icon }}>{c.emoji}</span>
                    <div className="flex-1 min-w-0 relative z-10">
                        {title && <p className="text-sm font-semibold mb-0.5" style={{ color: c.label }}>{title}</p>}
                        {message && <p className="text-xs" style={{ color: c.text }}>{message}</p>}
                    </div>
                    {dismissible && (
                        <button onClick={() => setVisible(false)}
                            className="flex-shrink-0 text-lg leading-none cursor-pointer transition-opacity hover:opacity-70 relative z-10"
                            style={{ color: c.icon }}>×</button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
