/* ==========================================================================
   Rainhawk — Store engine
   Cart state (localStorage), cart drawer, header badge, toast.
   Shared across every page. Depends on products.js.
   ========================================================================== */

(function () {
  const CART_KEY = "rainhawk.cart.v1";
  const FREE_SHIP_THRESHOLD = 75;
  const SHIP_FLAT = 7.95;
  const TAX_RATE = 0.0725;

  /* ---- state ---- */
  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }
  function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderBadge();
    renderDrawer();
    document.dispatchEvent(new CustomEvent("cart:change", { detail: cart }));
  }

  const Cart = {
    items: () => readCart(),
    count: () => readCart().reduce((n, i) => n + i.qty, 0),
    subtotal: () =>
      readCart().reduce((s, i) => {
        const p = window.rainhawkProductById(i.id);
        return s + (p ? p.price * i.qty : 0);
      }, 0),
    shipping() {
      const sub = this.subtotal();
      if (sub === 0 || sub >= FREE_SHIP_THRESHOLD) return 0;
      return SHIP_FLAT;
    },
    tax() {
      return this.subtotal() * TAX_RATE;
    },
    total() {
      return this.subtotal() + this.shipping() + this.tax();
    },
    add(id, qty = 1) {
      const cart = readCart();
      const line = cart.find((i) => i.id === id);
      if (line) line.qty += qty;
      else cart.push({ id, qty });
      writeCart(cart);
      const p = window.rainhawkProductById(id);
      toast(`Added ${p ? p.name : "item"} to cart`);
      openDrawer();
    },
    setQty(id, qty) {
      let cart = readCart();
      if (qty <= 0) cart = cart.filter((i) => i.id !== id);
      else {
        const line = cart.find((i) => i.id === id);
        if (line) line.qty = qty;
      }
      writeCart(cart);
    },
    remove(id) {
      writeCart(readCart().filter((i) => i.id !== id));
    },
    clear() {
      writeCart([]);
    },
  };
  window.RainhawkCart = Cart;

  const money = (n) =>
    "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  window.rainhawkMoney = money;

  /* ---- header badge ---- */
  function renderBadge() {
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      const n = Cart.count();
      el.textContent = n;
      el.style.display = n > 0 ? "grid" : "none";
    });
  }

  /* ---- cart drawer ---- */
  function ensureDrawer() {
    if (document.getElementById("rh-drawer")) return;
    const html = `
      <div class="drawer-overlay" id="rh-overlay"></div>
      <aside class="drawer" id="rh-drawer" aria-label="Shopping cart">
        <div class="drawer-head">
          <h3>Your Cart</h3>
          <button class="drawer-close" id="rh-drawer-close" aria-label="Close cart">&times;</button>
        </div>
        <div class="drawer-body" id="rh-drawer-body"></div>
        <div class="drawer-foot" id="rh-drawer-foot"></div>
      </aside>`;
    document.body.insertAdjacentHTML("beforeend", html);
    document.getElementById("rh-overlay").addEventListener("click", closeDrawer);
    document.getElementById("rh-drawer-close").addEventListener("click", closeDrawer);
  }

  function renderDrawer() {
    const body = document.getElementById("rh-drawer-body");
    const foot = document.getElementById("rh-drawer-foot");
    if (!body || !foot) return;
    const items = Cart.items();
    if (items.length === 0) {
      body.innerHTML = `<div class="drawer-empty">
        <p style="font-size:2.4rem;margin:0">🛒</p>
        <p>Your cart is empty.</p>
        <a class="btn btn-ghost" href="shop.html">Browse the gear</a>
      </div>`;
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = items
      .map((i) => {
        const p = window.rainhawkProductById(i.id);
        if (!p) return "";
        return `<div class="line-item">
          <div class="li-art">${window.rainhawkProductImage(p)}</div>
          <div class="li-info">
            <p class="li-name"><a href="product.html?id=${p.id}">${p.name}</a></p>
            <p class="li-price">${money(p.price)}</p>
            <div class="qty">
              <button data-dec="${p.id}" aria-label="Decrease quantity">−</button>
              <span>${i.qty}</span>
              <button data-inc="${p.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div style="text-align:right">
            <div class="li-subtotal">${money(p.price * i.qty)}</div>
            <button class="li-remove" data-remove="${p.id}">Remove</button>
          </div>
        </div>`;
      })
      .join("");

    const sub = Cart.subtotal();
    const ship = Cart.shipping();
    const toFree = FREE_SHIP_THRESHOLD - sub;
    foot.innerHTML = `
      ${
        sub > 0 && toFree > 0
          ? `<p class="muted" style="font-size:.84rem;margin:0 0 .8rem">Add ${money(
              toFree
            )} more for free shipping 🚚</p>`
          : sub > 0
          ? `<p style="font-size:.84rem;margin:0 0 .8rem;color:var(--ok);font-weight:600">✓ You've unlocked free shipping</p>`
          : ""
      }
      <div class="summary-row"><span>Subtotal</span><span>${money(sub)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${ship === 0 ? "Free" : money(ship)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${money(sub + ship)}</span></div>
      <a class="btn btn-accent btn-block btn-lg" href="checkout.html" style="margin-top:.9rem">Checkout</a>
      <p class="pay-note">Taxes calculated at checkout · Secure payment</p>`;

    body.querySelectorAll("[data-inc]").forEach((b) =>
      b.addEventListener("click", () => {
        const line = Cart.items().find((i) => i.id === b.dataset.inc);
        Cart.setQty(b.dataset.inc, (line ? line.qty : 0) + 1);
      })
    );
    body.querySelectorAll("[data-dec]").forEach((b) =>
      b.addEventListener("click", () => {
        const line = Cart.items().find((i) => i.id === b.dataset.dec);
        Cart.setQty(b.dataset.dec, (line ? line.qty : 1) - 1);
      })
    );
    body.querySelectorAll("[data-remove]").forEach((b) =>
      b.addEventListener("click", () => Cart.remove(b.dataset.remove))
    );
  }

  function openDrawer() {
    ensureDrawer();
    renderDrawer();
    document.getElementById("rh-overlay").classList.add("open");
    document.getElementById("rh-drawer").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    const o = document.getElementById("rh-overlay");
    const d = document.getElementById("rh-drawer");
    if (o) o.classList.remove("open");
    if (d) d.classList.remove("open");
    document.body.style.overflow = "";
  }
  window.RainhawkOpenCart = openDrawer;

  /* ---- toast ---- */
  let toastTimer;
  function toast(msg) {
    let el = document.getElementById("rh-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "rh-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = `<span class="dot"></span>${msg}`;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  window.rainhawkToast = toast;

  /* ---- mobile nav + cart triggers ---- */
  function wireGlobalUI() {
    document.querySelectorAll("[data-open-cart]").forEach((b) =>
      b.addEventListener("click", openDrawer)
    );
    const toggle = document.querySelector("[data-nav-toggle]");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => links.classList.toggle("open"));
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureDrawer();
    renderBadge();
    renderDrawer();
    wireGlobalUI();
  });
})();
