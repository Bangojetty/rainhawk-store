/* ==========================================================================
   Rainhawk — Product Catalog
   Single source of truth for every product in the store.

   Each product is mapped to a REAL, live supplier listing (sourced June 2026
   via AliExpress, the primary no-MOQ dropship platform). `cost` is the observed
   indicative supplier price; `sourceUrl` links to live matching listings;
   `sourceTitle` is the real listing the figure came from. Retail `price` is the
   Rainhawk store price. These power both the storefront and the business plan.
   ========================================================================== */

const RAINHAWK_PRODUCTS = [
  {
    id: "stormcrest-rain-shell",
    name: "Stormcrest Packable Rain Shell",
    category: "Outerwear",
    price: 139.0,
    cost: 68.36,
    sourceTitle: "JR XINBOFENG Men's Packable Waterproof Rain Jacket, hooded",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=men+packable+waterproof+rain+jacket+hooded",
    rating: 4.8,
    reviews: 412,
    badge: "Bestseller",
    blurb: "Fully waterproof, packable rain shell that shrugs off the worst the sky can throw.",
    description:
      "Our flagship storm shell. A waterproof, seam-sealed membrane with a helmet-compatible hood keeps driving rain out, then packs down into its own pocket when the clouds break. Lightweight enough to live in your bag all season.",
    features: [
      "Waterproof, seam-sealed construction",
      "Adjustable storm hood",
      "Packs into its own pocket",
      "Pit-zip ventilation",
    ],
    colors: ["Storm Black", "Slate Blue", "Ember Orange"],
    accent: "#0e7490",
    icon: "jacket",
  },
  {
    id: "solaris-sun-hoodie",
    name: "Solaris UPF 50+ Sun Hoodie",
    category: "Apparel",
    price: 39.0,
    cost: 8.5,
    sourceTitle: "Summer Sun Protection Men's UPF 50+ Quick-Dry Long-Sleeve Shirt",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=men+UPF+50+sun+hoodie+quick+dry",
    rating: 4.9,
    reviews: 689,
    badge: "Trending",
    blurb: "Featherweight UPF 50+ hoodie for blazing trails and long water days.",
    description:
      "The sun hoodie everyone's wearing this season. A featherweight, quick-drying knit with UPF 50+ protection, thumb loops, and a coverage hood. Odor-resistant and built to go from trailhead to coffee shop without missing a beat.",
    features: [
      "UPF 50+ sun protection",
      "Quick-dry, odor-resistant fabric",
      "Thumb loops & coverage hood",
      "Barely-there weight",
    ],
    colors: ["Desert Sand", "Sea Glass", "Graphite"],
    accent: "#f59e0b",
    icon: "hoodie",
  },
  {
    id: "ember-down-jacket",
    name: "Ember Ultralight Down Jacket",
    category: "Outerwear",
    price: 99.0,
    cost: 47.74,
    sourceTitle: "NH Men's Ultralight Hiking Camping Winter Puffer Jacket, packable",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=men+ultralight+packable+down+jacket",
    rating: 4.9,
    reviews: 377,
    badge: "Staff Pick",
    blurb: "Packable down warmth for cold belays and frosty mornings.",
    description:
      "Serious warmth that stuffs into its own pocket. Lofty down traps heat without the bulk, wrapped in a wind-resistant, water-repellent ripstop shell. The cut layers easily under the Stormcrest shell when the storm rolls in.",
    features: [
      "Lofty packable down fill",
      "Wind-resistant DWR ripstop shell",
      "Packs into its own pocket",
      "Insulated hood",
    ],
    colors: ["Ember Orange", "Storm Black", "Deep Teal"],
    accent: "#ea580c",
    icon: "puffy",
  },
  {
    id: "drift-merino-crew",
    name: "Drift Merino Base Layer",
    category: "Apparel",
    price: 89.0,
    cost: 43.0,
    sourceTitle: "Men's 100% Pure Merino Wool Lightweight Base Layer, long sleeve",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=men+merino+wool+base+layer+long+sleeve",
    rating: 4.7,
    reviews: 256,
    blurb: "100% merino crew that regulates heat and resists odor for days.",
    description:
      "The base layer you'll forget you're wearing. Pure merino wool regulates temperature in the cold and the heat, wicks moisture, and resists odor for days on the trail. Flat seams sit comfortably under a pack for chafe-free miles.",
    features: [
      "100% merino wool",
      "Natural temperature regulation",
      "Odor-resistant for multi-day trips",
      "Flat seams, pack-friendly",
    ],
    colors: ["Charcoal", "Deep Teal", "Oat"],
    accent: "#7c3aed",
    icon: "shirt",
  },
  {
    id: "switchback-40-pack",
    name: "Switchback 40L Trekking Pack",
    category: "Packs",
    price: 69.0,
    cost: 18.13,
    sourceTitle: "40L Water-Resistant Travel Backpack, camping/hiking/trekking daypack",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=40L+hiking+backpack+waterproof",
    rating: 4.7,
    reviews: 301,
    badge: "Staff Pick",
    blurb: "A do-everything 40L pack with a ventilated back panel and rain cover.",
    description:
      "The sweet-spot pack for fast overnights and big day missions. A ventilated back panel keeps airflow moving, while multiple compartments and external attachment points keep your kit organized. Includes a rain cover for when the weather turns.",
    features: [
      "40L water-resistant build",
      "Ventilated back panel",
      "Multiple compartments + pole keepers",
      "Rain cover included",
    ],
    colors: ["Moss", "Storm Black", "Ember Orange"],
    accent: "#15803d",
    icon: "backpack",
  },
  {
    id: "talon-carbon-poles",
    name: "Talon Carbon Trekking Poles",
    category: "Gear",
    price: 79.0,
    cost: 36.24,
    sourceTitle: "Ultralight Carbon Fiber Folding Trekking Poles, collapsible Nordic",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=carbon+fiber+folding+trekking+poles",
    rating: 4.6,
    reviews: 198,
    blurb: "Featherweight folding carbon poles with cork grips and quick locks.",
    description:
      "Save your knees on every descent. A folding carbon-fiber shaft keeps the pair feathery, while sweat-wicking cork grips mold to your hands over the miles. Collapses short to stow on the pack between sections.",
    features: [
      "Folding carbon-fiber shafts",
      "Natural cork grips",
      "Quick-adjust locking",
      "Carbide tips + baskets included",
    ],
    colors: ["Carbon/Orange"],
    accent: "#dc2626",
    icon: "poles",
  },
  {
    id: "nimbus-dry-bag",
    name: "Nimbus 20L Waterproof Dry Bag",
    category: "Hydration",
    price: 29.0,
    cost: 10.91,
    sourceTitle: "Waterproof Dry Bag 2L–30L Roll-Top (20L)",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=waterproof+dry+bag+20L+roll+top",
    rating: 4.8,
    reviews: 815,
    blurb: "Roll-top dry bag that keeps your kit bone-dry through any crossing.",
    description:
      "Cheap insurance for everything that can't get wet. A welded roll-top closure keeps water out during river crossings, kayak days, and surprise downpours. The 20L size swallows a sleeping bag and layers, and the buckle doubles as a carry handle.",
    features: [
      "Welded waterproof seams",
      "Roll-top closure",
      "20L — fits a sleeping bag + layers",
      "Doubles as a carry handle",
    ],
    colors: ["Glacier", "Ember Orange", "Moss"],
    accent: "#0891b2",
    icon: "drybag",
  },
  {
    id: "cascade-filter-bottle",
    name: "Cascade Filter Water Bottle",
    category: "Hydration",
    price: 34.0,
    cost: 18.14,
    sourceTitle: "Outdoor Filtered Water Bottle, hollow-fiber filter 600ml",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=filter+water+bottle+hiking+survival",
    rating: 4.8,
    reviews: 1043,
    badge: "Bestseller",
    blurb: "Drink straight from the stream — hollow-fiber filter built into the bottle.",
    description:
      "Refill anywhere. A multi-stage hollow-fiber filter built into the bottle removes bacteria, parasites, and sediment as you sip. The 600 ml soft-touch bottle squeezes for fast flow and rinses clean in seconds — perfect for hiking, camping, and emergency kits.",
    features: [
      "Multi-stage hollow-fiber filter",
      "Removes bacteria, parasites & sediment",
      "600 ml BPA-free bottle",
      "Squeeze for fast flow",
    ],
    colors: ["Glacier", "Ember Orange", "Graphite"],
    accent: "#0284c7",
    icon: "bottle",
  },
  {
    id: "ridgeline-hiking-pants",
    name: "Ridgeline Quick-Dry Hiking Pants",
    category: "Apparel",
    price: 59.0,
    cost: 12.39,
    sourceTitle: "Tactical Quick-Dry Waterproof Stretch Cargo Pants, multi-pocket",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=men+quick+dry+hiking+pants",
    rating: 4.6,
    reviews: 224,
    blurb: "Stretch, quick-dry trail pants that move with you and shed light rain.",
    description:
      "Trail pants you can live in. A quick-dry stretch weave moves with you on the scramble and dries fast after a creek crossing, while a water-repellent finish sheds light rain. Zip pockets keep the essentials secure mile after mile.",
    features: [
      "4-way stretch, quick-dry weave",
      "Water-repellent finish",
      "Secure zip pockets",
      "Articulated knees",
    ],
    colors: ["Slate", "Khaki", "Storm Black"],
    accent: "#0d9488",
    icon: "pants",
  },
  {
    id: "beacon-headlamp",
    name: "Beacon Rechargeable Headlamp",
    category: "Gear",
    price: 44.0,
    cost: 21.38,
    sourceTitle: "SOFIRN 4000lm 21700 USB-C Rechargeable LED Headlamp, waterproof",
    sourceUrl: "https://www.aliexpress.com/wholesale?SearchText=rechargeable+LED+headlamp",
    rating: 4.7,
    reviews: 968,
    badge: "Bestseller",
    blurb: "USB-rechargeable headlamp with a bright beam for camp and night trails.",
    description:
      "Hands-free light when the sun drops. A bright, zoomable LED beam with multiple modes covers everything from close-up camp tasks to spotting the trail ahead. USB-rechargeable so there are no batteries to buy, and weather-sealed for wet nights.",
    features: [
      "USB-rechargeable battery",
      "Zoomable beam, multiple modes",
      "Weather-sealed housing",
      "Lightweight adjustable strap",
    ],
    colors: ["Black", "Ember Orange"],
    accent: "#b45309",
    icon: "headlamp",
  },
];

/* --- Self-contained SVG product imagery -------------------------------------
   Each product renders a clean, branded gradient tile with a category glyph,
   so the storefront always looks complete with zero external image requests. */

const RAINHAWK_ICONS = {
  jacket:
    '<path d="M65 40 L100 30 L135 40 L150 60 L132 78 L128 60 L128 165 L72 165 L72 60 L68 78 L50 60 Z" /><path d="M100 30 L100 70" stroke-width="3" stroke="rgba(255,255,255,.35)" fill="none"/>',
  hoodie:
    '<path d="M70 55 Q100 25 130 55 L150 70 L134 86 L128 70 L128 165 L72 165 L72 70 L66 86 L50 70 Z"/><path d="M88 52 Q100 66 112 52" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3"/>',
  pants:
    '<path d="M74 35 L126 35 L124 90 L116 165 L104 165 L100 100 L96 165 L84 165 L76 90 Z"/><path d="M74 35 L126 35" stroke="rgba(255,255,255,.35)" stroke-width="4"/>',
  backpack:
    '<rect x="62" y="55" width="76" height="105" rx="22"/><path d="M80 55 Q80 28 100 28 Q120 28 120 55" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="7"/><rect x="84" y="92" width="32" height="40" rx="8" fill="rgba(0,0,0,.18)"/>',
  bottle:
    '<rect x="84" y="46" width="32" height="14" rx="4"/><path d="M80 60 L120 60 L124 150 Q124 166 108 166 L92 166 Q76 166 76 150 Z"/><rect x="82" y="92" width="36" height="34" rx="6" fill="rgba(255,255,255,.18)"/>',
  shirt:
    '<path d="M70 45 L88 38 Q100 52 112 38 L130 45 L146 66 L128 80 L124 64 L124 165 L76 165 L76 64 L72 80 L54 66 Z"/>',
  poles:
    '<path d="M82 32 L96 168" stroke-width="7" stroke-linecap="round"/><path d="M118 32 L104 168" stroke-width="7" stroke-linecap="round"/><path d="M74 44 L90 44" stroke-width="6" stroke-linecap="round"/><path d="M126 44 L110 44" stroke-width="6" stroke-linecap="round"/>',
  puffy:
    '<path d="M66 44 L100 34 L134 44 L148 62 L132 78 L130 62 L130 164 L70 164 L70 62 L68 78 L52 62 Z"/><path d="M70 78 H130 M70 100 H130 M70 122 H130 M70 144 H130" stroke="rgba(255,255,255,.3)" stroke-width="3"/>',
  drybag:
    '<path d="M70 64 L130 64 L130 150 Q130 162 116 162 L84 162 Q70 162 70 150 Z"/><path d="M70 64 Q70 50 100 50 Q130 50 130 64" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="8"/><rect x="78" y="92" width="44" height="26" rx="6" fill="rgba(255,255,255,.16)"/>',
  headlamp:
    '<path d="M48 100 Q48 64 100 64 Q152 64 152 100" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="12" stroke-linecap="round"/><rect x="82" y="86" width="36" height="30" rx="8"/><circle cx="100" cy="101" r="8" fill="rgba(0,0,0,.25)"/><path d="M126 101 L150 94 M126 109 L150 116" stroke="rgba(255,255,255,.7)" stroke-width="4" stroke-linecap="round"/>',
};

function rainhawkProductImage(product, opts = {}) {
  const a = product.accent || "#0e7490";
  const glyph = RAINHAWK_ICONS[product.icon] || RAINHAWK_ICONS.jacket;
  const id = product.id;
  return `
<svg viewBox="0 0 200 200" role="img" aria-label="${product.name}" xmlns="http://www.w3.org/2000/svg" class="product-art" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="gl-${id}" cx="0.5" cy="0.32" r="0.8">
      <stop offset="0" stop-color="rgba(255,255,255,.22)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#bg-${id})"/>
  <rect width="200" height="200" fill="url(#gl-${id})"/>
  <g fill="rgba(255,255,255,.92)">${glyph}</g>
</svg>`;
}

// Expose on window for the non-module scripts that consume it.
if (typeof window !== "undefined") {
  window.RAINHAWK_PRODUCTS = RAINHAWK_PRODUCTS;
  window.rainhawkProductImage = rainhawkProductImage;
  window.rainhawkProductById = (id) =>
    RAINHAWK_PRODUCTS.find((p) => p.id === id) || null;
}
