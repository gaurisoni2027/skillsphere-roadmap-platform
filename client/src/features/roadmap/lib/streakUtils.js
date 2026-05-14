/**
 * Lightweight streak: consecutive calendar days with any roadmap activity.
 * Frontend demo only — use server logic in production.
 */

function isoDay(d) {
  return d.toISOString().slice(0, 10)
}

function addDays(iso, delta) {
  const x = new Date(`${iso}T12:00:00Z`)
  x.setUTCDate(x.getUTCDate() + delta)
  return isoDay(x)
}

/**
 * @param {{ streak?: number, lastActivityDay?: string }} state
 * @returns {{ streak: number, lastActivityDay: string }}
 */
export function applyActivityStreak(state) {
  const today = isoDay(new Date())
  const prevDay = state.lastActivityDay
  const prevStreak = typeof state.streak === 'number' ? state.streak : 0

  if (prevDay === today) {
    return { streak: Math.max(1, prevStreak), lastActivityDay: today }
  }

  if (!prevDay) {
    return { streak: Math.max(1, prevStreak || 1), lastActivityDay: today }
  }

  if (addDays(prevDay, 1) === today) {
    return { streak: prevStreak + 1, lastActivityDay: today }
  }

  return { streak: 1, lastActivityDay: today }
}
