import { JS_CLASS_BUTTON_OPTIN } from '../../core/core_constants.js';
import { getLabel, isAdvancedSettings } from '../userview_config.js';
import { OIL_LABELS } from '../userview_constants.js';
import { CookiePreferencesButton } from './components/oil.buttons.js';

export function oilCookiePreferencesLayerTemplate() {
  return `
  <div class="as-oil-content-overlay as-oil-layer-cookie-pref" data-qa="oil-full">
      <div class="as-oil-l-wrapper-layout-max-width">
          <div class="as-oil-l-row as-oil-l-buttons">
              <div class="as-oil-l-item as-oil-l-item--stretch">
                  ${CookiePreferencesButton(isAdvancedSettings())}
              </div>
          </div>
      </div>
  </div>
  `;
}
