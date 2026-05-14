import { motion } from 'framer-motion'

const hoverTransition = {
  type: 'tween',
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: hoverTransition,
      }}
      whileTap={{ scale: 0.995 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-elevated p-6 shadow-card transition-[box-shadow,border-color,background-color] duration-500 ease-out hover:border-accent/20 hover:shadow-[0_0_0_1px_rgb(var(--accent)/0.12),0_20px_50px_-24px_rgb(0_0_0/0.18)] dark:shadow-card-dark dark:hover:border-accent/25 dark:hover:shadow-[0_0_0_1px_rgb(var(--accent)/0.18),0_24px_60px_-20px_rgb(0_0_0/0.55)] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% -20%, rgb(var(--accent) / 0.12), transparent 55%)',
        }}
      />
      <div className="relative">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/10 transition-[transform,background-color,box-shadow] duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2 group-hover:bg-accent/15 group-hover:ring-accent/25">
          {Icon && (
            <Icon
              className="h-5 w-5 transition-transform duration-500 ease-out group-hover:scale-110"
              aria-hidden
            />
          )}
        </div>
        <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-foreground sm:text-[17px]">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-muted/90 sm:text-[15px] sm:leading-relaxed">
          {description}
        </p>
      </div>
    </motion.article>
  )
}
