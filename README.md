# Muhammad Haris — Portfolio

Next.js portfolio. Every bit of text, every link, and every image path lives
in **one file** so you never have to touch component code just to update
content.

## Edit content

Open `data/content.js`. Everything on the page — name, tagline, experience,
education, projects, skills, achievements, contact info — is a plain object
or array in there. Change the value, save, done.

Examples:
- Change your tagline → edit `profile.tagline`
- Add a new job → add an object to the `experience` array
- Add/remove a project → add/remove an object in the `projects` array
- Reorder skills → reorder the `items` array inside `skillGroups`

## Change images

1. Drop the new image file into `public/images` (profile photo) or
   `public/images/projects` (project screenshots).
2. Point to it from `data/content.js`, e.g.:
   ```js
   photo: "/images/my-pic.jpg"
   ```
   or for a project:
   ```js
   img: "/images/projects/prospectX.png"
   ```

Any image format works (jpg/png/webp). No resizing required — the CSS
handles cropping. Keep photos under ~1-2MB for fast loading.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel

**Option A — via GitHub (recommended)**
1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as **Next.js** — leave all settings default.
4. Click **Deploy**. Every future push to `main` auto-deploys.

**Option B — via CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts (link/create project, confirm defaults). Run `vercel --prod`
to push to production.

No environment variables or extra config needed — it's a static-friendly
Next.js app out of the box.

## Project structure

```
app/
  layout.js       — fonts + page metadata
  page.js          — renders <Portfolio /> with content from data/content.js
  globals.css      — all styling
components/
  Portfolio.js     — page layout + interactivity (terminal typing, reveals, project cards)
data/
  content.js       — ← edit this for any text/image/link change
public/
  images/          — profile photo
  images/projects/ — project screenshots
```
# portfolio
