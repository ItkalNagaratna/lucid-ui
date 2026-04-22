import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── State colours ───────────────────────────────────── */
function getState(focused, error, success) {
    if (error) return {
        border: focused ? 'rgba(252,165,165,0.75)' : 'rgba(252,165,165,0.45)',
        topLine: 'rgba(252,165,165,0.35)',
        icon: 'rgba(252,165,165,0.90)',
        label: 'rgba(252,165,165,0.80)',
        ring: '0 0 0 3px rgba(239,68,68,0.10)',
        glow: '0 6px 28px rgba(239,68,68,0.12)',
        bg: focused ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.04)',
    }
    if (success) return {
        border: focused ? 'rgba(134,239,172,0.75)' : 'rgba(134,239,172,0.45)',
        topLine: 'rgba(134,239,172,0.35)',
        icon: 'rgba(134,239,172,0.90)',
        label: 'rgba(134,239,172,0.80)',
        ring: '0 0 0 3px rgba(34,197,94,0.10)',
        glow: '0 6px 28px rgba(34,197,94,0.12)',
        bg: focused ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.04)',
    }
    if (focused) return {
        border: 'rgba(255,255,255,0.40)',
        topLine: 'rgba(255,255,255,0.45)',
        icon: 'rgba(210,225,255,0.92)',
        label: 'rgba(200,218,255,0.88)',
        ring: '0 0 0 3px rgba(255,255,255,0.07)',
        glow: '0 6px 28px rgba(180,210,255,0.12)',
        bg: 'rgba(255,255,255,0.075)',
    }
    return {
        border: 'rgba(255,255,255,0.12)',
        topLine: 'rgba(255,255,255,0.10)',
        icon: 'rgba(255,255,255,0.30)',
        label: 'rgba(255,255,255,0.42)',
        ring: '0 0 0 0 transparent',
        glow: '0 0 0 transparent',
        bg: 'rgba(255,255,255,0.04)',
    }
}

/* ── Status dot icon ─────────────────────────────────── */
function StatusIcon({ error, success }) {
    if (!error && !success) return null
    return (
        <motion.div
            key={error ? 'err' : 'ok'}
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
            {error ? (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="rgba(252,165,165,0.92)" strokeWidth="1.5" />
                    <path d="M10 6v4.5M10 14h.01" stroke="rgba(252,165,165,0.92)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ) : (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="rgba(134,239,172,0.92)" strokeWidth="1.5" />
                    <path d="M6.5 10l2.5 2.5 4-5" stroke="rgba(134,239,172,0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </motion.div>
    )
}

/* ══════════════════════════════════════════════════════
   Liquid Glass Input
   ══════════════════════════════════════════════════════ */
export function Input({
    label, type = 'text', placeholder = '', icon, rightElement,
    helperText, error, success, disabled = false,
    value, onChange, id, className = '',
}) {
    const [focused, setFocused] = useState(false)
    const [shimmerKey, setShimmerKey] = useState(0)
    const s = getState(focused, !!error, !!success)

    const handleFocus = () => {
        setFocused(true)
        setShimmerKey(k => k + 1) // re-trigger shimmer every focus
    }

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>

            {/* ── Label ───────────────────────────────────── */}
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-medium flex items-center gap-1.5 select-none transition-colors duration-200"
                    style={{ color: s.label }}
                >
                    {/* Animated accent bar */}
                    <span
                        className="inline-block w-0.5 h-3 rounded-full origin-center transition-all duration-200"
                        style={{
                            background: 'rgba(200,220,255,0.75)',
                            transform: focused ? 'scaleY(1)' : 'scaleY(0)',
                            opacity: focused ? 1 : 0,
                        }}
                    />
                    {label}
                </label>
            )}

            {/* ── Field wrapper ───────────────────────────── */}
            <div
                className="relative"
                style={{
                    borderRadius: '0.875rem',
                    /* Animated glow ring via box-shadow */
                    boxShadow: `${s.ring}, ${s.glow}`,
                    transition: 'box-shadow 0.25s ease',
                }}
            >
                {/* === SHIMMER SWEEP (z-index: 5, pointer-events:none) === */}
                <AnimatePresence>
                    {focused && (
                        <motion.div
                            key={shimmerKey}
                            initial={{ x: '-110%' }}
                            animate={{ x: '220%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 pointer-events-none overflow-hidden"
                            style={{ borderRadius: '0.875rem', zIndex: 5 }}
                        >
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.20) 50%, transparent 75%)',
                                transform: 'skewX(-12deg)',
                            }} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* === LEFT ICON (z-index: 20 — always on top) === */}
                {icon && (
                    <div
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center"
                        style={{
                            color: s.icon,
                            zIndex: 20,
                            transition: 'color 0.22s ease',
                        }}
                    >
                        {icon}
                    </div>
                )}

                {/* === GLASS INPUT (z-index: 1, no stacking context blocker) === */}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={() => setFocused(false)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="w-full py-3.5 text-sm outline-none"
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        paddingLeft: icon ? '2.90rem' : '1rem',
                        paddingRight: (rightElement || error || success) ? '2.90rem' : '1rem',
                        borderRadius: '0.875rem',
                        /* Liquid Glass */
                        background: s.bg,
                        border: `1px solid ${s.border}`,
                        backdropFilter: 'blur(28px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                        /* Specular inset + drop shadow */
                        boxShadow: [
                            `0 1.5px 0 rgba(255,255,255,${focused ? '0.28' : '0.10'}) inset`,
                            '0 -1px 0 rgba(0,0,0,0.10) inset',
                            '0 3px 10px rgba(0,0,0,0.18)',
                        ].join(', '),
                        caretColor: 'rgba(210,225,255,0.95)',
                        color: 'rgba(255,255,255,0.92)',
                        opacity: disabled ? 0.38 : 1,
                        cursor: disabled ? 'not-allowed' : 'text',
                        transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                    }}
                />

                {/* === BRIGHT SPECULAR TOP LINE (z-index: 20) === */}
                <div
                    className="absolute top-px left-4 right-4 h-px pointer-events-none rounded-full"
                    style={{
                        zIndex: 20,
                        background: `linear-gradient(to right, transparent, ${s.topLine}, transparent)`,
                        transition: 'all 0.25s ease',
                    }}
                />

                {/* === RIGHT ELEMENT / STATUS ICON (z-index: 20) === */}
                <div
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center"
                    style={{ zIndex: 20 }}
                >
                    <AnimatePresence mode="wait">
                        {rightElement
                            ? <div key="right">{rightElement}</div>
                            : <StatusIcon key={error ? 'e' : success ? 's' : 'n'} error={error} success={success} />
                        }
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Helper / error / success text ───────────── */}
            <AnimatePresence>
                {(helperText || error || success) && (
                    <motion.p
                        key={error || success || helperText}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs flex items-center gap-1.5"
                        style={{
                            color: error ? 'rgba(252,165,165,0.90)'
                                : success ? 'rgba(134,239,172,0.90)'
                                    : 'rgba(255,255,255,0.34)',
                        }}
                    >
                        {(error || success) && (
                            <span className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: error ? 'rgba(252,165,165,0.9)' : 'rgba(134,239,172,0.9)' }}
                            />
                        )}
                        {error || success || helperText}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}
