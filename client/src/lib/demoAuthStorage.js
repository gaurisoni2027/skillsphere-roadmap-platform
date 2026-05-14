/**
 * Demo-only persistence for SkillSphere auth.
 * In a real app, passwords never live in the browser — use a backend and HTTPS.
 */

const USERS_KEY = 'skillsphere_demo_users'
const SESSION_KEY = 'skillsphere_session'

function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

/** @returns {{ email: string, name: string, password: string }[]} */
export function readUsers() {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(USERS_KEY)
  const list = safeParse(raw, [])
  return Array.isArray(list) ? list : []
}

/** @param {{ email: string, name: string, password: string }[]} users */
export function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/** @returns {{ email: string, name: string } | null} */
export function readSession() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(SESSION_KEY)
  const data = safeParse(raw, null)
  if (!data || typeof data.email !== 'string') return null
  return { email: data.email, name: typeof data.name === 'string' ? data.name : '' }
}

/** @param {{ email: string, name: string }} profile */
export function writeSession(profile) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(profile))
}

export function clearSessionStorage() {
  localStorage.removeItem(SESSION_KEY)
}
