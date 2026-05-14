import { motion } from 'framer-motion'

export function RoadmapPageHeader({
  title,
  description,
  completionPercent,
  estimatedWeeks,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-zinc-200/80 bg-gradient-to-b from-white/90 to-zinc-50/80 px-4 py-5 dark:border-zinc-800/80 dark:from-zinc-900/80 dark:to-zinc-950/60 sm:px-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Active roadmap
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
          <div className="rounded-2xl border border-zinc-200/90 bg-white/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Path progress
            </p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-white">
              {completionPercent}
              <span className="text-lg font-medium text-zinc-500">%</span>
            </p>
            <div className="mt-2 h-1.5 w-36 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200/90 bg-white/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Est. completion
            </p>
            <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-white">
              {estimatedWeeks == null ? '—' : estimatedWeeks === 0 ? 'Done' : `~${estimatedWeeks} wk`}
            </p>
            {estimatedWeeks != null && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">At ~8h / week</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
