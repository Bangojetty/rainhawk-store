# Rainhawk — Dropshipping Operations Runbook

This is how an order becomes a shipped package with zero held inventory. The
storefront, catalog, and payment integration are built and deployed; this
document is the operating manual plus the **exact accounts the owner must
connect to switch fulfillment fully live** (those require real identity +
a funded payment method, so they can't be automated on the owner's behalf).

---

## 1. The model

Rainhawk holds **no inventory**. Each of the 10 SKUs maps to a live AliExpress
supplier listing (see `ops/fulfillment.json`). When a customer pays, we place
the matching supplier order against *their* shipping address; the supplier ships
direct. Blended margin ≈ **58%** before shipping/ad cost.

```
Customer → Stripe Checkout (paid) → Stripe webhook → DSers → AliExpress order
                                                          → supplier ships to customer
```

## 2. Order flow (end to end)

1. Shopper checks out → **Stripe Checkout Session** (serverless worker in
   `ops/serverless-checkout/`) → pays on Stripe's hosted page.
2. Stripe fires `checkout.session.completed` to a webhook.
3. Webhook (DSers native Stripe/Shopify hook, or a 20-line worker) reads the
   line items + shipping address and **auto-places the AliExpress order via
   DSers**, paying the supplier from the connected method.
4. DSers writes the supplier tracking number back; an email goes to the customer.
5. Margin (retail − supplier cost − card fee) lands in the Stripe balance and
   pays out to the connected bank on Stripe's schedule.

## 3. What's already done (in this repo)

- ✅ Catalog mapped to real suppliers with costs/margins — `js/products.js`, `ops/fulfillment.json`.
- ✅ Stripe Checkout integration — `js/config.js`, `js/payments.js`, `js/checkout.js`, `checkout-success.html`.
- ✅ Serverless Checkout Session worker, deploy-ready — `ops/serverless-checkout/`.
- ✅ Honest demo mode by default; flips to live the instant real keys are added.
- ✅ Storefront polished: support/legal pages, SEO, sitemap, HTTPS.

## 4. What only the owner can do (real identity / money — the final switch)

These are KYC/financial steps that legally require the business owner. Do them
once and the pipeline is fully live:

1. **Stripe account** — https://dashboard.stripe.com — business details + bank
   account. Copy the **publishable** key → `js/config.js`, set the **secret**
   key as the worker secret (`wrangler secret put STRIPE_SECRET_KEY`).
2. **Deploy the worker** — `ops/serverless-checkout/README.md` (≈5 min, free).
3. **DSers account** — https://www.dsers.com — link to a store and an
   **AliExpress** account with a payment method (this funds supplier orders).
   Map each Rainhawk SKU to its `sourceUrl` from `ops/fulfillment.json`.
4. **Connect the Stripe → DSers webhook** so paid orders auto-fulfill. (DSers
   supports Shopify/WooCommerce natively; for the static front, point a small
   webhook worker at DSers' Open API, or run on a 1-page Shopify plan.)
5. Flip `PAYMENTS_LIVE: true` in `js/config.js`, commit, push.

## 5. Fulfillment SLA & policies

- **Handoff SLA:** place the supplier order within **2 business days** of payment.
- **Shipping window:** 5–12 business days (AliExpress Choice/ePacket); stated on
  the storefront and in `shipping-returns.html`.
- **Returns:** 60-day window. For low-cost SKUs, refund without requiring return
  shipping (cheaper than reverse logistics); require return for items >$60.
- **Margin floor:** keep ≥40% net after shipping. Re-check supplier costs each
  restock cycle — AliExpress prices drift; reprice or drop SKUs that fall below.

## 6. Risk controls

- **Price tampering:** prevented — the worker computes totals server-side from a
  trusted price table, ignoring client-sent amounts.
- **Supplier stockout:** keep a backup `sourceUrl` per SKU; DSers lets you swap.
- **Chargebacks:** Stripe Radar on; ship with tracking; respond to disputes with
  tracking proof.
- **Secrets:** only publishable keys live in the repo. `sk_…` keys are Worker
  secrets, never committed.
