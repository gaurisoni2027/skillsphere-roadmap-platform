import { ROADMAP_SKILLS } from '../data/roadmapSkills'

/** Total planned hours for the default roadmap. */
export function totalRoadmapHours() {
  return ROADMAP_SKILLS.reduce((acc, s) => acc + s.estimatedHours, 0)
}

/** Hours attributed to completed nodes. */
export function completedRoadmapHours(completedIds) {
  const done = new Set(completedIds)
  return ROADMAP_SKILLS.filter((s) => done.has(s.id)).reduce((acc, s) => acc + s.estimatedHours, 0)
}

/** Rough ETA: remaining hours ÷ assumed hours per week. */
export function estimatedWeeksRemaining(completedIds, hoursPerWeek = 8) {
  const rem =
    totalRoadmapHours() - completedRoadmapHours(completedIds)
  if (rem <= 0) return 0
  return Math.max(1, Math.ceil(rem / hoursPerWeek))
}
