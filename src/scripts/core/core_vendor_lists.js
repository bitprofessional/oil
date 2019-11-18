import { getCustomVendorListUrl, getIabVendorBlacklist, getIabVendorListUrl, getIabVendorWhitelist, getShowLimitedVendors, getPurposesFeaturesTranslationListUrl } from './core_config';
import { logError, logInfo } from './core_log';
import { fetchJsonData } from './core_utils';
import { forEach } from './../userview/userview_modal';

export const DEFAULT_VENDOR_LIST = {
  vendorListVersion: 36,
  maxVendorId: 380,
  lastUpdated: '2018-05-30T16:00:15Z',
  purposeIds: [1, 2, 3, 4, 5]
};

export const DEFAULT_CUSTOM_VENDOR_LIST = {
  vendorListVersion: 1,
  isDefault: true,
  purposeIds: [9],
  vendors: []
};

export let cachedVendorList;
export let cachedCustomVendorList;
export let pendingVendorListPromise = null;
export let pendingCustomVendorListPromise = null;

export function loadVendorList() {

  if (cachedVendorList) {
    return new Promise(resolve => {
      resolve();
    });
  } else if (pendingVendorListPromise) {
    return pendingVendorListPromise;
  } else {
    pendingVendorListPromise = new Promise(function (resolve) {
      let iabVendorListUrl = getIabVendorListUrl();
      fetchJsonData(iabVendorListUrl)
        .then(response => {
          let purposesFeaturesTranslationListUrl = getPurposesFeaturesTranslationListUrl();

          if (purposesFeaturesTranslationListUrl !== false) {
            fetchJsonData(purposesFeaturesTranslationListUrl)
              .then(transResponse => {
                Array.prototype.slice.call(transResponse.purposes).forEach((purpose, index) => {
                  if (response.purposes[index].id === purpose.id) {
                    response.purposes[index].name = purpose.name;
                    response.purposes[index].description = purpose.description;
                  }
                });
                Array.prototype.slice.call(transResponse.features).forEach((feature, index) => {
                  if (response.features[index].id === feature.id) {
                    response.features[index].name = feature.name;
                    response.features[index].description = feature.description;
                  }
                });
                sortVendors(response);
                cachedVendorList = response;
                pendingVendorListPromise = null;
                resolve();
              });
          } else {
            sortVendors(response);
            cachedVendorList = response;
            pendingVendorListPromise = null;
            resolve();
          }
        })
        .catch(error => {
          logError(`OIL getVendorList failed and returned error: ${ error }. Falling back to default vendor list!`);
          pendingVendorListPromise = null;
          resolve();
        });
    });
    return pendingVendorListPromise;
  }

}

export function loadCustomVendorList() {
  if (cachedCustomVendorList) {
    return new Promise(resolve => {
      resolve();
    });
  } else {
    pendingCustomVendorListPromise = new Promise(resolve => {
      let customVendorListUrl = getCustomVendorListUrl();
      if (!customVendorListUrl) {
        cachedCustomVendorList = DEFAULT_CUSTOM_VENDOR_LIST;
        resolve();
      } else {
        fetchJsonData(customVendorListUrl)
          .then(response => {
            cachedCustomVendorList = Object.assign(response, { purposes: [ { id: 9, name: null, description: null } ] });
            pendingCustomVendorListPromise = null;
            resolve();
          })
          .catch(error => {
            cachedCustomVendorList = DEFAULT_CUSTOM_VENDOR_LIST;
            logError(`OIL getCustomVendorList failed and returned error: ${ error }. Falling back to default custom vendor list!`);
            pendingCustomVendorListPromise = null;
            resolve();
          });
      }
    });
    return pendingCustomVendorListPromise;
  }
}

export function getPurposes() {
  return cachedVendorList ? cachedVendorList.purposes : expandIdsToObjects(DEFAULT_VENDOR_LIST.purposeIds);
}

export function getFeatures() {
  return cachedVendorList ? cachedVendorList.features : expandIdsToObjects(DEFAULT_VENDOR_LIST.featureIds);
}

export function getPurposeIds() {
  return getPurposes().map(({ id }) => id);
}

export function getVendors() {
  return cachedVendorList ? cachedVendorList.vendors : expandIdsToObjects(buildDefaultVendorIdList());
}

export function getCustomVendors() {
  return cachedCustomVendorList ? cachedCustomVendorList.vendors : false;
}

export function getVendorIds() {
  return getVendors().map(({ id }) => id);
}

export function getCustomVendorIds() {
  return getCustomVendors().map(({id}) => id);
}

export function getVendorList() {
  if (cachedVendorList) {
    return cachedVendorList;
  }
  return {
    vendorListVersion: DEFAULT_VENDOR_LIST.vendorListVersion,
    lastUpdated: DEFAULT_VENDOR_LIST.lastUpdated,
    vendors: expandIdsToObjects(buildDefaultVendorIdList()),
    purposes: expandIdsToObjects(DEFAULT_VENDOR_LIST.purposeIds),
    features: [],
    isDefault: true
  };
}

export function getCustomVendorList() {
  return cachedCustomVendorList ? cachedCustomVendorList : DEFAULT_CUSTOM_VENDOR_LIST;
}

export function getCustomVendorListVersion() {
  if (cachedCustomVendorList && !cachedCustomVendorList.isDefault) {
    return cachedCustomVendorList.vendorListVersion;
  }
  return undefined;
}

export function clearVendorListCache() {
  cachedVendorList = undefined;
  cachedCustomVendorList = undefined;
  pendingVendorListPromise = null;
}

export function getVendorsToDisplay() {
  return getShowLimitedVendors() ? getLimitedVendors() : getVendors();
}

export function getLimitedVendors() {
  let vendors = getVendors();
  const limitedIds = getLimitedVendorIds();

  logInfo('limiting vendors');

  vendors = vendors.filter(vendor => limitedIds.indexOf(vendor.id) > -1);

  return vendors;
}

export function getLimitedVendorIds() {
  let limited;
  if (!cachedVendorList) {
    limited = buildDefaultVendorIdList();
  } else {
    limited = getVendorIds();
  }
  const whitelist = getIabVendorWhitelist();
  const blacklist = getIabVendorBlacklist();

  if (whitelist && whitelist.length > 0) {
    limited = limited.filter(vendorId => whitelist.indexOf(vendorId) > -1);
  } else if (blacklist && blacklist.length > 0) {
    limited = limited.filter(vendorId => blacklist.indexOf(vendorId) === -1);
  }

  return limited;
}

export function getLimitedCustomVendorIds() {
  let limited;

  if (!cachedCustomVendorList) {
    limited = false;
  } else {
    limited = getCustomVendorIds();
  }

  return limited;
}

// FIXME Refactor this code. Nobody can read it!
function buildDefaultVendorIdList() {
  return ((a, b) => {
    while (a--) {
      b[a] = a + 1;
    }
    return b;
  })(DEFAULT_VENDOR_LIST.maxVendorId, []);
}

function sortVendors(vendorList) {
  vendorList.vendors = vendorList.vendors.sort((leftVendor, rightVendor) => leftVendor.id - rightVendor.id);
}

/**
 * This function takes every element from the input array
 * and wraps it with as {id: element} object
 */
function expandIdsToObjects(idArray) {
  return idArray.map(anId => ({ 'id': anId }));
}
