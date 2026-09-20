import { Locator, Screen } from 'mobilewright';
import { expect } from '@mobilewright/test';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import BasePage from './base.page';

/**
 * Page object covering the Home screen's "Tracked Conveyors" card, the Conveyor
 * list screen, and the Add Conveyor form.
 *
 * Locator labels are sourced from the Flutter app source:
 * - home_screen.dart            -> conveyorCard, Conveyors-count (HomeCard '$title-count')
 * - conveyor_list_screen.dart    -> listCountConveyor (LastUpdatedTimeAndTotalCountWidget)
 * - app.dart                     -> conveyorFloatingActionButton / homeFloatingActionButton + addConveyor (speed-dial child)
 * - conveyor_details_screen.dart -> conveyorDetailsAppbarTitle, bottomActionButton(Tab)
 * - conveyor_step/details_step.dart -> conveyorNameTextField(Tab), customerSiteDropdown
 * - autocomplete_base.dart       -> dropdownSearchField, option rows (plain ListTile text, no semantic label)
 */
export class ConveyorPage extends BasePage {
  constructor(screen: Screen, subStepLogger?: HTMLSubStepLogger) {
    super(screen, subStepLogger);
  }

  // ---- Home screen ----
  get conveyorCard(): Locator {
    return this.screen.getByLabel('conveyorCard');
  }

  // Android merges the SemanticsLabel value ("5019") and label ("Conveyors-count") into a
  // single accessibility node label formatted as "<value>, Conveyors-count", so an exact
  // match on 'Conveyors-count' never matches. Use a partial match instead.
  get conveyorCountOnHome(): Locator {
    return this.screen.getByLabel('Conveyors-count', { exact: false });
  }

  get homeTab(): Locator {
    return this.screen.getByLabel('homeTab');
  }

  // ---- Conveyor list screen ----
  // The list screen's count widget renders the label ("listCountConveyor") on a wrapper node
  // and the actual "<N> Results Found" text on a separate child node, so we target the text
  // directly instead of reading the wrapper's own (label-only) text.
  get conveyorListCount(): Locator {
    return this.screen.getByText(/Results Found/, { exact: false });
  }

  get addConveyorFabCandidates(): Locator[] {
    return [this.screen.getByLabel('conveyorFloatingActionButton'), this.screen.getByLabel('homeFloatingActionButton')];
  }

  get addConveyorSpeedDialOption(): Locator {
    return this.screen.getByLabel('addConveyor');
  }

  // ---- Add Conveyor screen ----
  get addConveyorScreenTitle(): Locator {
    return this.screen.getByLabel('conveyorDetailsAppbarTitle');
  }

  get conveyorNameFieldCandidates(): Locator[] {
    return [this.screen.getByLabel('conveyorNameTextField'), this.screen.getByLabel('conveyorNameTextFieldTab')];
  }

  get customerSiteDropdown(): Locator {
    return this.screen.getByLabel('customerSiteDropdown');
  }

  get customerSiteSearchField(): Locator {
    return this.screen.getByLabel('dropdownSearchField');
  }

  get createButtonCandidates(): Locator[] {
    return [this.screen.getByLabel('bottomActionButton'), this.screen.getByLabel('bottomActionButtonTab')];
  }

  // ---- Actions ----

  async captureConveyorCountFromHome(): Promise<number> {
    await expect(this.conveyorCountOnHome).toBeVisible({ timeout: 30_000 });
    const count = this.parseCount(await this.conveyorCountOnHome.getText());
    await this.logSuccess(`Conveyor count on Home screen: ${count}`);
    return count;
  }

  async openConveyorListFromHome(): Promise<void> {
    await this.tap(this.conveyorCard, 15_000);
    await this.logSuccess('Conveyor card tapped from Home screen');
  }

  async verifyConveyorListScreenDisplayed(): Promise<void> {
    await expect(this.conveyorListCount).toBeVisible({ timeout: 30_000 });
    await this.logSuccess('Conveyor list/details screen is displayed');
  }

  async captureConveyorListCount(): Promise<number> {
    await expect(this.conveyorListCount).toBeVisible({ timeout: 30_000 });
    return this.parseCount(await this.conveyorListCount.getText());
  }

  async verifyConveyorListCountMatches(expectedCount: number): Promise<void> {
    const count = await this.captureConveyorListCount();
    if (count !== expectedCount) {
      throw new Error(
        `Conveyor count mismatch: Home screen showed ${expectedCount}, conveyor list screen shows ${count}`,
      );
    }
    await this.logSuccess(`Conveyor list count (${count}) matches Home screen count`);
  }

  async openAddConveyorForm(): Promise<void> {
    const fab = await this.findFirstVisible(this.addConveyorFabCandidates, 15_000);
    if (!fab) {
      throw new Error('Add Conveyor button (FAB) was not found on the conveyor list screen');
    }
    await this.tap(fab, 10_000);

    // The Home screen uses a speed-dial FAB; tap the "addConveyor" child option if it appears.
    const speedDialOption = await this.findFirstVisible([this.addConveyorSpeedDialOption], 3_000);
    if (speedDialOption) {
      await this.tap(speedDialOption, 10_000);
    }

    await this.logSuccess('Add Conveyor button tapped');
  }

  async verifyAddConveyorScreenDisplayed(): Promise<void> {
    await expect(this.addConveyorScreenTitle).toBeVisible({ timeout: 30_000 });

    const nameField = await this.findFirstVisible(this.conveyorNameFieldCandidates, 15_000);
    if (!nameField) {
      throw new Error('Conveyor name field did not become visible on the Add Conveyor screen');
    }

    await this.logSuccess('Add Conveyor screen is displayed');
  }

  async enterConveyorName(name: string): Promise<void> {
    const nameField = await this.findFirstVisible(this.conveyorNameFieldCandidates, 10_000);
    if (!nameField) {
      throw new Error('Conveyor name field not visible on the Add Conveyor screen');
    }

    await this.tap(nameField, 10_000);
    await nameField.fill(name, { timeout: 10_000 });
    await this.logSuccess(`Conveyor name entered: ${name}`);
  }

  async selectCustomerSite(siteName: string): Promise<void> {
    await this.tap(this.customerSiteDropdown, 10_000);

    // The search field only renders when there are enough options to warrant scrolling.
    const searchField = await this.findFirstVisible([this.customerSiteSearchField], 3_000);
    if (searchField) {
      await searchField.fill(siteName, { timeout: 10_000 });
    }

    // Option rows are rendered as plain android.widget.Button nodes with no semantic label.
    // Matching by getByText alone would also match the search field itself (its typed value
    // equals siteName too), so we scope the match to Button-type nodes only.
    const option = this.screen.getByType('android.widget.Button').filter({ hasText: siteName });
    await this.tap(option, 15_000);
    await this.logSuccess(`Customer site selected: ${siteName}`);
  }

  async clickCreateButton(): Promise<void> {
    const createButton = await this.findFirstVisible(this.createButtonCandidates, 10_000);
    if (!createButton) {
      throw new Error('Create button was not visible on the Add Conveyor screen');
    }

    await this.tap(createButton, 10_000);
    await this.logSuccess('Create button tapped');
  }

  /**
   * After saving, the app returns to the Conveyor list screen (typical) or — depending on
   * navigation depth — may pop all the way back to the Home screen. This re-enters the
   * Conveyor list from Home if needed, so subsequent assertions always run on the list screen.
   */
  async ensureOnConveyorListScreenAfterCreate(): Promise<void> {
    const onListOrHome = await this.findFirstVisible([this.conveyorListCount, this.conveyorCard], 30_000);

    if (!onListOrHome) {
      throw new Error('Neither the Conveyor list screen nor the Home screen became visible after saving');
    }

    const isOnHome = await this.conveyorCard.waitFor({ state: 'visible', timeout: 1000 }).then(
      () => true,
      () => false,
    );

    if (isOnHome) {
      await this.logWarning('App returned to the Home screen after saving; re-opening the Conveyor list');
      await this.openConveyorListFromHome();
      await this.verifyConveyorListScreenDisplayed();
    }
  }

  async verifyConveyorCreated(conveyorName: string): Promise<void> {
    const created = await this.findFirstVisible([this.screen.getByText(conveyorName, { exact: false })], 30_000);

    if (!created) {
      throw new Error(`Could not confirm conveyor "${conveyorName}" was created`);
    }

    await this.logSuccess(`Conveyor "${conveyorName}" is displayed in the list`);
  }

  async verifyConveyorListCountIncreasedBy(previousCount: number, expectedIncrease: number): Promise<void> {
    const count = await this.captureConveyorListCount();
    const expected = previousCount + expectedIncrease;

    if (count !== expected) {
      throw new Error(`Expected conveyor list count to be ${expected} (was ${previousCount}), but found ${count}`);
    }

    await this.logSuccess(`Conveyor list count updated correctly: ${previousCount} -> ${count}`);
  }

  async goToHomeTab(): Promise<void> {
    await this.tap(this.homeTab, 15_000);
    await this.logSuccess('Navigated to Home tab');
  }

  async verifyHomeConveyorCountIncreasedBy(previousCount: number, expectedIncrease: number): Promise<void> {
    const count = await this.captureConveyorCountFromHome();
    const expected = previousCount + expectedIncrease;

    if (count !== expected) {
      throw new Error(`Expected Home screen conveyor count to be ${expected} (was ${previousCount}), but found ${count}`);
    }

    await this.logSuccess(`Home screen conveyor count updated correctly: ${previousCount} -> ${count}`);
  }

  private parseCount(rawText: string): number {
    const match = rawText.match(/\d+/);
    if (!match) {
      throw new Error(`Could not parse a numeric count from "${rawText}"`);
    }
    return Number(match[0]);
  }
}
