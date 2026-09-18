# Igagasi Primary School Website

A React (Vite) website for Igagasi Primary School, Spruitview, with a
Decap CMS admin panel so school staff can update content without touching code.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The production build is output to `dist/`.

## Structure

- `src/pages` – Home, About, Academics, Governance (SMT & SGB), Gallery, Contact
- `src/components` – Navbar, Footer, Logo, PageHero, PhotoPlaceholder, WaveDivider
- `src/data/schoolInfo.js` – re-exports `src/content/settings.json`, plus the (code-only) nav menu
- `src/content/settings.json` – CMS-editable school info, homepage text and principal's message
- `src/content/gallery/*.json` – one file per gallery photo, CMS-editable
- `src/content/announcements/*.json` – one file per school notice, CMS-editable
- `public/images` – school photos (badge wall, entrance mosaic, plaid pattern)
- `public/admin` – the Decap CMS admin panel (`/admin` on the live site)
- `api/auth.js` – serves the CMS login screen (developer GitHub button + webmaster form)
- `api/callback.js` – finishes the developer's GitHub OAuth login
- `api/webmaster-login.js` – checks the webmaster's username/password

## Content Manager (Decap CMS)

Staff log in at `https://<your-site>/admin` with GitHub, and can edit:

- **School Settings** – address, phone, email, principal's name, established date, the
  homepage hero text/welcome message, and the principal's quote on the About page.
- **Gallery** – add, edit or remove achievement/event photos. The gallery page and its
  "coming soon" placeholders update automatically based on how many photos exist.
- **Announcements** – post, edit or remove school notices (title, date, message). They
  appear on `/announcements`, newest first.

Saved edits go to a draft first (the "Workflow" tab in the CMS) and only go live once
someone clicks **Publish** — so a typo or wrong photo never reaches the live site by
accident. Everything outside Settings/Gallery (page layout, navigation, the Academics
and Governance page copy) is intentionally left as code, not CMS-editable, so it can't be
broken by content edits.

### One-time setup (required before the CMS will work)

1. **Push this project to its own GitHub repository** (not a subfolder of another repo).
2. **Deploy it on Vercel**, connected to that GitHub repo, so every push auto-deploys.
3. **Create a GitHub OAuth App**: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
   - Homepage URL: your Vercel URL (e.g. `https://igagasi-website.vercel.app`)
   - Authorization callback URL: `https://<your-vercel-url>/api/callback`
4. **Add environment variables in the Vercel project** (Settings → Environment Variables):
   - `OAUTH_CLIENT_ID` – the OAuth App's Client ID
   - `OAUTH_CLIENT_SECRET` – the OAuth App's Client Secret
5. **Edit `public/admin/config.yml`**: set `repo` to your real `owner/repo`, and `base_url`
   to your real Vercel URL (both are marked `TODO` in the file).
6. Redeploy. Visit `/admin`, sign in with a GitHub account that has write access to the
   repo, and confirm you can open "School Settings" and "Gallery".

Full protocol details: [decapcms.org/docs/github-backend](https://decapcms.org/docs/github-backend/).

### Two login tiers: Developer vs Webmaster

Visiting `/admin` and clicking to log in offers two options:

- **Developer Login (GitHub)** – the "super admin" tier. Whoever logs in this way uses
  their own real GitHub account, has full control over the repo (settings, collaborators,
  deploy config), and can do anything a GitHub collaborator can do.
- **Webmaster Login (username/password)** – for the person who actually maintains the
  site day to day, with no GitHub account required. On success they get the exact same
  CMS (Settings, Announcements, Gallery), but authenticated via a separate, narrowly
  scoped GitHub token that can only read/write this one repo's contents — nothing else.

To set up the webmaster login, add three more environment variables in Vercel:

1. **Generate the webmaster's GitHub token**: GitHub → Settings → Developer settings →
   Personal access tokens → **Fine-grained tokens** → Generate new token.
   - Repository access: **Only select repositories** → this repo only.
   - Permissions: **Contents: Read and write** (that's the only one needed).
   - Copy the generated token.
2. **Choose a username and password** for the webmaster, then hash the password:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('YOUR-PASSWORD-HERE', 10))"
   ```
   (run this in the project folder, where `bcryptjs` is already installed)
3. **Add to Vercel** (Settings → Environment Variables):
   - `WEBMASTER_USERNAME` – the username you chose (plain text)
   - `WEBMASTER_PASSWORD_HASH` – the hash printed in step 2 (**not** the plain password)
   - `WEBMASTER_GITHUB_TOKEN` – the token from step 1
4. Redeploy. The webmaster can now log in at `/admin` with their username/password.

Because edits still go through `editorial_workflow`, a webmaster mistake is still just a
draft until someone clicks **Publish** — this doesn't remove that safety net.

## Updating Content in Code

For anything not exposed to the CMS (page copy, layout, adding new pages), edit the
relevant file under `src/pages` or `src/components` directly.
