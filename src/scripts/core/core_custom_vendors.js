import { getCustomVendorList, loadCustomVendorList } from './core_vendor_lists';
import { logError } from './core_log';
import { getCustomVendorSoiCookie } from './core_cookies';
import { forEach } from './../userview/userview_modal';

export function sendConsentInformationToCustomVendors() {
  return loadCustomVendorList()
    .then(() => {
      let customVendorList = getCustomVendorList();

      if (customVendorList && !customVendorList.isDefault) {
        let cookie = getCustomVendorSoiCookie();
        if (cookie && cookie.consentData) {
          forEach(customVendorList.vendors, (customVendor) => sendConsentInformationToCustomVendor(customVendor, cookie.consentData));
        }
      }
    });
}

function sendConsentInformationToCustomVendor(customVendor, consentData) {
  let allowedPurposeIds = consentData.getPurposesAllowed();

  if (allowedPurposeIds.indexOf(9) !== -1) {
    executeCustomVendorScript('opt-in', customVendor.optInSnippet, customVendor);
  } else {
    executeCustomVendorScript('opt-out', customVendor.optOutSnippet, customVendor);
  }
}

function executeCustomVendorScript(scriptType, script, customVendor) {
  if (script) {
    try {
      // Note: We assign eval function to a variable and invoke it this way indirectly. This ensures that's the scope
      // for executed JavaScript function is global and not the scope of this function! We need this to enable the
      // executed script to set (global) variables that are reachable for other code snippets (i.e. for webtrekk) of
      // the website the opt-in layer is integrated in.
      let evalFunction = eval;
      evalFunction(script)
    } catch (error) {
      logError('Error occurred while executing ' + scriptType + ' script for custom vendor ' + customVendor.id + ' (' + customVendor.name + ')! Error was: ', error);
    }
  }
}
