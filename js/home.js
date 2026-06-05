/* Home page — render featured bestsellers + category tiles */
document.addEventListener("DOMContentLoaded", () => {
  const products = window.RAINHAWK_PRODUCTS;

  // Featured = first 4 with a "Bestseller"/"Staff Pick"/"Trending" badge, padded to 8
  const featured = products
    .slice()
    .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.reviews - a.reviews)
    .slice(0, 8);
  const grid = document.getElementById("featured-grid");
  if (grid) {
    grid.innerHTML = featured.map(window.rainhawkCard).join("");
    window.rainhawkWireAddButtons(grid);
  }

  // Category tiles
  const cats = {};
  products.forEach((p) => {
    cats[p.category] = cats[p.category] || { count: 0, sample: p };
    cats[p.category].count++;
  });
  const catGrid = document.getElementById("category-grid");
  if (catGrid) {
    catGrid.innerHTML = Object.entries(cats)
      .map(
        ([name, info]) => `<a class="card" href="shop.html#${name}" style="text-decoration:none">
          <div class="card-art">${window.rainhawkProductImage(info.sample)}</div>
          <div class="card-body" style="flex-direction:row;align-items:center;justify-content:space-between">
            <div>
              <h3 style="margin:0">${name}</h3>
              <span class="muted" style="font-size:.85rem">${info.count} product${info.count > 1 ? "s" : ""}</span>
            </div>
            <span style="font-size:1.3rem;color:var(--brand-2)">→</span>
          </div>
        </a>`
      )
      .join("");
  }
});
