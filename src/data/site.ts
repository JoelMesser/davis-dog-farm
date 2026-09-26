/**
 * Contact details and external links used across the site.
 *
 * Everything the rescue might need to change (donation button, application
 * forms, email, address) lives here so it only has to be edited once.
 */

export const email = "info@davisdogfarm.com";
export const mailto = `mailto:${email}`;

export const address = {
  street: "2686 Sand Beach Road",
  cityStateZip: "Grantville, PA 17028",
};
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${address.street} ${address.cityStateZip}`);

export const facebookUrl = "https://www.facebook.com/102837875139459";
export const petfinderUrl =
  "https://www.petfinder.com/member/us/pa/grantville/the-davis-dog-farm-inc-pa1152/";

/** PayPal hosted donate button. Donors add a note (e.g. "training") to direct a gift. */
export const donateUrl = "https://www.paypal.com/donate?hosted_button_id=BNYCE2ETKYDN6";

/** Policies document linked from the adopt page. */
export const adoptionPoliciesUrl =
  "https://docs.google.com/document/d/19NL1eVUIidVtMqYAkH4f7_li4f0FR6-Gr8VGbCdXQTg/edit?usp=sharing";

/**
 * ShelterManager (sheltermanager.com) is the rescue's animal database. It hosts
 * the online application forms and the live list of adoptable dogs.
 */
const shelterManager = "https://service.sheltermanager.com/asmservice?account=ah2716";

export const applicationUrls = {
  adopt: `${shelterManager}&method=online_form_html&formid=32`,
  foster: `${shelterManager}&method=online_form_html&formid=42`,
  volunteer: `${shelterManager}&method=online_form_html&formid=45`,
};

/** Script that renders the adoptable-dogs list (see src/components/Adoptables.astro). */
export const adoptablesScriptUrl = `${shelterManager}&method=animal_view_adoptable_js`;
/** Plain HTML version of the same list, for visitors without JavaScript. */
export const adoptablesPageUrl = `${shelterManager}&method=animal_view_adoptable_html`;
