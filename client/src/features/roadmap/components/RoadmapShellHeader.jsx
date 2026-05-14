import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../../../components/ui/ThemeToggle'

export function RoadmapShellHeader() {
  return (
    <motion.header
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between gap-3 border-b border-zinc-200/90 bg-white/95 px-4 py-3 backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-900/90 sm:px-5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-md">
          S
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">SkillSphere</p>
          <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">Your learning workspace</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="hidden rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:inline-block"
        >
          Marketing site
        </Link>
        <ThemeToggle />
      </div>
    </motion.header>
  )
}
