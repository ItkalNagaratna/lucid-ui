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
            {/* ── "view code" hover trigger ────────────────── */}
            <AnimatePresence>
                {hovered && !open && (
                    <motion.button
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 3, scale: 0.9 }}
                        transition={{ duration: 0.12 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(true);
                            setHovered(false); // Force hide hint immediately
                        }}
                        className="absolute z-[60] whitespace-nowrap cursor-pointer active:scale-95"
                        style={{ bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' }}
                    >
                        <span className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                            style={{
                                background: 'rgba(8,8,20,0.95)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.15) inset',
                            }}>
                            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 4L1 8l4 4M11 4l4 4-4 4" />
                            </svg>
                            view code
                        </span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2"
                            style={{
                                width: 0, height: 0,
                                borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                                borderTop: '6px solid rgba(255,255,255,0.25)'
                            }} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── The component itself ─────────────────────── */}
            <div
                className={isChildDisabled ? "" : "cursor-pointer"}
                style={{
                    borderRadius: '0.75rem',
                    outline: open
                        ? '2.5px solid rgba(130,170,255,0.70)'
                        : (hovered && !isChildDisabled) ? '2px solid rgba(255,255,255,0.15)' : '2px solid transparent',
                    outlineOffset: '4px',
                    transition: 'all 0.15s ease',
                    zIndex: open ? 50 : 1
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
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute z-[100]"
                        style={{
                            bottom: 'calc(100% + 15px)',
                            left: '50%', transform: 'translateX(-50%)',
                            minWidth: '280px', width: 'max-content', maxWidth: '650px',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl"
                            style={{
                                background: 'rgba(5,5,12,0.94)',
                                backdropFilter: 'blur(40px) saturate(200%)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 2px 0 rgba(255,255,255,0.15) inset',
                            }}>

                            {/* Header row */}
                            <div className="flex items-center justify-between px-4 py-2.5 border-b"
                                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,87,0.6)' }} />
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,46,0.6)' }} />
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(39,201,63,0.6)' }} />
                                    </div>
                                    <span className="ml-1 text-[10px] font-mono font-bold tracking-widest opacity-30 uppercase">jsx</span>
                                </div>
                                <motion.button
                                    onClick={copy}
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors"
                                    style={{
                                        background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
                                        color: copied ? '#4ade80' : 'rgba(255,255,255,0.4)',
                                    }}>
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'COPIED' : 'COPY'}
                                </motion.button>
                            </div>

                            {/* Code body */}
                            <pre className="px-4 py-4 text-[11px] leading-relaxed overflow-x-auto m-0"
                                style={{
                                    fontFamily: "'SF Mono', Menlo, monospace",
                                    color: 'rgba(210,222,242,0.9)',
                                }}>
                                <code dangerouslySetInnerHTML={{ __html: hl(code) }} />
                            </pre>
                        </div>

                        {/* Arrow pointing down */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]"
                            style={{ borderTopColor: 'rgba(255,255,255,0.2)' }} />

                        {/* Token highlights */}
                        <style>{`
                            i[c]        { font-style: normal; }
                            i[c="tag"]  { color: rgba(130,195,255,1); }
                            i[c="str"]  { color: rgba(134,239,172,1); }
                            i[c="prop"] { color: rgba(251,191,36,1);  }
                            i[c="cmt"]  { color: rgba(255,255,255,0.3); }
                        `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
