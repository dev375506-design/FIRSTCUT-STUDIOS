# FirstCut Studios

This Git repository is the complete Vite and Netlify project root. The React entry files (`App.tsx`, `main.tsx`, and `components/`) intentionally live at the repository root.

## Netlify setup

In Netlify, connect this repository and leave **Base directory** empty. Set the build command to `npm run build` and the publish directory to `dist` (both are already in `netlify.toml`). Do not set `src` as the base directory: the repository itself is the app root.

Deploy the complete repository through Netlify's Git integration. Netlify installs the locked dependencies, builds the React app, and publishes `dist/index.html` and its assets. Uploading the TypeScript source files directly does not create a working website and causes a homepage 404. For manual deployments, build locally and upload only the generated `dist` folder.

The included Netlify Function handles `/api/inquiries` and `/api/health`. Add `MONGODB_URI` and optionally `MONGODB_DB` in **Site configuration > Environment variables**, then trigger a new deploy. Attachments are limited to four files and 4 MB total.

## Local development

```sh
npm install
npm run dev
```

To test the API locally, copy `server/.env.example` to `server/.env`, fill in your MongoDB Atlas URI, then run `npm run dev:full`.

`config.ts` contains editable services, prices, portfolio entries, social links, offer settings, and the optional separate API origin. Do not put database credentials in frontend config.
