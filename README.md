# Java Stream Explorer

A production-ready Next.js experience for mastering Java Stream pipelines. Explore blueprint use cases, visualize lazy evaluation, and experiment with simulated data flows in an interactive playground.

## Getting Started

### Requirements

- Node.js 18+
- npm 8+

### Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site.

### Production Build

```bash
npm run build
npm start
```

## Highlights

- Stage-by-stage pipeline blueprints with annotated Java snippets.
- Interactive playground that traces each intermediate/terminal operation.
- Quick-reference cheatsheet with pragmatic production tips.
- Tailwind-driven dark UI optimized for long-form reading.

## Project Structure

```
app/
  components/       // Playground, cheatsheet, concept grid
  layout.tsx        // Root layout and metadata
  page.tsx          // Main page composition
public/             // Static assets
tailwind.config.js  // Tailwind theme setup
```

## Deployment

Optimized for Vercel:

```bash
npx vercel deploy --prod
```

## License

MIT
