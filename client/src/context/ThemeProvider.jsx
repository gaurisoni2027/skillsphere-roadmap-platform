import { useCallback, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

const STORAGE_KEY = 'skillsphere-theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  const setTheme = useCallback((next) => {
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light')
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
