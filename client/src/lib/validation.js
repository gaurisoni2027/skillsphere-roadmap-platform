/** Simple email check — good enough for UI demos; servers should validate again. */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())
}

/** @returns {Record<string, string>} field key → error message */
export function validateLoginFields({ email, password }) {
  const errors = {}
  if (!String(email).trim()) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Password is required.'
  return errors
}

/** @returns {Record<string, string>} */
export function validateSignupFields({ name, email, password, confirmPassword }) {
  const errors = {}
  if (!String(name).trim()) errors.name = 'Name is required.'
  if (!String(email).trim()) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Password is required.'
  else if (password.length < 8) errors.password = 'Use at least 8 characters.'
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.'
  return errors
}
