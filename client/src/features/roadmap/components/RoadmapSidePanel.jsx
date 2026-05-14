import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowTopRightOnSquare, HiXMark } from 'react-icons/hi2'
import { getSkillById } from '../data/roadmapSkills'

const RESOURCE_STYLES = [
  'border-sky-400/40 bg-sky-500/[0.12] text-sky-900 hover:bg-sky-500/20 dark:text-sky-100',
  'border-violet-400/40 bg-violet-500/[0.12] text-violet-900 hover:bg-violet-500/20 dark:text-violet-100',
  'border-amber-400/40 bg-amber-500/[0.12] text-amber-950 hover:bg-amber-500/20 dark:text-amber-100',
  'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-950 hover:bg-emerald-500/20 dark:text-emerald-100',
]

function difficultyClass(d) {
  if (d === 'Beginner')
    return 'border-emerald-400/40 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200'
  return 'border-amber-400/40 bg-amber-500/15 text-amber-950 dark:text-amber-100'
}

export function RoadmapSidePanel({
  skillId,
  skillProgress,
  onClose,
  status,
  onMarkComplete,
  onStudySession,
  feedback,
}) {
  const skill = skillId ? getSkillById(skillId) : null
  const canComplete = skill && status === 'unlocked'
  const isDone = skill && status === 'completed'
  const locked = skill && status === 'locked'

  const pct = skill
    ? isDone
      ? 100
      : Math.min(100, skillProgress?.[skill.id] ?? 0)
    : 0

  return (
    <AnimatePresence mode="wait">
      {skill && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm md:hidden"
            aria-label="Close panel"
            onClick={onClose}
          />
          <motion.aside
            key={skill.id}
            initial={{ x: 32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 32, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full max-h-[100dvh] w-full max-w-md flex-col overflow-hidden border-l border-zinc-200/90 bg-gradient-to-b from-white to-zinc-50 shadow-2xl dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 md:static md:max-h-none md:max-w-[400px] md:shrink-0 md:shadow-xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-zinc-200/90 px-5 py-5 dark:border-zinc-800">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                    Skill
                  </span>
                  {skill.difficulty && (
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${difficultyClass(skill.difficulty)}`}
                    >
                      {skill.difficulty}
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                  {skill.title}
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border border-zinc-200/90 p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                aria-label="Close"
              >
                <HiXMark className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{skill.shortDescription}</p>

              <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Your progress
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-white">{pct}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  />
                </div>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/90 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Est. time</dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">
                    {skill.estimatedHours}h
                  </dd>
                </div>
                <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/90 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">XP reward</dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-violet-600 dark:text-violet-400">
                    +{skill.xpReward}
                  </dd>
                </div>
              </dl>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Learning resources
                </p>
                <ul className="mt-3 space-y-2.5">
                  {skill.resources.map((r, i) => (
                    <li key={r.url}>
                      <motion.a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${RESOURCE_STYLES[i % RESOURCE_STYLES.length]}`}
                      >
                        <span className="min-w-0 truncate">{r.label}</span>
                        <HiArrowTopRightOnSquare className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {locked && (
                <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:text-amber-100">
                  Complete the previous skill on the map to unlock this one.
                </p>
              )}

              {feedback && (
                <p
                  role="status"
                  className="rounded-xl border border-zinc-200/90 bg-zinc-100/80 px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
                >
                  {feedback}
                </p>
              )}
            </div>

            <div className="border-t border-zinc-200/90 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/80">
              <div className="flex flex-col gap-2 sm:flex-row">
                {canComplete && (
                  <>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onStudySession?.()}
                      className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      Log study (+15%)
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onMarkComplete?.()}
                      className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-900/20"
                    >
                      Mark complete
                    </motion.button>
                  </>
                )}
                {isDone && (
                  <p className="w-full rounded-xl border border-emerald-400/35 bg-emerald-500/10 py-3.5 text-center text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Completed — great work
                  </p>
                )}
                {locked && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border border-zinc-200 py-3 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100 md:hidden"
                  >
                    Back to map
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
