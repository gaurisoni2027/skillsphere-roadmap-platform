import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateLoginFields } from '../../lib/validation'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { FormField } from '../../components/auth/FormField'

function touchAll() {
  return { email: true, password: true }
}

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({})
  const [submitCount, setSubmitCount] = useState(0)
  const [formError, setFormError] = useState('')

  if (user) return <Navigate to={from} replace />

  const fieldErrors = validateLoginFields({ email, password })
  const show = (name) => Boolean(touched[name] || submitCount > 0)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitCount((c) => c + 1)
    setFormError('')
    const errs = validateLoginFields({ email, password })
    if (Object.keys(errs).length > 0) {
      setTouched(touchAll())
      return
    }
    const result = login(email, password)
    if (!result.ok) {
      setFormError(result.message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your roadmaps and skill tracking."
      footer={
        <p>
          New here?{' '}
          <Link to="/signup" className="font-medium text-accent hover:underline">
            Create an account
          </Link>
        </p>
      }
    >
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {formError && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
            >
              {formError}
            </div>
          )}

          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            error={fieldErrors.email}
            showError={show('email')}
            autoComplete="email"
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            error={fieldErrors.password}
            showError={show('password')}
            autoComplete="current-password"
          />

          <motion.button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-foreground py-3 text-sm font-medium text-canvas shadow-sm transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Sign in
          </motion.button>
        </form>
        <p className="mt-6 rounded-xl border border-border/60 bg-canvas/50 px-3 py-2 text-center text-[11px] leading-relaxed text-muted dark:bg-canvas/30">
          Demo mode: accounts are stored in this browser only. Use Sign up first, then Sign in with
          the same credentials.
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
