import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

/* ── Minimal JSX token highlighter ─────────────────── */
function hl(raw) {
    let s = raw
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    const T = (type, content) => `\uE000${type}\uE001${content}\uE002`

    s = s.replace(/"([^"]*)"/g, m => T('str', m))
    s = s.replace(/'([^']*)'/g, m => T('str', m))
    s = s.replace(/(&lt;\/?)([a-zA-Z0-9]+)/g, (_, p1, p2) => p1 + T('tag', p2))
    s = s.replace(
        /\b(className|variant|size|color|dot|outline|disabled|loading|initials|status|colorIndex|type|placeholder|label|checked|animate)\b(?==)/g,
        m => T('prop', m)
    )
    s = s.replace(/(\/\/[^\n]*)/g, m => T('cmt', m))

    s = s.replace(/\uE000([a-z]+)\uE001/g, '<i c="$1">')
    s = s.replace(/\uE002/g, '</i>')

    return s
}

/* ══════════════════════════════════════════════════════
   Copyable — hover for hint, click for code popover
   ══════════════════════════════════════════════════════ */
export function Copyable({ code, children, block = false }) {
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [copied, setCopied] = useState(false)
    const ref = useRef(null)

    /* Close on outside click */
    useEffect(() => {
        if (!open) return
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [open])

    const copy = async (e) => {
        e.stopPropagation()
        try { await navigator.clipboard.writeText(code) } catch { }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Inspect child for disabled/loading flags
    const isChildDisabled = children && children.props && (
        children.props.disabled === true ||
        children.props['aria-disabled'] === true ||
        children.props['aria-disabled'] === 'true'
    )

    return (
        <div
            ref={ref}
            className={`relative ${block ? 'block w-full' : 'inline-flex'}`}
            style={{ isolation: 'isolate' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── "view code" hover label ──────────────────── */}
            <AnimatePresence>
                {hovered && !open && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={{ duration: 0.14 }}
                        className="absolute z-50 pointer-events-none whitespace-nowrap"
                        style={{ bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' }}
                    >
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                            style={{
                                background: 'rgba(8,8,20,0.90)',
                                border: '1px solid rgba(255,255,255,0.16)',
                                color: 'rgba(255,255,255,0.55)',
                                backdropFilter: 'blur(16px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.14) inset',
                            }}>
                            {/* Code icon */}
                            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 4L1 8l4 4M11 4l4 4-4 4" />
                            </svg>
                            view code
                        </span>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2"
                            style={{
                                width: 0, height: 0,
                                borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
                                borderTop: '5px solid rgba(255,255,255,0.16)'
                            }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── The component itself ─────────────────────── */}
            <div
                onClick={() => setOpen(v => !v)}
                className={isChildDisabled ? "" : "cursor-pointer"}
                style={{
                    borderRadius: '0.75rem',
                    outline: open
                        ? '2px solid rgba(130,170,255,0.60)'
                        : (hovered && !isChildDisabled) ? '2px solid rgba(255,255,255,0.22)' : '2px solid transparent',
                    outlineOffset: '4px',
                    transition: 'outline-color 0.15s ease',
                }}
            >
                {children}
            </div>

            {/* ── Code popover ─────────────────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute z-50"
                        style={{
                            bottom: 'calc(100% + 12px)',
                            left: '50%', transform: 'translateX(-50%)',
                            minWidth: '220px', width: 'max-content', maxWidth: '90vw',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Glass popover */}
                        <div className="rounded-2xl overflow-hidden"
                            style={{
                                background: 'rgba(5,5,14,0.92)',
                                backdropFilter: 'blur(40px) saturate(200%)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                boxShadow: [
                                    '0 28px 70px rgba(0,0,0,0.70)',
                                    '0 2px 0 rgba(255,255,255,0.20) inset',
                                ].join(', '),
                            }}>

                            {/* Header row */}
                            <div className="flex items-center justify-between px-3.5 py-2 border-b"
                                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,92,92,0.55)' }} />
                                    <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,185,0,0.55)' }} />
                                    <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(40,205,65,0.55)' }} />
                                    <span className="ml-1 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>jsx</span>
                                </div>
                                <motion.button
                                    onClick={copy}
                                    whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer"
                                    style={{
                                        background: copied ? 'rgba(34,197,94,0.14)' : 'rgba(255,255,255,0.07)',
                                        border: `1px solid ${copied ? 'rgba(134,239,172,0.30)' : 'rgba(255,255,255,0.12)'}`,
                                        color: copied ? 'rgba(134,239,172,0.92)' : 'rgba(255,255,255,0.52)',
                                        boxShadow: '0 1px 0 rgba(255,255,255,0.10) inset',
                                        transition: 'all 0.18s ease',
                                    }}>
                                    <AnimatePresence mode="wait">
                                        <motion.span key={copied ? 'ck' : 'cp'}
                                            initial={{ scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.6, opacity: 0 }}
                                            transition={{ duration: 0.14 }}>
                                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        </motion.span>
                                    </AnimatePresence>
                                    {copied ? 'Copied!' : 'Copy'}
                                </motion.button>
                            </div>

                            {/* Code */}
                            <pre className="px-4 py-3.5 text-xs leading-relaxed overflow-x-auto"
                                style={{
                                    fontFamily: "'SF Mono','Fira Code','Cascadia Code',monospace",
                                    color: 'rgba(210,222,242,0.88)', margin: 0,
                                }}>
                                <code dangerouslySetInnerHTML={{ __html: hl(code) }} />
                            </pre>
                        </div>

                        {/* Arrow pointing down */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2"
                            style={{
                                width: 0, height: 0,
                                borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
                                borderTop: '9px solid rgba(255,255,255,0.18)', marginTop: '-1px'
                            }} />

                        {/* Token colours */}
                        <style>{`
              i[c]        { font-style: normal; }
              i[c="tag"]  { color: rgba(130,195,255,0.96); }
              i[c="str"]  { color: rgba(134,239,172,0.93); }
              i[c="prop"] { color: rgba(251,191,36,0.93);  }
              i[c="cmt"]  { color: rgba(255,255,255,0.28); }
            `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
