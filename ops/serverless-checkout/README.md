# Rainhawk — Serverless Stripe Checkout

The storefront is static (GitHub Pages) and cannot run server code. This tiny
Cloudflare Worker is the **only** server-side piece needed to take real,
multi-item cart payments. Free tier covers far more than launch volume.

## Deploy (≈5 minutes, one time)

```bash
npm install -g wrangler
cd ops/serverless-checkout
wrangler login                       # opens browser, authorize Cloudflare
wrangler secret put STRIPE_SECRET_KEY  # paste your Stripe SECRET key (sk_live_…)
wrangler deploy
```

`wrangler deploy` prints a URL like `https://rainhawk-checkout.<you>.workers.dev`.

## Wire it up

1. Put that URL in `js/config.js` → `CART_CHECKOUT_ENDPOINT`.
2. Set `STRIPE_PUBLISHABLE_KEY` (pk_live_…) in the same file.
3. Set `PAYMENTS_LIVE: true`.
4. Commit + push. The cart's **Checkout** button now creates a real Stripe
   Checkout Session and redirects the shopper to Stripe's hosted, PCI-compliant
   payment page. Prices are enforced server-side so the client can't tamper.

## Notes

- Enable **Stripe Tax** in the Stripe dashboard for `automatic_tax` to apply.
- The success page redirect (`checkout-success.html`) is included in the repo.
- For order → supplier automation, add a Stripe webhook that calls DSers /
  AliExpress on `checkout.session.completed` (see `../../DROPSHIPPING.md`).
- No alternative without a server: per-product Stripe **Payment Links** in
  `config.js` work with zero backend but only checkout one item at a time.
