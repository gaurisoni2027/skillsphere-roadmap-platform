/**
 * Static roadmap definition — replace or fetch from an API later.
 * Order defines unlock chain: complete previous → unlock next.
 */

export const ROADMAP_SKILLS = [
  {
    id: 'html',
    title: 'HTML',
    difficulty: 'Beginner',
    shortDescription:
      'Learn semantic markup, forms, and accessibility so every page you build has solid structure.',
    resources: [
      { label: 'MDN — HTML', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      { label: 'web.dev Learn HTML', url: 'https://web.dev/learn/html/' },
    ],
    estimatedHours: 10,
    xpReward: 120,
  },
  {
    id: 'css',
    title: 'CSS',
    difficulty: 'Beginner',
    shortDescription:
      'Style layouts with the cascade, Flexbox, and Grid. Understand responsive units and motion.',
    resources: [
      { label: 'MDN — CSS', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS' },
      { label: 'CSS-Tricks Guides', url: 'https://css-tricks.com/guides/' },
    ],
    estimatedHours: 14,
    xpReward: 150,
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    difficulty: 'Intermediate',
    shortDescription:
      'Master the language of the web: types, async flows, modules, and the DOM API.',
    resources: [
      { label: 'MDN — JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { label: 'javascript.info', url: 'https://javascript.info/' },
    ],
    estimatedHours: 40,
    xpReward: 280,
  },
  {
    id: 'react',
    title: 'React',
    difficulty: 'Intermediate',
    shortDescription:
      'Build UIs with components, hooks, and state. Think in declarative trees and effects.',
    resources: [
      { label: 'React.dev Learn', url: 'https://react.dev/learn' },
      { label: 'Patterns.dev — React', url: 'https://www.patterns.dev/react' },
    ],
    estimatedHours: 35,
    xpReward: 260,
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    difficulty: 'Intermediate',
    shortDescription:
      'Ship full-stack React with routing, data fetching, and deployment tuned for production.',
    resources: [
      { label: 'Next.js Docs', url: 'https://nextjs.org/docs' },
      { label: 'Vercel Learn', url: 'https://vercel.com/learn' },
    ],
    estimatedHours: 30,
    xpReward: 240,
  },
]

export function getSkillById(id) {
  return ROADMAP_SKILLS.find((s) => s.id === id) ?? null
}

export function getSkillIndex(id) {
  return ROADMAP_SKILLS.findIndex((s) => s.id === id)
}
