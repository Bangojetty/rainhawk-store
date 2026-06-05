/* ==========================================================================
   Rainhawk — Shared UI helpers (product card, stars, newsletter)
   Depends on products.js + store.js. Loaded on pages that render product cards.
   ========================================================================== */

function rainhawkStars(rating, reviews) {
  const full = Math.round(rating);
  const stars = "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  return `<span class="stars"><span class="s">${stars}</span> ${rating.toFixed(
    1
  )}${reviews != null ? ` (${reviews})` : ""}</span>`;
}

function rainhawkCard(p) {
  return `<article class="card">
    <a class="card-art" href="product.html?id=${p.id}" aria-label="${p.name}">
      ${window.rainhawkProductImage(p)}
      ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ""}
    </a>
    <div class="card-body">
      <span class="card-cat">${p.category}</span>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <p class="card-blurb">${p.blurb}</p>
      <div class="card-meta">
        <span class="price">${window.rainhawkMoney(p.price)}</span>
        ${rainhawkStars(p.rating, p.reviews)}
      </div>
      <button class="btn btn-primary btn-block" data-add="${p.id}">Add to cart</button>
    </div>
  </article>`;
}

function rainhawkWireAddButtons(root = document) {
  root.querySelectorAll("[data-add]").forEach((b) => {
    if (b.dataset.wired) return;
    b.dataset.wired = "1";
    b.addEventListener("click", () => window.RainhawkCart.add(b.dataset.add, 1));
  });
}

function rainhawkWireNewsletter() {
  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value;
      form.innerHTML = `<p style="color:#fff;font-weight:600;margin:0">🎉 You're in! Check ${email} for your 10% code.</p>`;
    });
  });
}

window.rainhawkCard = rainhawkCard;
window.rainhawkStars = rainhawkStars;
window.rainhawkWireAddButtons = rainhawkWireAddButtons;

document.addEventListener("DOMContentLoaded", rainhawkWireNewsletter);
