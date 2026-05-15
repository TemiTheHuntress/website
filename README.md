# TemiNet

A Next.js personal site for my domain. Funny, cynical, cyberpunk, and statically exported for Cloudflare Pages.

## Local dev

```sh
npm install
npm run dev
```

## Cloudflare Pages

- Framework preset: `Next.js`
- Build command: `npm run deploy`
- Build output directory: `out`

`next.config.js` uses `output: "export"`, so the build produces static files in `out`.
