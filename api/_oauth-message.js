// Shared by api/callback.js and api/auth.js. Files prefixed with "_" under
// api/ are not treated as routes by Vercel, so this is just a plain module.
//
// Implements the handshake Decap CMS's "github" backend expects from its
// login popup: the popup announces itself, waits for the opener (the CMS
// tab) to reply, then posts the real result back using the opener's origin.
export function renderOAuthMessage(status, payload) {
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
