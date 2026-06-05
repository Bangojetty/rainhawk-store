/* Product detail page — reads ?id=, renders PDP + related products. */
document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const p = id ? window.rainhawkProductById(id) : null;
  const root = document.getElementById("pdp");

  if (!p) {
    root.innerHTML = `<div style="text-align:center;padding:3rem 0">
      <h1>Product not found</h1>
      <p class="muted">We couldn't find that item.</p>
      <a class="btn btn-primary" href="shop.html">Back to shop</a>
    </div>`;
    document.getElementById("related-grid").closest("section").style.display = "none";
    return;
  }

  document.title = `${p.name} — Rainhawk`;
  document.getElementById("bc-name").textContent = p.name;

  root.innerHTML = `
    <div class="pdp">
      <div class="pdp-art">${window.rainhawkProductImage(p)}</div>
      <div>
        <span class="card-cat">${p.category}</span>
        <h1>${p.name}</h1>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.6rem">
          ${window.rainhawkStars(p.rating, p.reviews)}
          ${p.badge ? `<span class="card-badge" style="position:static">${p.badge}</span>` : ""}
        </div>
        <div class="price">${window.rainhawkMoney(p.price)}</div>
        <p style="margin:1rem 0 0;color:var(--slate)">${p.description}</p>

        <p style="font-weight:600;margin:1.4rem 0 0;font-size:.9rem">Color</p>
        <div class="swatches">
          ${p.colors.map((c, i) => `<button class="swatch ${i === 0 ? "active" : ""}" data-swatch>${c}</button>`).join("")}
        </div>

        <div style="display:flex;gap:.8rem;align-items:center;margin-bottom:1rem">
          <div class="qty" style="margin:0">
            <button id="pdp-dec" aria-label="Decrease">−</button>
            <span id="pdp-qty">1</span>
            <button id="pdp-inc" aria-label="Increase">+</button>
          </div>
          <button class="btn btn-accent btn-lg" id="pdp-add" style="flex:1">Add to cart — ${window.rainhawkMoney(p.price)}</button>
        </div>

        <ul class="feature-list">
          ${p.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>

        <div class="trust" style="border:none;background:transparent">
          <div class="wrap" style="padding:0;gap:1.2rem">
            <div>🚚 Free shipping over $75</div>
            <div>↩️ 60-day returns</div>
            <div>🛡️ 2-year warranty</div>
          </div>
        </div>
      </div>
    </div>`;

  // qty + swatch + add wiring
  let qty = 1;
  const qtyEl = document.getElementById("pdp-qty");
  document.getElementById("pdp-inc").addEventListener("click", () => {
    qty++;
    qtyEl.textContent = qty;
  });
  document.getElementById("pdp-dec").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyEl.textContent = qty;
  });
  root.querySelectorAll("[data-swatch]").forEach((b) =>
    b.addEventListener("click", () => {
      root.querySelectorAll("[data-swatch]").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    })
  );
  document.getElementById("pdp-add").addEventListener("click", () =>
    window.RainhawkCart.add(p.id, qty)
  );

  // related — same category first, then fill
  const related = window.RAINHAWK_PRODUCTS.filter((x) => x.id !== p.id).sort((a, b) => {
    const sa = a.category === p.category ? 0 : 1;
    const sb = b.category === p.category ? 0 : 1;
    return sa - sb || b.reviews - a.reviews;
  });
  const rg = document.getElementById("related-grid");
  rg.innerHTML = related.slice(0, 4).map(window.rainhawkCard).join("");
  window.rainhawkWireAddButtons(rg);
});
