# Stripe setup brief — LeadsFlow180 Launch Founders

Give this to the person who owns / creates the Stripe account.  
The branding site already has a **Subscribe** button on the home page (`#pricing`) that starts Stripe Checkout for **$697 / month**.

The site creates the **Product** and **recurring Price** through the Stripe API on first checkout (from `src/lib/pricing.ts`). You do **not** need to create them in the Dashboard unless you prefer to pin a Price ID.

---

## What we are selling

| Field | Value |
|--------|--------|
| Offer name | Launch Founders Rate · Special |
| Amount | **$697 USD per month** |
| Type | Recurring **subscription** (not one-time) |
| Audience | Limited time · first 20 clients |
| Site | LeadsFlow180 branding / marketing site |
| Checkout trigger | User clicks **Subscribe — $697/mo** on the Pricing section |

After payment, the customer returns to the site. They still create their AI Office account separately (`office.getleadsflow180.com/signup`). Stripe handles billing only.

---

## What you need to do in Stripe (complete checklist)

### 1. Create / access the Stripe account
- Create a Stripe account (or use the company account) for **LeadsFlow180**.
- Complete business verification (legal name, address, bank for payouts, tax info) so **live** charges can be enabled.
- Confirm the account country and that **USD** is available for pricing.

### 2. Turn on Test mode first, then Live
1. Work in **Test mode** until checkout works end-to-end.
2. Use a **live** secret key for production (same auto-create path).
3. Never put live secret keys in a public repo. Keys go only in private env vars (e.g. `.env.local` / hosting dashboard).

### 3. Get API keys (required)
Dashboard → **Developers** → **API keys**:

| Key | Looks like | Where it goes |
|-----|------------|----------------|
| **Secret key** | `sk_test_...` or `sk_live_...` | `STRIPE_SECRET_KEY` (server only — never public) |
| Publishable key | `pk_test_...` / `pk_live_...` | Not required for current Checkout Session flow |

That is enough. First successful Subscribe creates:

- Product: `LeadsFlow180 Launch Founders` (metadata `plan=launch-founders`)
- Price: **$697 USD / month** recurring

### 4. (Optional) Pin a Dashboard Price
If you already created a Product/Price in the Dashboard, set `STRIPE_PRICE_ID=price_...` and the site will use that instead of creating one.

### 5. (Recommended) Customer portal
Dashboard → **Settings** → **Billing** → **Customer portal**:

- Enable so customers can cancel / update payment method later.
- The site copy assumes they can manage billing in Stripe’s portal after signup.

### 6. (Optional) Payment Link fallback
If the developer cannot use Checkout Sessions yet, create a **Payment Link** for the same $697/mo price and share the URL (`https://buy.stripe.com/...`).  
The site can use that as `STRIPE_PAYMENT_LINK` instead of the secret-key flow.

### 7. (Optional later) Webhooks
Not required for the first Subscribe → Checkout → return-to-site flow.  
Later, for automating “paid → unlock AI Office,” add a webhook for events like `checkout.session.completed` / `invoice.paid`. That can be a second phase.

---

## What to send back to the developer (deliverables)

Please send **all** of the following securely (password manager / encrypted note — not email in plain text if possible):

### Required for the website
1. **`STRIPE_SECRET_KEY`**  
   - Test key for staging: `sk_test_...`  
   - Live key for production: `sk_live_...`
2. **Confirmation** that Test mode works (or Live verification is complete).

### Required for redirects
3. **Production site URL** (no trailing slash), e.g. `https://www.yourdomain.com`  
   - Used as `NEXT_PUBLIC_SITE_URL`  
   - Success return: `https://www.yourdomain.com/?checkout=success#pricing`  
   - Cancel return: `https://www.yourdomain.com/?checkout=canceled#pricing`

### Nice to have
4. Stripe **Customer Portal** enabled (yes/no).  
5. Optional **`STRIPE_PRICE_ID`** if pinning a Dashboard price.  
6. Optional **`STRIPE_PAYMENT_LINK`** if using Payment Links instead of Checkout Sessions.  
7. Test card confirmation that a test subscription completed in Test mode.  
8. Who receives Stripe email receipts / dispute notifications (email address).

### Do **not** send
- Bank login passwords  
- Stripe login password in Slack/email without a secure channel  
- Secret keys in GitHub commits or screenshots of the full key

---

## How the website uses this (for context)

1. Visitor opens Pricing on the home page.  
2. Clicks **Subscribe — $697/mo**.  
3. Site calls `POST /api/checkout`.  
4. With `STRIPE_SECRET_KEY`, the API finds or creates the Launch Founders Product + Price, then opens Checkout.  
5. On success → back to the site with a success message and link to create AI Office account.  
6. On cancel → back to Pricing.

Env vars the developer will set:

```env
NEXT_PUBLIC_SITE_URL=https://your-live-domain.com
STRIPE_SECRET_KEY=sk_live_...
```

Optional:

```env
STRIPE_PRICE_ID=price_...
# or
STRIPE_PAYMENT_LINK=https://buy.stripe.com/...
```

---

## Acceptance test (before going live)

**Test mode**
1. Set test secret key + `NEXT_PUBLIC_SITE_URL`.  
2. Click Subscribe on the site.  
3. Confirm Product + Price appear under Stripe → **Product catalog**.  
4. Pay with Stripe test card `4242 4242 4242 4242`.  
5. Confirm redirect to success banner on `#pricing`.  
6. Confirm a subscription appears in Stripe → **Customers / Subscriptions**.

**Live mode**
1. Switch to live secret key.  
2. Set live `NEXT_PUBLIC_SITE_URL`.  
3. Do one real $697 charge (or a temporary lower test price in `pricing.ts` if preferred, then switch back).  
4. Confirm payout bank is correct.

---

## One-line ask to the Stripe account owner

> Please create/verify the Stripe account for LeadsFlow180, send me the **Secret API key** (`sk_test_…` then `sk_live_…`), enable the **Customer Portal**, and confirm the business account is verified for live payments. The website will create the $697/mo Launch Founders Product and Price via API.
