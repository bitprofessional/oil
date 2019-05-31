import { forEach, hasRunningTimeout, oilWrapper, renderOil } from '../../../src/scripts/userview/userview_modal';
import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { resetOil } from '../../test-utils/utils_reset';
import * as AdvancedSettingsStandard from '../../../src/scripts/userview/view/oil.advanced.settings.standard';
import * as AdvancedSettingsTabs from '../../../src/scripts/userview/view/oil.advanced.settings.tabs';
import * as CoreLog from '../../../src/scripts/core/core_log';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import {EVENT_NAME_OIL_SHOWN} from '../../../src/scripts/core/core_constants';

describe('the user view modal aka the oil layer wrapper', () => {

  beforeEach(() => resetOil());

  describe('forEach replacement', () => {
    it('should have an functioning forEach replacement', () => {
      let array = [2, 1, 0];
      let result = [];
      forEach(array, function (value) {
        result.push(value)
      });
      expect(result.length).toBe(3);
      expect(result[0]).toBe(2);
      expect(result[1]).toBe(1);
      expect(result[2]).toBe(0);
    });
  });

  describe('oil wrapper', () => {
    it('should have the correct attributes', () => {
      expect(oilWrapper().outerHTML).toBe('<div class="as-oil light" data-qa="oil-Layer"></div>');
    });

    it('should have the given theme', () => {
      loadFixture('config/given.config.with.theme.html');
      expect(oilWrapper().outerHTML).toBe('<div class="as-oil dark" data-qa="oil-Layer"></div>');
    });
  });

  describe('render oil', () => {
    it('should NOT render oil with OPT-IN YES', () => {
      renderOil({optIn: true});

      expect(document.querySelector('.as-oil')).toBeNull();
      expectTimeoutNotStarted();
    });

    it('should NOT render oil with OPT-IN FALSE and OPT-IGNORE: TRUE', () => {
      renderOil({optIn: true, optIgnore: true});

      expect(document.querySelector('.as-oil')).toBeNull();
      expectTimeoutNotStarted();
    });

    it('should render oil with NO OPT-IN as DEFAULT TEMPLATE', () => {
      loadFixture('config/given.config.example.labels.html');
      renderOil({optIn: false});

      expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/soi.html'));
      expectTimeoutStarted();
    });

    it('should NOT renderOil with gdpr_applies FALSE', () => {
      loadFixture('config/given.config.with.gdpr.not.applies.html');

      expect(document.querySelector('.as-oil')).toBeNull();
      expectTimeoutNotStarted();
    });

    it('should render oil with standard CPC if CPC is required and CPC type is not specified', () => {
      loadFixture('config/given.config.with.advanced.settings.no.cpc.type.html');
      setupAdvancedSettingsSpies();
      spyOn(CoreLog, 'logError').and.callThrough();

      renderOil({optIn: false, advancedSettings: true});
      expect(AdvancedSettingsStandard.oilAdvancedSettingsTemplate).toHaveBeenCalled();
      expect(AdvancedSettingsStandard.attachCpcHandlers).toHaveBeenCalled();
      expect(AdvancedSettingsTabs.oilAdvancedSettingsTemplate).not.toHaveBeenCalled();
      expect(AdvancedSettingsTabs.attachCpcHandlers).not.toHaveBeenCalled();
      expect(CoreLog.logError).not.toHaveBeenCalled();
    });

    it('should render oil with standard CPC if CPC is required and standard CPC type is specified', () => {
      loadFixture('config/given.config.with.advanced.settings.standard.cpc.type.html');
      setupAdvancedSettingsSpies();
      spyOn(CoreLog, 'logError').and.callThrough();

      renderOil({optIn: false, advancedSettings: true});
      expect(AdvancedSettingsStandard.oilAdvancedSettingsTemplate).toHaveBeenCalled();
      expect(AdvancedSettingsStandard.attachCpcHandlers).toHaveBeenCalled();
      expect(AdvancedSettingsTabs.oilAdvancedSettingsTemplate).not.toHaveBeenCalled();
      expect(AdvancedSettingsTabs.attachCpcHandlers).not.toHaveBeenCalled();
      expect(CoreLog.logError).not.toHaveBeenCalled();
    });

    it('should render oil with tabs-based CPC if CPC is required and tabs-based CPC type is specified', () => {
      loadFixture('config/given.config.with.advanced.settings.tabs.cpc.type.html');
      setupAdvancedSettingsSpies();
      spyOn(CoreLog, 'logError').and.callThrough();

      renderOil({optIn: false, advancedSettings: true});
      expect(AdvancedSettingsStandard.oilAdvancedSettingsTemplate).not.toHaveBeenCalled();
      expect(AdvancedSettingsStandard.attachCpcHandlers).not.toHaveBeenCalled();
      expect(AdvancedSettingsTabs.oilAdvancedSettingsTemplate).toHaveBeenCalled();
      expect(AdvancedSettingsTabs.attachCpcHandlers).toHaveBeenCalled();
      expect(CoreLog.logError).not.toHaveBeenCalled();
    });

    it('should render oil with standard CPC if CPC is required and invalid CPC type is specified', () => {
      loadFixture('config/given.config.with.advanced.settings.invalid.cpc.type.html');
      setupAdvancedSettingsSpies();
      spyOn(CoreLog, 'logError').and.callThrough();

      renderOil({optIn: false, advancedSettings: true});
      expect(AdvancedSettingsStandard.oilAdvancedSettingsTemplate).toHaveBeenCalled();
      expect(AdvancedSettingsStandard.attachCpcHandlers).toHaveBeenCalled();
      expect(AdvancedSettingsTabs.oilAdvancedSettingsTemplate).not.toHaveBeenCalled();
      expect(AdvancedSettingsTabs.attachCpcHandlers).not.toHaveBeenCalled();
      expect(CoreLog.logError).toHaveBeenCalled();
      expect(CoreLog.logError.calls.mostRecent().args[0]).toMatch(/^Found unknown CPC type 'invalidCpcType'/)
    });

    it('should not execute oil_shown event if gdpr_applies is FALSE', (done) => {
      spyOn(CoreConfig, 'gdprApplies').and.returnValue(false);
      spyOn(CoreUtils, 'sendEventToHostSite').and.callThrough();

      renderOil({optIn: false, advancedSettings: true});
      expect(CoreUtils.sendEventToHostSite).not.toHaveBeenCalledWith(EVENT_NAME_OIL_SHOWN);
      done();
    });
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }

  function expectTimeoutStarted() {
    expect(hasRunningTimeout).toBeDefined();
  }

  function setupAdvancedSettingsSpies() {
    spyOn(AdvancedSettingsStandard, 'oilAdvancedSettingsTemplate').and.callThrough();
    spyOn(AdvancedSettingsStandard, 'attachCpcHandlers').and.callThrough();
    spyOn(AdvancedSettingsTabs, 'oilAdvancedSettingsTemplate').and.callThrough();
    spyOn(AdvancedSettingsTabs, 'attachCpcHandlers').and.callThrough();
  }

});
