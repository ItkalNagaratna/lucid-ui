import { motion } from 'framer-motion'

const SIZES = {
    xs: { box: 24, text: 'text-xs', dot: 6 },
    sm: { box: 32, text: 'text-xs', dot: 8 },
    md: { box: 40, text: 'text-sm', dot: 10 },
    lg: { box: 48, text: 'text-base', dot: 12 },
    xl: { box: 64, text: 'text-lg', dot: 14 },
}
const GRADIENTS = [
    'linear-gradient(160deg,rgba(120,155,255,0.60),rgba(160,100,255,0.45))',
    'linear-gradient(160deg,rgba(100,210,255,0.60),rgba(80,150,255,0.45))',
    'linear-gradient(160deg,rgba(255,110,155,0.60),rgba(200,80,170,0.45))',
    'linear-gradient(160deg,rgba(80,210,155,0.60),rgba(50,165,120,0.45))',
    'linear-gradient(160deg,rgba(255,170,60,0.60),rgba(200,100,80,0.45))',
]
const STATUS = { online: '#22c55e', away: '#f59e0b', busy: '#ef4444', offline: '#6b7280' }

export function Avatar({ initials, src, size = 'md', status, colorIndex = 0, className = '' }) {
    const s = SIZES[size]
    return (
        <motion.div
            className={`relative inline-flex flex-shrink-0 ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
                scale: 1.10,
                transition: { type: 'spring', stiffness: 380, damping: 18 },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                className={`rounded-full flex items-center justify-center overflow-hidden font-semibold ${s.text} relative`}
                whileHover={{ boxShadow: '0 6px 24px rgba(0,0,0,0.50), 0 1px 0 rgba(255,255,255,0.60) inset, 0 0 0 2px rgba(255,255,255,0.30)' }}
                style={{
                    width: s.box, height: s.box,
                    background: src ? undefined : GRADIENTS[colorIndex % GRADIENTS.length],
                    border: '1.5px solid rgba(255,255,255,0.28)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.45) inset',
                    backdropFilter: src ? 'none' : 'blur(10px)',
                    color: 'rgba(255,255,255,0.95)',
                    transition: 'box-shadow 0.2s ease',
                }}>
                {/* Gloss */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.25) 0%, transparent 55%)', borderRadius: '50%' }} />
                {src
                    ? <img src={src} alt={initials} className="w-full h-full object-cover" />
                    : <span className="relative z-10">{initials}</span>
                }
            </motion.div>
            {status && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.15 }}
                    className="absolute bottom-0 right-0 rounded-full"
                    style={{
                        width: s.dot, height: s.dot,
                        background: STATUS[status] || STATUS.offline,
                        border: '2px solid rgba(10,10,24,0.9)',
                        boxShadow: `0 0 8px ${STATUS[status]}99`,
                    }}
                />
            )}
        </motion.div>
    )
}
