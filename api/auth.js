// Step 1 of the Decap CMS "github" OAuth flow.
// The CMS opens this endpoint in a popup. Rather than jumping straight to
// GitHub, it offers two paths:
//   - Developer (super admin): real GitHub OAuth, via ?provider=github below.
//   - Webmaster: a plain username/password form (api/webmaster-login.js)
//     that, on success, hands Decap a separate, narrowly-scoped GitHub
//     token — the webmaster never needs a GitHub account of their own.
// See api/callback.js for the developer path's continuation.
export default function handler(req, res) {
  if (req.query?.provider === 'github') {
    redirectToGitHub(req, res)
    return
  }

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(LOGIN_CHOOSER_HTML)
}

function redirectToGitHub(req, res) {
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

const LOGIN_CHOOSER_HTML = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>Igagasi Primary School CMS Login</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, #081f33, #12564a);
    font-family: 'Segoe UI', Arial, sans-serif;
    padding: 24px;
  }
  .card {
    background: #fff;
    color: #16202b;
    border-radius: 16px;
    padding: 32px;
    width: 100%;
    max-width: 340px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  }
  h1 {
    font-size: 1.1rem;
    margin: 0 0 20px;
    text-align: center;
    color: #081f33;
  }
  .btn {
    display: block;
    width: 100%;
    padding: 12px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
  }
  .btn-github {
    background: #0b3556;
    color: #fff;
  }
  .btn-webmaster {
    background: #e3b23c;
    color: #081f33;
    margin-top: 16px;
  }
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .divider {
    text-align: center;
    color: #94a3b8;
    font-size: 0.78rem;
    margin: 20px 0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    margin: 12px 0 6px;
    color: #334;
  }
  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
  }
  .error {
    color: #b91c1c;
    font-size: 0.82rem;
    margin-top: 10px;
    display: none;
  }
  .hint {
    font-size: 0.72rem;
    color: #94a3b8;
    text-align: center;
    margin-top: 16px;
  }
</style>
</head>
<body>
  <div class="card">
    <h1>Igagasi Primary School &mdash; CMS Login</h1>
    <a class="btn btn-github" href="/api/auth?provider=github">Developer Login (GitHub)</a>
    <div class="divider">or</div>
    <form id="webmasterForm">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" autocomplete="username" required />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autocomplete="current-password" required />
      <button class="btn btn-webmaster" type="submit" id="webmasterSubmit">Webmaster Login</button>
      <div class="error" id="error"></div>
    </form>
    <p class="hint" id="noOpenerHint" style="display:none">
      This page should be opened by the CMS login screen, not visited directly.
    </p>
  </div>
  <script>
    (function () {
      var opener = window.opener;
      var form = document.getElementById('webmasterForm');
      var errorEl = document.getElementById('error');
      var submitBtn = document.getElementById('webmasterSubmit');

      if (!opener) {
        document.getElementById('noOpenerHint').style.display = 'block';
      }

      function sendSuccess(token) {
        function receiveMessage(e) {
          opener.postMessage(
            'authorization:github:success:' + JSON.stringify({ token: token, provider: 'github' }),
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        opener.postMessage('authorizing:github', '*');
      }

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        errorEl.style.display = 'none';

        if (!opener) {
          errorEl.textContent = 'This page must be opened from the CMS login screen.';
          errorEl.style.display = 'block';
          return;
        }

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        submitBtn.disabled = true;

        fetch('/api/webmaster-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: password }),
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok && data.ok, data: data };
            });
          })
          .then(function (result) {
            submitBtn.disabled = false;
            if (result.ok) {
              sendSuccess(result.data.token);
            } else {
              errorEl.textContent = (result.data && result.data.message) || 'Invalid username or password.';
              errorEl.style.display = 'block';
            }
          })
          .catch(function () {
            submitBtn.disabled = false;
            errorEl.textContent = 'Something went wrong. Please try again.';
            errorEl.style.display = 'block';
          });
      });
    })();
  </script>
</body>
</html>`
