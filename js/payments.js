/* ==========================================================================
   Rainhawk — Payments bridge
   Routes checkout to Stripe when the store is LIVE, otherwise keeps the
   honest demo flow. Depends on config.js + store.js. No secrets here.

   Resolution order when PAYMENTS_LIVE:
     1) CART_CHECKOUT_ENDPOINT set → POST cart, redirect to Stripe Checkout.
     2) else per-product PAYMENT_LINKS → redirect to the link for the cart's
        primary item (no-backend fallback; best for single-item carts).
     3) else → demo flow.
   ========================================================================== */
(function () {
  const cfg = () => window.RAINHAWK_CONFIG || {};
  const live = () => (window.rainhawkPaymentsLive ? window.rainhawkPaymentsLive() : false);

  /* True when we can actually take money for this cart right now. */
  function canCharge(items) {
    if (!live()) return false;
    if (cfg().CART_CHECKOUT_ENDPOINT) return true;
    const links = cfg().PAYMENT_LINKS || {};
    return items.some((i) => links[i.id]);
  }

  /* Send the shopper to real payment. Returns true if it took over the flow. */
  async function startCheckout(items) {
    if (!canCharge(items)) return false;

    // 1) Serverless Checkout Session (preferred for multi-item carts).
    const endpoint = cfg().CART_CHECKOUT_ENDPOINT;
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ id: i.id, qty: i.qty })),
            origin: window.location.origin,
          }),
        });
        const data = await res.json();
        if (data && data.url) {
          window.location.href = data.url; // hosted Stripe Checkout
          return true;
        }
      } catch (e) {
        console.error("[Rainhawk] checkout endpoint failed:", e);
      }
      return false;
    }

    // 2) No-backend fallback: per-product Payment Link for the primary item.
    const links = cfg().PAYMENT_LINKS || {};
    const primary = [...items].sort(
      (a, b) => priceOf(b.id) * b.qty - priceOf(a.id) * a.qty
    )[0];
    if (primary && links[primary.id]) {
      window.location.href = links[primary.id];
      return true;
    }
    return false;
  }

  function priceOf(id) {
    const p = window.rainhawkProductById ? window.rainhawkProductById(id) : null;
    return p ? p.price : 0;
  }

  window.RainhawkPayments = { canCharge, startCheckout, isLive: live };
})();
