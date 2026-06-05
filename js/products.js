/* ==========================================================================
   Rainhawk — Product Catalog
   Single source of truth for every product in the store.
   Research-backed selection (June 2026): weatherproof shells, sun hoodies,
   performance-meets-lifestyle apparel, and best-selling trail accessories.
   ========================================================================== */

const RAINHAWK_PRODUCTS = [
  {
    id: "stormcrest-3l-shell",
    name: "Stormcrest 3L Hardshell Jacket",
    category: "Outerwear",
    price: 189.0,
    rating: 4.8,
    reviews: 412,
    badge: "Bestseller",
    blurb: "Fully waterproof 3-layer shell that shrugs off the worst the sky can throw.",
    description:
      "Our flagship storm shell. A 3-layer waterproof/breathable membrane (20K/20K) sealed with fully taped seams keeps driving rain out while letting heat escape. Helmet-compatible hood, pit zips, and four weatherproof pockets. Packs into its own chest pocket when the clouds break.",
    features: [
      "20K/20K waterproof & breathable membrane",
      "Fully taped seams, waterproof zippers",
      "Helmet-compatible adjustable hood",
      "Packs into its own chest pocket",
    ],
    colors: ["Storm Black", "Slate Blue", "Ember Orange"],
    accent: "#0e7490",
    icon: "jacket",
  },
  {
    id: "solaris-sun-hoodie",
    name: "Solaris Sun Hoodie",
    category: "Apparel",
    price: 64.0,
    rating: 4.9,
    reviews: 689,
    badge: "Trending",
    blurb: "UPF 50+ featherweight hoodie for blazing trails and long water days.",
    description:
      "The sun hoodie everyone's wearing this season. A featherweight, quick-drying knit with UPF 50+ protection, thumb loops, and a hood that actually stays up. Odor-resistant and built to go from trailhead to coffee shop without missing a beat.",
    features: [
      "UPF 50+ certified sun protection",
      "Quick-dry, odor-resistant fabric",
      "Thumb loops & coverage hood",
      "82 g — barely there",
    ],
    colors: ["Desert Sand", "Sea Glass", "Graphite"],
    accent: "#f59e0b",
    icon: "hoodie",
  },
  {
    id: "tempest-rain-pants",
    name: "Tempest Packable Rain Pants",
    category: "Outerwear",
    price: 89.0,
    rating: 4.6,
    reviews: 174,
    blurb: "Throw-in-the-pack waterproof pants with full-length side zips.",
    description:
      "Waterproof pants that disappear into your kit until the weather turns. Full-length side zips mean you pull them on over boots without sitting down in the mud. Articulated knees and an adjustable waist keep them out of the way when you're moving.",
    features: [
      "Full-length waterproof side zips",
      "Packs to the size of a water bottle",
      "Articulated knees for mobility",
      "Adjustable waist & ankle cuffs",
    ],
    colors: ["Storm Black", "Slate Blue"],
    accent: "#0e7490",
    icon: "pants",
  },
  {
    id: "switchback-38-pack",
    name: "Switchback 38L Trekking Pack",
    category: "Packs",
    price: 149.0,
    rating: 4.7,
    reviews: 301,
    badge: "Staff Pick",
    blurb: "A do-everything 38L pack with a suspended, ventilated back panel.",
    description:
      "The sweet-spot daypack for fast overnights and big day missions. A tensioned mesh back panel floats the load off your spine for all-day airflow. Roll-top main compartment, dedicated hydration sleeve, and trekking-pole keepers round it out.",
    features: [
      "Suspended ventilated back panel",
      "38L roll-top main compartment",
      "Hydration sleeve + 3L reservoir ready",
      "Rain cover included",
    ],
    colors: ["Moss", "Storm Black", "Ember Orange"],
    accent: "#15803d",
    icon: "backpack",
  },
  {
    id: "cascade-filter-bottle",
    name: "Cascade Filter Water Bottle",
    category: "Hydration",
    price: 34.0,
    rating: 4.8,
    reviews: 1043,
    badge: "Bestseller",
    blurb: "Drink straight from the stream — 0.1-micron filter built into the bottle.",
    description:
      "Refill anywhere. A 0.1-micron hollow-fiber filter built into the lid removes 99.999% of bacteria, parasites, and microplastics as you sip. The 650 ml soft-touch bottle squeezes for fast flow and rinses clean in seconds. Good for up to 1,500 liters.",
    features: [
      "0.1-micron hollow-fiber filter",
      "Removes 99.999% of bacteria & microplastics",
      "1,500 L filter lifespan",
      "650 ml BPA-free bottle",
    ],
    colors: ["Glacier", "Ember Orange", "Graphite"],
    accent: "#0284c7",
    icon: "bottle",
  },
  {
    id: "drift-merino-crew",
    name: "Drift Merino Base Layer",
    category: "Apparel",
    price: 79.0,
    rating: 4.7,
    reviews: 256,
    blurb: "17.5-micron merino crew that regulates heat and never smells.",
    description:
      "The base layer you'll forget you're wearing. Ultrafine 17.5-micron merino wool regulates temperature in the cold and the heat, wicks moisture, and resists odor for days on the trail. Flatlock seams sit flat under a pack for chafe-free miles.",
    features: [
      "17.5-micron ultrafine merino",
      "Natural temperature regulation",
      "Odor-resistant for multi-day trips",
      "Flatlock seams, pack-friendly",
    ],
    colors: ["Charcoal", "Deep Teal", "Oat"],
    accent: "#7c3aed",
    icon: "shirt",
  },
  {
    id: "talon-carbon-poles",
    name: "Talon Carbon Trekking Poles",
    category: "Gear",
    price: 99.0,
    rating: 4.6,
    reviews: 198,
    blurb: "Featherweight carbon poles with cork grips and quick-flick locks.",
    description:
      "Save your knees on every descent. A high-modulus carbon shaft keeps the pair under 460 g, while sweat-wicking cork grips mold to your hands over the miles. Quick-flick lever locks adjust on the fly and hold rock-solid under load.",
    features: [
      "High-modulus carbon — 460 g/pair",
      "Natural cork grips",
      "Quick-flick lever locks",
      "Carbide tips + snow baskets included",
    ],
    colors: ["Carbon/Orange"],
    accent: "#dc2626",
    icon: "poles",
  },
  {
    id: "ember-down-jacket",
    name: "Ember 800-Fill Down Jacket",
    category: "Outerwear",
    price: 159.0,
    rating: 4.9,
    reviews: 377,
    badge: "Staff Pick",
    blurb: "Packable 800-fill warmth for cold belays and frosty mornings.",
    description:
      "Serious warmth that stuffs into your jacket pocket. Responsibly sourced 800-fill down traps heat without the bulk, wrapped in a wind-resistant, water-repellent ripstop shell. The cut layers easily under a hardshell when the storm rolls in.",
    features: [
      "800-fill responsibly sourced down",
      "Wind-resistant DWR ripstop shell",
      "Packs into its own pocket",
      "Helmet-compatible insulated hood",
    ],
    colors: ["Ember Orange", "Storm Black", "Deep Teal"],
    accent: "#ea580c",
    icon: "puffy",
  },
  {
    id: "granite-traction-boards",
    name: "Granite Recovery Traction Boards",
    category: "Gear",
    price: 129.0,
    rating: 4.7,
    reviews: 542,
    badge: "Bestseller",
    blurb: "Get unstuck from sand, mud, and snow — rated to 6,000 kg per pair.",
    description:
      "When the trail turns to soup, these get you out. Reinforced nylon boards with aggressive shark-tooth nubs bite into sand, mud, and snow to give your tires something to grip. UV-stabilized for years in the elements and stackable for easy storage.",
    features: [
      "6,000 kg recovery rating per pair",
      "Shark-tooth traction nubs",
      "UV-stabilized reinforced nylon",
      "Stackable with mounting pins",
    ],
    colors: ["Ember Orange", "Gunmetal"],
    accent: "#b45309",
    icon: "board",
  },
  {
    id: "nimbus-dry-bag",
    name: "Nimbus 20L Waterproof Dry Bag",
    category: "Hydration",
    price: 29.0,
    rating: 4.8,
    reviews: 815,
    blurb: "Roll-top dry bag that keeps your kit bone-dry through any crossing.",
    description:
      "Cheap insurance for everything that can't get wet. A welded-seam roll-top closure keeps water out during river crossings, kayak days, and surprise downpours. The 20L size swallows a sleeping bag and layers, and the burrito-roll buckle doubles as a carry handle.",
    features: [
      "Welded waterproof seams",
      "Roll-top closure, IPX submersible",
      "20L — fits a sleeping bag + layers",
      "Doubles as a carry handle",
    ],
    colors: ["Glacier", "Ember Orange", "Moss"],
    accent: "#0891b2",
    icon: "drybag",
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
  board:
    '<rect x="58" y="60" width="84" height="80" rx="12" transform="rotate(-8 100 100)"/><g fill="rgba(0,0,0,.2)"><circle cx="78" cy="82" r="5"/><circle cx="100" cy="78" r="5"/><circle cx="122" cy="74" r="5"/><circle cx="82" cy="104" r="5"/><circle cx="104" cy="100" r="5"/><circle cx="126" cy="96" r="5"/></g>',
  drybag:
    '<path d="M70 64 L130 64 L130 150 Q130 162 116 162 L84 162 Q70 162 70 150 Z"/><path d="M70 64 Q70 50 100 50 Q130 50 130 64" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="8"/><rect x="78" y="92" width="44" height="26" rx="6" fill="rgba(255,255,255,.16)"/>',
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
