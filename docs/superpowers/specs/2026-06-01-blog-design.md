# Blog for aniketawati.com — Design

**Date:** 2026-06-01

## Goals

1. Remove all references to `babylookslike.in` from the site.
2. Add a blog to the (currently single-page, zero-build) static site, seeded with two
   posts the user authored elsewhere and wants reproduced + linked back to the original.

## Constraints

- Pure static site: vanilla HTML/CSS/JS, no build step, no dependencies.
- Must match the existing visual language: dark theme, Space Grotesk, gradient section
  headings, card hover style, floating nav. Reuse `style.css` design tokens.

## Part 1 — Remove babylookslike.in

Two references in `index.html`:
- The mention in the "Things I've Actually Done" fun-facts list (currently
  "Currently building PageRules.io and BabyLooksLike.in on the side") → reword to drop
  BabyLooksLike.in.
- The entire `BabyLooksLike.in` project card in the projects grid → delete.

## Part 2 — Blog structure

```
index.html            # add "Musings" link to floating nav -> blog.html
blog.html             # blog index: header + one card per post
blog/
  appsurfer-bids-adieu.html
  extracting-llm-reasoning.html
```

- **No new JS required.** Pages are plain HTML linking `style.css`. `script.js` may be
  included on blog pages for visual consistency (particles/cursor), but is optional and
  must not break when page-specific elements (`.glitch`, `.section`) are absent — it
  already guards with null checks, so it is safe to include.

### `blog.html` (index)

- A simple header (site title link back home + page title "Musings" in the gradient style).
- A vertical list of post cards. Each card: title (link), date, one-line excerpt, and a
  "Read →" affordance. Card reuses `.project-card`-style surface/hover.
- Newest post first.

### Post page template

Each post page contains:
- A top bar with a "← aniketawati.com" / "← Back to blog" link.
- Article header: title (gradient heading), date, and an "Originally posted on
  &lt;source&gt;" link opening the original in a new tab (`rel="noopener"`).
- Article body in a centered, readable prose column (max-width ~720px), with styled
  headings, paragraphs, lists, and blockquotes.
- Footer reused from the homepage.

### CSS additions (`style.css`)

A small blog block, reusing existing variables:
- `.blog-header`, `.post-list`, `.post-card` (list view).
- `.article` prose container: max-width, larger line-height, styled `h2/h3`, `p`, `ul`,
  `blockquote`, `a`, and a `.post-meta` / `.post-source` line.
- `.back-link` styling.
- Responsive: single column, comfortable padding on mobile (mirror existing breakpoints).

## Seed posts (verbatim, user-authored)

1. **AppSurfer Bids Adieu**
   - Slug: `blog/appsurfer-bids-adieu.html`
   - Date: 1 June 2016
   - Source link: https://blog.appsurfer.com/post/145253504285/appsurfer-bids-adieu
   - Body: full original text reproduced verbatim (the 4-year journey through V1.0–V4.0,
     Google Instant Apps, the farewell).

2. **Can You Extract an LLM's Reasoning Into a Tiny Probabilistic Program?**
   - Slug: `blog/extracting-llm-reasoning.html`
   - Date: 24 March 2026
   - Subtitle: "An experiment in distilling Claude's knowledge into probability tables
     and Markov chains"
   - Source link: https://x.com/aniketawati/status/2036462807684882913
   - Body: full text reproduced verbatim (ProbSQL experiment, methodology, results,
     lessons), with the github.com/aniketawati/axiomata link preserved.

## Out of scope (YAGNI)

- No tags/categories, no pagination, no RSS, no comments, no search, no CMS/markdown
  pipeline. Posts are hand-authored HTML; adding a new post = copy a post file + add a
  card to `blog.html`.

## Testing / verification

- Open `index.html`, `blog.html`, and both post pages locally; confirm: no
  `babylookslike` references remain, nav "Musings" link works, post links resolve, source
  links open the originals, and layout is readable on mobile widths.
