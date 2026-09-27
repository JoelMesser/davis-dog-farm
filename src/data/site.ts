/**
 * Single source of truth for the rescue's contact details and external links.
 *
 * Why this file exists: before it, the PayPal link appeared in seven places
 * and the email in six. A change like a new donation button would have meant
 * hunting through every page, and a missed copy fails silently: nothing
 * breaks at build time, but a donor clicks a dead link. Pages and layouts
 * import from here instead.
 *
 * Rule of thumb: a value used in more than one place, or likely to change
 * (URLs, IDs, contact info), goes here. One-off links such as a partner's
 * website stay inline in the page that uses them.
 */

// ---------- Contact ----------

export const email = "info@davisdogfarm.com";
export const mailto = `mailto:${email}`;

export const address = {
  street: "2686 Sand Beach Road",
  cityStateZip: "Grantville, PA 17028",
};

/** Derived from `address` so the two can never disagree. */
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${address.street} ${address.cityStateZip}`);

// ---------- Social and listings ----------

/** Uses the numeric page ID, which survives a rename of the page's vanity URL. */
export const facebookUrl = "https://www.facebook.com/102837875139459";

export const petfinderUrl =
  "https://www.petfinder.com/member/us/pa/grantville/the-davis-dog-farm-inc-pa1152/";

// ---------- Money ----------

/**
 * PayPal hosted donate button. There's no separate button per fund: donors
 * direct a gift by adding a note ("Hope for Healing", "training",
 * "wish list", "in memory of …"). Keep that wording consistent across pages.
 */
export const donateUrl = "https://www.paypal.com/donate?hosted_button_id=BNYCE2ETKYDN6";

/**
 * The online store (logo hats, t-shirts, hoodies, harness leads).
 *
 * TEMPORARY: the store still runs on GoDaddy's commerce platform. This is the
 * GoDaddy site's built-in address, not davisdogfarm.com/shop, so the link keeps
 * working after the domain moves to Cloudflare. It stops working if the GoDaddy
 * Website Builder plan is canceled. When the store moves, update this constant
 * and the /shop and /ols/* redirects in public/_redirects.
 */
export const shopUrl = "https://davisdogfarm.godaddysites.com/shop";

// ---------- Adoption ----------

export const adoptionPoliciesUrl =
  "https://docs.google.com/document/d/19NL1eVUIidVtMqYAkH4f7_li4f0FR6-Gr8VGbCdXQTg/edit?usp=sharing";

/**
 * ShelterManager (sheltermanager.com) is the rescue's animal-management
 * system. `ah2716` is their account. Every URL below is built from this one
 * base, so a change of account is a one-line edit.
 */
const shelterManager = "https://service.sheltermanager.com/asmservice?account=ah2716";

/** Online application forms hosted by ShelterManager. The IDs are the form numbers in their account. */
export const applicationUrls = {
  adopt: `${shelterManager}&method=online_form_html&formid=32`,
  foster: `${shelterManager}&method=online_form_html&formid=42`,
  volunteer: `${shelterManager}&method=online_form_html&formid=45`,
};

/** Embed script that renders the live adoptable-dogs list. See src/components/Adoptables.astro. */
export const adoptablesScriptUrl = `${shelterManager}&method=animal_view_adoptable_js`;

/** Server-rendered version of the same list: the fallback for visitors without JavaScript. */
export const adoptablesPageUrl = `${shelterManager}&method=animal_view_adoptable_html`;
