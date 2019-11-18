import {getSoiCookie, getCustomVendorSoiCookie} from './core_cookies';
import {getCustomPurposeIds, gdprApplies} from './core_config';
import {getLimitedVendorIds, getPurposeIds, getLimitedCustomVendorIds} from './core_vendor_lists';
import {OIL_SPEC} from './core_constants';

export function getVendorConsentData(vendorIds) {
  let cookie = getSoiCookie();

  if (cookie && cookie.consentData) {
    return {
      metadata: cookie.consentData.getMetadataString(),
      gdprApplies: gdprApplies(),
      hasGlobalScope: false,
      purposeConsents: buildPurposeConsents(cookie.consentData.getPurposesAllowed(), getPurposeIds()),
      vendorConsents: buildVendorConsents(cookie, vendorIds)
    };
  }
}

export function getCustomVendorConsentData(customVendorIds) {
  let cookie = getCustomVendorSoiCookie();

  if (customVendorIds !== null) {
    for (let vend = 0; vend < customVendorIds.length; vend++) {
      customVendorIds[vend] = customVendorIds[vend].toString();
    }
  }

  if (cookie && cookie.consentData) {
    return {
      metadata: cookie.consentData.getMetadataString(),
      gdprApplies: gdprApplies(),
      hasGlobalScope: false,
      purposeConsents: cookie.consentData.getPurposesAllowed() ? cookie.consentData.getPurposesAllowed() : [],
      vendorConsents: buildCustomVendorConsents(cookie, customVendorIds)
    };
  }
}

export function getConsentDataString(consentStringVersion) {
  let cookie = getSoiCookie();

  if (cookie && cookie.consentData) {
    const consentString = buildConsentString(cookie, consentStringVersion);

    if (consentString) {
      return {
        gdprApplies: gdprApplies(),
        hasGlobalScope: false,
        consentData: consentString
      };
    }
  }
}

export function getPublisherConsentData(purposeIds) {
  let cookie = getSoiCookie();

  if (cookie && cookie.consentData && cookie.customPurposes) {
    return {
      metadata: cookie.consentData.getMetadataString(),
      gdprApplies: gdprApplies(),
      hasGlobalScope: false,
      standardPurposeConsents: buildPurposeConsents(cookie.consentData.getPurposesAllowed(), getPurposeIds(), purposeIds),
      customPurposeConsents: buildPurposeConsents(cookie.customPurposes, getCustomPurposeIds(), purposeIds)
    };
  }
}

function buildPurposeConsents(allowedPurposeIds, allPurposeIds, requestedPurposeIds) {
  let purposeIds = (requestedPurposeIds && requestedPurposeIds.length) ? requestedPurposeIds : allPurposeIds;

  return purposeIds
    .filter(purposeId => allPurposeIds.indexOf(purposeId) !== -1)
    .reduce((map, purposeId) => {
      map[purposeId] = allowedPurposeIds.indexOf(purposeId) !== -1;
      return map
    }, {});
}

function buildVendorConsents(cookie, requestedVendorIds) {
  let vendorIds = (requestedVendorIds && requestedVendorIds.length) ? requestedVendorIds : getLimitedVendorIds();
  let allowedVendors = cookie.consentData.getVendorsAllowed();

  return vendorIds
    .reduce((map, vendorId) => {
      map[vendorId] = allowedVendors.indexOf(vendorId) !== -1;
      return map
    }, {});
}

function buildCustomVendorConsents(cookie, requestedCustomVendorIds) {
  let customVendorIds = (requestedCustomVendorIds && requestedCustomVendorIds.length) ? requestedCustomVendorIds : getLimitedCustomVendorIds();
  let allowedVendors = cookie.consentData.getVendorsAllowed();

  return customVendorIds
    .reduce((map, customVendorId) => {
      map[customVendorId] = allowedVendors.indexOf(customVendorId) !== -1;
      return map
    }, {});
}

function buildConsentString(cookie, consentStringVersionString) {
  let consentStringVersion = consentStringVersionString ? parseInt(consentStringVersionString, 10) : OIL_SPEC.LATEST_CONSENT_STRING_VERSION;
  return (!isNaN(consentStringVersion) && consentStringVersion <= cookie.consentData.getVersion()) ? cookie.consentString : null;
}
