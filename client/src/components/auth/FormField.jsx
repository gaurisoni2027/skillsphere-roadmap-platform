/**
 * One labeled field with optional hint and validation error (shown after blur or submit).
 */
export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  showError,
  hint,
  autoComplete,
  disabled,
}) {
  const invalid = Boolean(showError && error)

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={
          invalid ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={`w-full rounded-xl border bg-canvas px-4 py-3 text-[15px] text-foreground outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted/60 disabled:cursor-not-allowed disabled:opacity-60 ${
          invalid
            ? 'border-red-500/70 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/25'
            : 'border-border focus:border-accent/50 focus:ring-2 focus:ring-accent/20'
        }`}
      />
      {hint && !invalid && (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      )}
      {invalid && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
