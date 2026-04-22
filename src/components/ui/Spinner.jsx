import { motion } from 'framer-motion'

const sizes = { xs: [12, 1], sm: [16, 2], md: [20, 2], lg: [28, 2], xl: [40, 3] }

export function Spinner({ size = 'md', color = 'rgba(255,255,255,0.9)' }) {
    const [px, bw] = sizes[size]
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
            style={{
                width: px, height: px, borderRadius: '50%', flexShrink: 0,
                border: `${bw}px solid rgba(255,255,255,0.12)`,
                borderTopColor: color,
            }}
        />
    )
}
