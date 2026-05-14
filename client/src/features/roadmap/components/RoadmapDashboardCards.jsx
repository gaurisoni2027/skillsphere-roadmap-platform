import { motion } from 'framer-motion'
import { HiArrowTrendingUp, HiBolt, HiCheckCircle, HiFire, HiSparkles } from 'react-icons/hi2'

const cardBase =
  'group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-700'

export function RoadmapDashboardCards({
  xp,
  completedCount,
  totalSkills,
  streak,
  completionPercent,
}) {
  const cards = [
    {
      label: 'XP points',
      value: xp.toLocaleString(),
      hint: 'Earn more by completing skills',
      icon: HiSparkles,
      accent: 'text-violet-500 dark:text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Skills done',
      value: `${completedCount}/${totalSkills}`,
      hint: 'Nodes marked complete',
      icon: HiCheckCircle,
      accent: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Current streak',
      value: `${streak}d`,
      hint: 'Study on consecutive days',
      icon: HiFire,
      accent: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Roadmap progress',
      value: `${completionPercent}%`,
      hint: 'Across this learning path',
      icon: HiArrowTrendingUp,
      accent: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/10',
    },
  ]

  return (
    <div className="grid gap-3 px-4 pb-2 pt-4 sm:grid-cols-2 sm:gap-4 sm:px-5 lg:grid-cols-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className={cardBase}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {c.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
                {c.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{c.hint}</p>
            </div>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg}`}>
              <c.icon className={`h-5 w-5 ${c.accent}`} aria-hidden />
            </span>
          </div>
          <HiBolt className="pointer-events-none absolute -right-1 -top-1 h-16 w-16 text-zinc-200/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-zinc-700/40" aria-hidden />
        </motion.div>
      ))}
    </div>
  )
}
