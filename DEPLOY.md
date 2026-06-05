# Rainhawk — Deployment

## Live URLs
- GitHub Pages: **https://bangojetty.github.io/rainhawk-store/**
- Custom domain: **https://rainhawkgear.com/** (registered via Namecheap; live once DNS propagates + cert provisions)

## Hosting
GitHub Pages, repo [`Bangojetty/rainhawk-store`](https://github.com/Bangojetty/rainhawk-store), `main` branch, root. `.nojekyll` present. A `CNAME` file pins the custom domain.

## DNS (Namecheap → Advanced DNS for rainhawkgear.com)
GitHub Pages apex configuration:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | bangojetty.github.io |

## HTTPS
After DNS resolves, GitHub auto-provisions a Let's Encrypt certificate (can take up to ~24h). Then enable **Enforce HTTPS** in the repo's Pages settings (or via `gh api -X PUT repos/Bangojetty/rainhawk-store/pages -F https_enforced=true`).

## Redeploy
Commit to `main` and `git push` — Pages rebuilds automatically.

## Payments & fulfillment
The store is **payment-ready**: a full Stripe Checkout integration is built and deployed (`js/config.js`, `js/payments.js`, `js/checkout.js`, `checkout-success.html`, plus a deploy-ready serverless Checkout worker in `ops/serverless-checkout/`). It ships in honest **demo mode** (`PAYMENTS_LIVE: false`) and flips to live the instant the owner adds their own Stripe keys. Dropship fulfillment is documented in `DROPSHIPPING.md` with the SKU→supplier map in `ops/fulfillment.json`.

To go live, see **`DROPSHIPPING.md` §4** (Stripe account + keys, deploy the worker, connect DSers/AliExpress, flip the switch). These steps need the owner's real business identity, bank account, and a funded supplier payment method.
