import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Braces, ArrowLeft, Loader2 } from 'lucide-react'
import { emailSchema, otpSchema, type EmailFormValues, type OtpFormValues } from '@/features/auth/schemas'
import { authApi } from '@/features/auth/api'
import { useAuthStore } from '@/store/authStore'

const RESEND_COOLDOWN_SECONDS = 30

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((s) => s.setSession)
  const setRememberMe = useAuthStore((s) => s.setRememberMe)

  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [rememberMeChecked, setRememberMeChecked] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard'

  const emailForm = useForm<EmailFormValues>({ resolver: zodResolver(emailSchema) })
  const otpForm = useForm<OtpFormValues>({ resolver: zodResolver(otpSchema) })

  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current)
    }
  }, [])

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN_SECONDS)
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1 && cooldownRef.current) {
          clearInterval(cooldownRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const onRequestOtp = async (values: EmailFormValues) => {
    setServerError(null)
    setIsSubmitting(true)
    try {
      await authApi.requestOtp(values.email)
      setEmail(values.email)
      setStep('otp')
      startCooldown()
    } catch {
      setServerError('Something went wrong sending the code. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onResend = async () => {
    if (cooldown > 0) return
    setServerError(null)
    try {
      await authApi.requestOtp(email)
      startCooldown()
    } catch {
      setServerError('Could not resend the code. Please try again shortly.')
    }
  }

  const onVerifyOtp = async (values: OtpFormValues) => {
    setServerError(null)
    setIsSubmitting(true)
    try {
      const { data } = await authApi.verifyOtp(email, values.code, rememberMeChecked)
      setRememberMe(rememberMeChecked)
      setSession(data.user, data.accessToken)
      navigate(redirectTo, { replace: true })
    } catch {
      setServerError('That code is incorrect or has expired. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 font-display text-lg font-semibold mb-10">
          <Braces className="h-5 w-5 text-teal" aria-hidden="true" />
          Data Master Consulting
        </Link>

        <div className="rounded-lg border border-border/60 bg-surface p-8">
          <AnimatePresence mode="wait">
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-display text-2xl font-semibold">Log in</h1>
                <p className="mt-2 text-sm text-slate">
                  We'll email you a 6-digit code — no password to remember.
                </p>

                <form onSubmit={emailForm.handleSubmit(onRequestOtp)} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm text-slate mb-1.5">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      className="w-full rounded-md border border-border bg-ink px-3 py-2.5 text-sm text-offwhite placeholder:text-slate-dark focus-visible:border-teal"
                      placeholder="you@example.com"
                      {...emailForm.register('email')}
                    />
                    {emailForm.formState.errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {emailForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {serverError && <p className="text-xs text-red-400">{serverError}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-teal py-2.5 text-sm font-medium text-ink hover:bg-teal-dim transition-colors disabled:opacity-60"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Send code
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setStep('email')}
                  className="flex items-center gap-1 text-xs text-slate hover:text-offwhite transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Change email
                </button>

                <h1 className="mt-4 font-display text-2xl font-semibold">Enter your code</h1>
                <p className="mt-2 text-sm text-slate">
                  We sent a 6-digit code to <span className="text-offwhite">{email}</span>
                </p>

                <form onSubmit={otpForm.handleSubmit(onVerifyOtp)} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="code" className="block text-sm text-slate mb-1.5">
                      6-digit code
                    </label>
                    <input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="one-time-code"
                      autoFocus
                      className="w-full rounded-md border border-border bg-ink px-3 py-2.5 text-center text-lg tracking-[0.5em] font-mono text-offwhite focus-visible:border-teal"
                      placeholder="······"
                      {...otpForm.register('code')}
                    />
                    {otpForm.formState.errors.code && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {otpForm.formState.errors.code.message}
                      </p>
                    )}
                  </div>

                  <label className="flex items-center gap-2 text-sm text-slate">
                    <input
                      type="checkbox"
                      checked={rememberMeChecked}
                      onChange={(e) => setRememberMeChecked(e.target.checked)}
                      className="rounded border-border bg-ink accent-teal"
                    />
                    Remember me for 30 days
                  </label>

                  {serverError && <p className="text-xs text-red-400">{serverError}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-teal py-2.5 text-sm font-medium text-ink hover:bg-teal-dim transition-colors disabled:opacity-60"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Verify &amp; log in
                  </button>

                  <button
                    type="button"
                    onClick={onResend}
                    disabled={cooldown > 0}
                    className="w-full text-center text-xs text-slate hover:text-offwhite transition-colors disabled:opacity-50"
                  >
                    {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
