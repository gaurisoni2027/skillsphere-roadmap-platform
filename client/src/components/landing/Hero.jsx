import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi2'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.35] dark:opacity-[0.12]"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/90 bg-elevated/75 px-3.5 py-1.5 text-[13px] font-medium leading-none tracking-wide text-muted shadow-sm backdrop-blur-md dark:border-border/80 dark:bg-elevated/50 dark:shadow-none sm:mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Now in early access
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-[20ch] text-balance text-[2.375rem] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:max-w-4xl sm:text-5xl sm:leading-[1.08] sm:tracking-[-0.035em] lg:text-6xl lg:leading-[1.05] lg:tracking-[-0.04em]"
        >
          Your skills, mapped.{' '}
          <span className="bg-gradient-to-r from-accent via-accent to-accent-muted bg-clip-text text-transparent">
            Your path, clear.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-lg text-pretty text-[15px] leading-[1.65] text-muted sm:mt-9 sm:max-w-xl sm:text-lg sm:leading-[1.7]"
        >
          SkillSphere is an interactive roadmap and skill tracking platform built for students and
          developers who want structure without the noise.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4"
        >
          <motion.a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-canvas shadow-glow transition-opacity hover:opacity-90 sm:px-7 sm:text-[15px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start for free
            <HiArrowRight className="h-4 w-4" aria-hidden />
          </motion.a>
          <motion.a
            href="#roadmap"
            className="inline-flex items-center rounded-xl border border-border/90 bg-elevated/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent/25 hover:bg-accent/[0.06] sm:px-7 sm:text-[15px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See roadmap preview
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}
