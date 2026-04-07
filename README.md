# Captain Al's Specials Landing Page

Next.js landing page for Captain Al's specials signup and monthly gift card drawing.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run typecheck
npm run build
```

The signup form posts to `app/api/lead/route.ts`, which currently validates the request and returns success. Wire that route to the final SMS, email, or CRM provider before collecting live leads.
