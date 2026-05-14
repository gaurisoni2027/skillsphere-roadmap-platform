import {
  HiChartBarSquare,
  HiMap,
  HiSparkles,
  HiUsers,
} from 'react-icons/hi2'
import { Section } from '../ui/Section'
import { FeatureCard } from './FeatureCard'

const features = [
  {
    icon: HiMap,
    title: 'Interactive roadmaps',
    description:
      'Break big goals into stages you can check off. Pan, zoom, and reorganize without losing context.',
  },
  {
    icon: HiChartBarSquare,
    title: 'Skill radar & progress',
    description:
      'See strengths and gaps at a glance. Track proficiency over time with lightweight self assessments.',
  },
  {
    icon: HiUsers,
    title: 'Built for learners',
    description:
      'Whether you are in a bootcamp or self-taught, templates adapt to your pace and your stack.',
  },
  {
    icon: HiSparkles,
    title: 'Focus, not clutter',
    description:
      'A calm interface inspired by tools you already love—fast keyboard flows and zero dashboard bloat.',
  },
]

export function Features() {
  return (
    <Section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">Features</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Everything you need to grow deliberately
        </h2>
        <p className="mt-4 text-base text-muted">
          Plan learning sprints, attach resources, and keep your trajectory visible—without another
          spreadsheet.
        </p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 0.06} />
        ))}
      </div>
    </Section>
  )
}
