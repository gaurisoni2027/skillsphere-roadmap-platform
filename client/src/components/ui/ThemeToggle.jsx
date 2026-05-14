import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-elevated text-foreground transition-colors hover:bg-border-subtle ${className}`}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.02 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        key={isDark ? 'dark' : 'light'}
        initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <HiMoon className="h-[18px] w-[18px] text-accent" aria-hidden />
        ) : (
          <HiSun className="h-[18px] w-[18px] text-accent" aria-hidden />
        )}
      </motion.span>
    </motion.button>
  )
}
