// Step 2 of the Decap CMS "github" OAuth flow.
// GitHub redirects back here with a `code`; we exchange it server-side for
// an access token (using the OAuth app's secret, which must never reach the
// browser) and hand the token to the CMS popup via postMessage.
export default async function handler(req, res) {
  const { code, error, error_description: errorDescription } = req.query || {}

  if (error) {
    res.status(400).send(renderMessage('error', { message: errorDescription || error }))
    return
  }

  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    res.status(500).send('Server is missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET environment variables.')
    return
  }

  if (!code) {
    res.status(400).send(renderMessage('error', { message: 'Missing authorization code from GitHub.' }))
    return
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error || !tokenData.access_token) {
      res.status(400).send(
        renderMessage('error', { message: tokenData.error_description || 'GitHub did not return an access token.' })
      )
      return
    }

    res.status(200).send(renderMessage('success', { token: tokenData.access_token, provider: 'github' }))
  } catch (err) {
    res.status(500).send(renderMessage('error', { message: 'Unexpected error while contacting GitHub.' }))
  }
}

function renderMessage(status, payload) {
  // Escape so the JSON can't break out of the inline <script> block.
  const safeJson = JSON.stringify(payload).replace(/</g, '\\u003c')

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:${status}:${safeJson}',
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`
}
