import { motion } from 'framer-motion'

const footerLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'GitHub', href: 'https://github.com' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-canvas">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-xs font-semibold text-accent">
            S
          </span>
          <span>© {new Date().getFullYear()} SkillSphere</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-muted transition-colors hover:text-foreground"
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </footer>
  )
}
