import { useCallback, useMemo, useState } from 'react'
import { ROADMAP_SKILLS } from '../data/roadmapSkills'
import { loadRoadmapProgress, saveRoadmapProgress } from '../lib/roadmapStorage'
import { applyActivityStreak } from '../lib/streakUtils'

const XP_PER_LEVEL = 400

function skillStatus(skillId, index, completedSet) {
  if (completedSet.has(skillId)) return 'completed'
  if (index === 0) return 'unlocked'
  const prevId = ROADMAP_SKILLS[index - 1].id
  if (completedSet.has(prevId)) return 'unlocked'
  return 'locked'
}

export function useRoadmapProgress(userId) {
  const [state, setState] = useState(() => loadRoadmapProgress(userId))

  const persist = useCallback(
    (next) => {
      setState(next)
      saveRoadmapProgress(userId, next)
    },
    [userId],
  )

  const completedSet = useMemo(() => new Set(state.completedIds), [state.completedIds])

  const statuses = useMemo(() => {
    const map = {}
    ROADMAP_SKILLS.forEach((s, i) => {
      map[s.id] = skillStatus(s.id, i, completedSet)
    })
    return map
  }, [completedSet])

  const completionPercent = useMemo(() => {
    if (ROADMAP_SKILLS.length === 0) return 0
    return Math.round((state.completedIds.length / ROADMAP_SKILLS.length) * 100)
  }, [state.completedIds.length])

  const completedCount = state.completedIds.length

  const level = Math.floor(state.xp / XP_PER_LEVEL) + 1
  const xpIntoLevel = state.xp % XP_PER_LEVEL
  const levelProgressPercent = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100)

  const markComplete = useCallback(
    (skillId) => {
      const index = ROADMAP_SKILLS.findIndex((s) => s.id === skillId)
      if (index === -1) return { ok: false, message: 'Unknown skill.' }
      if (statuses[skillId] === 'locked') return { ok: false, message: 'Complete the previous step first.' }
      if (statuses[skillId] === 'completed') return { ok: false, message: 'Already completed.' }

      const skill = ROADMAP_SKILLS[index]
      const streakPatch = applyActivityStreak(state)
      const next = {
        ...state,
        ...streakPatch,
        completedIds: [...state.completedIds, skillId],
        xp: state.xp + skill.xpReward,
        skillProgress: { ...state.skillProgress, [skillId]: 100 },
      }
      persist(next)
      return { ok: true }
    },
    [state, statuses, persist],
  )

  const bumpProgress = useCallback(
    (skillId, delta) => {
      if (statuses[skillId] !== 'unlocked') return
      const cur = state.skillProgress[skillId] ?? 0
      const nextVal = Math.min(95, Math.max(0, cur + delta))
      const streakPatch = applyActivityStreak(state)
      persist({
        ...state,
        ...streakPatch,
        skillProgress: { ...state.skillProgress, [skillId]: nextVal },
      })
    },
    [state, statuses, persist],
  )

  return {
    state,
    statuses,
    completionPercent,
    completedCount,
    xp: state.xp,
    level,
    streak: state.streak || (state.completedIds.length > 0 ? 1 : 0),
    xpIntoLevel,
    levelProgressPercent,
    markComplete,
    bumpProgress,
  }
}
