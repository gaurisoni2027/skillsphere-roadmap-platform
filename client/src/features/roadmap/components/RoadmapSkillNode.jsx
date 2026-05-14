import { memo } from 'react'
import { motion } from 'framer-motion'
import { HiCheck, HiLockClosed } from 'react-icons/hi2'
import { Handle, Position } from 'reactflow'

const R = 30
const C = 2 * Math.PI * R

function ProgressRing({ value, variant }) {
  const offset = C - (value / 100) * C
  const stroke =
    variant === 'completed'
      ? 'stroke-emerald-400'
      : variant === 'active'
        ? 'stroke-indigo-400'
        : 'stroke-zinc-500/35'
  return (
    <svg className="h-[72px] w-[72px] shrink-0 -rotate-90" viewBox="0 0 72 72" aria-hidden>
      <circle cx="36" cy="36" r={R} fill="none" className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="5" />
      <circle
        cx="36"
        cy="36"
        r={R}
        fill="none"
        className={`${stroke} transition-all duration-500`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={variant === 'locked' ? C : offset}
      />
    </svg>
  )
}

function RoadmapSkillNodeInner({ data, selected }) {
  const { title, status, progress } = data
  const pct = status === 'completed' ? 100 : Math.min(100, progress ?? 0)
  const isLocked = status === 'locked'
  const isDone = status === 'completed'
  const isActive = status === 'unlocked'

  const ringVariant = isDone ? 'completed' : isLocked ? 'locked' : 'active'

  return (
    <motion.div
      layout
      initial={false}
      whileHover={isLocked ? {} : { scale: 1.03, y: -3 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={[
        'relative flex min-w-[260px] max-w-[300px] select-none rounded-2xl border px-5 py-4 shadow-lg backdrop-blur-md transition-[box-shadow,transform,border-color] duration-300 sm:min-w-[280px] sm:max-w-[320px]',
        isLocked ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
        isLocked &&
          'border-zinc-300/80 bg-zinc-200/50 text-zinc-600 shadow-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-400',
        isActive &&
          'border-indigo-400/50 bg-gradient-to-br from-indigo-500/15 to-violet-600/10 text-zinc-900 shadow-indigo-900/20 dark:border-indigo-400/35 dark:from-indigo-500/20 dark:to-violet-600/15 dark:text-zinc-50',
        isDone &&
          'border-emerald-400/45 bg-gradient-to-br from-emerald-500/15 to-teal-600/10 text-zinc-900 shadow-emerald-900/15 dark:border-emerald-500/35 dark:from-emerald-500/15 dark:to-teal-900/20 dark:text-white',
        selected && !isLocked
          ? 'ring-2 ring-indigo-400/60 ring-offset-4 ring-offset-zinc-100 dark:ring-indigo-400/50 dark:ring-offset-zinc-900'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-zinc-300 !bg-zinc-400 dark:!border-zinc-600 dark:!bg-zinc-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-zinc-300 !bg-zinc-400 dark:!border-zinc-600 dark:!bg-zinc-500"
      />

      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex shrink-0 items-center justify-center">
          <ProgressRing value={pct} variant={ringVariant} />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {isDone ? (
              <HiCheck className="h-7 w-7 text-emerald-500 dark:text-emerald-400" aria-hidden />
            ) : isLocked ? (
              <HiLockClosed className="h-5 w-5 text-zinc-400 dark:text-zinc-500" aria-hidden />
            ) : null}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold tracking-tight sm:text-lg">{title}</p>
          <p
            className={[
              'mt-1 text-xs font-semibold uppercase tracking-wider',
              isLocked && 'text-zinc-500 dark:text-zinc-500',
              isActive && 'text-indigo-600 dark:text-indigo-300',
              isDone && 'text-emerald-600 dark:text-emerald-400',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {isDone ? 'Completed' : isLocked ? 'Locked' : `${Math.round(pct)}% · Active`}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export const RoadmapSkillNode = memo(RoadmapSkillNodeInner)
