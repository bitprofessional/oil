/*! 1.3.0-4-atf-RELEASE */
(window.oilJsonp=window.oilJsonp||[]).push([[2,3],{132:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getGroupList=function(){var t=(0,l.getPoiGroupName)(),e=(0,o.getGlobalOilObject)("oilCachedGroupList");return new Promise(function(i){e||!(0,l.isPoiActive)()?i(e):(0,o.fetchJsonData)((0,l.getPoiListDirectory)()+"/"+t+".json").then(function(t){e=t.companyList,(0,o.setGlobalOilObject)("oilCachedGroupList",e),t.iabVendorWhitelist&&t.iabVendorWhitelist.length&&(0,l.setIabVendorWhitelist)(t.iabVendorWhitelist),t.iabVendorBlacklist&&t.iabVendorBlacklist.length&&(0,l.setIabVendorBlacklist)(t.iabVendorBlacklist),i(e)}).catch(function(e){(0,n.logError)("OIL getGroupList failed and returned error: "+e+'. Group "'+t+'" not found! Please add the JSON file with the correct name.'),i([])})})};var o=i(5),n=i(2),l=i(13)},133:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(154);Object.defineProperty(e,"oilGroupListTemplate",{enumerable:!0,get:function(){return o.oilGroupListTemplate}}),Object.defineProperty(e,"oilThirdPartyListTemplate",{enumerable:!0,get:function(){return o.oilThirdPartyListTemplate}}),Object.defineProperty(e,"renderOilGroupListTemplate",{enumerable:!0,get:function(){return o.renderOilGroupListTemplate}}),Object.defineProperty(e,"renderOilThirdPartyListTemplate",{enumerable:!0,get:function(){return o.renderOilThirdPartyListTemplate}}),Object.defineProperty(e,"listSnippet",{enumerable:!0,get:function(){return o.listSnippet}})},154:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.listSnippet=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.renderOilGroupListTemplate=function(t){(0,s.getGroupList)().then(function(e){t(u(e))})},e.renderOilThirdPartyListTemplate=function(t){(0,d.loadVendorListAndCustomVendorList)().then(function(){(0,s.getGroupList)().then(function(){t(c((0,d.getVendorsToDisplay)()))})})},e.oilGroupListTemplate=u,e.oilThirdPartyListTemplate=c;var n=i(128),l=i(129),r=i(12);i(155);var a=i(5),s=i(132),d=i(29),p=i(130);function u(t){return y(t,(0,n.getLabel)(l.OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING),(0,n.getLabel)(l.OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT))}function c(t){return y(t,(0,n.getLabel)(l.OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING),(0,n.getLabel)(l.OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT))}var m=e.listSnippet=function(t){return t||(t=[]),'<div class="as-oil-poi-group-list">'+t.map(function(t){return"object"===(void 0===t?"undefined":o(t))?'<div class="as-oil-third-party-list-element">\n                <span onclick=\''+r.OIL_GLOBAL_OBJECT_NAME+'._toggleViewElements(this)\'>\n                    <svg class=\'as-oil-icon-plus\' width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">\n                      <path d="M5.675 4.328H10v1.344H5.675V10h-1.35V5.672H0V4.328h4.325V0h1.35z" fill="#0068FF" fill-rule="evenodd" fill-opacity=".88"/>\n                    </svg>\n                    <svg class=\'as-oil-icon-minus\' style=\'display: none;\' width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">\n                      <path d="M0 0h10v1.5H0z" fill="#3B7BE2" fill-rule="evenodd" opacity=".88"/>\n                    </svg>\n                    <span class=\'as-oil-third-party-name\'>'+t.name+"</span>\n                </span>\n                <div class='as-oil-third-party-toggle-part' style='display: none;'>\n                <p class='as-oil-third-party-description' >"+t.description+"</p>\n                  <div class='as-oil-third-party-link'>"+t.link+"</div>\n                </div>\n              </div>":'<div class="as-oil-poi-group-list-element">'+t+"</div>"}).join("")+"</div>"};function h(){var t=(0,a.getGlobalOilObject)("oilCache");t&&(document.documentElement.setAttribute("style",t.documentElementStyle),document.body.setAttribute("style",t.bodyStyle)),(0,a.setGlobalOilObject)("oilCache",void 0)}function y(t,e,i){return function(){if(window.matchMedia&&window.matchMedia("(max-width: 600px)").matches){(0,a.setGlobalOilObject)("oilCache",{documentElementStyle:document.documentElement.getAttribute("style"),bodyStyle:document.body.getAttribute("style"),remove:h});var t="overflow: hidden; position: relative; height: 100%;";document.documentElement.setAttribute("style",t),document.body.setAttribute("style",t),e=window.addEventListener?"addEventListener":"attachEvent",i=window.removeEventListener?"removeEventListener":"detachEvent",o="attachEvent"===e?"onmessage":"message",n=window[e],l=window[i],n(o,function t(e){e&&e.data&&-1!==JSON.stringify(e.data).indexOf("oil_")&&(h(),l(o,t,!1))},!1)}var e,i,o,n,l}(),'<div class="as-oil-fixed">\n    <div class="as-oil-content-overlay as-oil-poi-group-list-wrapper" data-qa="oil-poi-list">\n        <div class="as-oil-l-wrapper-layout-max-width">\n            <div class="as-oil__heading">\n                '+e+'\n            </div>\n            <p class="as-oil__intro-txt">\n                '+i+"\n            </p>\n            "+m(t)+"\n            "+(0,p.BackButton)()+'\n        </div>\n        <div class="as-oil-l-row as-oil-l-buttons-'+(0,n.getTheme)()+'">\n            <div class="as-oil-l-item">\n              '+(0,p.YesButton)("as-oil__btn-optin "+r.JS_CLASS_BUTTON_OPTIN)+"\n            </div>\n        </div>\n    </div>\n</div>"}(0,a.setGlobalOilObject)("_toggleViewElements",function(t){var e=t.children[0],i=t.children[1],o=t.nextElementSibling;"none"===o.style.display?(o.setAttribute("style","display: block; animation: fadein 0.5s"),i.setAttribute("style","display: inline-block; animation: fadein 0.5s"),e.setAttribute("style","display: none")):(o.setAttribute("style","display: none"),i.setAttribute("style","display: none"),e.setAttribute("style","display: inline-block; animation: fadein 0.5s"))})},155:function(t,e,i){var o=i(156);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(111)(o,n),o.locals&&(t.exports=o.locals)},156:function(t,e,i){(t.exports=i(110)(!1)).push([t.i,"@media (max-width:600px){.as-oil-poi-group-list-wrapper{min-height:300px;z-index:100;padding:16px 12px;border-top-left-radius:4px;border-top-right-radius:4px;background-color:#fafafa;box-shadow:0 -8px 20px 0 rgba(0,0,0,.2)}.as-oil-poi-group-list-wrapper .as-oil__heading,.as-oil-poi-group-list-wrapper .as-oil__intro-txt{text-align:left}}.as-oil-poi-group-list-wrapper .as-oil-poi-group-list{overflow:auto;overflow-y:scroll;max-height:200px}@media (min-width:601px){.as-oil-poi-group-list-wrapper .as-oil-l-buttons-light{float:right}}@media (max-width:600px){.as-oil-poi-group-list-wrapper .as-oil-l-buttons-light{background:#f9f9f9;padding:8px;bottom:0;left:0}}@media (min-width:601px){.as-oil-poi-group-list-wrapper .as-oil-l-buttons-dark{float:right}}@media (max-width:600px){.as-oil-poi-group-list-wrapper .as-oil-l-buttons-dark{background:#262626;padding:8px;bottom:0;left:0}}.as-oil-third-party-list-element{border-bottom:1px solid #d8d8d8;padding-bottom:8px;margin-bottom:8px}.as-oil-third-party-list-element .as-oil-third-party-toggle-part{margin-left:16px}.as-oil-third-party-list-element .as-oil-third-party-name{font-weight:700;cursor:pointer}.as-oil-third-party-list-element .as-oil-third-party-description,.as-oil-third-party-list-element .as-oil-third-party-purpose{font-size:12px}.as-oil-third-party-list-element .as-oil-third-party-link{color:#262626;font-size:12px;opacity:.5;text-decoration:none}.dark .as-oil-third-party-list-element .as-oil-third-party-link{color:#f5f5f5}@keyframes fadein{0%{opacity:0}to{opacity:1}}",""])}}]);