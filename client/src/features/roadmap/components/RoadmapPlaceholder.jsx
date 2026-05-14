import { motion } from 'framer-motion'
import { HiLockClosed, HiMap } from 'react-icons/hi2'

export function RoadmapPlaceholder({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300/90 bg-zinc-100/50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-200/80 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        <HiMap className="h-7 w-7" aria-hidden />
      </span>
      <h2 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        This learning path is not available in the demo yet. Select <strong>Full Stack</strong> in the sidebar to use
        the interactive roadmap.
      </p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400">
        <HiLockClosed className="h-3.5 w-3.5" aria-hidden />
        Coming soon
      </p>
    </motion.div>
  )
}
