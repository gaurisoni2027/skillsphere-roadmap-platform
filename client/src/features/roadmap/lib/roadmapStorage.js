/**
 * Persists roadmap progress per user in localStorage (frontend-only).
 */

const keyFor = (userId) => `skillsphere_roadmap_${encodeURIComponent(userId || 'guest')}`

const defaultState = () => ({
  completedIds: [],
  xp: 0,
  skillProgress: {},
  streak: 0,
  lastActivityDay: '',
})

export function loadRoadmapProgress(userId) {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(keyFor(userId))
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return {
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      skillProgress:
        parsed.skillProgress && typeof parsed.skillProgress === 'object'
          ? parsed.skillProgress
          : {},
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      lastActivityDay: typeof parsed.lastActivityDay === 'string' ? parsed.lastActivityDay : '',
    }
  } catch {
    return defaultState()
  }
}

export function saveRoadmapProgress(userId, state) {
  try {
    localStorage.setItem(keyFor(userId), JSON.stringify(state))
  } catch {
    /* quota / private mode */
  }
}
