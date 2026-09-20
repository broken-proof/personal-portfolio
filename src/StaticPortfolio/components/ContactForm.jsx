import { useEffect, useId, useState } from 'react'
import PixelPanel from '../../components/PixelPanel'
import PixelButton from '../../components/PixelButton'
import { contact } from '../data/contact'
import './ContactForm.css'

const emptyForm = { name: '', email: '', subject: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COOLDOWN_MS = 10000
// Keeps oversized payloads out of the request; well above what a real message needs
const MAX_LENGTH = { name: 100, email: 254, subject: 150, message: 5000 }

function validate({ name, email, subject, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!emailPattern.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (!subject.trim()) errors.subject = 'Please add a subject.'
  if (message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  return errors
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className="contact_field">
      <div className="contact_label_row">
        <label htmlFor={id}>{label}</label>
        {hint && <span className="contact_hint" aria-hidden="true">{hint}</span>}
      </div>
      {children}
      {error && <p className="contact_error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}

function ContactForm() {
  const baseId = useId()
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [coolingDown, setCoolingDown] = useState(false)

  // Brief lock after a successful send so the message can't be double-submitted
  useEffect(() => {
    if (!coolingDown) return
    const timer = setTimeout(() => setCoolingDown(false), COOLDOWN_MS)
    return () => clearTimeout(timer)
  }, [coolingDown])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Hidden field only bots fill in: pretend it worked without sending anything
    if (event.currentTarget.elements.botcheck.checked) {
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    if (!contact.accessKey) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.accessKey,
          from_name: contact.fromName,
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })
      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setValues(emptyForm)
        setCoolingDown(true)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (name, placeholder) => ({
    id: `${baseId}-${name}`,
    name,
    value: values[name],
    placeholder,
    maxLength: MAX_LENGTH[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${baseId}-${name}-error` : undefined,
  })

  return (
    <PixelPanel as="form" className="contact_form" onSubmit={handleSubmit} noValidate>
      <header className="contact_header">
        <h3>Send me a message</h3>
        <p>Have a question or wanna be friends? Write to me here and I will reply by email.</p>
      </header>

      <div className="contact_row">
        <Field id={`${baseId}-name`} label="Name" error={errors.name}>
          <input type="text" autoComplete="name" {...fieldProps('name', 'Your name')} />
        </Field>
        <Field id={`${baseId}-email`} label="Email" error={errors.email}>
          <input type="email" autoComplete="email" {...fieldProps('email', 'you@example.com')} />
        </Field>
      </div>

      <Field id={`${baseId}-subject`} label="Subject" error={errors.subject}>
        <input type="text" {...fieldProps('subject', 'What is this about?')} />
      </Field>

      <Field
        id={`${baseId}-message`}
        label="Message"
        error={errors.message}
        hint={`${values.message.length}/${MAX_LENGTH.message}`}
      >
        <textarea rows={6} {...fieldProps('message', 'Write your message here...')} />
      </Field>

      <input type="checkbox" name="botcheck" className="contact_botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="contact_actions">
        <PixelButton
          as="button"
          type="submit"
          variant="primary"
          disabled={status === 'sending' || coolingDown}
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </PixelButton>

        <p className={`contact_status contact_status_${status}`} role="status" aria-live="polite">
          {status === 'success' && 'Message sent. Thanks, I will get back to you soon!'}
          {status === 'error' && (
            <>
              Something went wrong. Please email me directly at{' '}
              <a href={`mailto:${contact.fallbackEmail}`}>{contact.fallbackEmail}</a>.
            </>
          )}
        </p>
      </div>
    </PixelPanel>
  )
}

export default ContactForm
