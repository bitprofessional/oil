/*! 1.3.0-6-atf-RELEASE */
(window.oilJsonp=window.oilJsonp||[]).push([[1],{157:function(e,t){e.exports={localeId:"enEN_00",version:0,texts:{label_intro_heading:"We use cookies and other technologies",label_intro:'The website uses cookies, web beacons, JavaScript and similar technologies. I agree that <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-thirdPartyList">trusted partners</a> generate pseudonymous user profiles for adapting the website to the user, for market research and for advertising. The generated data can also be shared with third parties while the user profiles cannot be combined with personal data. Detailed information, also on the right to withdraw consent, can be found in the website\'s privacy policy.',label_button_yes:"OK",label_button_back:"Back",label_button_advanced_settings:"More information",label_button_cookie_preferences:"Cookie Preferences",label_cpc_heading:"Privacy settings:",label_cpc_text:"Please select a privacy setting",label_cpc_activate_all:"Activate all",label_cpc_deactivate_all:"Deactivate all",label_third_party:"IAB 3rd Parties",label_custom_thirdparty_heading:"Publisher 3rd Parties",label_cpc_purpose_desc:"Purpose",label_cpc_purpose_optout_confirm_heading:"Are you really sure?",label_cpc_purpose_optout_confirm_text:"This setting will significantly affect your experience on our website.",label_cpc_purpose_optout_confirm_proceed:"Continue",label_cpc_purpose_optout_confirm_cancel:"Cancel",label_poi_group_list_heading:"Your consent for companies of the group",label_poi_group_list_text:"Here is a list of companies of the group:",label_thirdparty_list_heading:"Your consent for third party software",label_thirdparty_list_text:"Here is a list of third party software.",label_nocookie_head:"In order to be able to provide our services in the best possible way, cookies must be activated in your browser.",label_nocookie_text:'Please activate cookies in the properties of your browsers. So you can do it in <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&amp;hl=en-GB" class="as-oil__intro-txt--link" target="_blank">Google Chrome</a> or <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank">Firefox</a>.".'}}},71:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.oilWrapper=t.handleOptIn=t.oilShowPreferenceCenter=t.renderOil=void 0;var o=r(12);Object.defineProperty(t,"renderOil",{enumerable:!0,get:function(){return o.renderOil}}),Object.defineProperty(t,"oilShowPreferenceCenter",{enumerable:!0,get:function(){return o.oilShowPreferenceCenter}}),Object.defineProperty(t,"handleOptIn",{enumerable:!0,get:function(){return o.handleOptIn}}),Object.defineProperty(t,"oilWrapper",{enumerable:!0,get:function(){return o.oilWrapper}}),t.locale=function(e){var t=this,r=(0,s.getLocale)();if(!function(e){var t;return!e||!e.texts||(t=e.texts,Object.values(i.OIL_LABELS).filter(function(e){return!e.startsWith(i.OPTIONAL_LABEL_PREFIX)}).filter(function(e){return!t[e]})).length>0}(r))return e(this);var o=(0,s.getLocaleUrl)();if(!o)return u(c.default,r),e(this);(0,l.fetchJsonData)(o).then(function(o){return u(o,r),e(t)}).catch(function(o){return(0,n.logError)("OIL backend returned error: "+o+". Falling back to default locale '"+c.default.localeId+"', version "+c.default.version+"!"),u(c.default,r),e(t)})};var a,i=r(9),n=r(3),l=r(5),s=r(2),c=(a=r(157))&&a.__esModule?a:{default:a};function u(e,t){if(t&&t.texts){for(var r in e.texts)t.texts[r]||(t.texts[r]=e.texts[r]);for(var o in c.default.texts)t.texts[o]||(0,n.logWarn)(o+" missing from locale config.");(0,s.setLocale)(t)}else(0,s.setLocale)(e)}}}]);