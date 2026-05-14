import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi2'
import { Section } from '../ui/Section'

const steps = [
  { label: 'Foundations', status: 'done', items: ['Git', 'HTTP', 'Terminal'] },
  { label: 'Core stack', status: 'active', items: ['React', 'TypeScript', 'Testing'] },
  { label: 'Ship', status: 'upcoming', items: ['CI/CD', 'Observability', 'Docs'] },
]

export function RoadmapPreview() {
  return (
    <Section id="roadmap" className="py-20 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Roadmap</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A preview that feels like the real product
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Stages collapse into milestones. Each node can hold notes, links, and completion dates.
            This is a static preview—imagine it alive with your own curriculum.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              Drag to rearrange priorities; dependencies stay intact.
            </li>
            <li className="flex gap-2">
              <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              Export snapshots for mentors or portfolio updates.
            </li>
            <li className="flex gap-2">
              <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              Dark mode native—easy on the eyes for long study sessions.
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-border bg-elevated p-6 shadow-card dark:shadow-card-dark sm:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <span className="text-sm font-medium text-foreground">Full-stack learner</span>
            <span className="rounded-md bg-border-subtle px-2 py-0.5 text-xs text-muted">Q2 sprint</span>
          </div>
          <div className="relative space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {index < steps.length - 1 && (
                  <span
                    className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-border"
                    aria-hidden
                  />
                )}
                <span
                  className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    step.status === 'done'
                      ? 'border-accent/40 bg-accent/15 text-accent'
                      : step.status === 'active'
                        ? 'border-accent bg-accent text-white'
                        : 'border-border bg-canvas text-muted'
                  }`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-border bg-canvas/50 p-4 dark:bg-canvas/30">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{step.label}</span>
                    {step.status === 'active' && (
                      <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                        In progress
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {step.items.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border-subtle bg-elevated px-2 py-0.5 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
