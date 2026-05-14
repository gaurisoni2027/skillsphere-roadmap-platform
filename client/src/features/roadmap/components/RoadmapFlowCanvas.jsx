import 'reactflow/dist/style.css'
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import { ROADMAP_SKILLS } from '../data/roadmapSkills'
import { RoadmapSkillNode } from './RoadmapSkillNode'
import '../styles/roadmap-flow.css'

const nodeTypes = { roadmapSkill: RoadmapSkillNode }

/** Horizontal gap between node origins (wider cards + readable edges). */
const NODE_GAP_X = 320

function buildNodes(statuses, skillProgress) {
  return ROADMAP_SKILLS.map((s, i) => ({
    id: s.id,
    type: 'roadmapSkill',
    position: { x: i * NODE_GAP_X, y: 48 },
    data: {
      title: s.title,
      status: statuses[s.id],
      progress:
        skillProgress[s.id] ??
        (statuses[s.id] === 'completed' ? 100 : 0),
    },
  }))
}

function buildEdges(statuses, completedIds) {
  const done = new Set(completedIds)
  return ROADMAP_SKILLS.slice(0, -1).map((s, i) => {
    const target = ROADMAP_SKILLS[i + 1]
    const targetUnlocked = statuses[target.id] !== 'locked'
    const sourceDone = done.has(s.id)
    return {
      id: `e-${s.id}-${target.id}`,
      source: s.id,
      target: target.id,
      type: 'smoothstep',
      animated: targetUnlocked && !done.has(target.id),
      style: {
        stroke: sourceDone ? 'rgb(52 211 153 / 0.85)' : 'rgb(161 161 170 / 0.45)',
        strokeWidth: 2.5,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: sourceDone ? 'rgb(52 211 153 / 0.85)' : 'rgb(161 161 170 / 0.45)',
        width: 22,
        height: 22,
      },
    }
  })
}

export function RoadmapFlowCanvas({
  statuses,
  skillProgress,
  completedIds,
  onNodeClick,
  colorMode = 'dark',
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const flowRef = useRef(null)

  const fitKey = useMemo(
    () =>
      JSON.stringify({
        statuses,
        skillProgress,
        completedIds,
      }),
    [statuses, skillProgress, completedIds],
  )

  useLayoutEffect(() => {
    setNodes(buildNodes(statuses, skillProgress))
  }, [statuses, skillProgress, setNodes])

  useLayoutEffect(() => {
    setEdges(buildEdges(statuses, completedIds))
  }, [statuses, completedIds, setEdges])

  const runFitView = useCallback(() => {
    const instance = flowRef.current
    if (!instance || nodes.length === 0) return
    requestAnimationFrame(() => {
      instance.fitView({
        padding: 0.06,
        minZoom: 0.72,
        maxZoom: 1.85,
      })
    })
  }, [nodes.length])

  useLayoutEffect(() => {
    runFitView()
  }, [fitKey, nodes.length, runFitView])

  const handleNodeClick = useCallback(
    (_, node) => {
      onNodeClick?.(node.id)
    },
    [onNodeClick],
  )

  const handleInit = useCallback((instance) => {
    flowRef.current = instance
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        instance.fitView({
          padding: 0.06,
          minZoom: 0.72,
          maxZoom: 1.85,
        })
      })
    })
  }, [])

  return (
    <div className="roadmap-canvas h-full min-h-[min(520px,55vh)] w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200/90 shadow-inner dark:border-zinc-800/90 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onInit={handleInit}
        fitViewOptions={{ padding: 0.06, minZoom: 0.72, maxZoom: 1.85 }}
        minZoom={0.28}
        maxZoom={2}
        colorMode={colorMode}
        className="!h-full !min-h-[400px] !w-full !bg-transparent"
        defaultEdgeOptions={{ zIndex: 0 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.1}
          color={colorMode === 'dark' ? 'rgb(82 82 91 / 0.35)' : 'rgb(161 161 170 / 0.45)'}
        />
        <Controls className="!overflow-hidden !rounded-xl !border !border-zinc-200/90 !bg-white/95 !shadow-lg dark:!border-zinc-700 dark:!bg-zinc-900/95 [&_button]:!border-zinc-200 [&_button]:!bg-transparent [&_button]:hover:!bg-zinc-100 dark:[&_button]:!border-zinc-700 dark:[&_button]:hover:!bg-zinc-800" />
        <MiniMap
          className="!overflow-hidden !rounded-xl !border !border-zinc-200/90 !bg-zinc-100/90 dark:!border-zinc-700 dark:!bg-zinc-900/80"
          nodeStrokeWidth={2}
          maskColor={colorMode === 'dark' ? 'rgb(24 24 27 / 0.72)' : 'rgb(244 244 245 / 0.75)'}
          nodeColor={(n) => {
            const st = n.data?.status
            if (st === 'completed') return 'rgb(52 211 153 / 0.5)'
            if (st === 'unlocked') return 'rgb(129 140 248 / 0.45)'
            return 'rgb(63 63 70 / 0.5)'
          }}
        />
      </ReactFlow>
    </div>
  )
}
