import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateSignupFields } from '../../lib/validation'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { FormField } from '../../components/auth/FormField'

function touchAll() {
  return { name: true, email: true, password: true, confirmPassword: true }
}

export function SignupPage() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touched, setTouched] = useState({})
  const [submitCount, setSubmitCount] = useState(0)
  const [formError, setFormError] = useState('')

  if (user) return <Navigate to="/app" replace />

  const fieldErrors = validateSignupFields({ name, email, password, confirmPassword })
  const show = (field) => Boolean(touched[field] || submitCount > 0)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitCount((c) => c + 1)
    setFormError('')
    const errs = validateSignupFields({ name, email, password, confirmPassword })
    if (Object.keys(errs).length > 0) {
      setTouched(touchAll())
      return
    }
    const result = signup(name, email, password)
    if (!result.ok) {
      setFormError(result.message)
      return
    }
    navigate('/app', { replace: true })
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start mapping skills and roadmaps in minutes."
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-accent hover:underline">
            Sign in
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
            id="name"
            label="Full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            error={fieldErrors.name}
            showError={show('name')}
            autoComplete="name"
          />

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
            hint="At least 8 characters."
            autoComplete="new-password"
          />

          <FormField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
            error={fieldErrors.confirmPassword}
            showError={show('confirmPassword')}
            autoComplete="new-password"
          />

          <motion.button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-foreground py-3 text-sm font-medium text-canvas shadow-sm transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Create account
          </motion.button>
        </form>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">
          By creating an account you agree to our placeholder Terms — this is a frontend demo.
        </p>
      </AuthCard>
    </AuthLayout>
  )
}
