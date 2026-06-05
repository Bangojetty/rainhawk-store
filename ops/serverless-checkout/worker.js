/* ==========================================================================
   Rainhawk — Stripe Checkout Session worker (Cloudflare Workers / compatible)
   Turns a static-site cart into a hosted Stripe Checkout Session. This is the
   piece a static GitHub Pages site can't host itself. Deploy it (free tier),
   then put its URL in js/config.js -> CART_CHECKOUT_ENDPOINT.

   SECRET: set STRIPE_SECRET_KEY as a Worker secret (never commit it):
     npx wrangler secret put STRIPE_SECRET_KEY
   Restrict CORS to your domain via ALLOWED_ORIGIN env var.

   Prices are defined server-side (cents) so the client can't tamper with them.
   ========================================================================== */

const PRICES = {
  "stormcrest-rain-shell": { name: "Stormcrest Packable Rain Shell", amount: 13900 },
  "solaris-sun-hoodie": { name: "Solaris UPF 50+ Sun Hoodie", amount: 3900 },
  "ember-down-jacket": { name: "Ember Ultralight Down Jacket", amount: 9900 },
  "drift-merino-crew": { name: "Drift Merino Base Layer", amount: 8900 },
  "switchback-40-pack": { name: "Switchback 40L Trekking Pack", amount: 6900 },
  "talon-carbon-poles": { name: "Talon Carbon Trekking Poles", amount: 7900 },
  "nimbus-dry-bag": { name: "Nimbus 20L Waterproof Dry Bag", amount: 2900 },
  "cascade-filter-bottle": { name: "Cascade Filter Water Bottle", amount: 3400 },
  "ridgeline-hiking-pants": { name: "Ridgeline Quick-Dry Hiking Pants", amount: 5900 },
  "beacon-headlamp": { name: "Beacon Rechargeable Headlamp", amount: 4400 },
};

const FREE_SHIP_THRESHOLD = 7500; // cents
const FLAT_SHIP = 795; // cents

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST")
      return json({ error: "POST only" }, 405, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "bad json" }, 400, cors);
    }

    const items = Array.isArray(body.items) ? body.items : [];
    const base = body.origin || origin;

    // Build Stripe line items from the trusted server-side price table.
    const form = new URLSearchParams();
    form.append("mode", "payment");
    form.append("success_url", `${base}/checkout-success.html?session_id={CHECKOUT_SESSION_ID}`);
    form.append("cancel_url", `${base}/checkout.html`);
    form.append("billing_address_collection", "auto");
    form.append("shipping_address_collection[allowed_countries][0]", "US");
    form.append("shipping_address_collection[allowed_countries][1]", "CA");
    form.append("shipping_address_collection[allowed_countries][2]", "GB");
    form.append("shipping_address_collection[allowed_countries][3]", "AU");

    let subtotal = 0;
    let li = 0;
    for (const it of items) {
      const p = PRICES[it.id];
      const qty = Math.max(1, Math.min(20, parseInt(it.qty, 10) || 1));
      if (!p) continue;
      subtotal += p.amount * qty;
      form.append(`line_items[${li}][price_data][currency]`, "usd");
      form.append(`line_items[${li}][price_data][product_data][name]`, p.name);
      form.append(`line_items[${li}][price_data][unit_amount]`, String(p.amount));
      form.append(`line_items[${li}][quantity]`, String(qty));
      li++;
    }
    if (li === 0) return json({ error: "empty cart" }, 400, cors);

    // Shipping as its own line item when under the free-ship threshold.
    if (subtotal < FREE_SHIP_THRESHOLD) {
      form.append(`line_items[${li}][price_data][currency]`, "usd");
      form.append(`line_items[${li}][price_data][product_data][name]`, "Standard shipping");
      form.append(`line_items[${li}][price_data][unit_amount]`, String(FLAT_SHIP));
      form.append(`line_items[${li}][quantity]`, "1");
      li++;
    }

    // Tax handled via Stripe Tax automatically if enabled on the account.
    form.append("automatic_tax[enabled]", "true");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });
    const session = await res.json();
    if (!res.ok) {
      return json({ error: session.error ? session.error.message : "stripe error" }, 502, cors);
    }
    return json({ id: session.id, url: session.url }, 200, cors);
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}
