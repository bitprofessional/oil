import { JS_CLASS_BUTTON_OPTIN } from '../../core/core_constants.js';
import { getLabel, isAdvancedSettings } from '../userview_config.js';
import { OIL_LABELS } from '../userview_constants.js';
import { AdvancedSettingsButton, YesButton } from './components/oil.buttons.js';

export function oilDefaultPurposesOverviewTemplate(purposes) {
  let purposesOverview = '';

  purposes.forEach((purpose) => {
    purposesOverview += `
      <span class="as-oil-default-purpose">
        <span>${purpose.name}</span>
        <span class="as-oil-default-purpose-description">${purpose.description}</span>
        <span class="as-oil-default-purpose-icon">i</span>
      </span>
    `;
  });

  return `
    <div class="as-oil-content-overlay" data-qa="oil-full">
      <div class="as-oil-l-wrapper-layout-max-width">
        <div class="as-oil__heading">
          ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)}
        </div>
        <p class="as-oil__intro-txt">
          ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO)}
          <svg id="Ebene_1" data-name="Ebene 1" height="20" width="20" style="margin-bottom: -.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.25 100.25"><defs><style>.cls-1{fill:#ccc;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;}</style></defs><title>Cookie</title><path class="cls-1" d="M100,50A50,50,0,1,1,50,0c6.46,0,10.5,1.89,15,6,1.69,1.54-14,18-12,18,5,0,21.37-10.75,24-9,3,2-24.67,15.92-9,12,4-1,15-6,13-3-3.55,5.33-22,15-11,14,2.55-.23,16.47-7.42,15-3-.6,1.8-2,2.36-4.17,4.58-.52.53-2.26,2.33-2,2.71.61.86,9.57-2.81,15.16-5.29C97.8,35.31,100,47.66,100,50Z" transform="translate(0.13 0.13)"/><path d="M35,13c-3.17,1.35-5.18,4.19-5,7,.22,3.34,3.46,5.15,5,6,.59.33,5,2.69,7,1,1.66-1.37.55-4.38,2-5s3.25,1.63,4,1c.17-.14.26-.42,0-2a12.68,12.68,0,0,0-1-4,7.84,7.84,0,0,0-3-3,8.88,8.88,0,0,0-6-1" transform="translate(0.13 0.13)"/><path d="M15,46c-.13.81-.4,1.87-1,2s-1.24-1.13-2-1-1.6,2-1,3c.42.72,1.35.82,3,1a14.25,14.25,0,0,0,3,0c3-.33,5.22-.56,6-2,.13-.23.24-.54,0-3-.3-3.06-.45-4.6-1-5-1.21-.9-4.08.41-7,3" transform="translate(0.13 0.13)"/><path d="M48,52c4.25,1.71,7.24,4,7,6-.09.71-.72,1.47-2,3a23.28,23.28,0,0,1-3,3c-2.53,2.08-3.24,1.74-4,3a4.87,4.87,0,0,0,0,5c1,1.43,2.72,1.67,5,2,2,.28,2.48,0,6,0,5.58,0,6.5.54,7,1,1.18,1.09.71,2.07,2,3a4.23,4.23,0,0,0,5,0c1.28-1.15,1.09-3.1,1-4a7.25,7.25,0,0,0-1-3,38.58,38.58,0,0,0-7-8c-5.68-5.28-6.53-6.2-7-8s-.1-2.8-1-4c-1.46-2-4.54-2.16-7-2" transform="translate(0.13 0.13)"/><path d="M23,66a6.12,6.12,0,0,1,0,4c-1.06,2.71-4.16,3.38-4,5,.06.58.49.83,2,2,4.22,3.25,3.66,3.4,5,4,.51.23,4.3,1.92,7,0a4.36,4.36,0,0,0,2-3c.21-3.29-5.52-4.36-8-10a12.6,12.6,0,0,1-1-4" transform="translate(0.13 0.13)"/><path d="M79,42c0-2,6-5,2-4-2.07.52-6.36,2.53-7,4-.72,1.64-.38,4.09,1,5s2.88-.77,7-1c3.43-.19,4.54.9,6,0,1-.61,1-3.08,1-7" transform="translate(0.13 0.13)"/></svg>
          <span id="as-oil-default-purposes-overview">
            ${purposesOverview}
          </span>
        </p>
        <div class="as-oil-l-row as-oil-l-buttons">
          <div class="as-oil-l-item">
            ${YesButton(`as-oil__btn-optin ${JS_CLASS_BUTTON_OPTIN}`)}
          </div>
          <div class="as-oil-l-item as-oil-l-item-stretch">
            ${AdvancedSettingsButton(isAdvancedSettings())}
          </div>
        </div>
      </div>
    </div>
  `;
}
