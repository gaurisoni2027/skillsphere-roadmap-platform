import { RoadmapApp } from '../features/roadmap/RoadmapApp'
import { useAuth } from '../hooks/useAuth'

/**
 * Authenticated roadmap workspace (React Flow + sidebar + XP).
 */
export function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return <RoadmapApp key={user.email} />
}
