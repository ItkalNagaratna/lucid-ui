import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

/* ── Simple JSX token coloriser ─────────────────────────
   Works on pre-escaped HTML, so tag order matters:
   1) escape & < >
   2) highlight comments  (before strings — avoids // inside "")
   3) highlight strings
   4) highlight JSX tag names (&lt;Button  &lt;/Card)
   5) highlight JS keywords
   6) highlight prop names  (word=)
   ─────────────────────────────────────────────────────── */
function hl(code) {
    let s = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    // Use zero-width chars to tokenise safely without regex collision
    const T = (type, content) => `\uE000${type}\uE001${content}\uE002`

    // Comments
    s = s.replace(/(\/\/[^\n]*)/g, m => T('cmt', m))
    s = s.replace(/(\{\/\*[\s\S]*?\*\/\})/g, m => T('cmt', m))

    // Strings
    s = s.replace(/"([^"<]*)"/g, m => T('str', m))
    s = s.replace(/'([^'<]*)'/g, m => T('str', m))

    // HTML & JSX component tags
    s = s.replace(/(&lt;\/?)([a-zA-Z0-9]+)/g, (_, p1, p2) => p1 + T('tag', p2))

    // JS / JSX keywords
    s = s.replace(
        /\b(import|export|from|default|const|let|var|function|return|async|await|true|false|null|undefined|if|else|class|extends|new|this)\b/g,
        m => T('kw', m)
    )

    // Prop names
    s = s.replace(/\b([a-z][a-zA-Z0-9]*)=/g, (_, p1) => T('prop', p1) + '=')

    // Finally decode tokens back to HTML
    s = s.replace(/\uE000([a-z]+)\uE001/g, '<i c="$1">')
    s = s.replace(/\uE002/g, '</i>')

    return s
}

export function CodeBlock({ code, lang = 'jsx' }) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try { await navigator.clipboard.writeText(code) } catch { }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative overflow-hidden"
            style={{
                background: 'rgba(4,4,10,0.75)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.10) inset',
            }}>

            {/* ── Header bar ─────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>

                {/* macOS traffic‑light dots + lang label */}
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,92,92,0.55)' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,185,0,0.55)' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(40,205,65,0.55)' }} />
                    <span className="ml-2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>{lang}</span>
                </div>

                {/* Copy button */}
                <motion.button
                    onClick={copy}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer"
                    style={{
                        background: copied ? 'rgba(34,197,94,0.14)' : 'rgba(255,255,255,0.07)',
                        border: `1px solid ${copied ? 'rgba(134,239,172,0.35)' : 'rgba(255,255,255,0.12)'}`,
                        color: copied ? 'rgba(134,239,172,0.92)' : 'rgba(255,255,255,0.50)',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 0 rgba(255,255,255,0.10) inset',
                    }}>
                    <AnimatePresence mode="wait">
                        <motion.span key={copied ? 'ck' : 'cp'}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.15 }}>
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </motion.span>
                    </AnimatePresence>
                    {copied ? 'Copied!' : 'Copy'}
                </motion.button>
            </div>

            {/* ── Code area ──────────────────────────────── */}
            <pre className="overflow-x-auto px-5 py-4 text-xs leading-6"
                style={{
                    fontFamily: "'SF Mono','Fira Code','Fira Mono','Cascadia Code',monospace",
                    color: 'rgba(220,225,240,0.82)',
                    margin: 0,
                    tabSize: 2,
                }}>
                <code dangerouslySetInnerHTML={{ __html: hl(code) }} />
            </pre>

            {/* Token colours (scoped inline) */}
            <style>{`
        i[c]        { font-style: normal; }
        i[c="kw"]   { color: rgba(200,155,255,0.95); }
        i[c="str"]  { color: rgba(134,239,172,0.92); }
        i[c="tag"]  { color: rgba(130,195,255,0.95); }
        i[c="prop"] { color: rgba(251,191,36,0.92); }
        i[c="cmt"]  { color: rgba(255,255,255,0.26); }
      `}</style>
        </div>
    )
}
