# Outly landing page

This is a self-contained static site. It does not depend on the Next.js app or require a build step.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8787 --directory outly-landing
```

Then open `http://localhost:8787`.

## Deploy with GitHub Pages

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/(root)` folder, then save.

GitHub Pages will publish `index.html` directly, with no build step required.
