# musings of a hermit

A digital cave where geopolitics, technology, and the occasional stray thought collide.  
Built with Astro, hosted on Netlify and GitHub Pages, and managed via Decap CMS.

---

## About

This blog exists because the outside world is loud and I occasionally need to shout into the void with some structure. The content leans toward geopolitical analysis, observations on technology, and whatever else surfaces during long walks and longer reading sessions.

If you’re here, you’re probably looking for something that doesn’t fit neatly into a social media feed. I don’t blame you.

---

## Tech stack (or: how it stays up when I’m offline)

- **Framework**: Astro – fast, modern, and respects my desire for simplicity.
- **CMS**: Decap CMS with GitHub OAuth. Writing happens in a browser; commits land in `src/data/blog/`.
- **Hosting**: Two places because one is never enough –  
  [Netlify](https://musingsofahermit.netlify.app) and [GitHub Pages](https://musingsofahermit.github.io). Both auto‑deploy on push.
- **Styling**: TailwindCSS. Dark/light mode with smooth transitions, a progress bar, copy buttons for code blocks, and a back‑to‑top button that fades in only when needed (because I don’t like clutter).
- **Search**: Fuse.js, for when you vaguely remember something I wrote six months ago.

---

## Local development (if you must)

```bash
git clone https://github.com/musingsofahermit/musingsofahermit.github.io.git
cd musingsofahermit.github.io
pnpm install
pnpm dev
