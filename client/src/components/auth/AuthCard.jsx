/**
 * Frosted panel for login / signup forms (matches landing glass style).
 */
export function AuthCard({ children }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-elevated/80 p-6 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.45)] backdrop-blur-2xl backdrop-saturate-150 dark:border-border/50 dark:bg-elevated/50 dark:shadow-[0_12px_48px_-16px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8">
      {children}
    </div>
  )
}
