import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi2'
import { Section } from '../ui/Section'

export function CTASection() {
  return (
    <Section id="cta" className="py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border bg-elevated px-6 py-14 text-center shadow-card dark:shadow-card-dark sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-80" />
        <div className="relative mx-auto max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready to chart your next chapter?
          </h2>
          <p className="mt-3 text-base text-muted">
            Join the waitlist for early access. No spam—just a single launch note when SkillSphere
            opens up.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:items-stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="cta-email" className="sr-only">
              Email
            </label>
            <input
              id="cta-email"
              type="email"
              required
              placeholder="you@university.edu"
              className="min-h-11 flex-1 rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm text-foreground outline-none ring-accent/30 placeholder:text-muted/70 focus:ring-2"
            />
            <motion.button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join waitlist
              <HiArrowRight className="h-4 w-4" aria-hidden />
            </motion.button>
          </form>
          <p className="mt-4 text-xs text-muted">
            By continuing you agree to receive product updates. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
