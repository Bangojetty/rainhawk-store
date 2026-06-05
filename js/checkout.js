/* Checkout page — order summary + shipping/payment form + confirmation.
   Demo only: no real payment processor is contacted. */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("checkout-root");
  const Cart = window.RainhawkCart;
  const money = window.rainhawkMoney;

  function render() {
    const items = Cart.items();
    if (items.length === 0) {
      root.innerHTML = `<div class="confirm">
        <p style="font-size:2.6rem;margin:0">🛒</p>
        <h2>Your cart is empty</h2>
        <p class="muted">Add some gear before checking out.</p>
        <a class="btn btn-primary btn-lg" href="shop.html">Shop the gear</a>
      </div>`;
      return;
    }

    const orderLines = items
      .map((i) => {
        const p = window.rainhawkProductById(i.id);
        return `<div class="order-line">
          <span>${p.name} <span class="ol-q">× ${i.qty}</span></span>
          <span>${money(p.price * i.qty)}</span>
        </div>`;
      })
      .join("");

    root.innerHTML = `
      <div class="checkout">
        <form class="panel" id="checkout-form" novalidate>
          <h3>Contact</h3>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" required placeholder="you@example.com" />
          </div>

          <h3 style="margin-top:1.4rem">Shipping address</h3>
          <div class="row-2">
            <div class="field"><label for="fn">First name</label><input id="fn" required /></div>
            <div class="field"><label for="ln">Last name</label><input id="ln" required /></div>
          </div>
          <div class="field"><label for="addr">Address</label><input id="addr" required /></div>
          <div class="row-2">
            <div class="field"><label for="city">City</label><input id="city" required /></div>
            <div class="field"><label for="zip">ZIP</label><input id="zip" required inputmode="numeric" /></div>
          </div>
          <div class="field">
            <label for="country">Country</label>
            <select id="country"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option></select>
          </div>

          <h3 style="margin-top:1.4rem">Payment</h3>
          <div class="field"><label for="card">Card number</label><input id="card" required placeholder="4242 4242 4242 4242" inputmode="numeric" /></div>
          <div class="row-2">
            <div class="field"><label for="exp">Expiry</label><input id="exp" required placeholder="MM/YY" /></div>
            <div class="field"><label for="cvc">CVC</label><input id="cvc" required placeholder="123" inputmode="numeric" /></div>
          </div>

          <button class="btn btn-accent btn-block btn-lg" type="submit" id="place" style="margin-top:.6rem">
            Place order — <span id="btn-total"></span>
          </button>
          <p class="pay-note">🔒 This is a demo store. No real payment is processed and no card data is sent anywhere.</p>
        </form>

        <aside class="panel" style="position:sticky;top:88px">
          <h3>Order summary</h3>
          <div id="order-lines">${orderLines}</div>
          <div style="margin-top:1rem">
            <div class="summary-row"><span>Subtotal</span><span id="sum-sub"></span></div>
            <div class="summary-row"><span>Shipping</span><span id="sum-ship"></span></div>
            <div class="summary-row"><span>Tax (7.25%)</span><span id="sum-tax"></span></div>
            <div class="summary-row total"><span>Total</span><span id="sum-total"></span></div>
          </div>
        </aside>
      </div>`;

    updateTotals();
    document.getElementById("checkout-form").addEventListener("submit", placeOrder);
  }

  function updateTotals() {
    const sub = Cart.subtotal();
    const ship = Cart.shipping();
    const tax = Cart.tax();
    const total = Cart.total();
    const set = (id, v) => {
      const el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    set("sum-sub", money(sub));
    set("sum-ship", ship === 0 ? "Free" : money(ship));
    set("sum-tax", money(tax));
    set("sum-total", money(total));
    set("btn-total", money(total));
  }

  function placeOrder(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const total = Cart.total();
    const email = document.getElementById("email").value;
    const orderNo = "RH-" + Date.now().toString(36).toUpperCase().slice(-6);
    Cart.clear();
    root.innerHTML = `<div class="confirm">
      <div class="check">✓</div>
      <h2>Order confirmed</h2>
      <p class="muted">Thanks for the order! A confirmation is on its way to <strong>${email}</strong>.</p>
      <p style="font-size:1.05rem;margin:.4rem 0"><strong>Order ${orderNo}</strong> · ${money(total)}</p>
      <p class="muted" style="max-width:42ch;margin:.6rem auto 1.4rem">Your gear ships free within 2 business days. You'll get tracking as soon as it's on the way.</p>
      <a class="btn btn-primary btn-lg" href="shop.html">Keep shopping</a>
      <p class="pay-note" style="margin-top:1.4rem">Demo order — no payment was charged and nothing was shipped.</p>
    </div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render();
  document.addEventListener("cart:change", () => {
    // keep totals/lines in sync if the drawer is used while on this page
    if (document.getElementById("checkout-form")) render();
  });
});
