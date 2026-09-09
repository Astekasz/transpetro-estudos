import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cloudEnabled, supabase } from './supabase'

function PasswordRecovery() {
  const [loginForm, setLoginForm] = useState(null)
  const [dialog, setDialog] = useState(null)
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const findLoginForm = () => {
      const form = document.querySelector('.auth-form')
      const submit = form?.querySelector('button[type="submit"]')
      setLoginForm(submit?.textContent?.trim() === 'Entrar' ? form : null)
    }

    findLoginForm()
    const observer = new MutationObserver(findLoginForm)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!cloudEnabled) return

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setDialog('new-password')
        setMessage('Link confirmado. Defina sua nova senha.')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  function openResetDialog() {
    const currentEmail = loginForm?.querySelector('input[type="email"]')?.value || ''
    setEmail(currentEmail)
    setMessage('')
    setDialog('request')
  }

  async function requestReset(event) {
    event.preventDefault()
    if (!cloudEnabled) {
      setMessage('A recuperação de senha só funciona com a sincronização online ativada.')
      return
    }

    setBusy(true)
    setMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    })
    setBusy(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Se existir uma conta com esse e-mail, enviaremos um link para redefinir a senha. Verifique também a caixa de spam.')
  }

  async function updatePassword(event) {
    event.preventDefault()
    if (newPassword.length < 6) {
      setMessage('A nova senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem.')
      return
    }

    setBusy(true)
    setMessage('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setBusy(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setNewPassword('')
    setConfirmPassword('')
    setMessage('Senha alterada com sucesso. Você já pode continuar usando sua conta.')
    setTimeout(() => setDialog(null), 1800)
  }

  return <>
    {loginForm && createPortal(
      <button type="button" className="link-btn password-recovery-link" onClick={openResetDialog}>
        Esqueci minha senha
      </button>,
      loginForm
    )}

    {dialog && createPortal(
      <div className="password-recovery-backdrop" role="presentation" onMouseDown={event => {
        if (event.target === event.currentTarget && dialog !== 'new-password') setDialog(null)
      }}>
        <section className="password-recovery-dialog" role="dialog" aria-modal="true" aria-labelledby="password-recovery-title">
          <div className="eyebrow">CONTA</div>
          <h2 id="password-recovery-title">{dialog === 'new-password' ? 'Criar nova senha' : 'Recuperar senha'}</h2>

          {dialog === 'request' ? <form onSubmit={requestReset} className="auth-form">
            <p className="muted">Informe o e-mail da sua conta. Você receberá um link para criar uma nova senha.</p>
            <input type="email" placeholder="Seu e-mail" value={email} onChange={event => setEmail(event.target.value)} required autoFocus />
            <button className="primary" type="submit" disabled={busy}>{busy ? 'Enviando…' : 'Enviar link de recuperação'}</button>
            <button type="button" className="link-btn" onClick={() => setDialog(null)}>Voltar ao login</button>
          </form> : <form onSubmit={updatePassword} className="auth-form">
            <p className="muted">Digite e confirme a nova senha da sua conta.</p>
            <input type="password" placeholder="Nova senha" value={newPassword} onChange={event => setNewPassword(event.target.value)} minLength="6" required autoFocus />
            <input type="password" placeholder="Confirmar nova senha" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} minLength="6" required />
            <button className="primary" type="submit" disabled={busy}>{busy ? 'Alterando…' : 'Alterar senha'}</button>
          </form>}

          {message && <p className="password-recovery-message">{message}</p>}
        </section>
      </div>,
      document.body
    )}
  </>
}

export default PasswordRecovery
