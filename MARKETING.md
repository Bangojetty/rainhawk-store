# Rainhawk — Go-to-Market & Marketing Plan

A lean, margin-aware launch plan for a 10-SKU all-weather dropship brand
(blended margin ~58%). Built to be run by one person on a small budget, then
scaled on whatever shows positive ROAS.

---

## 1. Positioning

**One line:** *Gear that doesn't wait for the forecast.*

Rainhawk sells weather-first outdoor essentials to people who go out anyway —
rain, sun, or cold. We compete on **specific use-cases + honest value**, not on
out-spending Patagonia. Hero products carry the brand; accessories drive AOV.

- **Hero / brand-builders:** Stormcrest Rain Shell ($139), Solaris Sun Hoodie ($39), Ember Down Jacket ($99).
- **Margin engines (impulse / add-on):** Solaris (78%), Ridgeline Pants (79%), Switchback Pack (74%), Nimbus Dry Bag (62%).
- **Volume hooks (cheap entry, great reviews):** Cascade Filter Bottle ($34), Nimbus Dry Bag ($29), Beacon Headlamp ($44).

## 2. Target audience

1. **Day-hikers & weekend warriors (25–45)** — want capable gear without the premium-brand price.
2. **Travelers / overlanders** — packable shells, dry bags, filter bottles.
3. **Gift buyers (Q4)** — headlamp, dry bag, filter bottle are easy sub-$50 gifts.

## 3. Channels & 90-day plan

### Phase 0 — Pre-launch (Week 0, before first ad dollar)
- Finish payment go-live (Stripe + DSers) per `DROPSHIPPING.md`.
- Order **1 sample of each hero SKU** to shoot real photos + verify supplier quality/shipping time. (The site ships with clean SVG product art; real lifestyle photos are the single biggest conversion lift — prioritize Stormcrest, Solaris, Ember.)
- Stand up Instagram + TikTok @rainhawkgear, Pinterest, and a Google Business profile.
- Install analytics: GA4 + Meta Pixel + TikTok Pixel (add to `js/config.js`-driven loader).

### Phase 1 — Organic + proof (Weeks 1–4, ~$0–300)
- **TikTok/Reels:** 1 short video/day. Formats that sell outdoor gear: "POV: the sky opens and you're dry," packable-shell stuff-sack reveals, filter-bottle-from-a-stream demos. UGC-style, phone-shot.
- **Pinterest:** pin every product + "trail kit" boards — Pinterest converts well for outdoor/gift and is nearly free traffic.
- **Email capture:** the on-site 10%-off popup is live; wire it to a free Mailchimp/Klaviyo tier. Welcome flow → 10% code → bestsellers.
- **Reddit/forums (value-first):** r/CampingGear, r/hiking gear threads — answer questions, link only when genuinely useful.

### Phase 2 — Paid testing (Weeks 3–8, ~$20–40/day)
- **Meta Advantage+ Shopping** with 3–4 creatives per hero product; let the algorithm find buyers. Start with Solaris (low price, high margin, broad appeal) + Stormcrest (hero).
- **TikTok Spark Ads** boosting the best organic videos (cheapest way to scale what already works).
- **Google:** Performance Max + branded search defense; a few high-intent keywords ("packable rain jacket," "UPF sun hoodie").
- **Kill rule:** pause any ad set under **1.8x ROAS** after $50 spend; scale winners 20%/day.

### Phase 3 — Scale & retain (Weeks 8–12+)
- Reallocate to whatever beats 2x ROAS. Introduce bundles ("Storm Kit": shell + dry bag + headlamp) to lift AOV past the $75 free-ship line.
- **Retention:** post-purchase email flow (review request at day 14, cross-sell at day 30), abandoned-cart email/SMS.
- **Influencer seeding:** send Solaris/Beacon to 10–20 micro-influencers (5–50k, hiking niche) for honest posts — cheap, high-trust.

## 4. Conversion levers already built in
- Free shipping over $75 + cart progress nudge → raises AOV.
- Trust bar, ratings, 60-day returns, 2-year warranty → reduces purchase risk.
- 10%-off email capture → builds the owned channel.
- **Next biggest lift:** real product photography + a few video reviews.

## 5. Budget (first 90 days, lean)

| Item | Est. cost |
|---|---|
| Samples (hero SKUs, photography) | $150–250 |
| Paid ads testing (avg ~$25/day) | $1,500–2,000 |
| Email tool (free tier → paid) | $0–30/mo |
| Domain (owned) | already paid |
| **Total** | **~$1,700–2,300** |

Target: reach profitability on paid at **≥2x blended ROAS**; at 58% margin the
breakeven ROAS is ~1.7x, so 2x+ is the green zone.

## 6. KPIs to watch weekly
- Conversion rate (target 1.5–2.5%), AOV (target >$60, push to $75 for free-ship), blended ROAS, CAC vs. margin, email list growth, supplier ship time (keep <12 days or churn rises).

## 7. The single most important next step
Get **real Stripe + DSers live** (everything else is built), then **shoot/borrow
real photos of the 3 hero products**. Traffic converts on trust and imagery far
more than on copy — and the store's copy, structure, and payment rails are
already done.
