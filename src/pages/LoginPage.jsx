import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Droplet } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function GithubLogo() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    )
}

function AppleLogo() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    )
}

function GoogleLogo() {
    return (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    )
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
}
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [activeField, setActiveField] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise(r => setTimeout(r, 1800))
        setIsLoading(false)
        navigate('/uikit')
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1f 40%, #0a0a18 100%)' }}>

            {/* Background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 40, -20, 0],
                        y: [0, -30, 20, 0],
                        scale: [1, 1.1, 0.95, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="orb-1 absolute rounded-full"
                    style={{ width: 700, height: 700, top: '-15%', left: '-15%', background: 'radial-gradient(circle, rgba(100,120,255,0.18) 0%, transparent 70%)', filter: 'blur(30px)' }}
                />
                <motion.div
                    animate={{
                        x: [0, -50, 30, 0],
                        y: [0, 40, -30, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="orb-2 absolute rounded-full"
                    style={{ width: 600, height: 600, top: '25%', right: '-15%', background: 'radial-gradient(circle, rgba(180,100,255,0.16) 0%, transparent 70%)', filter: 'blur(30px)' }}
                />
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="orb-3 absolute rounded-full"
                    style={{ width: 500, height: 500, bottom: '-15%', left: '20%', background: 'radial-gradient(circle, rgba(100,220,255,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }}
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            </div>

            {/* UI Kit link */}
            <Link to="/uikit"
                className="absolute top-5 right-5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)' }}>
                <span>Component Library</span>
                <span>→</span>
            </Link>

            {/* Float wrapper — starts AFTER entrance animation (0.7s delay via CSS) */}
            <div className="card-float" style={{ animationDelay: '0.7s', animationPlayState: 'running' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card noise relative w-[450px] mx-4 rounded-[3rem] p-12">
                    <div className="absolute top-0 left-8 right-8 h-px"
                        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)' }} />

                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        {/* Logo */}
                        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="relative w-16 h-16 mb-5 flex items-center justify-center">
                                <div className="text-4xl" style={{ filter: 'drop-shadow(0 0 20px rgba(130,170,255,0.6)) drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                                    💧
                                </div>
                            </motion.div>
                            <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Welcome back</h1>
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Sign in to your account</p>
                        </motion.div>

                        {/* Social */}
                        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
                            {[{ icon: <GoogleLogo />, label: 'Google' }, { icon: <GithubLogo />, label: 'GitHub' }, { icon: <AppleLogo />, label: 'Apple' }]
                                .map(({ icon, label }) => (
                                    <motion.button key={label} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                                        className="btn-social flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl cursor-pointer border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-300"
                                        style={{ color: 'rgba(255,255,255,0.75)' }}>
                                        {icon}
                                        <span className="text-xs font-medium tracking-tight">{label}</span>
                                    </motion.button>
                                ))}
                        </motion.div>

                        {/* Divider */}
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                            <div className="divider flex-1" />
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>or continue with email</span>
                            <div className="divider flex-1" />
                        </motion.div>

                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <motion.div variants={itemVariants} className="mb-4">
                                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                        style={{ color: activeField === 'email' ? 'rgba(130,170,255,0.8)' : 'rgba(255,255,255,0.3)' }} />
                                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setActiveField('email')} onBlur={() => setActiveField(null)}
                                        placeholder="name@example.com"
                                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 transition-all border border-white/5 bg-white/[0.03] focus:bg-white/[0.06] focus:border-white/20 focus:shadow-[0_0_30px_rgba(100,160,255,0.12)]"
                                        style={{ caretColor: 'rgba(150,180,255,0.9)' }} />
                                </div>
                            </motion.div>

                            {/* Password */}
                            <motion.div variants={itemVariants} className="mb-5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Password</label>
                                    <a href="#" className="text-xs" style={{ color: 'rgba(130,160,255,0.7)' }}>Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                        style={{ color: activeField === 'password' ? 'rgba(130,170,255,0.8)' : 'rgba(255,255,255,0.3)' }} />
                                    <input id="password" type={showPassword ? 'text' : 'password'} value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onFocus={() => setActiveField('password')} onBlur={() => setActiveField(null)}
                                        placeholder="••••••••"
                                        className="glass-input w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white placeholder:text-white/20 transition-all border border-white/5 bg-white/[0.03] focus:bg-white/[0.06] focus:border-white/20 focus:shadow-[0_0_30px_rgba(100,160,255,0.12)]"
                                        style={{ caretColor: 'rgba(150,180,255,0.9)' }} />
                                    <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                                        style={{ color: 'rgba(255,255,255,0.3)' }}>
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Remember me */}
                            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-6">
                                <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setRememberMe(v => !v)}
                                    className="relative w-5 h-5 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0 transition-all duration-200"
                                    style={{ background: rememberMe ? 'linear-gradient(135deg, rgba(100,140,255,0.9), rgba(160,100,255,0.9))' : 'rgba(255,255,255,0.06)', border: rememberMe ? '1px solid rgba(130,170,255,0.5)' : '1px solid rgba(255,255,255,0.12)', boxShadow: rememberMe ? '0 0 12px rgba(100,140,255,0.3)' : 'none' }}>
                                    <AnimatePresence>
                                        {rememberMe && (
                                            <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                                                transition={{ duration: 0.15 }} viewBox="0 0 12 10" className="w-3 h-3" fill="none"
                                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="1,5 4,8 11,1" />
                                            </motion.svg>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                                <span className="text-sm select-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.5)' }}
                                    onClick={() => setRememberMe(v => !v)}>Remember me for 30 days</span>
                            </motion.div>

                            {/* Submit */}
                            <motion.div variants={itemVariants}>
                                <motion.button id="sign-in-btn" type="submit"
                                    whileHover={!isLoading ? { scale: 1.015, y: -1 } : {}} whileTap={!isLoading ? { scale: 0.985 } : {}}
                                    disabled={isLoading} className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer tracking-wide">
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-2">
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                                <span>Signing in...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sign in</motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>
                        </form>

                        <motion.p variants={itemVariants} className="text-center text-sm mt-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            Don't have an account?{' '}
                            <a href="#" className="font-medium" style={{ color: 'rgba(130,160,255,0.75)' }}>Create one</a>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="absolute bottom-6 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                © 2026 · Secure Sign-In
            </motion.p>
        </div>
    )
}
