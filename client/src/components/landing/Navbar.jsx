import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { to: '/#features', label: 'Features' },
  { to: '/#roadmap', label: 'Roadmap' },
  { to: '/#cta', label: 'Get started' },
]

const glassNav =
  'rounded-2xl border border-border/70 bg-canvas/55 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.55)] backdrop-blur-2xl backdrop-saturate-150 dark:border-border/40 dark:bg-canvas/50 dark:shadow-[0_12px_48px_-16px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.04)]'

const glassPanel =
  'rounded-2xl border border-border/70 bg-canvas/70 shadow-[0_16px_48px_-20px_rgba(0,0,0,0.15)] backdrop-blur-2xl backdrop-saturate-150 dark:border-border/40 dark:bg-canvas/55 dark:shadow-[0_20px_56px_-24px_rgba(0,0,0,0.8)]'

const linkClass =
  'rounded-xl px-3.5 py-2 text-sm text-muted transition-[color,background-color] duration-200 hover:bg-foreground/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        className={`pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-[3.75rem] sm:px-5 lg:px-6 ${glassNav}`}
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-sm font-semibold text-accent ring-1 ring-accent/20">
            S
          </span>
          <span className="text-[15px] sm:text-base">SkillSphere</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {user ? (
            <Link
              to="/app"
              className="hidden rounded-xl border border-border bg-elevated/70 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-border-subtle sm:inline-block"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-block"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="hidden rounded-xl border border-border bg-elevated/70 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-accent/[0.06] sm:inline-block"
              >
                Sign up
              </Link>
            </>
          )}
          <ThemeToggle className="hidden sm:flex" />
          <Link
            to="/#cta"
            className="hidden rounded-xl bg-foreground px-3 py-2 text-sm font-medium text-canvas shadow-sm transition-[transform,opacity] duration-200 hover:opacity-90 md:inline-block"
          >
            Join waitlist
          </Link>
          <ThemeToggle className="sm:hidden" />
          <button
            type="button"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-elevated/60 backdrop-blur-md transition-colors hover:bg-elevated md:hidden dark:bg-elevated/40 ${open ? 'ring-2 ring-accent/30' : ''}`}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden md:hidden ${glassPanel}`}
          >
            <div className="flex flex-col gap-0.5 p-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm text-foreground transition-colors hover:bg-foreground/[0.05] dark:hover:bg-white/[0.06]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              {user ? (
                <Link
                  to="/app"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-border bg-elevated/80 px-3 py-3 text-center text-sm font-medium text-foreground"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-foreground/[0.05] dark:hover:bg-white/[0.06]"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-foreground/[0.05] dark:hover:bg-white/[0.06]"
                  >
                    Sign up
                  </Link>
                </>
              )}
              <Link
                to="/#cta"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-foreground py-3 text-center text-sm font-medium text-canvas"
              >
                Join waitlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
