// Verifies the webmaster's username/password (set as Vercel env vars) and,
// on success, hands back a separate GitHub access token scoped only to this
// repo's contents — never the webmaster's own GitHub credentials, because
// they don't need a GitHub account at all. See api/auth.js for the login
// page that calls this.
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' })
    return
  }

  const expectedUsername = process.env.WEBMASTER_USERNAME
  const passwordHash = process.env.WEBMASTER_PASSWORD_HASH
  const token = process.env.WEBMASTER_GITHUB_TOKEN

  if (!expectedUsername || !passwordHash || !token) {
    res.status(500).json({ ok: false, message: 'Webmaster login is not configured yet.' })
    return
  }

  const { username, password } = req.body || {}

  if (!username || !password) {
    res.status(400).json({ ok: false, message: 'Username and password are required.' })
    return
  }

  // Always run the (slow) hash comparison, even on a username mismatch, so a
  // wrong username doesn't respond noticeably faster than a wrong password.
  const passwordMatches = await bcrypt.compare(password, passwordHash)
  const usernameMatches = username === expectedUsername

  if (!usernameMatches || !passwordMatches) {
    res.status(401).json({ ok: false, message: 'Invalid username or password.' })
    return
  }

  res.status(200).json({ ok: true, token })
}
