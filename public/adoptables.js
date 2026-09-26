// Settings for ShelterManager's adoptable-animals embed (loaded right after this file).
// Dogs are managed in ShelterManager; this page only displays them.
var asm3_adoptable_filters = "agegroup sex";
var asm3_adoptable_iframe = false;          // open profiles in a new tab instead of an overlay
var asm3_adoptable_fullsize_images = true;  // thumbnails are too small for our cards
var asm3_adoptable_translations = { "(any age)": "Any age", "(any sex)": "Any sex", "No results": "No dogs match those filters." };
var asm3_adoptable_extra = function (a) {
  var d = document.createElement('div');
  d.textContent = a.BREEDNAME || '';
  return '<div class="asm3-adoptable-breed">' + d.innerHTML + '</div>';
};
