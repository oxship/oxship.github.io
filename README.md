# oxship security writeups

A GitHub Pages site for public bug bounty writeups. The site uses GitHub Pages' built-in Jekyll support and has no custom build step.

## Publish a writeup

1. Copy `_drafts/writeup-template.md` to `_posts/YYYY-MM-DD-short-title.md`.
2. Replace every placeholder with verified, redacted details. Update the front matter title, description, author, and severity.
3. Confirm the program's disclosure policy or written permission. Remove secrets, personal data, private correspondence, and details that are not needed to explain the issue.
4. Commit and push to `main`. GitHub Pages will build the site and add the post to the home page and `/writeups/` archive.

Drafts in `_drafts/` are not published by the default Pages build.

## Local preview

If Ruby is available, install the `github-pages` gem and run `jekyll serve` in this directory. The published site is the authoritative preview until a local Jekyll environment is installed.

## Site structure

- `index.html`: home page
- `writeups.html`: archive
- `_posts/`: published case studies
- `template.md`: public guide to the writeup format
- `_drafts/writeup-template.md`: unpublished Markdown starter
- `_layouts/`: page and post layouts
- `assets/`: styles, theme script, and favicon

Published case studies appear automatically on the home page and in the writeup archive.
