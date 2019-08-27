import {getSoiCookie} from '../core/core_cookies';
import {PRIVACY_FULL_TRACKING} from '../core/core_constants';
import {logInfo} from '../core/core_log';
import {forEach} from './userview_modal';
import {getPurposes} from '../core/core_vendor_lists';
import { getVendorConsentData, getCustomVendorConsentData } from '../core/core_consents';

export function getSoiConsentData() {
  let soiCookie = getSoiCookie();
  return soiCookie.opt_in ? soiCookie.consentData : undefined;
}

/**
 * If the CPC is visible it returns the settings from the CPC,
 * otherwise '1' is returned for 'full tracking'
 *
 * @returns {Object,number}
 *  "0": if no checkbox is marked
 *  "1": if all checkboxes are marked or if
 *  "{}": if there are multiple checkboxes
 */
export function getPrivacySettings() {
  if (document.querySelector('.as-js-purpose-slider')) {
    let result = {};
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (element) => {
      let element_id = element.dataset ? element.dataset.id : element.getAttribute('data-id');
      result[element_id] = element.checked;
    }, this);

    if (document.querySelectorAll('.as-js-ven-cons-slider')) {
      result = Object.assign(result, { vendorConsents: {} });

      forEach(document.querySelectorAll('.as-js-ven-cons-slider'), (element) => {
        let element_id = element.dataset ? element.dataset.id : element.getAttribute('data-id');
        result.vendorConsents[element_id] = element.checked;
      });
    }

    return result;
  }
  return PRIVACY_FULL_TRACKING;
}

export function applyPrivacySettings(allowedPurposes) {
  logInfo('Apply privacy settings from cookie', allowedPurposes);

  for (let i = 1; i <= getPurposes().length; i++) {
    document.querySelector(`#as-js-purpose-slider-${i}`).checked = (allowedPurposes.indexOf(i) !== -1);
  }

  let vendorConsents = getVendorConsentData();
  let customVendorConsents = getCustomVendorConsentData(null);

  forEach(Object.keys(vendorConsents.vendorConsents), (key) => {
    document.querySelector(`#as-js-ven-cons-slider-${key}`).checked = vendorConsents.vendorConsents[key];
    document.querySelector(`#as-js-ven-cons-slider-${key} + .as-oil-cpc__slider`).setAttribute('data-checked', vendorConsents.vendorConsents[key]);
  });

  forEach(Object.keys(customVendorConsents.vendorConsents), (key) => {
    document.querySelector(`#as-js-ven-cons-slider-${key}`).checked = customVendorConsents.vendorConsents[key];
    document.querySelector(`#as-js-ven-cons-slider-${key} + .as-oil-cpc__slider`).setAttribute('data-checked', customVendorConsents.vendorConsents[key]);
  });

  if (allowedPurposes === 1) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = true);
    });
    forEach(document.querySelectorAll('.as-js-ven-cons-slider'), (domNode) => {
      domNode && (domNode.checked = true);
    })
  }

  if (allowedPurposes === 0) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = false);
    });
    forEach(document.querySelectorAll('.as-js-ven-cons-slider'), (domNode) => {
      domNode && (domNode.checked = false);
    });
  }
}
