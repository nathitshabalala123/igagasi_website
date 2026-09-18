// Step 1 of the Decap CMS "github" OAuth flow.
// The CMS opens this endpoint in a popup; it just redirects on to GitHub's
// own login/consent screen. See api/callback.js for step 2.
export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID

  if (!clientId) {
    res.status(500).send('Server is missing the OAUTH_CLIENT_ID environment variable.')
    return
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host
  const protocol = host && host.startsWith('localhost') ? 'http' : 'https'
  const redirectUri = `${protocol}://${host}/api/callback`

  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', 'repo,user')

  res.writeHead(302, { Location: authUrl.toString() })
  res.end()
}
