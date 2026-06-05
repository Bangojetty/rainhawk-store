/* ==========================================================================
   Rainhawk — Store configuration
   Single place to flip the store between DEMO and LIVE payments, and to hold
   the dropship fulfillment routing. No secrets live here — only PUBLISHABLE
   Stripe keys and public Payment Link URLs are ever placed in this file
   (it ships to the browser). Secret keys must never be committed.

   ── HOW TO GO LIVE (the one switch only the store owner can flip) ──────────
   1. Create a Stripe account at https://dashboard.stripe.com (real business
      identity + bank account required — Stripe KYC).
   2. Create one Payment Link per product (Products → Payment Links), or stand
      up the serverless Checkout endpoint (see ops/serverless-checkout/).
   3. Paste your publishable key + the per-product Payment Link URLs below.
   4. Set PAYMENTS_LIVE = true and push. Pages redeploys automatically.
   Until then the store runs in honest DEMO mode (no card is ever charged).
   ========================================================================== */

const RAINHAWK_CONFIG = {
  /* Master switch. While false, checkout stays in clearly-labelled demo mode
     and never collects card data. Flip to true ONLY once real Stripe Payment
     Links (or the serverless endpoint) below are populated. */
  PAYMENTS_LIVE: false,

  /* Your Stripe PUBLISHABLE key (starts with pk_live_ or pk_test_). Safe to
     ship to the browser. The SECRET key (sk_...) must NEVER go in this file. */
  STRIPE_PUBLISHABLE_KEY: "",

  /* Preferred path for a multi-item cart is a serverless Checkout Session.
     Drop the deployed URL here (see ops/serverless-checkout/ for a 30-line
     Cloudflare Worker / Vercel function you can deploy free). If set, the cart
     "Checkout" button POSTs the cart here and redirects to Stripe Checkout. */
  CART_CHECKOUT_ENDPOINT: "",

  /* No-backend fallback: one Stripe Payment Link per product id. Used for
     per-product "Buy now" and, if no CART_CHECKOUT_ENDPOINT is set, the cart
     checks out the highest-value line via its link. Fill from Stripe dashboard. */
  PAYMENT_LINKS: {
    "stormcrest-rain-shell": "",
    "solaris-sun-hoodie": "",
    "ember-down-jacket": "",
    "drift-merino-crew": "",
    "switchback-40-pack": "",
    "talon-carbon-poles": "",
    "nimbus-dry-bag": "",
    "cascade-filter-bottle": "",
    "ridgeline-hiking-pants": "",
    "beacon-headlamp": "",
  },

  /* Store/business facts surfaced in the UI and used by fulfillment. */
  STORE: {
    name: "Rainhawk Outdoor Co.",
    supportEmail: "support@rainhawkgear.com",
    currency: "usd",
    freeShipThreshold: 75,
    flatShip: 7.95,
    taxRate: 0.0725,
    fulfillmentSLAdays: 2, // business days to hand off to supplier
  },
};

if (typeof window !== "undefined") {
  window.RAINHAWK_CONFIG = RAINHAWK_CONFIG;
  window.rainhawkPaymentsLive = () =>
    RAINHAWK_CONFIG.PAYMENTS_LIVE &&
    (!!RAINHAWK_CONFIG.CART_CHECKOUT_ENDPOINT ||
      Object.values(RAINHAWK_CONFIG.PAYMENT_LINKS).some(Boolean));
}
