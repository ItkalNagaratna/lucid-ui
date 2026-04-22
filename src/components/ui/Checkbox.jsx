import { motion, AnimatePresence } from 'framer-motion'

export function Checkbox({ checked = false, onChange, label, disabled = false, id }) {
    return (
        <label htmlFor={id}
            className={`flex items-center gap-2.5 select-none ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
            <motion.button id={id} type="button" role="checkbox" aria-checked={checked}
                onClick={() => !disabled && onChange?.(!checked)}
                whileTap={!disabled ? { scale: 0.88 } : {}}
                className="relative w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                    background: checked
                        ? 'linear-gradient(160deg, rgba(140,170,255,0.7) 0%, rgba(160,100,255,0.5) 100%)'
                        : 'rgba(255,255,255,0.02)',
                    border: checked ? '1px solid rgba(220,230,255,0.5)' : '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    boxShadow: checked
                        ? '0 0 24px rgba(100,150,255,0.4), 0 1px 0 rgba(255,255,255,0.4) inset'
                        : '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                }}>
                {/* Gloss */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)', borderRadius: 'inherit' }} />
                <AnimatePresence>
                    {checked && (
                        <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15, ease: 'backOut' }} viewBox="0 0 12 10"
                            className="w-3 h-3 relative z-10" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1,5 4,8 11,1" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </motion.button>
            {label && <span className="text-sm font-medium tracking-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>}
        </label>
    )
}
