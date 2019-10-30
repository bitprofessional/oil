import '../../../styles/cpc_tabs.scss';
import { OIL_LABELS } from '../userview_constants';
import { forEach } from '../userview_modal';
import { getLabel, getLabelWithDefault } from '../userview_config';
import { getCustomPurposes, getCustomVendorListUrl } from '../../core/core_config';
import { JS_CLASS_BUTTON_OPTIN, OIL_GLOBAL_OBJECT_NAME, OIL_VENDOR_CONSENT_SWITCH } from '../../core/core_constants';
import { getCustomVendorList, getPurposes, getFeatures, getVendorList, getVendorsToDisplay } from '../../core/core_vendor_lists';
import { BackButton, YesButton, BackButtonHideCPC } from './components/oil.buttons';

export function oilAdvancedSettingsTemplate(hideCPC = false) {
  return `
    <div id="as-oil-cpc" class="as-oil-content-overlay" data-qa="oil-cpc-overlay">
      ${oilAdvancedSettingsInlineTemplate(hideCPC)}
    </div>
  `;
}

export function oilAdvancedSettingsInlineTemplate(hideCPC = false) {
  let bckBtn = BackButton();

  if (hideCPC) {
    bckBtn = BackButtonHideCPC();
  }

  return `
    <div class="as-oil-l-wrapper-layout-max-width as-oil-tabs-cpc__wrapper">
      <div class="as-oil-tabs-cpc__headline as-oil-center">
        ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_HEADING)}
      </div>
      <p class="as-oil-center as-oil-margin-top">
        ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_TEXT)}
        <svg id="Ebene_1" data-name="Ebene 1" height="20" width="20" style="margin-bottom: -.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.25 100.25"><defs><style>.cls-1{fill:#ccc;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;}</style></defs><title>Cookie</title><path class="cls-1" d="M100,50A50,50,0,1,1,50,0c6.46,0,10.5,1.89,15,6,1.69,1.54-14,18-12,18,5,0,21.37-10.75,24-9,3,2-24.67,15.92-9,12,4-1,15-6,13-3-3.55,5.33-22,15-11,14,2.55-.23,16.47-7.42,15-3-.6,1.8-2,2.36-4.17,4.58-.52.53-2.26,2.33-2,2.71.61.86,9.57-2.81,15.16-5.29C97.8,35.31,100,47.66,100,50Z" transform="translate(0.13 0.13)"/><path d="M35,13c-3.17,1.35-5.18,4.19-5,7,.22,3.34,3.46,5.15,5,6,.59.33,5,2.69,7,1,1.66-1.37.55-4.38,2-5s3.25,1.63,4,1c.17-.14.26-.42,0-2a12.68,12.68,0,0,0-1-4,7.84,7.84,0,0,0-3-3,8.88,8.88,0,0,0-6-1" transform="translate(0.13 0.13)"/><path d="M15,46c-.13.81-.4,1.87-1,2s-1.24-1.13-2-1-1.6,2-1,3c.42.72,1.35.82,3,1a14.25,14.25,0,0,0,3,0c3-.33,5.22-.56,6-2,.13-.23.24-.54,0-3-.3-3.06-.45-4.6-1-5-1.21-.9-4.08.41-7,3" transform="translate(0.13 0.13)"/><path d="M48,52c4.25,1.71,7.24,4,7,6-.09.71-.72,1.47-2,3a23.28,23.28,0,0,1-3,3c-2.53,2.08-3.24,1.74-4,3a4.87,4.87,0,0,0,0,5c1,1.43,2.72,1.67,5,2,2,.28,2.48,0,6,0,5.58,0,6.5.54,7,1,1.18,1.09.71,2.07,2,3a4.23,4.23,0,0,0,5,0c1.28-1.15,1.09-3.1,1-4a7.25,7.25,0,0,0-1-3,38.58,38.58,0,0,0-7-8c-5.68-5.28-6.53-6.2-7-8s-.1-2.8-1-4c-1.46-2-4.54-2.16-7-2" transform="translate(0.13 0.13)"/><path d="M23,66a6.12,6.12,0,0,1,0,4c-1.06,2.71-4.16,3.38-4,5,.06.58.49.83,2,2,4.22,3.25,3.66,3.4,5,4,.51.23,4.3,1.92,7,0a4.36,4.36,0,0,0,2-3c.21-3.29-5.52-4.36-8-10a12.6,12.6,0,0,1-1-4" transform="translate(0.13 0.13)"/><path d="M79,42c0-2,6-5,2-4-2.07.52-6.36,2.53-7,4-.72,1.64-.38,4.09,1,5s2.88-.77,7-1c3.43-.19,4.54.9,6,0,1-.61,1-3.08,1-7" transform="translate(0.13 0.13)"/></svg>
      </p>
      <hr/>
      ${bckBtn}
      ${ContentSnippet()}
    </div>
  `;
}

export function attachCpcHandlers() {
  forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
    domNode && domNode.addEventListener('change', event => toggleFeatureTextsMarks(event.target || event.srcElement), false);
  });
  forEach(document.querySelectorAll('.as-js-tab-label'), (domNode) => {
    domNode && domNode.addEventListener('click', event => toggleTab(event.target || event.srcElement), false);
    domNode && domNode.addEventListener('click', event => togglePurposeTab(event.target || event.srcElement), false);
  });
  forEach(document.querySelectorAll('.as-js-ven-cons-slider + .as-oil-cpc__slider'), (domNode) => {
    domNode && domNode.addEventListener('click', event => handleVendorConsentSwitch(event.target || event.srcElement), false);
  });
  forEach(document.querySelectorAll('.as-js-purpose-slider + .as-oil-cpc__slider'), (domNode) => {
    domNode.addEventListener('click', event => handlePurposesSwitch(event.target || event.srcElement), false)
  });
  const asOilCpcFeatures = document.getElementById('as-oil-cpc-features')
  asOilCpcFeatures && asOilCpcFeatures.addEventListener('click', toggleFeatureDescriptions, false);
  const thirdPartiesLinkDomNode = document.getElementById('as-js-third-parties-link');
  thirdPartiesLinkDomNode && thirdPartiesLinkDomNode.addEventListener('click', toggleThirdPartyVisibility, false);
  const thirdPartiesNonIABDomNode = document.getElementById('as-js-third-parties-non-iab-link');
  thirdPartiesNonIABDomNode && thirdPartiesNonIABDomNode.addEventListener('click', toggleThirdPartyNonIABVisibility, false);
}

const ContentSnippet = () => {
  return `
    <div class="as-oil-tabs-cpc__feature-description as-oil-center as-oil-margin-top __inactive-feature-description" id="as-oil-cpc-features">
      Features
    </div>
    <div class="as-oil-cpc__middle __features_middle">
      ${buildFeatureEntreis(getFeatures())}
    </div>
    <div class="as-oil-tabs-cpc__purpose-description as-oil-center as-oil-margin-top" id="as-oil-cpc-purposes">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC)}
    </div>
    <div class="as-oil-cpc__middle">
      ${buildPurposeEntries(getPurposes().concat(getCustomPurposes()))}
      <div class="as-oil-margin-top" id="as-oil-third-party-iab-vendors">
        <div class="as-oil-tabs-cpc__third-parties-link" id="as-js-third-parties-link"><span>i</span>${getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY)}</a></div>

        <div id="as-js-third-parties-list" class="as-oil-tabs-cpc__third-parties-list" style="display: none;">
           ${buildVendorEntries()}
        </div>


      </div>
      ${IsCustomVendorsEnables() ? `
        <div class="as-oil-margin-top" id="as-oil-third-party-non-iab-vendors" style="display: none;">
          <div class="as-oil-tabs-cpc__third-parties-link" id="as-js-third-parties-non-iab-link"><span>i</span>${getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY_NON_IAB)}</a></div>
          <div id="as-js-third-parties-non-iab-list" class="as-oil-tabs-cpc__third-parties-list" style="display: none;">
            <div id="as-oil-custom-third-parties-list">
              ${buildCustomVendorEntries()}
            </div>
          </div>
        </div>
       ` : ''}
    </div>
    <hr>
      <div class="as-oil-l-item">
        ${YesButton(`as-oil__btn-optin ${JS_CLASS_BUTTON_OPTIN}`)}
      </div>
  `;
};

const PurposeFeatureTextsSnippet = (featureText) => {
  return `
    <li>
      <span class="checkmark checkmark-off"></span><span>${featureText}</span>
    </li>
  `;
};

const PurposeTabLabelElement = ({id, label}) => {
  return `
    <span data-id="${id}" class="as-js-tab-label ${id === 1 ? 'as-oil-tabs-cpc__purpose-label-active' : 'as-oil-tabs-cpc__purpose-label-inactive'}">${label}</span>
  `;
};

const FeatureTabLabelElement = ({id, label}) => {
  return `
    <span data-feature-id="${id}" class="as-js-tab-label as-js-tab-feature-label ${id === 1 ? 'as-oil-tabs-cpc__feature-label-active' : 'as-oil-tabs-cpc__feature-label-inactive'}">${label}</span>
  `;
};

const PurposeTabContentSnippet = ({id, text, featureTexts, isSelected}) => {
  return `
    <section id="as-js-tab-section-${id}" class="as-oil-margin-top as-js-tab-section">
      <div>
        <p>${text}</p>
        <label class="as-oil-tabs-cpc__switch">
          <input data-id="${id}" id="as-js-purpose-slider-${id}" class="as-js-purpose-slider" type="checkbox" name="oil-cpc-purpose-${id}" value="${isSelected}">
          <span class="as-oil-cpc__slider"></span>
        </label>
      </div>
      <div class="as-oil-tabs-cpc__purpose-feature-texts as-oil-margin-top" id="purpose-feature-texts-${id}">
        ${featureTexts.length > 0 ? buildPurposeFeatureTextsSnippet(featureTexts) : ''}
      </div>
    </section>
  `
};
const buildPurposeFeatureTextsSnippet = (featureTexts) => {
  return `
    <ul>
      ${featureTexts.map(featureText => PurposeFeatureTextsSnippet(featureText)).join('')}
    </ul>
  `;
};

const FeatureTabContentSnippet = ({id, text, isSelected}) => {
  return `
    <section id="as-js-tab-section-feature-${id}" class="as-oil-margin-top as-js-tab-section __feature-tab-section">
      <div>
        <p>${text}</p>
      </div>
    </section>
  `;
};

const buildPurposeTabLabelElements = (purposes) => {
  return purposes.map(purpose => PurposeTabLabelElement({
    id: purpose.id,
    label: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_text`, purpose.name || `Error: Missing text for purpose with id ${purpose.id}!`)
  })).join('');
};

const buildFeaturesTabLabelElements = (features) => {
  return features.map(feature => FeatureTabLabelElement({
    id: feature.id,
    label: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(feature.id)}_text`, feature.name || `Error: Missing text for feature with id ${feature.id}!`)
  })).join('');
};

const buildPurposeTabContentElements = (purposes) => {
  return purposes.map(purpose => PurposeTabContentSnippet({
    id: purpose.id,
    text: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_desc`, purpose.description || ''),
    featureTexts: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_features`, []),
    isSelected: false
  })).join('');
};

const buildFeaturesTabContentElements = (features) => {
  return features.map(feature => FeatureTabContentSnippet({
    id: feature.id,
    text: getLabelWithDefault(`label_cpc_feature_${formatPurposeId(feature.id)}_desc`, feature.description || ''),
    isSelected: false
  })).join('');
}

const formatPurposeId = (id) => {
  return id < 10 ? `0${id}` : id;
};

const buildPurposeEntries = (purposes) => {
  return `
    <div class="as-oil-tabs-cpc__purpose-labels as-oil-margin-top">
      ${buildPurposeTabLabelElements(purposes)}
      ${IsCustomVendorsEnables() ? `
        <span></span>
        <span data-id="${purposes[purposes.length - 1].id + 1}" data-non-iab="true" class="as-js-tab-label as-oil-tabs-cpc__purpose-label-inactive">${getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY_NON_IAB_TAB_TEXT)}</span>
       ` : ''}
    </div>
    <div class="as-oil-tabs-cpc__purpose-text as-oil-margin-top">
      ${buildPurposeTabContentElements(purposes)}
      ${IsCustomVendorsEnables() ? `
        <section id="as-js-tab-section-${purposes[purposes.length - 1].id + 1}" class="as-oil-margin-top as-js-tab-section">
          <div>
            <p></p>
            <label class="as-oil-tabs-cpc__switch">
              <input data-id="${purposes[purposes.length - 1].id + 1}" id="as-js-purpose-slider-${purposes[purposes.length - 1].id + 1}" class="as-js-purpose-slider" type="checkbox" name="oil-cpc-purpose-$${purposes[purposes.length - 1].id + 1}" value="false">
              <span class="as-oil-cpc__slider"></span>
            </label>
          </div>
          <div class="as-oil-tabs-cpc__purpose-feature-texts as-oil-margin-top" id="purpose-feature-texts-${purposes[purposes.length - 1].id + 1}"></div>
        </section>
       ` : ''}
    </div>
  `;
};

const buildVendorEntries = () => {
  let vendorList = getVendorList();

  if (vendorList && !vendorList.isDefault) {
    let listWrapped = getVendorsToDisplay().map((element) => {
      if (element.name) {
        return buildVendorEntry(element, vendorList);
      }
    });
    return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
  } else {
    return 'Missing vendor list! Maybe vendor list retrieval has failed! Please contact web administrator!';
  }
};

const buildFeatureEntreis = (features) => {
  return `
  <div class="as-oil-tabs-cpc__feature-labels as-oil-margin-top">
    ${buildFeaturesTabLabelElements(features)}
  </div>
  <div class="as-oil-tabs-cpc__feature-text as-oil-margin-top">
    ${buildFeaturesTabContentElements(features)}
  </div>
  `;
}

const buildCustomVendorEntries = () => {
  let vendorList = getCustomVendorList();

  if (vendorList && !vendorList.isDefault && vendorList.vendors) {
    let listWrapped = vendorList.vendors.map((element) => {
      if (element.name) {
        return buildVendorEntry(element, vendorList);
      }
    });
    return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
  } else {
    return 'Missing custom vendor list! Maybe custom vendor list retrieval has failed! Please contact web administrator!';
  }
};

const IsCustomVendorsEnables = () => {
  return !!getCustomVendorListUrl();
};

function handlePurposesSwitch(event) {
  let purposeId = event.previousSibling.previousSibling.getAttribute('data-id');
  let checkedState = !event.previousSibling.previousSibling.checked;

  forEach(document.querySelectorAll(`.as-js-ven-cons-slider + .as-oil-cpc__slider[data-ven-purpose-ids*="${purposeId}"]`), (vendorConsentSwitch) => {
    let vendorConsentSwitchInput = vendorConsentSwitch.previousSibling.previousSibling;

    if (vendorConsentSwitchInput.checked !== checkedState) {
      vendorConsentSwitchInput.checked = checkedState;
      vendorConsentSwitchInput.nextSibling.nextSibling.setAttribute('data-checked', checkedState);
      let purposeIdsArray = vendorConsentSwitchInput.nextSibling.nextSibling.getAttribute('data-ven-purpose-ids').split(',');

      if (purposeIdsArray.length === 1 && purposeIdsArray[0] === '') {
        return false;
      }

      forEach(purposeIdsArray, (purpId) => {
        let vendorSwitchesWithPurposeId = document.querySelectorAll(`.as-js-ven-cons-slider + .as-oil-cpc__slider[data-ven-purpose-ids*="${purpId}"]:not([data-ven-id="${event.getAttribute('data-ven-id')}"]):not([data-checked="true"])`);

        if (vendorSwitchesWithPurposeId.length <= 0) {
          let purposeSwitch = document.querySelector(`#as-js-purpose-slider-${purpId}`);

          if (purposeSwitch.checked === false && purposeSwitch !== event.previousSibling.previousSibling) {
            purposeSwitch.checked = true;
          }
        } else {
          let purposeSwitch = document.querySelector(`#as-js-purpose-slider-${purpId}`);

          if (purposeSwitch.checked === true && purposeSwitch !== event.previousSibling.previousSibling) {
            purposeSwitch.checked = false;
          }
        }
      });
    }
  });
}

function handleVendorConsentSwitch(event) {
  let purposeIds = event.getAttribute('data-ven-purpose-ids');
  let checkedState = event.previousSibling.previousSibling.checked;
  let purposeIdsArray = purposeIds.split(',');
  event.setAttribute('data-checked', !checkedState);

  if (purposeIdsArray.length === 1 && purposeIdsArray[0] === '') {
    return false;
  }

  if (checkedState === true) {
    forEach(purposeIdsArray, (purposeId) => {
      let purposeSwitch = document.querySelector(`#as-js-purpose-slider-${purposeId}`);

      if (purposeSwitch.checked === true) {
        purposeSwitch.checked = false;
      }
    });
  } else if (checkedState === false) {
    forEach(purposeIdsArray, (purposeId) => {
      let vendorSwitchesWithPurposeId = document.querySelectorAll(`.as-js-ven-cons-slider + .as-oil-cpc__slider[data-ven-purpose-ids*="${purposeId}"]:not([data-ven-id="${event.getAttribute('data-ven-id')}"]):not([data-checked="true"])`);

      if (vendorSwitchesWithPurposeId.length <= 0) {
        let purposeSwitch = document.querySelector(`#as-js-purpose-slider-${purposeId}`);

        if (purposeSwitch.checked === false) {
          purposeSwitch.checked = true;
        }
      }
    });
  }
}

const buildVendorEntry = (vendor, vendorList, vendorConsents) => {
  let featuresString = '';
  let purposesString = '';
  let legIntPurposesString = '';

  if (vendor.featureIds.length > 0) {
    featuresString = '<div class="as-oil-third-party-link">Features: ';

    forEach(vendor.featureIds, (featureId) => {
      let vendorListFeatures = typeof vendorList.features === 'undefined' ? getVendorList().features : vendorList.features;
      let feature = vendorListFeatures.filter(featureObject => featureObject.id === featureId)[0];

      featuresString += typeof feature === 'undefined' ? featureId + ', ' : feature.name + ', ';
    });

    featuresString = featuresString.slice(0, -2);
    featuresString += '</div>';
  }

  if (vendor.purposeIds.length > 0) {
    purposesString = `<div class="as-oil-third-party-link">${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC)}: `;

    forEach(vendor.purposeIds, (purposeId) => {
      let vendorListPurposes = typeof vendorList.purposes === 'undefined' ? getVendorList().purposes : vendorList.purposes;
      let purpose = vendorListPurposes.filter(purposeObject => purposeObject.id === purposeId)[0];

      purposesString += typeof purpose === 'undefined' ? purposeId + ', ' : purpose.name + ', ';
    });

    purposesString = purposesString.slice(0, -2);
    purposesString += '</div>';
  }

  if (vendor.legIntPurposeIds.length > 0) {
    legIntPurposesString = `<div class="as-oil-third-party-link">${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_LEG_DESC)}: `;

    forEach(vendor.legIntPurposeIds, (legIntPurposeId) => {
      let vendorListPurposes = typeof vendorList.purposes === 'undefined' ? getVendorList().purposes : vendorList.purposes;
      let legIntPurpose = vendorListPurposes.filter(purposeObject => purposeObject.id === legIntPurposeId)[0];

      legIntPurposesString += typeof legIntPurpose === 'undefined' ? legIntPurposeId + ', ' : legIntPurpose.name + ', ';
    });

    legIntPurposesString = legIntPurposesString.slice(0, -2);
    legIntPurposesString += '</div>';
  }

  let cpcSwitch = `<label class="as-oil-tabs-cpc__switch">
                    <input data-id="${vendor.id}" id="as-js-ven-cons-slider-${vendor.id}" class="as-js-ven-cons-slider" type="checkbox" name="oil-cpc-ven-cons-${vendor.id}" value="false">
                    <span class="as-oil-cpc__slider" data-ven-id="${vendor.id}" data-ven-purpose-ids="${vendor.purposeIds}"></span>
                  </label>`;

  return `
          <div class="as-oil-third-party-list-element">
            <span onclick='${OIL_GLOBAL_OBJECT_NAME}._toggleViewElements(this)'>
                <svg class='as-oil-icon-plus' width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.675 4.328H10v1.344H5.675V10h-1.35V5.672H0V4.328h4.325V0h1.35z" fill="#0068FF" fill-rule="evenodd" fill-opacity=".88"/>
                </svg>
                <svg class='as-oil-icon-minus' style='display: none;' width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h10v1.5H0z" fill="#3B7BE2" fill-rule="evenodd" opacity=".88"/>
                </svg>
                <span class='as-oil-third-party-name'>${vendor.name}</span>
            </span>
            <div class='as-oil-third-party-toggle-part' style='display: none;'>
              <a class='as-oil-third-party-link' href='${vendor.policyUrl}'>${vendor.policyUrl}</a>
              ${featuresString}
              ${purposesString}
              ${legIntPurposesString}
              ${cpcSwitch}
            </div>
          </div>
        `;
};


function toggleThirdPartyVisibility() {
  let view = document.getElementById('as-js-third-parties-list');
  view.style.display = view.style.display === 'none' ? 'block' : 'none';
}

function toggleThirdPartyNonIABVisibility() {
  let view = document.getElementById('as-js-third-parties-non-iab-list');
  view.style.display = view.style.display === 'none' ? 'block' : 'none';
}

function toggleFeatureTextsMarks(checkbox) {
  let id = checkbox.getAttribute('data-id');
  let listElement = document.getElementById(`purpose-feature-texts-${id}`);
  let checkmarkElements = listElement.getElementsByClassName('checkmark');

  if (checkbox.checked) {
    for (let i = 0; i < checkmarkElements.length; i++) {
      checkmarkElements[i].classList.remove('checkmark-off');
      checkmarkElements[i].classList.add('checkmark-on');
    }
  } else {
    for (let i = 0; i < checkmarkElements.length; i++) {
      checkmarkElements[i].classList.remove('checkmark-on');
      checkmarkElements[i].classList.add('checkmark-off');
    }
  }
}

function toggleFeatureDescriptions() {
  let featureDescription = document.getElementById('as-oil-cpc-features');

  if (featureDescription.classList.contains('__inactive-feature-description')) {
    featureDescription.classList.remove('__inactive-feature-description');
    featureDescription.classList.add('__active-feature-description');
  } else {
    featureDescription.classList.remove('__active-feature-description');
    featureDescription.classList.add('__inactive-feature-description');
  }
}

function toggleTab(tab) {
  let purposeOrFeature = tab.getAttribute('data-feature-id') === null ? 'purpose' : 'feature';

  let tabLabelElements = purposeOrFeature === 'feature' ? document.getElementsByClassName('as-js-tab-feature-label') : document.querySelectorAll('.as-js-tab-label:not(.as-js-tab-feature-label)');
  for (let i = 0; i < tabLabelElements.length; i++) {
    tabLabelElements[i].classList.remove(`as-oil-tabs-cpc__${purposeOrFeature}-label-active`);
    tabLabelElements[i].classList.add(`as-oil-tabs-cpc__${purposeOrFeature}-label-inactive`);
  }
  tab.classList.remove(`as-oil-tabs-cpc__${purposeOrFeature}-label-inactive`);
  tab.classList.add(`as-oil-tabs-cpc__${purposeOrFeature}-label-active`);

  let tabSectionElements = purposeOrFeature === 'feature' ? document.querySelectorAll('.__feature-tab-section') : document.querySelectorAll('.as-js-tab-section:not(.__feature-tab-section)');
  for (let i = 0; i < tabSectionElements.length; i++) {
    tabSectionElements[i].style.display = 'none';
  }

  let id = purposeOrFeature === 'feature' ? tab.getAttribute('data-feature-id') : tab.getAttribute('data-id');
  let sectionElement = purposeOrFeature === 'feature' ? document.getElementById(`as-js-tab-section-feature-${id}`) : document.getElementById(`as-js-tab-section-${id}`);
  sectionElement.style.display = 'block';
}

function togglePurposeTab(tab) {
  let nonIABVendors = tab.getAttribute('data-non-iab') === null ? false : true;

  if (nonIABVendors === true && tab.getAttribute('data-feature-id') === null) {
    document.getElementById('as-oil-third-party-iab-vendors').style.display = 'none';
    document.getElementById('as-oil-third-party-non-iab-vendors').style.display = 'block';
  } else {
    document.getElementById('as-oil-third-party-iab-vendors').style.display = 'block';
    document.getElementById('as-oil-third-party-non-iab-vendors').style.display = 'none';
  }
}
