import { useCallback, useMemo, useState } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { ROADMAP_CATALOG } from './data/roadmapCatalog'
import { ROADMAP_SKILLS } from './data/roadmapSkills'
import { useRoadmapProgress } from './hooks/useRoadmapProgress'
import { estimatedWeeksRemaining } from './lib/roadmapStats'
import { RoadmapDashboardCards } from './components/RoadmapDashboardCards'
import { RoadmapFlowCanvas } from './components/RoadmapFlowCanvas'
import { RoadmapPageHeader } from './components/RoadmapPageHeader'
import { RoadmapPlaceholder } from './components/RoadmapPlaceholder'
import { RoadmapShellHeader } from './components/RoadmapShellHeader'
import { RoadmapSidePanel } from './components/RoadmapSidePanel'
import { RoadmapSidebar } from './components/RoadmapSidebar'

export function RoadmapApp() {
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const userId = user?.email ?? 'guest'

  const {
    state,
    statuses,
    completionPercent,
    completedCount,
    xp,
    level,
    streak,
    markComplete,
    bumpProgress,
  } = useRoadmapProgress(userId)

  const [activeRoadmapId, setActiveRoadmapId] = useState('fullstack')
  const [selectedId, setSelectedId] = useState(null)
  const [panelFeedback, setPanelFeedback] = useState('')

  const activeCatalog = useMemo(
    () => ROADMAP_CATALOG.find((r) => r.id === activeRoadmapId),
    [activeRoadmapId],
  )
  const showGraph = activeCatalog?.hasGraph === true

  const handleNodeClick = useCallback((id) => {
    setSelectedId(id)
    setPanelFeedback('')
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelectedId(null)
    setPanelFeedback('')
  }, [])

  const handleMarkComplete = useCallback(() => {
    if (!selectedId) return
    setPanelFeedback('')
    const result = markComplete(selectedId)
    if (!result.ok) setPanelFeedback(result.message)
    else setPanelFeedback('Progress saved. Next skill unlocked.')
  }, [selectedId, markComplete])

  const handleStudySession = useCallback(() => {
    if (!selectedId) return
    bumpProgress(selectedId, 15)
    setPanelFeedback('Study session logged.')
  }, [selectedId, bumpProgress])

  const headerCopy = useMemo(() => {
    if (activeRoadmapId === 'fullstack') {
      return {
        title: 'Full-stack learning path',
        description:
          'A guided sequence from markup to shipping with Next.js. Complete each node to unlock the next and grow your XP.',
      }
    }
    return {
      title: `${activeCatalog?.title ?? 'Learning'} roadmap`,
      description:
        'This path is coming soon. Switch to Full Stack in the sidebar to explore the interactive graph and skill details.',
    }
  }, [activeRoadmapId, activeCatalog?.title])

  const weeksLeft = showGraph ? estimatedWeeksRemaining(state.completedIds) : 0

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 md:flex-row">
      <RoadmapSidebar
        userName={user?.name}
        userEmail={user?.email}
        onLogout={logout}
        activeRoadmapId={activeRoadmapId}
        onSelectRoadmap={(id) => {
          setActiveRoadmapId(id)
          setSelectedId(null)
          setPanelFeedback('')
        }}
        level={level}
        streak={streak}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-zinc-100/95 dark:bg-zinc-950/95">
        <RoadmapShellHeader />

        <RoadmapDashboardCards
          xp={xp}
          completedCount={completedCount}
          totalSkills={ROADMAP_SKILLS.length}
          streak={streak}
          completionPercent={showGraph ? completionPercent : 0}
        />

        <RoadmapPageHeader
          title={headerCopy.title}
          description={headerCopy.description}
          completionPercent={showGraph ? completionPercent : 0}
          estimatedWeeks={showGraph ? weeksLeft : null}
        />

        <div className="flex min-h-0 flex-1 flex-col gap-0 border-t border-zinc-200/90 dark:border-zinc-800/90 md:flex-row md:items-stretch">
          <div className="relative min-h-0 min-w-0 flex-1 p-3 sm:p-4 md:p-5">
            {showGraph ? (
              <ReactFlowProvider>
                <RoadmapFlowCanvas
                  colorMode={theme === 'dark' ? 'dark' : 'light'}
                  statuses={statuses}
                  skillProgress={state.skillProgress}
                  completedIds={state.completedIds}
                  onNodeClick={handleNodeClick}
                />
              </ReactFlowProvider>
            ) : (
              <RoadmapPlaceholder title={activeCatalog?.title ?? 'Roadmap'} />
            )}
          </div>

          <RoadmapSidePanel
            skillId={showGraph ? selectedId : null}
            skillProgress={state.skillProgress}
            onClose={handleClosePanel}
            status={selectedId ? statuses[selectedId] : undefined}
            onMarkComplete={handleMarkComplete}
            onStudySession={handleStudySession}
            feedback={panelFeedback}
          />
        </div>
      </div>
    </div>
  )
}
