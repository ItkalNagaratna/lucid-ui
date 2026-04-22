import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Spinner } from './Spinner'

const SIZES = {
    xs: 'px-2.5 py-1 text-xs rounded-lg gap-1',
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-5 py-3 text-sm rounded-xl gap-2',
    xl: 'px-6 py-3.5 text-base rounded-2xl gap-2.5',
}
const VARIANTS = {
    primary: {
        background: 'linear-gradient(160deg, rgba(120,155,255,0.42) 0%, rgba(155,95,255,0.28) 100%)',
        border: '1px solid rgba(255,255,255,0.28)',
        boxShadow: '0 8px 32px rgba(100,140,255,0.28), 0 2px 0 rgba(255,255,255,0.52) inset, 0 -1px 0 rgba(0,0,0,0.18) inset',
        color: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(24px) saturate(200%)',
        ripple: 'rgba(200,215,255,0.5)',
        gloss: true,
    },
    secondary: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.35) inset',
        color: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(24px) saturate(180%)',
        ripple: 'rgba(255,255,255,0.25)',
        gloss: false,
    },
    ghost: {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: 'none',
        color: 'rgba(255,255,255,0.55)',
        backdropFilter: 'none',
        ripple: 'rgba(255,255,255,0.20)',
        gloss: false,
    },
    danger: {
        background: 'linear-gradient(160deg, rgba(239,68,68,0.45) 0%, rgba(185,28,28,0.30) 100%)',
        border: '1px solid rgba(255,120,120,0.30)',
        boxShadow: '0 8px 32px rgba(239,68,68,0.22), 0 2px 0 rgba(255,200,200,0.40) inset',
        color: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px) saturate(180%)',
        ripple: 'rgba(255,180,180,0.45)',
        gloss: true,
    },
    success: {
        background: 'linear-gradient(160deg, rgba(34,197,94,0.40) 0%, rgba(21,128,61,0.25) 100%)',
        border: '1px solid rgba(74,222,128,0.28)',
        boxShadow: '0 8px 32px rgba(34,197,94,0.22), 0 2px 0 rgba(180,255,200,0.40) inset',
        color: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px) saturate(180%)',
        ripple: 'rgba(180,255,210,0.45)',
        gloss: true,
    },
}

export function Button({
    children, variant = 'primary', size = 'md',
    loading = false, disabled = false, fullWidth = false,
    leftIcon, rightIcon, onClick, type = 'button', className = '',
}) {
    const v = VARIANTS[variant] || VARIANTS.primary
    const isOff = disabled || loading
    const btnRef = useRef(null)
    const [ripples, setRipples] = useState([])

    const handleClick = useCallback((e) => {
        if (isOff) return
        const rect = btnRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()
        setRipples(prev => [...prev, { x, y, id }])
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 650)
        onClick?.(e)
    }, [isOff, onClick])

    return (
        <motion.button
            ref={btnRef}
            type={type}
            onClick={handleClick}
            aria-disabled={isOff}
            tabIndex={isOff ? -1 : undefined}
            whileHover={!isOff ? { scale: 1.03, y: -2 } : {}}
            whileTap={!isOff ? { scale: 0.97, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className={`relative flex items-center justify-center font-medium overflow-hidden select-none ${SIZES[size]} ${fullWidth ? 'w-full' : 'w-fit'} ${disabled ? 'opacity-40 cursor-not-allowed' : loading ? 'cursor-pointer' : 'cursor-pointer'} ${className}`}
            style={{
                background: v.background, border: v.border, boxShadow: v.boxShadow,
                color: v.color, backdropFilter: v.backdropFilter, WebkitBackdropFilter: v.backdropFilter,
                transition: 'box-shadow 0.25s ease, background 0.25s ease',
            }}
        >
            {/* Diagonal gloss sheen */}
            {v.gloss && (
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)', borderRadius: 'inherit' }} />
            )}

            {/* Ripple effects */}
            <AnimatePresence>
                {ripples.map(r => (
                    <motion.span
                        key={r.id}
                        initial={{ width: 10, height: 10, opacity: 0.55, x: r.x - 5, y: r.y - 5 }}
                        animate={{ width: 280, height: 280, opacity: 0, x: r.x - 140, y: r.y - 140 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="absolute rounded-full pointer-events-none"
                        style={{ background: v.ripple, top: 0, left: 0 }}
                    />
                ))}
            </AnimatePresence>

            {/* Content */}
            <span className="relative z-10 flex items-center gap-[inherit]">
                {loading
                    ? <><Spinner size="sm" /><span>{children}</span></>
                    : <>{leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}<span>{children}</span>{rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}</>
                }
            </span>
        </motion.button>
    )
}
