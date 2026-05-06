'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import {
  Cog,
  Wifi,
  Shield,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Headphones,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Play,
  Star,
  Menu,
  X,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Factory,
  Settings,
  Sun,
  Moon,
  Send,
  User,
  MessageSquare,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'

/* ───────────────────── Animation helpers ───────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

function AnimatedSection({
  children,
  className = '',
  variants = fadeUp,
  custom = 0,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  custom?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────── Counter component ───────────────────── */

function CounterStat({
  end,
  suffix = '+',
  label,
  duration = 2000,
}: {
  end: number
  suffix?: string
  label: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, isInView])

  return (
    <div className="text-center">
      <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-gradient-brand">
        {count}{suffix}
      </span>
      <p className="text-solu-text-subtle mt-2 text-sm">{label}</p>
    </div>
  )
}

/* ───────────────────── Floating Particles ───────────────────── */

function FloatingParticles() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; color: string; duration: number; delay: number; xDrift: number }[]
  >([])

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: i % 3 === 0 ? '#17a2b8' : '#2d7dd2',
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
      xDrift: Math.random() * 30 - 15,
    }))
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.xDrift, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ───────────────────── Section Title ───────────────────── */

function SectionTitle({ children, subtitle, className = '' }: { children: ReactNode; subtitle?: string; className?: string }) {
  return (
    <AnimatedSection className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-solu-text">{children}</h2>
      {subtitle && <p className="text-solu-text-muted max-w-2xl mx-auto text-base leading-relaxed">{subtitle}</p>}
      <div className="mx-auto w-24 h-1 rounded-full animated-border mt-6" />
    </AnimatedSection>
  )
}

/* ───────────────────── Theme Toggle ───────────────────── */

function ThemeToggle({ scrolled = false }: { scrolled?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timeout)
  }, [])

  if (!mounted) {
    return (
      <button className={`p-2 rounded-lg border transition-colors ${scrolled ? 'bg-solu-card border-solu-card-border' : 'bg-white/10 border-white/20 backdrop-blur-sm'}`} aria-label="Toggle theme">
        <Sun className="size-5 text-solu-accent" />
      </button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
        scrolled
          ? 'bg-solu-card border-solu-card-border hover:border-solu-accent/30'
          : 'bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30'
      }`}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className={`size-5 ${scrolled ? 'text-yellow-400' : 'text-yellow-300'}`} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className={`size-5 ${scrolled ? 'text-solu-navy' : 'text-white'}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ───────────────────── Contact Form ───────────────────── */

function ContactForm() {
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (res.ok) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for reaching out. Our team will get back to you within 24 hours.',
        })
        form.reset()
      } else {
        toast({
          title: 'Something went wrong',
          description: result.error || 'Please try again later.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Network Error',
        description: 'Could not send your message. Please check your connection and try again.',
        variant: 'destructive',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-solu-card backdrop-blur-sm border border-solu-card-border rounded-2xl p-6 md:p-8"
    >
      <h3 className="text-xl font-bold text-solu-text mb-6">Send Us a Message</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-solu-text mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-solu-text-subtle" />
            <input
              name="name"
              type="text"
              required
              placeholder="Ahmed Al-Rashid"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-solu-bg border border-solu-card-border text-solu-text placeholder:text-solu-text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-solu-accent/40 focus:border-solu-accent transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-solu-text mb-1.5">Company</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-solu-text-subtle" />
            <input
              name="company"
              type="text"
              placeholder="Your Company"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-solu-bg border border-solu-card-border text-solu-text placeholder:text-solu-text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-solu-accent/40 focus:border-solu-accent transition-colors"
            />
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-solu-text mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-solu-text-subtle" />
            <input
              name="email"
              type="email"
              required
              placeholder="ahmed@company.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-solu-bg border border-solu-card-border text-solu-text placeholder:text-solu-text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-solu-accent/40 focus:border-solu-accent transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-solu-text mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-solu-text-subtle" />
            <input
              name="phone"
              type="tel"
              placeholder="0645305126"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-solu-bg border border-solu-card-border text-solu-text placeholder:text-solu-text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-solu-accent/40 focus:border-solu-accent transition-colors"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-solu-text mb-1.5">Service Interested In</label>
        <select
          name="service"
          className="w-full px-4 py-2.5 rounded-xl bg-solu-bg border border-solu-card-border text-solu-text text-sm focus:outline-none focus:ring-2 focus:ring-solu-accent/40 focus:border-solu-accent transition-colors appearance-none cursor-pointer"
        >
          <option value="">Select a service...</option>
          <option value="Packaging Machine Building">Packaging Machine Building</option>
          <option value="Concept Engineering">Concept Engineering</option>
          <option value="Smart Factory Integration">Smart Factory Integration</option>
          <option value="Machine Retrofitting">Machine Retrofitting</option>
          <option value="Spare Parts & Service">Spare Parts & Service</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-solu-text mb-1.5">Project Details</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 size-4 text-solu-text-subtle" />
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us about your packaging requirements, production volumes, product types..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-solu-bg border border-solu-card-border text-solu-text placeholder:text-solu-text-subtle text-sm focus:outline-none focus:ring-2 focus:ring-solu-accent/40 focus:border-solu-accent transition-colors resize-none"
          />
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="w-full glow-navy bg-solu-accent hover:bg-solu-accent-light text-white font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="size-4" />
        {sending ? 'Sending...' : 'Send Message'}
      </Button>
      <p className="text-xs text-solu-text-subtle text-center mt-3">
        We respect your privacy. Your information will never be shared with third parties.
      </p>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const heroStats = [
    { value: '350+', label: 'Machines Delivered' },
    { value: '99.8%', label: 'Uptime Guarantee' },
    { value: '40+', label: 'Countries Served' },
    { value: '24/7', label: 'Technical Support' },
  ]

  const services = [
    {
      icon: Cog,
      title: 'Packaging Machine Building',
      image: '/images/service-automation.png',
      description:
        'Custom-built food packaging machines designed from the ground up. From vertical form-fill-seal to horizontal flow-wrap systems, we engineer packaging solutions that maximize throughput, ensure hygiene compliance, and reduce material waste.',
    },
    {
      icon: Settings,
      title: 'Concept Engineering',
      image: '/images/service-precision.png',
      description:
        'From initial concept to detailed engineering — we transform your packaging vision into precision technical specifications. Our concept engineering process includes feasibility studies, 3D modeling, prototyping, and full mechanical/electrical design.',
    },
    {
      icon: Wifi,
      title: 'Smart Factory Integration',
      image: '/images/service-iot.png',
      description:
        'Connect your packaging lines with IoT-enabled monitoring, real-time OEE tracking, and predictive maintenance systems. We integrate Industry 4.0 solutions that give you complete visibility and control over every packaging operation.',
    },
  ]

  const features = [
    { icon: Shield, title: 'Hygienic Design', desc: 'All machines built to FDA, EU, and FSSC 22000 food safety standards with sanitary design principles' },
    { icon: Zap, title: 'High-Speed Output', desc: 'Packaging speeds up to 300+ packages per minute with precision accuracy and minimal changeover time' },
    { icon: Globe, title: 'Global Deployment', desc: 'Installed and commissioned in 40+ countries with local technical support and spare parts availability' },
    { icon: Lock, title: 'Product Protection', desc: 'Advanced sealing and inspection systems ensuring package integrity, shelf life, and consumer safety' },
    { icon: BarChart3, title: 'Data-Driven OEE', desc: 'Real-time performance analytics, downtime tracking, and AI-powered optimization for maximum efficiency' },
    { icon: Headphones, title: 'Lifetime Support', desc: 'Dedicated service teams, remote diagnostics, and preventive maintenance programs for every machine' },
  ]

  const projects = [
    {
      title: 'High-Speed Snack Packaging Line',
      category: 'Food Packaging',
      description: 'Complete turnkey packaging line for a multinational snack producer — 250 ppm with automated quality inspection.',
      image: '/images/service-automation.png',
      stats: '250 ppm | 99.7% OEE',
    },
    {
      title: 'Dairy Pouch Filling System',
      category: 'Liquid Packaging',
      description: 'Custom aseptic pouch filling machine for UHT dairy products with CIP system and hygienic design compliance.',
      image: '/images/service-precision.png',
      stats: '180 pouches/min | ISO 22000',
    },
    {
      title: 'Fresh Produce Flow-Wrap System',
      category: 'Produce Packaging',
      description: 'Modified atmosphere packaging system for fresh vegetables with servo-driven flow-wrap and gas flushing.',
      image: '/images/service-iot.png',
      stats: 'MAP Technology | 30+ SKUs',
    },
  ]

  const testimonials = [
    {
      quote: 'SoluDrive built our entire snack packaging line from concept to commissioning. The machines run flawlessly at 250 ppm — a 35% increase over our previous setup.',
      name: 'Ahmed Al-Rashid',
      title: 'Production Director, Al-Falah Foods',
      initials: 'AR',
      color: 'bg-solu-accent',
    },
    {
      quote: 'Their concept engineering process gave us complete confidence before investing. The 3D models and prototypes were spot-on, and the final machine exceeded every specification.',
      name: 'Maria Kowalski',
      title: 'VP Engineering, EuroPack Dairy',
      initials: 'MK',
      color: 'bg-solu-teal',
    },
    {
      quote: 'From hygienic design to smart factory integration, SoluDrive understands food packaging like no one else. Their 24/7 support has kept our lines running for 3 years straight.',
      name: 'James Chen',
      title: 'CTO, Pacific Fresh Group',
      initials: 'JC',
      color: 'bg-emerald-600',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-solu-bg text-solu-text overflow-x-hidden">
      {/* ═══════════════ 1. NAVIGATION ═══════════════ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-solu-nav-bg backdrop-blur-xl border-b border-solu-divider shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-3 group">
              {/* Light mode logo (colored) — shows only when scrolled in light mode (light navbar bg) */}
              <div className={`relative h-10 w-auto overflow-hidden ${scrolled ? 'block dark:hidden' : 'hidden'}`}>
                <Image
                  src="/images/logo-01.jpg"
                  alt="SoluDrive Logo"
                  width={160}
                  height={40}
                  className="object-contain h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Dark/white logo — shows on hero overlay (not scrolled) + always in dark mode */}
              <div className={`relative h-10 w-auto overflow-hidden ${scrolled ? 'hidden dark:block' : 'block'}`}>
                <Image
                  src="/images/logo-dark.jpg"
                  alt="SoluDrive Logo"
                  width={160}
                  height={40}
                  className="object-contain h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrolled
                      ? 'text-solu-text-muted hover:text-solu-text'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-solu-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA + Theme + Mobile */}
            <div className="flex items-center gap-3">
              <ThemeToggle scrolled={scrolled} />

              <Button
                asChild
                className="hidden lg:inline-flex glow-navy bg-solu-accent hover:bg-solu-accent-light text-white font-semibold cursor-pointer"
                size="lg"
              >
                <Link href="#contact">
                  Get a Quote
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 transition-colors ${
                  scrolled
                    ? 'text-solu-text-muted hover:text-solu-text'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-solu-nav-bg backdrop-blur-xl border-b border-solu-divider"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-solu-text-muted hover:text-solu-text py-2 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button asChild className="w-full glow-navy bg-solu-accent hover:bg-solu-accent-light text-white font-semibold mt-2 cursor-pointer">
                  <Link href="#contact" onClick={() => setMobileOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════ 2. HERO ═══════════════ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt="Food packaging machine facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-solu-overlay" />
        </div>

        <FloatingParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Badge className="bg-solu-accent/10 text-solu-accent-light border-solu-accent/20 mb-6 text-sm px-4 py-1.5">
              <Cog className="size-3.5 mr-1.5" />
              Concept Engineering & Machine Building
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white"
          >
            <span className="block text-gradient-brand">Precision Packaging</span>
            <motion.span initial="hidden" animate="visible" variants={fadeUp} custom={2} className="block mt-2">
              Engineered for Food
            </motion.span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 mb-10 leading-relaxed"
          >
            From concept engineering to turnkey packaging machines — we design, build, and commission
            high-performance food packaging systems that deliver speed, hygiene, and reliability.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Button
              asChild size="lg"
              className="glow-navy bg-solu-accent hover:bg-solu-accent-light text-white font-semibold px-8 text-base cursor-pointer"
            >
              <Link href="#services">
                Explore Solutions
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button
              asChild size="lg"
              className="bg-white/10 border border-white/40 text-white hover:bg-white/20 hover:border-white/60 font-semibold px-8 text-base cursor-pointer backdrop-blur-sm"
            >
              <Link href="#projects">
                <Play className="size-4" />
                View Projects
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={5}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gradient-brand">{s.value}</p>
                <p className="text-xs text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="size-6 text-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 3. TRUSTED BY ═══════════════ */}
      <section className="py-12 bg-solu-section-alt border-y border-solu-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-solu-text-subtle uppercase tracking-widest mb-8">
            Trusted by leading food manufacturers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['Nestlé', 'Unilever', 'Mondelez', 'Kerry Group', 'FrieslandCampina', 'Hormel'].map((name) => (
              <motion.span
                key={name}
                whileHover={{ scale: 1.1, color: '#2d7dd2' }}
                className="text-xl md:text-2xl font-bold text-solu-text-subtle/30 dark:text-white/15 hover:text-solu-accent transition-colors cursor-default select-none"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. SERVICES ═══════════════ */}
      <section id="services" className="py-20 md:py-28 relative">
        <div className="grid-pattern absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="End-to-end engineering and manufacturing capabilities for the food packaging industry">
            Our Core Services
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} custom={i}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(45,125,210,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative bg-solu-card backdrop-blur-sm border border-solu-card-border rounded-2xl overflow-hidden h-full"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.image} alt={s.title} fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-solu-bg via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-solu-accent to-solu-teal flex items-center justify-center shadow-lg shadow-solu-accent/20">
                      <s.icon className="size-6 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-solu-text group-hover:text-solu-accent transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-solu-text-muted text-sm leading-relaxed mb-4">{s.description}</p>
                    <Link
                      href="#contact"
                      className="inline-flex items-center text-solu-accent text-sm font-semibold hover:gap-2 transition-all gap-1"
                    >
                      Learn More
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. ABOUT ═══════════════ */}
      <section id="about" className="py-20 md:py-28 bg-solu-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection variants={slideFromLeft}>
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl animated-border opacity-50 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  whileHover={{ rotate: 0.5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  <Image
                    src="/images/about-image.png" alt="Food packaging machine close-up"
                    width={1024} height={1024}
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection variants={slideFromRight}>
              <Badge className="bg-solu-accent/10 text-solu-accent-light border-solu-accent/20 mb-4">
                <Factory className="size-3.5 mr-1.5" />
                About SoluDrive
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-solu-text">
                Engineering Packaging <br />
                <span className="text-gradient-brand">Solutions Since 2008</span>
              </h2>
              <p className="text-solu-text-muted leading-relaxed mb-4">
                SoluDrive is a specialized machine building company focused on food packaging solutions.
                From concept engineering to final commissioning, we design and manufacture custom packaging
                machines that meet the highest standards of hygiene, speed, and reliability demanded by
                the global food industry.
              </p>
              <p className="text-solu-text-muted leading-relaxed mb-6">
                Our concept engineering approach means we work with you from day one — transforming your
                packaging challenge into a fully realized machine through iterative design, prototyping,
                and validation. Every machine we build is engineered for the specific product, format,
                and production environment it will serve.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  'CE & ATEX Certified Machines',
                  'FSSC 22000 Hygienic Design',
                  'Concept to Commissioning',
                  'Servo-Driven Precision Systems',
                  'Global Service Network',
                  'Industry 4.0 Ready Machines',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="size-5 text-solu-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-solu-text-muted">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="glow-navy bg-solu-accent hover:bg-solu-accent-light text-white font-semibold cursor-pointer" size="lg">
                <Link href="#contact">
                  Request a Consultation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. SOLUTIONS / FEATURES ═══════════════ */}
      <section id="solutions" className="py-20 md:py-28 relative">
        <div className="grid-pattern absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Why food manufacturers trust SoluDrive for their most critical packaging operations">
            Why Choose SoluDrive
          </SectionTitle>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} custom={i}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group bg-solu-card backdrop-blur-sm border border-solu-card-border rounded-2xl p-6 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-solu-accent to-solu-teal flex items-center justify-center mb-4 shadow-lg shadow-solu-accent/20 group-hover:shadow-solu-accent/30 transition-shadow">
                    <f.icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-solu-text group-hover:text-solu-accent transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-solu-text-muted text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. STATS COUNTER ═══════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-solu-navy">
        <div className="grid-pattern absolute inset-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-solu-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <CounterStat end={350} suffix="+" label="Machines Delivered" />
            <CounterStat end={99} suffix=".8%" label="Uptime Guarantee" />
            <CounterStat end={40} suffix="+" label="Countries Served" duration={1800} />
            <CounterStat end={120} suffix="+" label="Engineers & Designers" duration={2200} />
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. PROJECTS ═══════════════ */}
      <section id="projects" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Real-world solutions we have engineered for food packaging leaders worldwide">
            Featured Projects
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((p, i) => (
              <AnimatedSection key={p.title} custom={i} variants={scaleIn}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(45,125,210,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative bg-solu-card backdrop-blur-sm border border-solu-card-border rounded-2xl overflow-hidden h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.image} alt={p.title} fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-solu-bg/80 via-solu-bg/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-solu-accent/80 text-white border-0 text-xs">
                      {p.category}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-solu-text group-hover:text-solu-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-solu-text-muted text-sm leading-relaxed mb-3">{p.description}</p>
                    <div className="flex items-center gap-2 text-xs text-solu-accent font-medium">
                      <Zap className="size-3.5" />
                      {p.stats}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. TESTIMONIALS ═══════════════ */}
      <section className="py-20 md:py-28 relative bg-solu-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Hear from food manufacturers who trust SoluDrive with their packaging operations">
            What Our Clients Say
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} custom={i}>
                <div className="bg-solu-card backdrop-blur-sm border border-solu-card-border rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="size-4 text-solu-accent fill-solu-accent" />
                    ))}
                  </div>
                  <p className="text-solu-text-muted text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-solu-divider">
                    <div
                      className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-solu-text">{t.name}</p>
                      <p className="text-xs text-solu-text-subtle">{t.title}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 10. CONTACT FORM ═══════════════ */}
      <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solu-accent/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-solu-teal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Get in touch with our engineering team to discuss your next packaging machine project">
            Contact Us
          </SectionTitle>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left info cards */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection custom={0}>
                <div className="bg-solu-card backdrop-blur-sm border border-solu-card-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-solu-text mb-4">Get in Touch</h3>
                  <p className="text-solu-text-muted text-sm leading-relaxed mb-6">
                    Ready to discuss your next packaging machine project? Our engineering team is here to help
                    you from concept to commissioning. Reach out and we will respond within 24 hours.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solu-accent to-solu-teal flex items-center justify-center shrink-0 shadow-lg shadow-solu-accent/20">
                        <Mail className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-solu-text">Email</p>
                        <p className="text-sm text-solu-text-muted">Info@soludrive.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solu-accent to-solu-teal flex items-center justify-center shrink-0 shadow-lg shadow-solu-accent/20">
                        <Phone className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-solu-text">Phone</p>
                        <p className="text-sm text-solu-text-muted">0645305126</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solu-accent to-solu-teal flex items-center justify-center shrink-0 shadow-lg shadow-solu-accent/20">
                        <MapPin className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-solu-text">Office</p>
                        <p className="text-sm text-solu-text-muted">Vresselseweg 5, 5491 PA Sint-Oedenrode, The Netherlands</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection custom={1}>
                <div className="bg-solu-navy rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-solu-accent/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative">
                    <h4 className="font-bold mb-2">Quick Response Guarantee</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      Our engineering team typically responds within 4 business hours. For urgent inquiries,
                      call our direct line.
                    </p>
                    <div className="flex items-center gap-2 text-solu-accent-light text-sm font-semibold">
                      <Zap className="size-4" />
                      Average response: 4 hours
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3">
              <AnimatedSection custom={2}>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 11. FOOTER ═══════════════ */}
      <footer className="bg-solu-footer-bg border-t border-solu-divider pt-16 pb-8 mt-auto text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <Link href="#home" className="flex items-center gap-3 mb-4">
                {/* Light mode footer logo (colored) */}
                <div className="relative h-10 w-auto overflow-hidden block dark:hidden">
                  <Image src="/images/logo-01.jpg" alt="SoluDrive Logo" width={160} height={40} className="object-contain h-10 w-auto" />
                </div>
                {/* Dark mode footer logo (white) */}
                <div className="relative h-10 w-auto overflow-hidden hidden dark:block">
                  <Image src="/images/logo-dark.jpg" alt="SoluDrive Logo" width={160} height={40} className="object-contain h-10 w-auto" />
                </div>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Concept engineering and machine building for the food packaging industry.
                Custom packaging solutions from design to commissioning.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label} href="#" aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-solu-accent/30 flex items-center justify-center text-white/60 hover:text-white transition-all"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Services</h4>
              <ul className="space-y-2">
                {['Packaging Machine Building', 'Concept Engineering', 'Smart Factory Integration', 'Machine Retrofitting', 'Spare Parts & Service'].map((item) => (
                  <li key={item}>
                    <Link href="#services" className="text-sm text-white/50 hover:text-solu-accent-light transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Company</h4>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', href: '#about' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Solutions', href: '#solutions' },
                  { label: 'Careers', href: '#' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-white/50 hover:text-solu-accent-light transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/50">
                  <Mail className="size-4 text-solu-accent-light shrink-0 mt-0.5" />
                  Info@soludrive.com
                </li>
                <li className="flex items-start gap-2 text-sm text-white/50">
                  <Phone className="size-4 text-solu-accent-light shrink-0 mt-0.5" />
                  0645305126
                </li>
                <li className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin className="size-4 text-solu-accent-light shrink-0 mt-0.5" />
                  <span>Vresselseweg 5<br />5491 PA Sint-Oedenrode<br />The Netherlands</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} SoluDrive. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
