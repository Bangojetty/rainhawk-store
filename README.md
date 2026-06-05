# Rainhawk — All-Weather Outdoor Gear

A polished, fully static e-commerce storefront for **Rainhawk**, a (demo) all-weather
outdoor gear brand. No build step, no framework — just HTML, CSS, and vanilla JS,
so it deploys anywhere that serves static files (GitHub Pages, Netlify, S3, …).

## Live site

Hosted on GitHub Pages — see the repository's Pages settings for the URL.

## What's inside

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Hero, bestsellers, categories, newsletter |
| Shop | `shop.html` | Full catalog with category filtering |
| Product | `product.html?id=…` | Product detail, color/qty, related items |
| Checkout | `checkout.html` | Order summary + shipping/payment form (demo) |
| About | `about.html` | Brand story, sustainability, warranty |

### Scripts

- `js/products.js` — the product catalog (single source of truth) + self-contained SVG product art
- `js/store.js` — cart engine (localStorage), slide-out cart drawer, toasts
- `js/ui.js` — shared product-card markup, star ratings, newsletter
- `js/home.js` / `js/shop.js` / `js/product.js` / `js/checkout.js` — per-page logic

## Products

10 research-backed SKUs spanning Outerwear, Apparel, Packs, Hydration, and Gear —
weatherproof shells, a trending UPF 50+ sun hoodie, a filter water bottle,
recovery traction boards, and more.

## Running locally

It's all static. Either open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Notes

This is a **demo store** — the checkout does not contact a payment processor and no
orders are fulfilled. Cart state persists in the browser via `localStorage`.

Version: see `VERSION`.
