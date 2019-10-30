import { OIL_LABELS } from '../../userview_constants';
import { getLabel } from '../../userview_config';
import { DATA_CONTEXT_YES,
DATA_CONTEXT_CANCEL,
DATA_CONTEXT_PROCEED,
DATA_CONTEXT_BACK,
DATA_CONTEXT_ADVANCED_SETTINGS,
JS_CLASS_BUTTON_OILBACK,
JS_CLASS_BUTTON_OILBACK_HIDE_CPC,
JS_CLASS_BUTTON_PROCEED,
JS_CLASS_BUTTON_CANCEL,
JS_CLASS_BUTTON_ADVANCED_SETTINGS,
JS_CLASS_BUTTON_ADVANCED_SETTINGS_WITH_HIDE_CPC } from '../../../core/core_constants.js';

export const YesButton = (classes) => {
  return `
    <button class="${classes}" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
      ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES)}
    </button>
  `
}

export const ProceedButton = () => {
  return `
    <button class="as-oil__btn-proceed as-oil__btn-blue ${JS_CLASS_BUTTON_PROCEED}" data-context="${DATA_CONTEXT_PROCEED}" data-qa="oil-proceed-button">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_PROCEED)}
    </button>
  `
}

export const CancelButton = () => {
  return `
    <button class="as-oil__btn-cancel as-oil__btn-grey ${JS_CLASS_BUTTON_CANCEL}" data-context="${DATA_CONTEXT_CANCEL}" data-qa="oil-cancel-button">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL)}
    </button>
  `
}

export const BackButton = () => {
  return `
    <button class="as-oil-back-button ${JS_CLASS_BUTTON_OILBACK}" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
      <span class="as-oil-back-button__text">
        ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
      </span>
      <svg class="as-oil-back-button__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <circle fill="#757575" cx="11" cy="11" r="11"/>
          <path d="M15.592 14.217a.334.334 0 0 1 .098.245c0 .098-.033.18-.098.246l-.928.908a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098L11 12.4l-3.2 3.216a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098l-.928-.908a.334.334 0 0 1-.098-.246c0-.098.033-.18.098-.245L9.632 11 6.408 7.808c-.163-.164-.163-.327 0-.491l.904-.933a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098L11 9.576l3.2-3.192a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098l.904.933c.163.164.163.32 0 .466l-3.224 3.192 3.224 3.242z"
                fill="#FFF" opacity=".88"/>
        </g>
      </svg>
    </button>
  `
};

export const BackButtonHideCPC = () => {
  return `
    <button class="as-oil-back-button ${JS_CLASS_BUTTON_OILBACK_HIDE_CPC}" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
      <span class="as-oil-back-button__text">
        ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
      </span>
      <svg class="as-oil-back-button__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <circle fill="#757575" cx="11" cy="11" r="11"/>
          <path d="M15.592 14.217a.334.334 0 0 1 .098.245c0 .098-.033.18-.098.246l-.928.908a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098L11 12.4l-3.2 3.216a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098l-.928-.908a.334.334 0 0 1-.098-.246c0-.098.033-.18.098-.245L9.632 11 6.408 7.808c-.163-.164-.163-.327 0-.491l.904-.933a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098L11 9.576l3.2-3.192a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098l.904.933c.163.164.163.32 0 .466l-3.224 3.192 3.224 3.242z"
                fill="#FFF" opacity=".88"/>
        </g>
      </svg>
    </button>
  `
};


/**
 * OIL advanced settings button
 */
export const AdvancedSettingsButton = (advancedSettings) => {
  return advancedSettings === true ? (
    `
        <button class="as-oil__btn-cpc ${JS_CLASS_BUTTON_ADVANCED_SETTINGS}" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
            ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS)}
        </button>
      `
  ) : '';
};

export const CookiePreferencesButton = (advancedSettings) => {
  return advancedSettings === true ? (
    `
        <button class="as-oil__btn-cpc ${JS_CLASS_BUTTON_ADVANCED_SETTINGS_WITH_HIDE_CPC}" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
            <span>${getLabel(OIL_LABELS.ATTR_LABEL_BUTTOM_COOKIE_PREFERENCES)}</span>
            <span><svg id="Ebene_1" data-name="Ebene 1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.25 100.25"><defs><style>.cls-1{fill:#ccc;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;}</style></defs><title>Cookie</title><path class="cls-1" d="M100,50A50,50,0,1,1,50,0c6.46,0,10.5,1.89,15,6,1.69,1.54-14,18-12,18,5,0,21.37-10.75,24-9,3,2-24.67,15.92-9,12,4-1,15-6,13-3-3.55,5.33-22,15-11,14,2.55-.23,16.47-7.42,15-3-.6,1.8-2,2.36-4.17,4.58-.52.53-2.26,2.33-2,2.71.61.86,9.57-2.81,15.16-5.29C97.8,35.31,100,47.66,100,50Z" transform="translate(0.13 0.13)"/><path d="M35,13c-3.17,1.35-5.18,4.19-5,7,.22,3.34,3.46,5.15,5,6,.59.33,5,2.69,7,1,1.66-1.37.55-4.38,2-5s3.25,1.63,4,1c.17-.14.26-.42,0-2a12.68,12.68,0,0,0-1-4,7.84,7.84,0,0,0-3-3,8.88,8.88,0,0,0-6-1" transform="translate(0.13 0.13)"/><path d="M15,46c-.13.81-.4,1.87-1,2s-1.24-1.13-2-1-1.6,2-1,3c.42.72,1.35.82,3,1a14.25,14.25,0,0,0,3,0c3-.33,5.22-.56,6-2,.13-.23.24-.54,0-3-.3-3.06-.45-4.6-1-5-1.21-.9-4.08.41-7,3" transform="translate(0.13 0.13)"/><path d="M48,52c4.25,1.71,7.24,4,7,6-.09.71-.72,1.47-2,3a23.28,23.28,0,0,1-3,3c-2.53,2.08-3.24,1.74-4,3a4.87,4.87,0,0,0,0,5c1,1.43,2.72,1.67,5,2,2,.28,2.48,0,6,0,5.58,0,6.5.54,7,1,1.18,1.09.71,2.07,2,3a4.23,4.23,0,0,0,5,0c1.28-1.15,1.09-3.1,1-4a7.25,7.25,0,0,0-1-3,38.58,38.58,0,0,0-7-8c-5.68-5.28-6.53-6.2-7-8s-.1-2.8-1-4c-1.46-2-4.54-2.16-7-2" transform="translate(0.13 0.13)"/><path d="M23,66a6.12,6.12,0,0,1,0,4c-1.06,2.71-4.16,3.38-4,5,.06.58.49.83,2,2,4.22,3.25,3.66,3.4,5,4,.51.23,4.3,1.92,7,0a4.36,4.36,0,0,0,2-3c.21-3.29-5.52-4.36-8-10a12.6,12.6,0,0,1-1-4" transform="translate(0.13 0.13)"/><path d="M79,42c0-2,6-5,2-4-2.07.52-6.36,2.53-7,4-.72,1.64-.38,4.09,1,5s2.88-.77,7-1c3.43-.19,4.54.9,6,0,1-.61,1-3.08,1-7" transform="translate(0.13 0.13)"/></svg></span>
        </button>
      `
  ) : '';
};
