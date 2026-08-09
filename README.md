# DRESXO — Premium Menswear Store

Tracksuits, shirts and trousers. Next.js 14 + Tailwind + Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Order & contact emails (IMPORTANT)

Both the checkout form and the contact form send you an email via
[Resend](https://resend.com).

1. Create a free Resend account and generate an API key (Sending access).
2. Add it as an environment variable named `RESEND_API_KEY`
   - Locally: create a `.env.local` file with `RESEND_API_KEY=re_xxxxx`
   - On Vercel: Project → Settings → Environment Variables

Emails are sent to `support.lunarbloom.pk@gmail.com`.
To change that, edit `TO_EMAIL` at the top of:
- `app/api/order/route.ts`
- `app/api/contact/route.ts`

Until you verify a domain in Resend, emails come from `onboarding@resend.dev`
and can ONLY be delivered to the email address your Resend account was
registered with. Once you verify a domain, update `FROM_EMAIL` in both files
and you can send to any address.

## Adding products

Edit `lib/products.ts`. Each product needs:
`id, name, code, tagline, description, price, category, image, notes, fabric, size`

`category` must be one of: `tracksuits` | `shirts` | `trousers`

Product photos go in `public/products/` and are referenced as
`/products/your-file.png`.

## Social links

Instagram and TikTok are both `@dresxo.official`, set in:
- `app/social/page.tsx`
- `components/footer.tsx`

## Deploying

Push to GitHub, import the repo on Vercel, add `RESEND_API_KEY`, deploy.
