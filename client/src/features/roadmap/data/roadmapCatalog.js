import {
  HiBolt,
  HiCodeBracket,
  HiCpuChip,
  HiRectangleStack,
} from 'react-icons/hi2'

/**
 * Sidebar roadmap list. Only `fullstack` has the interactive graph for now.
 */
export const ROADMAP_CATALOG = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'UI & browser',
    icon: HiCodeBracket,
    hasGraph: false,
  },
  {
    id: 'fullstack',
    title: 'Full Stack',
    subtitle: 'HTML → Next.js',
    icon: HiRectangleStack,
    hasGraph: true,
  },
  {
    id: 'dsa',
    title: 'DSA',
    subtitle: 'Patterns & practice',
    icon: HiBolt,
    hasGraph: false,
  },
  {
    id: 'aiml',
    title: 'AI / ML',
    subtitle: 'Models & data',
    icon: HiCpuChip,
    hasGraph: false,
  },
]
