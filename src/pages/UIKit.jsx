import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Search, User, Star, ArrowRight, Plus, Download, Trash2, Settings, Bell, Phone, Globe, CreditCard, MapPin, Calendar, Hash, AtSign, Eye, EyeOff, Key, Code2, Copy, Check, LogOut, Droplet, Palette, Sparkles, X } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { Checkbox } from '../components/ui/Checkbox'
import { Toggle } from '../components/ui/Toggle'
import { Avatar } from '../components/ui/Avatar'
import { Spinner } from '../components/ui/Spinner'
import { Alert } from '../components/ui/Alert'
import { ProgressBar } from '../components/ui/ProgressBar'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Copyable } from '../components/ui/Copyable'
import LoginPage from './LoginPage'

// ─── Sidebar nav config ────────────────────────────────────────────────
const NAV = [
    {
        group: 'Introduction', items: [
            { id: 'overview', label: 'Overview', icon: '✨' },
        ]
    },
    {
        group: 'Foundation', items: [
            { id: 'global-styles', label: 'Global Styles', icon: '🎨' },
            { id: 'colors', label: 'Colors', icon: '🌈' },
            { id: 'typography', label: 'Typography', icon: 'Aa' },
        ]
    },
    {
        group: 'Components', items: [
            { id: 'buttons', label: 'Buttons', icon: '⚡' },
            { id: 'inputs', label: 'Inputs', icon: '✏️' },
            { id: 'badges', label: 'Badges', icon: '🏷️' },
            { id: 'cards', label: 'Cards', icon: '🃏' },
            { id: 'controls', label: 'Form Controls', icon: '☑️' },
            { id: 'avatars', label: 'Avatars', icon: '👤' },
            { id: 'spinners', label: 'Spinners', icon: '⏳' },
            { id: 'alerts', label: 'Alerts', icon: '🔔' },
            { id: 'progress', label: 'Progress', icon: '📊' },
        ]
    },
    {
        group: 'Templates', items: [
            { id: 'login-form', label: 'Login Form', icon: '🔐' },
            { id: 'header-template', label: 'Header', icon: '🧭' },
            { id: 'dashboard-template', label: 'Dashboard', icon: '📊' },
            { id: 'pricing-template', label: 'Pricing', icon: '💎' },
            { id: 'testimonials-template', label: 'Testimonials', icon: '💬' },
            { id: 'footer-template', label: 'Footer', icon: '🏁' },
        ]
    },
]

// ─── Section wrapper ───────────────────────────────────────────────────
function Section({ id, title, description, children }) {
    return (
        <section id={id} className="mb-16 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6"
            >
                <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
                {description && <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{description}</p>}
                <div className="mt-3 h-px" style={{ background: 'linear-gradient(to right, rgba(120,160,255,0.50), transparent)' }} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
                {children}
            </motion.div>
        </section>
    )
}

// ─── Typography Item — inline code with copy button ───────────────────────
function TypographyItem({ label, cls, text }) {
    const [showCode, setShowCode] = useState(false)
    const tag = label.startsWith('H') ? label.toLowerCase() : 'p'
    const codeSnippet = `<${tag} className="${cls} glass-text">\n  ${text}\n</${tag}>`

    return (
        <div className="flex flex-col border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex flex-wrap items-center justify-between gap-4 py-3">
                <div className="flex items-baseline gap-4 w-full md:w-auto">
                    <span className="w-16 text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</span>
                    <p className={`${cls} glass-text truncate`}>{text}</p>
                </div>
                {/* Code toggle button */}
                <div className="flex items-center gap-3">
                    <code className="text-[10px] font-mono px-2 py-1 rounded" style={{ color: 'rgba(130,195,255,0.7)', background: 'rgba(255,255,255,0.03)' }}>
                        .{cls.split(' ')[0]}
                    </code>
                    <button onClick={() => setShowCode(!showCode)} className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded hover:bg-white/5 transition-colors cursor-pointer" style={{ color: showCode ? 'rgba(180,210,255,1)' : 'rgba(255,255,255,0.4)', background: showCode ? 'rgba(120,160,255,0.14)' : 'transparent' }}>
                        <Code2 className="w-3 h-3" />
                        View Code
                    </button>
                </div>
            </div>

            {/* Expanded code block */}
            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 pt-1">
                            <div className="rounded-xl overflow-hidden shadow-2xl">
                                <CodeBlock code={codeSnippet} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Color Swatch — clickable copy ───────────────────────────────────────
function ColorSwatch({ c }) {
    const [copied, setCopied] = useState(false)
    const handleCopy = async () => {
        try { await navigator.clipboard.writeText(c) } catch { }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex-1 h-10 rounded-lg relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors"
            style={{ background: c, border: '1px solid rgba(255,255,255,0.15)' }}
            title={c}
        >
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }}
                    >
                        <Check className="w-4 h-4 text-white drop-shadow-md" />
                    </motion.div>
                )}
            </AnimatePresence>
            {!copied && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)' }}>
                    <Copy className="w-3 h-3 text-white drop-shadow-md" />
                </div>
            )}
        </motion.button>
    )
}

// ─── Control Item — Row style for Form Controls ──────────────────────────
function ControlItem({ code, children }) {
    const [showCode, setShowCode] = useState(false)
    return (
        <div className="w-full border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between gap-4 py-4 pr-1 group">
                <div className="flex-1">{children}</div>
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer opacity-40 group-hover:opacity-100"
                    style={{
                        background: showCode ? 'rgba(120,160,255,0.14)' : 'rgba(255,255,255,0.04)',
                        color: showCode ? 'rgba(180,210,255,1)' : 'rgba(255,255,255,0.5)',
                        border: showCode ? '1px solid rgba(130,170,255,0.3)' : '1px solid transparent'
                    }}
                >
                    <Code2 className="w-3 h-3" />
                    {showCode ? 'Hide' : 'Code'}
                </button>
            </div>
            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/5">
                            <CodeBlock code={code} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Demo card — preview + code toggle ───────────────────────────────
function Demo({ title, children, code, deps = [], dark = false }) {
    const [showCode, setShowCode] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.10)', position: 'relative' }}
        >
            {/* Header */}
            <div className="px-4 py-2 border-b flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{title}</span>
                    {deps.length > 0 && (
                        <div className="flex gap-1.5">
                            {deps.map(d => (
                                <span key={d} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider text-white/30 font-bold">
                                    {d}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {code && (
                    <motion.button
                        onClick={() => setShowCode(v => !v)}
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                        style={{
                            background: showCode ? 'rgba(120,160,255,0.18)' : 'rgba(255,255,255,0.08)',
                            border: `1px solid ${showCode ? 'rgba(130,170,255,0.45)' : 'rgba(255,255,255,0.12)'}`,
                            color: showCode ? 'rgba(180,210,255,1)' : 'rgba(255,255,255,0.60)',
                            boxShadow: '0 1px 0 rgba(255,255,255,0.10) inset',
                            transition: 'all 0.2s ease',
                        }}>
                        <Code2 className="w-3.5 h-3.5" />
                        {showCode ? 'Back to Preview' : 'View Code'}
                    </motion.button>
                )}
            </div>

            {/* Content — preview OR code */}
            <AnimatePresence mode="wait">
                {showCode && code ? (
                    <motion.div key="code"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                        className="rounded-b-xl overflow-hidden">
                        <CodeBlock code={code} />
                    </motion.div>
                ) : (
                    <motion.div key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="p-6 flex flex-wrap gap-4 items-center rounded-b-xl"
                        style={{ background: dark ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.015)' }}>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ─── Code snippets per Demo ──────────────────────────────────────────────
const S = {
    globalStyles: `@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Main Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(80px) saturate(200%);
  -webkit-backdrop-filter: blur(80px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow:
    0 48px 120px rgba(0, 0, 0, 0.55),
    0 12px 40px rgba(0, 0, 0, 0.30),
    0 2px 0 rgba(255, 255, 255, 0.55) inset,
    0 -1px 0 rgba(255, 255, 255, 0.06) inset;
}

/* Glass Input */
.glass-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.18) inset,
    0 2px 8px rgba(0, 0, 0, 0.20);
}

/* Primary Button */
.btn-primary {
  background: linear-gradient(160deg, rgba(130, 160, 255, 0.45), rgba(160, 100, 255, 0.30));
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(100, 140, 255, 0.25), 0 2px 0 rgba(255, 255, 255, 0.50) inset;
  backdrop-filter: blur(20px);
}`,
    btnVariants:
        `import { Button } from './components/ui/Button'

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>`,

    btnSizes:
        `<Button size="xs">XS</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XL</Button>`,

    btnIcons:
        `import { Plus, ArrowRight, Download, Trash2 } from 'lucide-react'

<Button leftIcon={<Plus className="w-4 h-4" />}>New Item</Button>
<Button variant="secondary"
  rightIcon={<ArrowRight className="w-4 h-4" />}>
  Continue
</Button>
<Button variant="ghost"
  leftIcon={<Download className="w-4 h-4" />}>
  Download
</Button>
<Button variant="danger"
  leftIcon={<Trash2 className="w-4 h-4" />}>
  Delete
</Button>`,

    btnStates:
        `// Loading state
<Button loading>Signing in</Button>

// Disabled
<Button disabled>Disabled</Button>

// Small loading
<Button variant="secondary" loading size="sm">Loading</Button>`,

    inputCommon:
        `import { Mail, Lock, Search, AtSign } from 'lucide-react'

<Input
  id="email"
  label="Email address"
  type="email"
  placeholder="you@example.com"
  icon={<Mail className="w-4 h-4" />}
/>
<Input
  id="password"
  label="Password"
  type="password"
  placeholder="••••••••"
  icon={<Lock className="w-4 h-4" />}
/>
<Input
  id="search"
  label="Search"
  placeholder="Search anything..."
  icon={<Search className="w-4 h-4" />}
/>`,

    inputMore:
        `import { Phone, Globe, CreditCard, MapPin, Calendar, Hash } from 'lucide-react'

<Input label="Phone" type="tel"
  placeholder="+1 (555) 000-0000"
  icon={<Phone className="w-4 h-4" />} />

<Input label="Website" type="url"
  placeholder="https://example.com"
  icon={<Globe className="w-4 h-4" />} />

<Input label="Card number"
  placeholder="4242 4242 4242 4242"
  icon={<CreditCard className="w-4 h-4" />} />

<Input label="Location"
  placeholder="City, Country"
  icon={<MapPin className="w-4 h-4" />} />`,

    inputStates:
        `// Error state
<Input
  label="Email"
  icon={<Mail className="w-4 h-4" />}
  error="Invalid email format"
  value="wrong@@"
  onChange={() => {}}
/>

// Success state
<Input
  label="Username"
  icon={<AtSign className="w-4 h-4" />}
  success="Username is available!"
  value="johndoe"
  onChange={() => {}}
/>

// Disabled
<Input
  label="API Key"
  icon={<Key className="w-4 h-4" />}
  disabled
  value="sk-live-xxxxxxxxxxxx"
/>`,

    badgeSolid:
        `<Badge color="purple">Purple</Badge>
<Badge color="blue">Blue</Badge>
<Badge color="green">Green</Badge>
<Badge color="red">Red</Badge>
<Badge color="amber">Amber</Badge>
<Badge color="cyan">Cyan</Badge>
<Badge color="gray">Gray</Badge>`,

    badgeOutline:
        `<Badge color="purple" outline>Purple</Badge>
<Badge color="blue"   outline>Blue</Badge>
<Badge color="green"  outline>Green</Badge>`,

    badgeDot:
        `<Badge color="green"  dot>Online</Badge>
<Badge color="amber"  dot>Away</Badge>
<Badge color="red"    dot>Offline</Badge>
<Badge color="blue"   dot>In Progress</Badge>`,

    badgeSizes:
        `<Badge color="purple" size="sm">Small</Badge>
<Badge color="blue"   size="md">Medium</Badge>
<Badge color="green"  size="lg">Large</Badge>`,

    avatarSizes:
        `<Avatar initials="JD" size="xs" colorIndex={0} />
<Avatar initials="AB" size="sm" colorIndex={1} />
<Avatar initials="NK" size="md" colorIndex={2} />
<Avatar initials="TM" size="lg" colorIndex={3} />
<Avatar initials="GU" size="xl" colorIndex={4} />`,

    avatarStatus:
        `<Avatar initials="JD" status="online"  colorIndex={0} />
<Avatar initials="AB" status="away"    colorIndex={1} />
<Avatar initials="NK" status="busy"    colorIndex={2} />
<Avatar initials="TM" status="offline" colorIndex={3} />`,

    spinnerSizes:
        `<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`,

    spinnerColors:
        `<Spinner size="md" color="rgba(100,140,255,0.9)" />
<Spinner size="md" color="rgba(74,222,128,0.9)"  />
<Spinner size="md" color="rgba(248,113,113,0.9)" />
<Spinner size="md" color="rgba(251,191,36,0.9)"  />
<Spinner size="md" color="rgba(160,100,255,0.9)" />`,

    cards:
        `<Card variant="default">
  <h3 className="text-sm">Default</h3>
</Card>
<Card variant="elevated">
  <h3 className="text-sm">Elevated</h3>
</Card>
<Card variant="flat">
  <h3 className="text-sm">Flat</h3>
</Card>
<Card variant="border">
  <h3 className="text-sm">Border Only</h3>
</Card>`,

    controlsCheckboxes:
        `<Checkbox id="cb-a" label="Unchecked default" checked={false} />
<Checkbox id="cb-b" label="Checked state" checked={true} />
<Checkbox id="cb-c" label="Another option" checked={false} />
<Checkbox id="cb-d" label="Disabled option" checked={false} disabled />`,

    controlsToggles:
        `<Toggle label="Notifications" checked={true} />
<Toggle label="Dark mode" size="sm" checked={false} />
<Toggle label="Auto-save" size="lg" checked={true} />
<Toggle label="Disabled" checked={false} disabled />`,

    avatarColors:
        `<Avatar initials="JD" colorIndex={0} size="lg" />
<Avatar initials="KL" colorIndex={1} size="lg" />
<Avatar initials="MN" colorIndex={2} size="lg" />
<Avatar initials="OP" colorIndex={3} size="lg" />
<Avatar initials="QR" colorIndex={4} size="lg" />`,

    alerts:
        `<Alert type="info" title="Information" message="Session expiring soon." />
<Alert type="success" title="Success!" message="Changes saved successfully." />
<Alert type="warning" title="Warning" message="Approaching storage limit." />
<Alert type="error" title="Error" message="Failed to connect." />
<Alert type="info" title="Info" message="..." dismissible />`,

    progress:
        `<ProgressBar value={25} color="blue" size="md" showLabel />
<ProgressBar value={50} color="green" size="md" showLabel />
<ProgressBar value={75} color="amber" size="md" showLabel />
<ProgressBar value={90} color="red" size="lg" showLabel />
<ProgressBar value={100} color="blue" size="sm" showLabel />`,

    loginTemplate:
        `export function LoginForm() {
    return (
        <div className="glass-card rounded-3xl p-7 relative"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg,rgba(100,140,255,0.3),rgba(160,100,255,0.3))' }}>
                    🔐
                </div>
                <h3 className="text-xl font-semibold text-white mb-0.5">Welcome back</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Sign in to your account</p>
            </div>
            <form className="space-y-4">
                <Input id="email" label="Email" type="email" placeholder="name@example.com" />
                <Input id="password" label="Password" type="password" placeholder="••••••••" />
                <Checkbox id="remember" label="Remember me for 30 days" checked={false} />
                <Button type="submit" fullWidth size="lg">Sign in</Button>
            </form>
        </div>
    )
}`,

    headerTemplate:
        `export function Header() {
    return (
        <div className="w-full h-16 rounded-2xl flex items-center justify-between px-8" 
            style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                backdropFilter: 'blur(30px) saturate(150%)' 
            }}>
            <div className="flex items-center gap-2.5">
                <div className="text-xl">💧</div>
                <span className="font-bold text-white text-sm uppercase">LucidUI</span>
            </div>
            <nav className="hidden lg:flex items-center gap-10">
                <a href="#" className="text-white text-[13px] font-semibold">Products</a>
                <a href="#" className="text-white/40 text-[13px] font-semibold ml-6">Resources</a>
            </nav>
            <div className="flex items-center gap-6">
                <Button variant="ghost" size="xs">Sign In</Button>
                <Button variant="primary" size="xs" className="!rounded-lg bg-white text-black border-none px-5">Get Started</Button>
            </div>
        </div>
    )
}`,

    dashboardTemplate:
        `export function Dashboard() {
    return (
        <div className="w-full h-[520px] flex rounded-3xl overflow-hidden relative" 
            style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255,255,255,0.12)', 
                backdropFilter: 'blur(40px) saturate(220%)' 
            }}>
            {/* Sidebar */}
            <div className="w-56 h-full border-r flex flex-col p-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="text-xl">💧</div>
                    <span className="font-bold text-white">LucidApp</span>
                </div>
                <nav className="flex flex-col gap-1">
                    <div className="px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-medium">Overview</div>
                    <div className="px-3 py-2 rounded-xl text-white/40 text-xs font-medium hover:bg-white/5">Analytics</div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b flex items-center justify-between px-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-sm font-semibold text-white">Overview</span>
                    <Avatar initials="JD" size="sm" status="online" />
                </header>
                <main className="p-8 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-5 mb-6">
                        <Card variant="flat" className="!bg-white/[0.03] !border-white/5 p-5">
                            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-1">Revenue</h4>
                            <div className="text-2xl font-bold text-white">$45,231.89</div>
                        </Card>
                    <Card className="!bg-white/[0.02] border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-white/30">Activity</h4>
                            <Button variant="ghost" size="xs">View all</Button>
                        </div>
                    </Card>
                    </div>
                </main>
            </div>
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
    )
}` ,

    pricingTemplate:
        `export function Pricing() {
    const [annual, setAnnual] = useState(true);

    return (
        <div className="w-full max-w-5xl mx-auto relative px-4 flex flex-col items-center">
            <div className="mb-12 flex items-center gap-4 bg-white/[0.05] p-2 rounded-full border border-white/10 backdrop-blur-md">
                <button onClick={() => setAnnual(false)} className={\`px-6 py-2 rounded-full text-sm font-semibold transition-all \${!annual ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white/80'}\`}>Monthly</button>
                <button onClick={() => setAnnual(true)} className={\`px-6 py-2 rounded-full text-sm font-semibold transition-all \${annual ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white/80'}\`}>Annually <span className="text-[10px] ml-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">-20%</span></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {[
                    { plan: 'Basic', priceMonth: 19, priceYear: 15, desc: 'Essential tools for individuals.', features: ['1 Project', 'Basic Analytics', 'Community Support'] },
                    { plan: 'Professional', priceMonth: 49, priceYear: 39, tech: true, desc: 'Advanced features for scaling teams.', features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domains'] },
                    { plan: 'Enterprise', priceMonth: 199, priceYear: 159, desc: 'Maximum performance and security.', features: ['Dedicated Account Manager', 'SSO & SAML', 'Custom SLAs', 'On-premise option'] }
                ].map((p) => (
                    <div key={p.plan} className={\`w-full flex flex-col p-8 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 \${p.tech ? 'bg-white/[0.08] border-white/20 shadow-[-0_20px_80px_rgba(255,255,255,0.05)] -translate-y-2' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}\`}>
                        {p.tech && <div className="absolute top-0 inset-x-0 mx-auto w-fit px-4 py-1.5 -translate-y-1/2 bg-white text-black text-[10px] font-bold rounded-full tracking-widest shadow-xl">RECOMMENDED</div>}
                        <h3 className="text-xl font-bold text-white mb-2">{p.plan}</h3>
                        <p className="text-sm text-white/50 mb-6">{p.desc}</p>
                        <div className="mb-8 flex items-end gap-1">
                            <span className="text-3xl font-medium text-white/50">$</span>
                            <span className="text-6xl font-semibold text-white tracking-tighter">{annual ? p.priceYear : p.priceMonth}</span>
                        </div>
                        <Button variant={p.tech ? 'primary' : 'ghost'} fullWidth className={\`!rounded-[1rem] !py-4 mb-10 font-bold \${p.tech ? 'bg-white text-black !hover:bg-neutral-200' : 'bg-white/5 border border-white/10 text-white'}\`}>Get Started</Button>
                        <ul className="space-y-4">
                            {p.features.map((f, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-white/70">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-white/10 shrink-0">✓</div>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}`,

    testimonialsTemplate:
        `export function Testimonials() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-6 relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

            {[
                { name: 'Alex Rivera', role: 'VP of Design, Stark', tag: '@arivera', initials: 'AR', text: "The cleanest UI kit I've ever used. The attention to spacing and typography makes every component feel insanely premium out of the box." },
                { name: 'Sarah Chen', role: 'Frontend Lead, Orbit', tag: '@sarahc_dev', initials: 'SC', text: "Finally, a glassmorphism library that doesn't overdo the blur and saturation. It integrates perfectly with our existing design system." },
                { name: 'David Kim', role: 'Founder, Nexus', tag: '@dkim_builds', initials: 'DK', text: "We rebuilt our dashboard with Lucid UI in 2 days. The code is structured beautifully and the visual output is just stunning." }
            ].map((t) => (
                <div key={t.name} className="p-8 h-full rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all duration-500 backdrop-blur-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex gap-1 mb-6 text-yellow-500/80">
                            {[1,2,3,4,5].map(star => <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        </div>
                        <p className="text-[15px] text-white/70 leading-relaxed mb-8 font-medium">"{t.text}"</p>
                    </div>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white/80 text-sm">{t.initials}</div>
                        <div>
                            <div className="font-bold text-white text-sm">{t.name}</div>
                            <div className="text-[12px] text-white/40">{t.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}`,

    footerTemplate:
        `export function Footer() {
    return (
        <div className="w-full pt-16 pb-8 px-10 rounded-3xl border-t border-white/10" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <div className="grid grid-cols-4 gap-12 mb-16">
                <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-xl">💧</div>
                        <span className="font-bold text-white">Lucid UI</span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">Crafting the next generation of visual experiences with glassmorphism.</p>
                </div>
                {['Products', 'Company', 'Legal'].map(g => (
                    <div key={g}>
                        <h4 className="font-bold text-white mb-6 text-sm">{g}</h4>
                        <div className="flex flex-col gap-4 text-sm text-white/30">
                            <span>Features</span><span>Pricing</span><span>Support</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-8 border-t border-white/5 flex justify-between items-center text-xs text-white/20">
                <span>© 2026 LucidUI Framework.</span>
                <div className="flex gap-6"><span>Twitter</span><span>Discord</span></div>
            </div>
        </div>
    )
}`
}

// ─── Colors section data ───────────────────────────────────────────────
const PALETTE = [
    { name: 'Primary', colors: ['rgba(100,140,255,1)', 'rgba(130,160,255,1)', 'rgba(160,190,255,1)', 'rgba(200,215,255,1)'] },
    { name: 'Accent', colors: ['rgba(160,100,255,1)', 'rgba(180,130,255,1)', 'rgba(200,160,255,1)', 'rgba(220,190,255,1)'] },
    { name: 'Success', colors: ['rgba(34,197,94,1)', 'rgba(74,222,128,1)', 'rgba(134,239,172,1)', 'rgba(187,247,208,1)'] },
    { name: 'Danger', colors: ['rgba(239,68,68,1)', 'rgba(248,113,113,1)', 'rgba(252,165,165,1)', 'rgba(254,202,202,1)'] },
    { name: 'Warning', colors: ['rgba(245,158,11,1)', 'rgba(251,191,36,1)', 'rgba(253,230,138,1)', 'rgba(254,243,199,1)'] },
    { name: 'Surface', colors: ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.10)', 'rgba(255,255,255,0.15)'] },
]

export default function UIKit() {
    const [activeSection, setActiveSection] = useState('overview')
    const [checkStates, setCheckStates] = useState({ a: false, b: true, c: false })
    const [toggleStates, setToggleStates] = useState({ notifications: true, darkMode: false, autoSave: true })
    const contentRef = useRef(null)
    const [showCustomizer, setShowCustomizer] = useState(false)

    // Theme Customizer State
    const [theme, setTheme] = useState({
        blur: 80,
        saturation: 200,
        opacity: 0.04,
        border: 0.20,
        bg: '#0a0a14',
        bgEnd: '#0d0d1f',
        grad: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1f 60%, #0a0a18 100%)',
        accent: 'linear-gradient(160deg, rgba(130, 160, 255, 0.45) 0%, rgba(160, 100, 255, 0.30) 100%)',
        accentStart: '#82a0ff',
        accentEnd: '#a064ff',
        pattern: true
    })

    // Simple harmony: take custom color and make it brighter/saturated for accent
    const getHarmonizedAccent = (hex) => {
        // Simple heuristic: if it's very dark, make it a bright version of itself
        // Mapping simple hues for a better "automatic" feel
        return hex // For now, we allow the user to pick, but we can automate if needed
    }

    const updateBg = (hex) => {
        // When BG changes, we can try to find a matching accent
        // But the user might want full control. 
        // Let's implement "Auto-Accent" by brightening the BG hex.
        const brighten = (col, amt) => {
            let num = parseInt(col.slice(1), 16);
            let r = (num >> 16) + amt;
            let g = ((num >> 8) & 0x00FF) + amt;
            let b = (num & 0x0000FF) + amt;
            r = Math.min(255, Math.max(0, r));
            g = Math.min(255, Math.max(0, g));
            b = Math.min(255, Math.max(0, b));
            return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
        }
        setTheme(prev => ({ ...prev, bg: hex, accent: brighten(hex, 100), grad: null }))
    }

    // Map theme to CSS variables
    const themeStyles = {
        '--glass-blur': `${theme.blur}px`,
        '--glass-saturation': `${theme.saturation}%`,
        '--glass-opacity': theme.opacity,
        '--glass-border': theme.border,
        '--accent-color': theme.accent,
        background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 50%, #0a0a18 100%)`
    }

    // Scroll spy
    useEffect(() => {
        const allIds = NAV.flatMap(g => g.items.map(i => i.id))
        const handler = () => {
            for (const id of [...allIds].reverse()) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top <= 100) {
                    setActiveSection(id)
                    break
                }
            }
        }
        const container = contentRef.current
        container?.addEventListener('scroll', handler)
        return () => container?.removeEventListener('scroll', handler)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveSection(id)
    }

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-700 ${theme.pattern ? 'grain-overlay' : ''}`} style={themeStyles}>

            {/* ── Sidebar ── */}
            <aside className="w-60 flex-shrink-0 flex flex-col h-full"
                style={{ background: 'rgba(255,255,255,0.035)', borderRight: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>

                {/* Brand */}
                <div className="px-5 pt-6 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="text-lg">💧</div>
                        <span className="text-sm font-semibold text-white">Lucid UI</span>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Component Library v1.0</span>
                </div>

                {/* Nav groups */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
                    {NAV.map(({ group, items }) => (
                        <div key={group}>
                            <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>{group}</p>
                            {items.map(({ id, label, icon }) => {
                                const active = activeSection === id
                                return (
                                    <motion.button key={id} onClick={() => scrollTo(id)} whileTap={{ scale: 0.96 }}
                                        whileHover={{ x: 2 }}
                                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm mb-0.5 text-left cursor-pointer"
                                        style={{
                                            background: active ? 'rgba(120,160,255,0.14)' : 'transparent',
                                            color: active ? 'rgba(190,215,255,0.95)' : 'rgba(255,255,255,0.45)',
                                            borderLeft: active ? '2px solid rgba(140,180,255,0.80)' : '2px solid transparent',
                                            boxShadow: active ? '0 1px 0 rgba(255,255,255,0.08) inset' : 'none',
                                            transition: 'all 0.18s ease',
                                        }}>
                                        <span className="text-base leading-none">{icon}</span>
                                        <span className="font-medium">{label}</span>
                                    </motion.button>
                                )
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer link */}
                <div className="px-5 pb-5 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <Link to="/"
                        className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                        style={{ color: 'rgba(255,255,255,0.35)' }}>
                        <span>←</span><span>Back to Login</span>
                    </Link>
                </div>
            </aside>

            {/* ── Main content ── */}
            <main ref={contentRef} className="flex-1 overflow-y-auto">
                {/* Top bar */}
                <header className="sticky top-0 z-30 px-8 py-4 flex items-center justify-between"
                    style={{ background: 'rgba(10,10,20,0.8)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
                    <div>
                        <h1 className="text-base font-semibold text-white">Component Library</h1>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Lucid UI Kit — Apple-inspired glassmorphism</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge color="purple" dot size="sm">v1.0</Badge>
                        <Badge color="green" dot size="sm">10 Components</Badge>
                    </div>
                </header>

                {/* Content area */}
                <div className="px-10 py-12 max-w-7xl mx-auto w-full">

                    {/* ── CINEMATIC OVERVIEW ── */}
                    <div id="overview" className="mb-32 relative scroll-mt-32">
                        {/* Soft ambient background glows */}
                        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute top-20 -right-24 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10"
                        >
                            <Badge color="blue" outline size="sm" className="mb-8">Documentation — Version 1.0</Badge>

                            <h1 className="text-4xl font-bold text-white tracking-tighter mb-6 leading-tight">
                                Lucid UI: The Architecture <br />
                                of Cinematic Depth.
                            </h1>

                            <p className="text-lg max-w-3xl leading-relaxed text-white/40 mb-10 font-medium">
                                A high-performance design system built for the next generation of spatial web interfaces.
                                We combine physical refraction with performant glassmorphism to create
                                deep, immersive digital environments.
                            </p>

                            <button
                                onClick={() => scrollTo('login-form')}
                                className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group mb-14"
                            >
                                Explore Template Library
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl">
                                <div className="space-y-12">
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-white font-bold text-sm uppercase tracking-widest">How it works</h3>
                                        </div>
                                        <p className="text-sm leading-relaxed text-white/30">
                                            Lucid UI utilizes dynamic CSS variables to control a "Living Glass" engine.
                                            By mapping theme tokens to backdrop filters and specular gradients,
                                            components react in real-time to background data, light sources, and user interaction.
                                        </p>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-white font-bold text-sm uppercase tracking-widest">About this App</h3>
                                        </div>
                                        <p className="text-sm leading-relaxed text-white/30">
                                            This application acts as the definitive manifest for the Lucid UI framework.
                                            It's a living environment where developers can test components, manipulate
                                            theme variables, and extract production-ready code directly into their projects.
                                        </p>
                                    </section>
                                </div>

                                <div className="hidden lg:block border-l border-white/5 pl-12">
                                    <h3 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Key Principles</h3>
                                    <div className="space-y-8">
                                        {[
                                            { t: 'Sub-Pixel Precision', d: 'Borders and refractions rendered at sub-pixel levels for retina clarity.' },
                                            { t: 'Contextual Awareness', d: 'Components that adapt their transparency and blur based on environment.' },
                                            { t: 'Atomic Scalability', d: 'Architecture designed for everything from small modals to full dashboards.' }
                                        ].map((principle, idx) => (
                                            <div key={idx} className="group cursor-default">
                                                <div className="text-white font-bold text-xs mb-2 transition-colors group-hover:text-blue-400">{principle.t}</div>
                                                <div className="text-[11px] text-white/20 leading-relaxed">{principle.d}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── GLOBAL STYLES ── */}
                    <Section id="global-styles" title="Global Styles" description="The core CSS required for the Lucid UI glassmorphism effects and animations.">
                        <CodeBlock code={`@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  /* Dynamic tokens from Theme Customizer */
  --glass-blur: ${theme.blur}px;
  --glass-saturation: ${theme.saturation}%;
  --glass-opacity: ${theme.opacity};
  --glass-border: ${theme.border};
  --accent-color: ${theme.accent};
  --bg-start: ${theme.bg};
  --bg-end: ${theme.bgEnd};
}

/* Main Glass Card */
.glass-card {
  background: rgba(255, 255, 255, var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid rgba(255, 255, 255, var(--glass-border));
  box-shadow:
    0 48px 120px rgba(0, 0, 0, 0.55),
    0 12px 40px rgba(0, 0, 0, 0.30),
    /* Signature Liquid Glass specular highlight */
    0 2px 0 rgba(255, 255, 255, 0.55) inset,
    0 -1px 0 rgba(255, 255, 255, 0.06) inset;
}

/* Glass Input */
.glass-input {
  background: rgba(255, 255, 255, var(--glass-opacity));
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.18) inset,
    0 2px 8px rgba(0, 0, 0, 0.20);
}

/* Primary Button */
.btn-primary {
  background: var(--accent-color);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(100, 140, 255, 0.25), 0 2px 0 rgba(255, 255, 255, 0.50) inset;
  backdrop-filter: blur(20px);
}`} lang="css" />
                    </Section>

                    {/* ── COLORS ── */}
                    <Section id="colors" title="Colors" description="The complete glass UI color palette with semantic color tokens.">
                        <div className="space-y-4">
                            {PALETTE.map(({ name, colors }) => (
                                <div key={name} className="flex items-center gap-3">
                                    <span className="w-20 text-xs font-medium flex-shrink-0" style={{ color: 'rgba(255,255,255,0.45)' }}>{name}</span>
                                    <div className="flex gap-2 flex-1">
                                        {colors.map((c, i) => <ColorSwatch key={i} c={c} />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* ── TYPOGRAPHY ── */}
                    <Section id="typography" title="Typography" description="Type scale using Inter with anti-aliasing and optical tracking.">
                        <Card variant="flat" padding="lg">
                            <div className="space-y-5">
                                {[
                                    { label: 'Display', cls: 'text-4xl font-bold tracking-tight', text: 'The quick brown fox' },
                                    { label: 'H1', cls: 'text-3xl font-semibold tracking-tight', text: 'Heading One' },
                                    { label: 'H2', cls: 'text-2xl font-semibold', text: 'Heading Two' },
                                    { label: 'H3', cls: 'text-xl font-medium', text: 'Heading Three' },
                                    { label: 'Body', cls: 'text-base', text: 'Body text — regular weight, comfortable reading size for paragraphs.' },
                                    { label: 'Small', cls: 'text-sm', text: 'Small text for captions, labels, and secondary information.' },
                                    { label: 'XS', cls: 'text-xs tracking-wide uppercase font-medium', text: 'MICRO LABEL' },
                                ].map(props => (
                                    <TypographyItem key={props.label} {...props} />
                                ))}
                            </div>
                        </Card>
                    </Section>

                    {/* ── BUTTONS ── */}
                    <Section id="buttons" title="Buttons" description="Five variants, five sizes, icon support, loading states.">
                        <div className="space-y-4">
                            <Demo title="Variants" code={S.btnVariants}>
                                {[
                                    { v: 'primary', l: 'Primary' },
                                    { v: 'secondary', l: 'Secondary' },
                                    { v: 'ghost', l: 'Ghost' },
                                    { v: 'danger', l: 'Danger' },
                                    { v: 'success', l: 'Success' },
                                ].map(({ v, l }) => (
                                    <Copyable key={v} code={`<Button variant="${v}">${l}</Button>`}>
                                        <Button variant={v}>{l}</Button>
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="Sizes" code={S.btnSizes}>
                                {[
                                    { s: 'xs', l: 'Extra Small' },
                                    { s: 'sm', l: 'Small' },
                                    { s: 'md', l: 'Medium' },
                                    { s: 'lg', l: 'Large' },
                                    { s: 'xl', l: 'Extra Large' },
                                ].map(({ s, l }) => (
                                    <Copyable key={s} code={`<Button size="${s}">${l}</Button>`}>
                                        <Button size={s}>{l}</Button>
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="With Icons" code={S.btnIcons}>
                                <Copyable code={`<Button leftIcon={<Plus className="w-4 h-4" />}>New Item</Button>`}>
                                    <Button leftIcon={<Plus className="w-4 h-4" />}>New Item</Button>
                                </Copyable>
                                <Copyable code={`<Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>`}>
                                    <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>
                                </Copyable>
                                <Copyable code={`<Button variant="ghost" leftIcon={<Download className="w-4 h-4" />}>Download</Button>`}>
                                    <Button variant="ghost" leftIcon={<Download className="w-4 h-4" />}>Download</Button>
                                </Copyable>
                                <Copyable code={`<Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>Delete</Button>`}>
                                    <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>Delete</Button>
                                </Copyable>
                            </Demo>
                            <Demo title="States" code={S.btnStates}>
                                <Copyable code={`<Button loading>Signing in</Button>`}>
                                    <Button loading>Signing in</Button>
                                </Copyable>
                                <Copyable code={`<Button disabled>Disabled</Button>`}>
                                    <Button disabled>Disabled</Button>
                                </Copyable>
                                <Copyable code={`<Button variant="secondary" loading size="sm">Loading</Button>`}>
                                    <Button variant="secondary" loading size="sm">Loading</Button>
                                </Copyable>
                            </Demo>
                        </div>
                    </Section>

                    {/* ── INPUTS ── */}
                    <Section id="inputs" title="Inputs" description="Lucid UI inputs — shimmer on focus, animated label accent, icon color transitions, glow ring.">
                        <div className="space-y-5">

                            {/* Row 1: Common fields */}
                            <Demo title="Common fields" code={S.inputCommon}>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Input id="i-email" label="Email address" type="email" placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} />
                                    <Input id="i-password" label="Password" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
                                    <Input id="i-search" label="Search" placeholder="Search anything..." icon={<Search className="w-4 h-4" />} />
                                    <Input id="i-user" label="Username" placeholder="@handle" icon={<AtSign className="w-4 h-4" />} />
                                </div>
                            </Demo>

                            {/* Row 2: More icon types */}
                            <Demo title="More icons" code={S.inputMore}>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Input id="i-phone" label="Phone number" type="tel" placeholder="+1 (555) 000-0000" icon={<Phone className="w-4 h-4" />} />
                                    <Input id="i-website" label="Website" type="url" placeholder="https://example.com" icon={<Globe className="w-4 h-4" />} />
                                    <Input id="i-card" label="Card number" placeholder="4242 4242 4242 4242" icon={<CreditCard className="w-4 h-4" />} />
                                    <Input id="i-location" label="Location" placeholder="City, Country" icon={<MapPin className="w-4 h-4" />} />
                                    <Input id="i-date" label="Date" type="date" icon={<Calendar className="w-4 h-4" />} placeholder="Pick a date" />
                                    <Input id="i-code" label="Promo code" placeholder="GLASS2026" icon={<Hash className="w-4 h-4" />} helperText="Enter a valid promo code" />
                                </div>
                            </Demo>

                            {/* Row 3: States */}
                            <Demo title="States" code={S.inputStates}>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Input id="i-err" label="Email" placeholder="name@example.com" icon={<Mail className="w-4 h-4" />} error="Invalid email format" value="wrong@@" onChange={() => { }} />
                                    <Input id="i-ok" label="Username" placeholder="@handle" icon={<AtSign className="w-4 h-4" />} success="Username is available!" value="johndoe" onChange={() => { }} />
                                    <Input id="i-disabled" label="API Key" placeholder="sk-live-xxxx" icon={<Key className="w-4 h-4" />} disabled value="sk-live-xxxxxxxxxxxx" />
                                    <Input id="i-helper" label="Password" type="password" placeholder="Min 8 characters" icon={<Lock className="w-4 h-4" />} helperText="Use uppercase, numbers and symbols" />
                                </div>
                            </Demo>

                        </div>
                    </Section>

                    {/* ── BADGES ── */}
                    <Section id="badges" title="Badges" description="Color-coded status indicators with optional pulse dot.">
                        <div className="space-y-4">
                            <Demo title="Solid variants" code={S.badgeSolid}>
                                {['purple', 'blue', 'green', 'red', 'amber', 'cyan', 'gray'].map(c => (
                                    <Copyable key={c} code={`<Badge color="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</Badge>`}>
                                        <Badge color={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Badge>
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="Outline variants" code={S.badgeOutline}>
                                {['purple', 'blue', 'green', 'red', 'amber', 'cyan'].map(c => (
                                    <Copyable key={c} code={`<Badge color="${c}" outline>${c.charAt(0).toUpperCase() + c.slice(1)}</Badge>`}>
                                        <Badge color={c} outline>{c.charAt(0).toUpperCase() + c.slice(1)}</Badge>
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="With dot indicators" code={S.badgeDot}>
                                <Copyable code={`<Badge color="green" dot>Online</Badge>`}><Badge color="green" dot>Online</Badge></Copyable>
                                <Copyable code={`<Badge color="amber" dot>Away</Badge>`}><Badge color="amber" dot>Away</Badge></Copyable>
                                <Copyable code={`<Badge color="red" dot>Offline</Badge>`}><Badge color="red" dot>Offline</Badge></Copyable>
                                <Copyable code={`<Badge color="blue" dot>In Progress</Badge>`}><Badge color="blue" dot>In Progress</Badge></Copyable>
                                <Copyable code={`<Badge color="purple" dot>Pending Review</Badge>`}><Badge color="purple" dot>Pending Review</Badge></Copyable>
                                <Copyable code={`<Badge color="gray" dot>Draft</Badge>`}><Badge color="gray" dot>Draft</Badge></Copyable>
                            </Demo>
                            <Demo title="Sizes" code={S.badgeSizes}>
                                {[['purple', 'sm', 'Small'], ['blue', 'md', 'Medium'], ['green', 'lg', 'Large']].map(([c, s, l]) => (
                                    <Copyable key={s} code={`<Badge color="${c}" size="${s}">${l}</Badge>`}>
                                        <Badge color={c} size={s}>{l}</Badge>
                                    </Copyable>
                                ))}
                            </Demo>
                        </div>
                    </Section>

                    {/* ── CARDS ── */}
                    <Section id="cards" title="Cards" description="Four glass card variants for different content hierarchy levels.">
                        <Demo title="Card variants" code={S.cards} deps={['Card', 'Badge']}>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {[
                                    { v: 'default', label: 'Default', desc: 'Standard glass card with backdrop blur and subtle border.' },
                                    { v: 'elevated', label: 'Elevated', desc: 'Stronger shadow and more prominent blur for modals or dialogs.' },
                                    { v: 'flat', label: 'Flat', desc: 'Minimal version with less visual weight, good for nested content.' },
                                    { v: 'border', label: 'Border Only', desc: 'Transparent background with border for low-emphasis containers.' },
                                ].map(({ v, label, desc }) => (
                                    <Copyable block key={v} code={`<Card variant="${v}">\n  <Badge color="purple" size="sm" className="mb-3">${label}</Badge>\n  <h3 className="text-sm font-semibold text-white mb-1">${label} Card</h3>\n  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>${desc}</p>\n</Card>`}>
                                        <Card variant={v}>
                                            <Badge color="purple" size="sm" className="mb-3">{label}</Badge>
                                            <h3 className="text-sm font-semibold text-white mb-1">{label} Card</h3>
                                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
                                        </Card>
                                    </Copyable>
                                ))}
                            </div>
                        </Demo>
                    </Section>

                    {/* ── FORM CONTROLS ── */}
                    <Section id="controls" title="Form Controls" description="Checkbox and Toggle with animated transitions and accessible roles.">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Demo title="Checkboxes" code={S.controlsCheckboxes} deps={['Checkbox']}>
                                <div className="flex flex-col w-full">
                                    <ControlItem code={`<Checkbox id="cb-a" label="Unchecked default" checked={false} />`}>
                                        <Checkbox id="cb-a" label="Unchecked default" checked={checkStates.a} onChange={v => setCheckStates(s => ({ ...s, a: v }))} />
                                    </ControlItem>
                                    <ControlItem code={`<Checkbox id="cb-b" label="Checked state" checked={true} />`}>
                                        <Checkbox id="cb-b" label="Checked state" checked={checkStates.b} onChange={v => setCheckStates(s => ({ ...s, b: v }))} />
                                    </ControlItem>
                                    <ControlItem code={`<Checkbox id="cb-c" label="Another option" checked={false} />`}>
                                        <Checkbox id="cb-c" label="Another option" checked={checkStates.c} onChange={v => setCheckStates(s => ({ ...s, c: v }))} />
                                    </ControlItem>
                                    <ControlItem code={`<Checkbox id="cb-d" label="Disabled option" checked={false} disabled />`}>
                                        <Checkbox id="cb-d" label="Disabled option" checked={false} disabled />
                                    </ControlItem>
                                </div>
                            </Demo>
                            <Demo title="Toggles" code={S.controlsToggles} deps={['Toggle']}>
                                <div className="flex flex-col w-full">
                                    <ControlItem code={`<Toggle label="Notifications" checked={true} />`}>
                                        <Toggle label="Notifications" checked={toggleStates.notifications} onChange={v => setToggleStates(s => ({ ...s, notifications: v }))} />
                                    </ControlItem>
                                    <ControlItem code={`<Toggle label="Dark mode" size="sm" checked={false} />`}>
                                        <Toggle label="Dark mode" size="sm" checked={toggleStates.darkMode} onChange={v => setToggleStates(s => ({ ...s, darkMode: v }))} />
                                    </ControlItem>
                                    <ControlItem code={`<Toggle label="Auto-save" size="lg" checked={true} />`}>
                                        <Toggle label="Auto-save" size="lg" checked={toggleStates.autoSave} onChange={v => setToggleStates(s => ({ ...s, autoSave: v }))} />
                                    </ControlItem>
                                    <ControlItem code={`<Toggle label="Disabled" checked={false} disabled />`}>
                                        <Toggle label="Disabled" checked={false} disabled />
                                    </ControlItem>
                                </div>
                            </Demo>
                        </div>
                    </Section>

                    {/* ── AVATARS ── */}
                    <Section id="avatars" title="Avatars" description="User avatars with initials, gradient backgrounds, and status indicators.">
                        <div className="space-y-4">
                            <Demo title="Sizes" code={S.avatarSizes}>
                                {['xs', 'sm', 'md', 'lg', 'xl'].map((s, i) => (
                                    <Copyable key={s} code={`<Avatar initials="${['JD', 'AB', 'NK', 'TM', 'GU'][i]}" size="${s}" colorIndex={${i}} />`}>
                                        <Avatar initials={['JD', 'AB', 'NK', 'TM', 'GU'][i]} size={s} colorIndex={i} />
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="With status" code={S.avatarStatus}>
                                {[['JD', 'online', 0], ['AB', 'away', 1], ['NK', 'busy', 2], ['TM', 'offline', 3]].map(([init, status, ci]) => (
                                    <Copyable key={status} code={`<Avatar initials="${init}" status="${status}" colorIndex={${ci}} />`}>
                                        <Avatar initials={init} status={status} colorIndex={ci} />
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="Color variants" code={S.avatarColors}>
                                {[0, 1, 2, 3, 4].map(i => {
                                    const init = ['JD', 'KL', 'MN', 'OP', 'QR'][i];
                                    return (
                                        <Copyable key={i} code={`<Avatar initials="${init}" colorIndex={${i}} size="lg" />`}>
                                            <Avatar initials={init} colorIndex={i} size="lg" />
                                        </Copyable>
                                    )
                                })}
                            </Demo>
                        </div>
                    </Section>

                    {/* ── SPINNERS ── */}
                    <Section id="spinners" title="Spinners" description="Loading indicators in five sizes with customizable color.">
                        <div className="space-y-4">
                            <Demo title="Sizes" dark code={S.spinnerSizes}>
                                {['xs', 'sm', 'md', 'lg', 'xl'].map(s => (
                                    <Copyable key={s} code={`<Spinner size="${s}" />`}>
                                        <Spinner size={s} />
                                    </Copyable>
                                ))}
                            </Demo>
                            <Demo title="Colors" dark code={S.spinnerColors}>
                                {['rgba(100,140,255,0.9)', 'rgba(74,222,128,0.9)', 'rgba(248,113,113,0.9)', 'rgba(251,191,36,0.9)', 'rgba(160,100,255,0.9)'].map(c => (
                                    <Copyable key={c} code={`<Spinner size="md" color="${c}" />`}>
                                        <Spinner size="md" color={c} />
                                    </Copyable>
                                ))}
                            </Demo>
                        </div>
                    </Section>

                    {/* ── ALERTS ── */}
                    <Section id="alerts" title="Alerts" description="Contextual notification banners with animated dismiss.">
                        <Demo title="Alert types" code={S.alerts}>
                            <div className="space-y-3 w-full">
                                <Copyable block code={`<Alert type="info" title="Information" message="Your session will expire in 30 minutes. Save your work." />`}>
                                    <Alert type="info" title="Information" message="Your session will expire in 30 minutes. Save your work." />
                                </Copyable>
                                <Copyable block code={`<Alert type="success" title="Success!" message="Your changes have been saved successfully." />`}>
                                    <Alert type="success" title="Success!" message="Your changes have been saved successfully." />
                                </Copyable>
                                <Copyable block code={`<Alert type="warning" title="Warning" message="You are approaching your storage limit (85%)." />`}>
                                    <Alert type="warning" title="Warning" message="You are approaching your storage limit (85%)." />
                                </Copyable>
                                <Copyable block code={`<Alert type="error" title="Error" message="Failed to connect. Please check your network." />`}>
                                    <Alert type="error" title="Error" message="Failed to connect. Please check your network." />
                                </Copyable>
                                <Copyable block code={`<Alert type="info" title="Dismissible Alert" message="Click the × button to dismiss this notification." dismissible />`}>
                                    <Alert type="info" title="Dismissible Alert" message="Click the × button to dismiss this notification." dismissible />
                                </Copyable>
                            </div>
                        </Demo>
                    </Section>

                    {/* ── PROGRESS ── */}
                    <Section id="progress" title="Progress" description="Animated progress bars with color variants and label support.">
                        <Demo title="Progress variants" code={S.progress}>
                            <div className="space-y-5 w-full">
                                <Copyable block code={`<ProgressBar value={25} color="blue" size="md" showLabel />`}><ProgressBar value={25} color="blue" size="md" showLabel /></Copyable>
                                <Copyable block code={`<ProgressBar value={50} color="green" size="md" showLabel />`}><ProgressBar value={50} color="green" size="md" showLabel /></Copyable>
                                <Copyable block code={`<ProgressBar value={75} color="amber" size="md" showLabel />`}><ProgressBar value={75} color="amber" size="md" showLabel /></Copyable>
                                <Copyable block code={`<ProgressBar value={90} color="red" size="lg" showLabel />`}><ProgressBar value={90} color="red" size="lg" showLabel /></Copyable>
                                <Copyable block code={`<ProgressBar value={100} color="blue" size="sm" showLabel />`}><ProgressBar value={100} color="blue" size="sm" showLabel /></Copyable>
                            </div>
                        </Demo>
                    </Section>

                    {/* ── TEMPLATES DIVIDER ── */}
                    <div className="mt-24 mb-16 pt-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Templates</h2>
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(160,200,255,0.4), transparent)' }} />
                        </div>
                        <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>Complete, production-ready page sections and modules constructed entirely from the Liquid Lucid UI library.</p>
                    </div>

                    {/* ── LOGIN FORM TEMPLATE ── */}
                    <Section id="login-form" title="Login Form" description="Full authentication form template — ready to use.">
                        <Demo title="Login Form" code={S.loginTemplate} deps={['Card', 'Button', 'Input', 'Checkbox']}>
                            <div className="flex items-center justify-center py-10 px-4 w-full rounded-b-xl"
                                style={{ background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 100%)`, minHeight: 400, position: 'relative', overflow: 'hidden' }}>
                                {/* Mini orbs for context */}
                                <div style={{ position: 'absolute', width: 300, height: 300, top: '-20%', left: '-5%', background: 'radial-gradient(circle, rgba(80,100,255,0.18) 0%, transparent 70%)', borderRadius: '50%' }} />
                                <div style={{ position: 'absolute', width: 250, height: 250, bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(160,80,255,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
                                <div className="relative z-10 w-full max-w-sm">
                                    <LoginFormEmbed theme={theme} />
                                </div>
                            </div>
                        </Demo>
                    </Section>

                    {/* ── HEADER TEMPLATE ── */}
                    <Section id="header-template" title="Navigation Header" description="Floating glassmorphism navbar with translucent backdrop blur.">
                        <Demo title="Hero Preview" code={S.headerTemplate} deps={['Button', 'Avatar', 'Badge']}>
                            <div className="py-16 px-4 md:px-8 relative w-full rounded-b-xl"
                                style={{ background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 100%)`, minHeight: 350, overflow: 'hidden' }}>
                                {/* Ambient glow */}
                                <div style={{ position: 'absolute', width: 600, height: 400, top: '-50%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(160,100,255,0.12) 0%, transparent 60%)', borderRadius: '50%' }} />

                                <div className="relative z-10 w-full h-full flex flex-col">
                                    <HeaderEmbed theme={theme} />

                                    <div className="mt-16 text-center max-w-xl mx-auto">
                                        <h2 className="text-4xl font-bold text-white tracking-tight mb-4 drop-shadow-xl">Build Beautiful Interfaces</h2>
                                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>Notice how the navigation bar elegantly floats above your content while providing a sweeping glass refraction effect.</p>
                                    </div>
                                </div>
                            </div>
                        </Demo>
                    </Section>
                    {/* ── DASHBOARD TEMPLATE ── */}
                    <Section id="dashboard-template" title="Dashboard Interface" description="A complete analytics dashboard layout featuring sidebar navigation and data cards.">
                        <Demo title="Web App Preview" code={S.dashboardTemplate} deps={['Card', 'Button', 'Badge', 'Avatar', 'Progress']}>
                            <div className="p-4 md:p-8 relative w-full rounded-b-xl flex items-center justify-center"
                                style={{ background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 100%)`, overflow: 'hidden' }}>
                                {/* Ambient glow */}
                                <div style={{ position: 'absolute', width: 600, height: 400, top: '-50%', left: '-20%', background: 'radial-gradient(circle, rgba(100,140,255,0.1) 0%, transparent 60%)', borderRadius: '50%' }} />

                                <DashboardEmbed theme={theme} />
                            </div>
                        </Demo>
                    </Section>

                    {/* ── PRICING TEMPLATE ── */}
                    <Section id="pricing-template" title="Pricing Table" description="Flexible pricing tiers with highlighted 'Pro' features and glass accent borders.">
                        <Demo title="Subscription Preview" code={S.pricingTemplate} deps={['Card', 'Button', 'Badge']}>
                            <div className="py-20 px-8 relative w-full rounded-b-xl"
                                style={{ background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 100%)`, overflow: 'hidden' }}>
                                <PricingEmbed theme={theme} />
                            </div>
                        </Demo>
                    </Section>

                    {/* ── TESTIMONIALS TEMPLATE ── */}
                    <Section id="testimonials-template" title="Social Proof" description="Elegant testimonial cards with avatar integration and ambient hover effects.">
                        <Demo title="User Reviews" code={S.testimonialsTemplate} deps={['Card', 'Avatar']}>
                            <div className="py-20 px-8 relative w-full rounded-b-xl"
                                style={{ background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 100%)`, overflow: 'hidden' }}>
                                <TestimonialsEmbed theme={theme} />
                            </div>
                        </Demo>
                    </Section>

                    {/* ── FOOTER TEMPLATE ── */}
                    <Section id="footer-template" title="Site Branding" description="Deep-glass footer with column navigation and social connectivity.">
                        <Demo title="Footer Layout" code={S.footerTemplate} deps={['Button', 'Input']}>
                            <div className="py-12 px-8 relative w-full rounded-b-xl"
                                style={{ background: theme.grad || `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgEnd} 100%)`, overflow: 'hidden' }}>
                                <FooterEmbed theme={theme} />
                            </div>
                        </Demo>
                    </Section>

                    <div className="h-20" />
                </div>
            </main>

            {/* ── Floating Customizer Toggle ── */}
            <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full z-[100] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group"
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                }}
            >
                <div className="absolute inset-0 rounded-full animate-ping bg-white/10 opacity-20 group-hover:block hidden" />
                <Palette
                    className={`w-7 h-7 transition-all duration-500 group-hover:rotate-[30deg] ${showCustomizer ? 'rotate-[360deg] scale-110' : ''}`}
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(120, 160, 255, 0.4))',
                        stroke: 'url(#lucid-gradient)'
                    }}
                />
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id="lucid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
            </button>

            {/* ── Customizer Panel (Real-time) ── */}
            <AnimatePresence>
                {showCustomizer && (
                    <>
                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-80 z-[120] p-8 flex flex-col shadow-2xl overflow-y-auto custom-scrollbar"
                            style={{
                                background: 'rgba(15,15,30,0.92)',
                                backdropFilter: 'blur(40px)',
                                borderLeft: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-bold text-white tracking-tight">Theme Config</h3>
                                <button
                                    onClick={() => setShowCustomizer(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10 hover:rotate-90 active:scale-95 cursor-pointer group"
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    <X className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            <div className="space-y-10">
                                {/* Presets Section */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Accent Colors</h4>
                                    <div className="grid grid-cols-5 gap-3">
                                        {[
                                            { name: 'Original', c: 'linear-gradient(160deg, rgba(130, 160, 255, 0.45) 0%, rgba(160, 100, 255, 0.30) 100%)' },
                                            { name: 'Lucid Blue', c: '#82a0ff' },
                                            { name: 'Royal Purple', c: '#a064ff' },
                                            { name: 'Emerald', c: '#22c55e' },
                                            { name: 'Ruby', c: '#ef4444' },
                                            { name: 'Cyber Pink', c: '#ff64b0' },
                                            { name: 'Rose Gold', c: '#ffb3ba' }
                                        ].map(preset => (
                                            <button
                                                key={preset.c}
                                                onClick={() => setTheme({ ...theme, accent: preset.c })}
                                                className={`aspect-square rounded-2xl border-2 transition-all ${theme.accent === preset.c ? 'border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                                style={{ background: preset.c }}
                                            />
                                        ))}
                                    </div>

                                    {/* Custom Gradient Accent Picker */}
                                    <div className="mt-6 flex gap-3">
                                        <div className="flex-1 space-y-2">
                                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest pl-1">Start</span>
                                            <div className="relative h-10 group/p1">
                                                <input
                                                    type="color"
                                                    value={theme.accentStart}
                                                    onChange={e => {
                                                        const newStart = e.target.value;
                                                        setTheme({ ...theme, accentStart: newStart, accent: `linear-gradient(160deg, ${newStart} 0%, ${theme.accentEnd} 100%)` })
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full h-full rounded-xl border border-white/20 group-hover/p1:border-white/40 transition-colors" style={{ background: theme.accentStart }} />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest pl-1">End</span>
                                            <div className="relative h-10 group/p2">
                                                <input
                                                    type="color"
                                                    value={theme.accentEnd}
                                                    onChange={e => {
                                                        const newEnd = e.target.value;
                                                        setTheme({ ...theme, accentEnd: newEnd, accent: `linear-gradient(160deg, ${theme.accentStart} 0%, ${newEnd} 100%)` })
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full h-full rounded-xl border border-white/20 group-hover/p2:border-white/40 transition-colors" style={{ background: theme.accentEnd }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Texture Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mt-4 px-1">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Grainy Pattern</span>
                                        <button
                                            onClick={() => setTheme({ ...theme, pattern: !theme.pattern })}
                                            className={`w-8 h-4 rounded-full relative transition-colors ${theme.pattern ? 'bg-blue-500' : 'bg-white/10'}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${theme.pattern ? 'left-4.5' : 'left-0.5'}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Sliders Section */}
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Glass Parameters</h4>

                                    <div className="space-y-5">
                                        {[
                                            { label: 'Glass Blur', key: 'blur', min: 0, max: 180, suffix: 'px' },
                                            { label: 'Saturation', key: 'saturation', min: 100, max: 400, suffix: '%' },
                                            { label: 'Surface Opacity', key: 'opacity', min: 0.01, max: 0.20, mul: 100, suffix: '%' },
                                            { label: 'Border Density', key: 'border', min: 0.05, max: 0.50, mul: 100, suffix: '%' },
                                        ].map(s => (
                                            <div key={s.key} className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs font-bold text-white/50">{s.label}</span>
                                                    <span className="text-[10px] font-mono text-white/30">{s.mul ? Math.round(theme[s.key] * s.mul) : theme[s.key]}{s.suffix}</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min={s.min * (s.mul || 1)}
                                                    max={s.max * (s.mul || 1)}
                                                    value={theme[s.key] * (s.mul || 1)}
                                                    onChange={e => setTheme({ ...theme, [s.key]: parseInt(e.target.value) / (s.mul || 1) })}
                                                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reset */}
                                <button
                                    onClick={() => setTheme({ blur: 80, saturation: 200, opacity: 0.04, border: 0.20, bg: '#0a0a14', bgEnd: '#0d0d1f', grad: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1f 60%, #0a0a18 100%)', accent: 'linear-gradient(160deg, rgba(130, 160, 255, 0.45) 0%, rgba(160, 100, 255, 0.30) 100%)', pattern: true })}
                                    className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white/10 hover:text-white transition-all mt-10 active:scale-95"
                                >
                                    Reset to Defaults
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Inline login form (no full-screen wrapper) ────────────────────────
function LoginFormEmbed({ theme }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [remember, setRemember] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
    }

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-7 relative"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div className="absolute top-0 left-6 right-6 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
            <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ background: theme.accent.includes('linear') ? theme.accent : `${theme.accent}44`, border: '1px solid rgba(255,255,255,0.15)', boxShadow: `0 8px 24px ${theme.accent.includes('linear') ? 'rgba(100,140,255,0.2)' : `${theme.accent}33`}` }}>
                    🔐
                </div>
                <h3 className="text-xl font-semibold text-white mb-0.5">Welcome back</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Sign in to your account</p>
            </div>
            <form onSubmit={submit} className="space-y-4">
                <Input id="embed-email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com" icon={<Mail className="w-4 h-4" />} />
                <Input id="embed-password" label="Password" type={showPw ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••" icon={<Lock className="w-4 h-4" />}
                    rightElement={
                        <button type="button" onClick={() => setShowPw(v => !v)} className="cursor-pointer" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {showPw ? <Eye16 /> : <EyeOff16 />}
                        </button>
                    } />
                <Checkbox id="embed-remember" label="Remember me for 30 days" checked={remember} onChange={setRemember} />
                <Button type="submit" fullWidth loading={loading} size="lg">Sign in</Button>
            </form>
            <p className="text-center text-xs mt-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Don't have an account? <a href="#" style={{ color: 'rgba(130,160,255,0.75)' }}>Create one</a>
            </p>
        </motion.div>
    )
}

function Eye16() {
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
}
function EyeOff16() {
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
}

// ─── Inline Header template ─────────────────────────────
function HeaderEmbed({ theme }) {
    return (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto h-16 rounded-2xl flex items-center justify-between px-8 relative shadow-sm"
            style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(30px) saturate(160%)',
                WebkitBackdropFilter: 'blur(30px) saturate(160%)'
            }}>



            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer z-10 transition-opacity hover:opacity-75">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                    <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 22 22 22"></polygon></svg>
                </div>
                <span className="font-bold text-white tracking-tight text-sm uppercase">LucidUI</span>
            </div>

            {/* Links */}
            <nav className="hidden lg:flex items-center gap-10">
                {['Products', 'Templates', 'Marketplace', 'Resources'].map((item, i) => (
                    <a key={item} href="#" className={`text-[13px] font-semibold transition-colors ${i === 1 ? 'text-white' : 'text-white/40 hover:text-white/80'}`}>
                        {item}
                    </a>
                ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <Button variant="ghost" size="xs" className="!text-white/40 font-bold hover:!text-white hover:!bg-white/5 !px-4 transition-all">Sign In</Button>
                <Button variant="primary" size="xs" className="!rounded-lg !px-5 !py-2 !text-[12px] !font-bold bg-white text-black hover:bg-neutral-200 border-none transition-all shadow-lg shadow-white/5">
                    Get Started
                </Button>
            </div>


        </motion.div>
    )
}

// ─── Inline Dashboard template ─────────────────────────────
function DashboardEmbed({ theme }) {
    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto h-[520px] flex rounded-3xl overflow-hidden relative shadow-2xl"
            style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1) inset',
                backdropFilter: 'blur(40px) saturate(220%)',
                WebkitBackdropFilter: 'blur(40px) saturate(220%)'
            }}>

            {/* Ambient Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Sidebar */}
            <div className="w-56 h-full border-r flex flex-col p-5 relative z-10" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                        style={{ background: theme.accent.includes('linear') ? theme.accent : theme.accent, opacity: 0.8, border: '1px solid rgba(255,255,255,0.2)' }}>
                        <svg className="w-4 h-4 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="12 2 2 22 22 22"></polygon></svg>
                    </div>
                    <span className="font-bold text-base text-white tracking-wide">LucidApp</span>
                </div>

                <div className="flex flex-col gap-1.5">
                    {[
                        { label: 'Overview', icon: <Globe className="w-4 h-4" />, active: true },
                        { label: 'Analytics', icon: <Hash className="w-4 h-4" /> },
                        { label: 'Customers', icon: <User className="w-4 h-4" /> },
                        { label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
                        { label: 'Settings', icon: <Settings className="w-4 h-4" /> },
                    ].map((item) => (
                        <div key={item.label} className={`px-3 py-2.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all flex items-center gap-3 ${item.active ? 'bg-white/10 text-white shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/10' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}>
                            <span className={item.active ? 'text-blue-400' : ''}>{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t px-3 py-2 rounded-xl text-xs font-medium cursor-pointer text-white/40 hover:bg-white/5 hover:text-white/80 flex items-center gap-3 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <LogOut className="w-4 h-4" /> Logout
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative z-20">
                {/* Header */}
                <div className="h-16 border-b flex items-center justify-between px-8" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white tracking-wide">Dashboard Overview</span>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Metrics • Real-time</span>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2 group cursor-pointer bg-white/5 border border-white/5 rounded-full pl-3 pr-1 py-1 transition-colors hover:bg-white/10">
                            <Search className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60" />
                            <span className="text-[11px] text-white/30 mr-4">Quick Search...</span>
                            <div className="w-6 h-6 rounded-full bg-white/10 text-[9px] font-bold text-white/60 flex items-center justify-center">⌘K</div>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="relative">
                            <Bell className="w-4 h-4 text-white/40 cursor-pointer hover:text-white/80 transition-colors" />
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full shadow-sm" style={{ background: theme.accent.includes('linear') ? '#3b82f6' : theme.accent, border: `1px solid ${theme.bg}` }} />
                        </div>
                        <Avatar initials="JD" colorIndex={0} size="sm" status="online" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 overflow-y-auto w-full flex-1 custom-scrollbar">
                    <div className="grid grid-cols-3 gap-5 mb-6">
                        <Card variant="flat" className="!p-5 !bg-white/[0.03] !border-white/5 hover:!bg-white/[0.05] transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-8 h-8 rounded-[12px] bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                                    <CreditCard className="w-4 h-4 text-blue-400" />
                                </div>
                                <Badge color="green" size="xs" outline>+12.5%</Badge>
                            </div>
                            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-1">Total Revenue</h4>
                            <div className="text-2xl font-bold text-white tracking-tight mb-3">$45,231.89</div>
                            <ProgressBar value={75} color="blue" size="sm" />
                        </Card>
                        <Card variant="flat" className="!p-5 !bg-white/[0.03] !border-white/5 hover:!bg-white/[0.05] transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-8 h-8 rounded-[12px] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                                    <User className="w-4 h-4 text-purple-400" />
                                </div>
                                <Badge color="green" size="xs" outline>+2.4k</Badge>
                            </div>
                            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-1">Active Users</h4>
                            <div className="text-2xl font-bold text-white tracking-tight mb-3">2,405</div>
                            <ProgressBar value={45} color="purple" size="sm" />
                        </Card>
                        <Card variant="flat" className="!p-5 !bg-white/[0.03] !border-white/5 hover:!bg-white/[0.05] transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-8 h-8 rounded-[12px] bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                    <Bell className="w-4 h-4 text-amber-400" />
                                </div>
                                <Badge color="gray" size="xs" outline>Stable</Badge>
                            </div>
                            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-1">System Health</h4>
                            <div className="text-2xl font-bold text-white tracking-tight mb-3">99.9%</div>
                            <ProgressBar value={99} color="amber" size="sm" />
                        </Card>
                    </div>

                    <Card variant="elevated" className="!p-0 !bg-white/[0.02] border border-white/10 overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-10 bg-blue-500/40 rounded-full blur-[2px]" />
                                <h4 className="text-sm font-semibold text-white">Recent Transactions</h4>
                            </div>
                            <Button variant="ghost" size="xs" className="!text-white/30 hover:!text-white hover:!bg-white/5 !px-3 !border-white/5">View all</Button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {[
                                { title: 'Payment from Stripe', time: 'Just now', amount: '+$1,290.00', icon: '💰', status: 'completed' },
                                { title: 'Refund processed', time: '45 mins ago', amount: '-$450.00', icon: '↩️', status: 'pending' },
                                { title: 'Subscription upgrade', time: '3 hours ago', amount: '+$2,400.50', icon: '✨', status: 'completed' }
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center justify-between py-4 px-6 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm border border-white/10 group-hover:border-white/20 transition-colors shadow-inner">{tx.icon}</div>
                                        <div>
                                            <div className="text-[13px] font-medium text-white group-hover:text-blue-200 transition-colors">{tx.title}</div>
                                            <div className="text-[11px] text-white/30 mt-0.5">{tx.time}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-[13px] font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>{tx.amount}</div>
                                        <div className="text-[10px] text-white/20 font-medium uppercase tracking-tighter mt-0.5">{tx.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Shimmer line atop */}
            <div className="absolute top-0 left-10 right-10 h-px pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }} />

            {/* Soft decorative light leak */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
    )
}

function PricingEmbed({ theme }) {
    const [annual, setAnnual] = useState(true);

    return (
        <div className="w-full max-w-5xl mx-auto relative z-10 px-4 flex flex-col items-center">
            {/* Minimal Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-[100%] blur-[80px] pointer-events-none" />

            {/* Toggle */}
            <div className="mb-12 flex items-center gap-4 bg-white/[0.05] p-2 rounded-full border border-white/10 backdrop-blur-md">
                <button onClick={() => setAnnual(false)} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white/80'}`}>Monthly</button>
                <button onClick={() => setAnnual(true)} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${annual ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white/80'}`}>Annually <span className="text-[10px] ml-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">-20%</span></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {[
                    { plan: 'Basic', priceMonth: 19, priceYear: 15, desc: 'Essential tools for individuals.', features: ['1 Project', 'Basic Analytics', 'Community Support'] },
                    { plan: 'Professional', priceMonth: 49, priceYear: 39, tech: true, desc: 'Advanced features for scaling teams.', features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domains'] },
                    { plan: 'Enterprise', priceMonth: 199, priceYear: 159, desc: 'Maximum performance and security.', features: ['Dedicated Account Manager', 'SSO & SAML', 'Custom SLAs', 'On-premise option'] }
                ].map((p, i) => (
                    <motion.div key={p.plan} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="relative group/pricing flex h-full">
                        <div className={`w-full flex flex-col p-8 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 ${p.tech ? 'bg-white/[0.08] border-white/20 shadow-[0_20px_80px_rgba(255,255,255,0.05)] -translate-y-2' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}`}>

                            {p.tech && <div className="absolute top-0 inset-x-0 mx-auto w-fit px-4 py-1.5 -translate-y-1/2 bg-white text-black text-[10px] font-bold rounded-full tracking-widest shadow-xl">RECOMMENDED</div>}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{p.plan}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-medium">{p.desc}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-medium text-white/50">$</span>
                                    <span className="text-6xl font-semibold text-white tracking-tighter">{annual ? p.priceYear : p.priceMonth}</span>
                                </div>
                                <div className="text-xs font-semibold text-white/30 uppercase tracking-[0.1em] mt-2">per user / month</div>
                            </div>

                            <Button variant={p.tech ? 'primary' : 'ghost'} fullWidth className={`!rounded-[1rem] !py-4 mb-10 font-bold transition-all ${p.tech ? 'bg-white text-black hover:bg-neutral-200' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                                Get Started
                            </Button>

                            <ul className="space-y-4 flex-1">
                                {p.features.map((f, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-white/10 text-white shrink-0">✓</div>
                                        <span className="text-white/70 font-medium">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function TestimonialsEmbed({ theme }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-6 relative z-10">
            {/* Minimal Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

            {[
                { name: 'Alex Rivera', role: 'VP of Design, Stark', tag: '@arivera', initials: 'AR', text: "The cleanest UI kit I've ever used. The attention to spacing and typography makes every component feel insanely premium out of the box." },
                { name: 'Sarah Chen', role: 'Frontend Lead, Orbit', tag: '@sarahc_dev', initials: 'SC', text: "Finally, a glassmorphism library that doesn't overdo the blur and saturation. It integrates perfectly with our existing design system." },
                { name: 'David Kim', role: 'Founder, Nexus', tag: '@dkim_builds', initials: 'DK', text: "We rebuilt our dashboard with Lucid UI in 2 days. The code is structured beautifully and the visual output is just stunning." }
            ].map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="relative group/testi h-full">
                    <div className="p-8 h-full rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all duration-500 backdrop-blur-2xl flex flex-col justify-between">

                        <div>
                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-yellow-500/80">
                                {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                            </div>

                            <p className="text-[15px] text-white/70 leading-relaxed mb-8 font-medium">
                                "{t.text}"
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white/80 text-sm">
                                {t.initials}
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm tracking-tight">{t.name}</div>
                                <div className="text-[12px] text-white/40 font-medium">{t.role}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

function FooterEmbed({ theme }) {
    return (
        <div className="w-full max-w-5xl mx-auto p-16 rounded-[3rem] border border-white/10 relative overflow-hidden group/footer"
            style={{
                background: 'rgba(255, 255, 255, 0.012)',
                backdropFilter: 'blur(50px) saturate(220%)',
                boxShadow: '0 32px 128px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}>

            {/* Shimmer top line */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 80%, transparent)' }} />

            <div className="grid grid-cols-4 gap-16 relative z-10 mb-24">
                <div className="col-span-1">
                    <div className="flex items-center gap-3.5 mb-10 transition-transform hover:scale-105 cursor-pointer w-fit">
                        <div className="text-3xl">💧</div>
                        <div className="flex flex-col">
                            <span className="font-black text-white text-xl tracking-tighter uppercase leading-none">LucidUI</span>
                            <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mt-1 ml-0.5">Dynamics</span>
                        </div>
                    </div>
                    <p className="text-[14px] text-white/40 leading-relaxed max-w-[220px] font-medium">
                        Crafting the future of visual engineering with high-fidelity glass components.
                    </p>
                </div>

                {['Platform', 'Products', 'Resources'].map(g => (
                    <div key={g}>
                        <h4 className="font-black text-white mb-10 text-[10px] uppercase tracking-[0.25em] opacity-40">{g}</h4>
                        <div className="flex flex-col gap-6 text-[14px] font-semibold">
                            {['Overview', 'Templates', 'API Docs', 'Showcase'].map(link => (
                                <a key={link} href="#" className="text-white/20 hover:text-white transition-all hover:translate-x-1">{link}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
                <div className="flex gap-10">
                    <span className="hover:text-white/30 transition-colors cursor-pointer">© 2026 LUCIDUI LTD.</span>
                    <span className="text-blue-500/30 hover:text-blue-500/60 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-white/30 cursor-pointer">Terms</span>
                </div>
                <div className="flex gap-8">
                    {['Twitter', 'Github', 'Dribbble'].map(social => (
                        <span key={social} className="hover:text-white/40 transition-colors cursor-pointer">{social}</span>
                    ))}
                </div>
            </div>

            {/* Cinematic light leaks */}
            <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-blue-500/[0.07] rounded-full blur-[120px] pointer-events-none group-hover/footer:bg-blue-500/10 transition-colors duration-1000" />
            <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-purple-500/[0.05] rounded-full blur-[120px] pointer-events-none group-hover/footer:bg-purple-500/10 transition-colors duration-1000" />

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    )
}

