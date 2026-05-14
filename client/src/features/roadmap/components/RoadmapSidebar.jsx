import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { ROADMAP_CATALOG } from '../data/roadmapCatalog'

function initials(name, email) {
  const n = (name || '').trim()
  if (n.length >= 2) return n.slice(0, 2).toUpperCase()
  if (email) return email.slice(0, 2).toUpperCase()
  return 'SS'
}

export function RoadmapSidebar({
  userName,
  userEmail,
  onLogout,
  activeRoadmapId,
  onSelectRoadmap,
  level,
  streak,
}) {
  return (
    <motion.aside
      initial={{ x: -14, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full shrink-0 flex-col border-b border-zinc-200/90 bg-zinc-50/95 backdrop-blur-xl dark:border-zinc-800/90 dark:bg-zinc-900/95 md:w-[260px] md:border-b-0 md:border-r"
    >
      <div className="flex items-center justify-between gap-2 p-4 md:block">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/90 px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <HiArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Home
        </Link>
      </div>

      <div className="px-3 pb-2">
        <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          My roadmaps
        </p>
        <nav className="flex gap-1.5 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {ROADMAP_CATALOG.map((item) => {
            const Icon = item.icon
            const active = item.id === activeRoadmapId
            const comingSoon = !item.hasGraph
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onSelectRoadmap(item.id)}
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={[
                  'flex min-w-[148px] shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 md:min-w-0',
                  active
                    ? 'border-violet-500/40 bg-gradient-to-r from-violet-500/12 to-indigo-500/10 text-zinc-900 shadow-sm dark:text-white'
                    : 'border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-white dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                    active
                      ? 'border-violet-400/40 bg-violet-500/15 text-violet-600 dark:text-violet-300'
                      : 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{item.title}</span>
                  <span className="block truncate text-[11px] text-zinc-500 dark:text-zinc-500">
                    {comingSoon ? 'Coming soon' : item.subtitle}
                  </span>
                </span>
              </motion.button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-zinc-200/90 p-4 dark:border-zinc-800/90">
        <motion.div
          layout
          className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/60"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-md">
              {initials(userName, userEmail)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-zinc-900 dark:text-zinc-50">{userName || 'Learner'}</p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{userEmail}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-zinc-100/90 px-2.5 py-2 text-center dark:bg-zinc-900/80">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Streak
              </p>
              <p className="text-lg font-semibold tabular-nums text-amber-600 dark:text-amber-400">{streak}d</p>
            </div>
            <div className="rounded-xl bg-zinc-100/90 px-2.5 py-2 text-center dark:bg-zinc-900/80">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Level
              </p>
              <p className="text-lg font-semibold tabular-nums text-violet-600 dark:text-violet-400">{level}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-3 w-full rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700/50"
          >
            Log out
          </button>
        </motion.div>
      </div>
    </motion.aside>
  )
}
