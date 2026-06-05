/* Shop page — category filter + grid. Honors #Category hash deep-links. */
document.addEventListener("DOMContentLoaded", () => {
  const products = window.RAINHAWK_PRODUCTS;
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filters = document.getElementById("filters");
  const grid = document.getElementById("shop-grid");

  let active = "All";
  const hash = decodeURIComponent(location.hash.replace("#", ""));
  if (categories.includes(hash)) active = hash;

  function renderFilters() {
    filters.innerHTML = categories
      .map(
        (c) =>
          `<button class="pill ${c === active ? "active" : ""}" data-cat="${c}">${c}</button>`
      )
      .join("");
    filters.querySelectorAll("[data-cat]").forEach((b) =>
      b.addEventListener("click", () => {
        active = b.dataset.cat;
        if (active === "All") history.replaceState(null, "", location.pathname);
        else location.hash = active;
        render();
      })
    );
  }

  function render() {
    const list = active === "All" ? products : products.filter((p) => p.category === active);
    grid.innerHTML = list.map(window.rainhawkCard).join("");
    window.rainhawkWireAddButtons(grid);
    filters.querySelectorAll("[data-cat]").forEach((b) =>
      b.classList.toggle("active", b.dataset.cat === active)
    );
  }

  renderFilters();
  render();

  window.addEventListener("hashchange", () => {
    const h = decodeURIComponent(location.hash.replace("#", ""));
    active = categories.includes(h) ? h : "All";
    render();
  });
});
