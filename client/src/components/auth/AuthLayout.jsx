import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../ui/ThemeToggle'

const glassNav =
  'rounded-2xl border border-border/70 bg-canvas/55 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.55)] backdrop-blur-2xl backdrop-saturate-150 dark:border-border/40 dark:bg-canvas/50 dark:shadow-[0_12px_48px_-16px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.04)]'

/**
 * Centered auth screen: same background language as the marketing site.
 */
export function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-90" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.3] dark:opacity-[0.1]"
        aria-hidden
      />

      <header className="pointer-events-none relative z-10 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:px-4 ${glassNav}`}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-sm font-semibold text-accent ring-1 ring-accent/20">
              S
            </span>
            <span className="text-[15px] sm:text-base">SkillSphere</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-lg flex-col justify-center px-4 pb-16 pt-10 sm:px-6"
      >
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
          )}
        </div>
        {children}
        {footer && <div className="mt-8 text-center text-sm text-muted">{footer}</div>}
      </motion.main>
    </div>
  )
}
