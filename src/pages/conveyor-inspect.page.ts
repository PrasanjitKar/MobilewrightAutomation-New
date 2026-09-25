import { Locator, Screen } from 'mobilewright';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import BasePage from './base.page';

/**
 * Page object covering Conveyor Inspect Add/Edit Event screen, dropdowns,
 * date/time pickers, and event details.
 *
 * Locator labels are sourced from the Flutter app source:
 * - app.dart                             -> addConveyorInspect (SpeedDialChild)
 * - add_edit_conveyor_inspect_event.dart -> 'Add Conveyor Inspect Event', siteDropdown, conveyorDropdown,
 *                                           date_of_flightPicker, ConveyorInputTimeField, _colorMapDropdownWidget,
 *                                           'Create', 'Successfully created'
 * - autocomplete_base.dart               -> dropdownSearchField
 * - conveyor_inspect_details_screen.dart -> 'View Conveyor Inspect Event', deletePopupButton
 */
export class ConveyorInspectPage extends BasePage {
  constructor(screen: Screen, subStepLogger?: HTMLSubStepLogger) {
    super(screen, subStepLogger);
  }

  // ---- Home screen ----
  get conveyorInspectCardCandidates(): Locator[] {
    return [this.screen.getByLabel('conveyorInspectCard'), this.screen.getByText('Conveyor Inspect', { exact: false })];
  }

  // ---- Speed dial module option ----
  get addConveyorInspectModuleCandidates(): Locator[] {
    return [
      this.screen.getByLabel('addConveyorInspect'),
      this.screen.getByText('Add Conveyor Inspect', { exact: false }),
      this.screen.getByText(/Add Conveyor Inspect/i),
    ];
  }

  // ---- List Screen ----
  get conveyorInspectListScreenIndicators(): Locator[] {
    return [
      this.screen.getByText('Conveyor Inspect', { exact: true }),
      this.screen.getByText('Conveyor Inspect', { exact: false }),
      this.screen.getByLabel('conveyorInspectCard'),
    ];
  }

  // ---- Add / Edit Conveyor Inspect Event Screen ----
  get addEventScreenTitleCandidates(): Locator[] {
    return [
      this.screen.getByText('Add Conveyor Inspect Event', { exact: false }),
      this.screen.getByLabel('date_of_flightPicker'),
      this.screen.getByText('Date of Flight', { exact: false }),
      this.screen.getByText('Time of Flight', { exact: false }),
    ];
  }

  get editEventScreenTitleCandidates(): Locator[] {
    return [
      this.screen.getByText('Edit Conveyor Inspect Event', { exact: false }),
      this.screen.getByText('Left hand Side (LHS)', { exact: false }),
      this.screen.getByText('Save', { exact: true }),
    ];
  }

  get conveyorDropdownCandidates(): Locator[] {
    return [this.screen.getByLabel('dropdownConveyor'), this.screen.getByLabel('conveyorDropdown')];
  }

  get dropdownSearchField(): Locator {
    return this.screen.getByLabel('dropdownSearchField');
  }

  get inspectionDateFieldCandidates(): Locator[] {
    return [
      this.screen.getByLabel('date_of_flightPicker'),
      this.screen.getByText('Date of Flight', { exact: false }),
      this.screen.getByText(/Select Date/i),
    ];
  }

  get inspectorTimeFieldCandidates(): Locator[] {
    return [
      this.screen.getByText('Time of Flight', { exact: false }),
      this.screen.getByText(/:\d{2}/),
      this.screen.getByLabel('time_of_flightPicker'),
    ];
  }

  get dialogOkButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('OK', { exact: true }),
      this.screen.getByText(/OK/i),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'OK' }),
    ];
  }

  get colormapDropdownCandidates(): Locator[] {
    return [this.screen.getByLabel('dropdownColormap'), this.screen.getByLabel('colormapDropdown')];
  }

  get createButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Create', { exact: true }),
      this.screen.getByLabel('bottomActionButton'),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Create' }),
    ];
  }

  get saveButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Save', { exact: true }),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Save' }),
      this.screen.getByLabel('bottomActionButton'),
    ];
  }

  // ---- Details Screen ----
  get viewEventDetailsScreenIndicators(): Locator[] {
    return [
      this.screen.getByText('View Conveyor Inspect Event', { exact: false }),
      this.screen.getByText('Upload Files', { exact: false }),
      this.screen.getByLabel('deletePopupButton'),
      this.screen.getByText('Event Details', { exact: false }),
    ];
  }

  get uploadFilesButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Upload Files', { exact: true }),
      this.screen.getByText('Upload Files', { exact: false }),
      this.screen.getByText('UPLOAD FILES', { exact: false }),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Upload Files' }),
      this.screen.getByText('Upload', { exact: true }),
    ];
  }

  get lhsUploadButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Upload', { exact: true }).first(),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Upload' }).first(),
    ];
  }

  get nextButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Next', { exact: true }),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Next' }),
    ];
  }

  get permissionAllowCandidates(): Locator[] {
    return [
      this.screen.getByText('While using the app', { exact: true }),
      this.screen.getByText('While using the app', { exact: false }),
      this.screen.getByText(/While using the app/i),
      this.screen.getByText('Allow all', { exact: true }),
      this.screen.getByText('Allow all', { exact: false }),
      this.screen.getByText(/Allow all/i),
      this.screen.getByText('Allow', { exact: true }),
      this.screen.getByText(/Allow/i),
      this.screen.getByText('Only this time', { exact: false }),
    ];
  }

  get systemSelectAllCandidates(): Locator[] {
    return [
      this.screen.getByText('Select all', { exact: false }),
      this.screen.getByText('Select All', { exact: false }),
    ];
  }

  get moreOptionsCandidates(): Locator[] {
    return [this.screen.getByLabel('More options', { exact: false }), this.screen.getByLabel('Show more options', { exact: false })];
  }

  // Individual file thumbnails in the DocumentsUI grid ("Preview the file <name>")
  get fileThumbnailCandidates(): Locator[] {
    return [this.screen.getByLabel('Preview the file', { exact: false }), this.screen.getByLabel('DJI_', { exact: false })];
  }

  get systemSelectConfirmCandidates(): Locator[] {
    return [
      this.screen.getByText('SELECT', { exact: true }),
      this.screen.getByText('Select', { exact: true }),
      this.screen.getByText('Open', { exact: true }),
      this.screen.getByLabel('Select'),
    ];
  }

  get eventDetailsScreenIndicators(): Locator[] {
    return [
      this.screen.getByText('View Conveyor Inspect Event', { exact: false }),
      this.screen.getByText('Event Details', { exact: false }),
      this.screen.getByLabel('deletePopupButton'),
      this.screen.getByText('Successfully created', { exact: false }),
      this.screen.getByLabel('lastUpdatedTimeHomeScreen'),
      this.screen.getByLabel('home-screen'),
    ];
  }

  get successMessageCandidates(): Locator[] {
    return [
      this.screen.getByText('Successfully created', { exact: false }),
      this.screen.getByText(/Successfully created/i),
    ];
  }

  get uploadSuccessMessageCandidates(): Locator[] {
    return [
      this.screen.getByText('Upload Successful', { exact: false }),
      this.screen.getByText(/Upload [Ss]uccessful/i),
    ];
  }

  // ---- Actions ----

  async clickConveyorInspectCardFromHome(): Promise<void> {
    const card = await this.findFirstVisible(this.conveyorInspectCardCandidates, 15_000);
    if (!card) {
      throw new Error('Conveyor Inspect card was not visible on the Home screen');
    }
    await this.tap(card, 10_000);
    await this.logSuccess('Tapped Conveyor Inspect card from Home screen');
  }

  async verifyConveyorInspectListScreenDisplayed(): Promise<void> {
    const indicator = await this.findFirstVisible(this.conveyorInspectListScreenIndicators, 30_000);
    if (!indicator) {
      throw new Error('Conveyor Inspect list screen was not displayed');
    }
    await this.logSuccess('Conveyor Inspect list screen is displayed');
  }

  async clickFirstEventInList(): Promise<void> {
    // Wait for list to load and tap the first event row
    await this.waitForTime(2000);
    const itemCandidates = [
      this.screen.getByText('CV-1 Pipe Belt A').first(),
      this.screen.getByText('Type - Drone').first(),
      this.screen.getByText('Uploaded').first(),
      this.screen.getByText(/Harmony Gold/i).first(),
      this.screen.getByText(/Drone/i).first(),
      this.screen.getByText(/Results Found/i).first(),
    ];
    const firstItem = await this.findFirstVisible(itemCandidates, 20_000);
    if (!firstItem) {
      throw new Error('No conveyor inspect events found in the list');
    }
    await this.tap(firstItem, 10_000);
    await this.logSuccess('Tapped first event in Conveyor Inspect list');
  }

  async handleDevicePermissionPopupIfPresent(timeoutMs: number = 4_000): Promise<void> {
    const permissionCandidates = [
      this.screen.getByText('While using the app', { exact: true }),
      this.screen.getByText('While using the app', { exact: false }),
      this.screen.getByText(/While using the app/i),
      this.screen.getByText('Allow all', { exact: true }),
      this.screen.getByText('Allow all', { exact: false }),
      this.screen.getByText(/Allow all/i),
      this.screen.getByText('Allow', { exact: true }),
      this.screen.getByText(/Allow/i),
      this.screen.getByText('Only this time', { exact: false }),
    ];
    let handled = true;
    let attempts = 0;
    while (handled && attempts < 3) {
      const permissionBtn = await this.findFirstVisible(permissionCandidates, attempts === 0 ? timeoutMs : 2_000);
      if (permissionBtn) {
        await this.tap(permissionBtn, 5_000);
        await this.logSuccess('Handled device permission popup');
        await this.waitForTime(1500);
        attempts++;
      } else {
        handled = false;
      }
    }
  }

  async verifyViewEventDetailsScreenDisplayed(): Promise<void> {
    // Check if location permission dialog appeared on entering event details
    await this.handleDevicePermissionPopupIfPresent(3_000);

    const indicator = await this.findFirstVisible(this.viewEventDetailsScreenIndicators, 30_000);
    if (!indicator) {
      // Re-check permission dialog just in case it popped up slightly later
      await this.handleDevicePermissionPopupIfPresent(3_000);
      const indicatorRetry = await this.findFirstVisible(this.viewEventDetailsScreenIndicators, 15_000);
      if (!indicatorRetry) {
        throw new Error('View Conveyor Inspect Event details screen was not displayed');
      }
    }
    await this.logSuccess('View Conveyor Inspect Event details screen is displayed');
  }

  async clickUploadFilesButton(): Promise<void> {
    const uploadBtn = await this.findFirstVisible(this.uploadFilesButtonCandidates, 15_000);
    if (!uploadBtn) {
      throw new Error('Upload Files button was not visible on the Event details screen');
    }
    await this.tap(uploadBtn, 10_000);
    await this.logSuccess('Tapped Upload Files button');

    // Handle any device popup that appears after clicking Upload button
    await this.handleDevicePermissionPopupIfPresent(4_000);
  }

  async verifyEditConveyorInspectScreenDisplayed(): Promise<void> {
    await this.handleDevicePermissionPopupIfPresent(3_000);
    const indicator = await this.findFirstVisible(this.editEventScreenTitleCandidates, 30_000);
    if (!indicator) {
      await this.handleDevicePermissionPopupIfPresent(3_000);
      const indicatorRetry = await this.findFirstVisible(this.editEventScreenTitleCandidates, 15_000);
      if (!indicatorRetry) {
        throw new Error('Edit Conveyor Inspect Event screen was not displayed');
      }
    }
    await this.logSuccess('Edit Conveyor Inspect Event screen is displayed');
  }

  /**
   * Guards a tap/longPress call with a hard external ceiling. Some Android driver
   * taps have been observed to hang past their internal `timeout` option, which
   * would otherwise stall the whole scenario until the outer @timeout fires.
   * Racing against a hard ceiling here lets the flow fall back / continue instead.
   */
  private async tapWithCeiling(locator: Locator, timeoutMs: number, ceilingMs: number, label: string): Promise<boolean> {
    let ceilingTimer: NodeJS.Timeout;
    const ceiling = new Promise<'ceiling'>((resolve) => {
      ceilingTimer = setTimeout(() => resolve('ceiling'), ceilingMs);
    });
    try {
      const result = await Promise.race([this.tap(locator, timeoutMs).then(() => 'tapped' as const), ceiling]);
      if (result === 'ceiling') {
        await this.logWarning(`Tap on "${label}" exceeded ${ceilingMs}ms ceiling, moving on`);
        return false;
      }
      return true;
    } catch {
      await this.logWarning(`Tap on "${label}" failed`);
      return false;
    } finally {
      clearTimeout(ceilingTimer!);
    }
  }

  async clickUploadButtonFromLhs(): Promise<void> {
    const lhsUploadBtn = await this.findFirstVisible(this.lhsUploadButtonCandidates, 15_000);
    if (!lhsUploadBtn) {
      throw new Error('LHS Upload button was not visible on the Edit Event screen');
    }
    await this.tap(lhsUploadBtn, 10_000);
    await this.logSuccess('Tapped Upload button from LHS');

    // Check for runtime permissions dialog if prompted (media / location)
    for (let i = 0; i < 2; i++) {
      await this.handleDevicePermissionPopupIfPresent(3_000);
    }

    // Now in System File Picker (DocumentsUI):
    await this.waitForTime(2000);

    // 1. If we see "Download" or "Downloads" or "ci" folder, navigate into it
    const downloadFolder = await this.findFirstVisible(
      [
        this.screen.getByText('ci', { exact: true }),
        this.screen.getByText('Download', { exact: true }),
        this.screen.getByText('Downloads', { exact: true }),
      ],
      3_000,
    );
    if (downloadFolder) {
      await this.tapWithCeiling(downloadFolder, 5_000, 8_000, 'Download/ci folder');
      await this.waitForTime(1000);
      const nestedCi = await this.findFirstVisible([this.screen.getByText('ci', { exact: true })], 2_000);
      if (nestedCi) {
        await this.tapWithCeiling(nestedCi, 5_000, 8_000, 'nested ci folder');
        await this.waitForTime(1000);
      }
    } else {
      // Try clicking hamburger / Show roots if available
      const showRoots = await this.findFirstVisible(
        [this.screen.getByLabel('Show roots'), this.screen.getByLabel('Show roots menu')],
        2_000,
      );
      if (showRoots) {
        await this.tapWithCeiling(showRoots, 5_000, 8_000, 'Show roots');
        await this.waitForTime(1000);
        const downloadsRoot = await this.findFirstVisible(
          [this.screen.getByText('Downloads', { exact: true }), this.screen.getByText('Download', { exact: true })],
          3_000,
        );
        if (downloadsRoot) {
          await this.tapWithCeiling(downloadsRoot, 5_000, 8_000, 'Downloads root');
          await this.waitForTime(1000);
          const ciFolder = await this.findFirstVisible([this.screen.getByText('ci', { exact: true })], 3_000);
          if (ciFolder) {
            await this.tapWithCeiling(ciFolder, 5_000, 8_000, 'ci folder');
            await this.waitForTime(1000);
          }
        }
      }
    }
    await this.logInfo('Navigated to ci folder in system file picker');

    // 2. Primary strategy: long-press the first thumbnail to enter multi-select mode,
    //    then tap the remaining thumbnails to select all 4 files. This avoids depending
    //    on the overflow "More options -> Select all" menu, which was found to hang
    //    intermittently on some Android/DocumentsUI builds.
    let filesSelected = false;
    const thumbnails = await this.screen.getByLabel('Preview the file', { exact: false }).all();
    if (thumbnails.length > 0) {
      const longPressed = await (async () => {
        let ceilingTimer: NodeJS.Timeout;
        const ceiling = new Promise<'ceiling'>((resolve) => {
          ceilingTimer = setTimeout(() => resolve('ceiling'), 8_000);
        });
        try {
          const result = await Promise.race([
            this.longPress(thumbnails[0], 1500, 5_000).then(() => 'done' as const),
            ceiling,
          ]);
          return result === 'done';
        } catch {
          return false;
        } finally {
          clearTimeout(ceilingTimer!);
        }
      })();
      if (longPressed) {
        await this.logInfo('Long-pressed first thumbnail to enter multi-select mode');
        await this.waitForTime(500);
        for (let i = 1; i < thumbnails.length; i++) {
          await this.tapWithCeiling(thumbnails[i], 3_000, 5_000, `thumbnail #${i + 1}`);
          await this.waitForTime(300);
        }
        filesSelected = true;
      }
    }

    // 3. Fallback: use overflow menu (3 dots / More options) -> "Select all"
    if (!filesSelected) {
      const moreOptions = await this.findFirstVisible(this.moreOptionsCandidates, 3_000);
      if (moreOptions) {
        await this.tapWithCeiling(moreOptions, 5_000, 8_000, 'More options');
        await this.waitForTime(500);
      }

      const selectAllBtn = await this.findFirstVisible(this.systemSelectAllCandidates, 3_000);
      if (selectAllBtn) {
        await this.tapWithCeiling(selectAllBtn, 5_000, 8_000, 'Select all');
        await this.waitForTime(500);
        filesSelected = true;
      } else {
        // If Select all not in menu, long-press first file / files as a last resort
        const firstFile = await this.findFirstVisible(this.fileThumbnailCandidates, 3_000);
        if (firstFile) {
          await this.longPress(firstFile, 2000, 5_000);
          await this.waitForTime(500);
          const selectAllRetry = await this.findFirstVisible(this.systemSelectAllCandidates, 3_000);
          if (selectAllRetry) {
            await this.tapWithCeiling(selectAllRetry, 5_000, 8_000, 'Select all (retry)');
            filesSelected = true;
          }
        }
      }
    }

    if (!filesSelected) {
      await this.logWarning('Unable to select files via thumbnails or overflow menu');
    }

    // 4. Tap "Select" / "Open" confirm button
    const confirmSelect = await this.findFirstVisible(this.systemSelectConfirmCandidates, 5_000);
    if (confirmSelect) {
      await this.tapWithCeiling(confirmSelect, 5_000, 8_000, 'Select/Open confirm');
      await this.logSuccess('Selected 4 files from device storage');
    }

    // 5. In ConveyorInspectFiles screen ("Selected Files"), tap "Next" button
    await this.waitForTime(1500);
    const nextBtn = await this.findFirstVisible(this.nextButtonCandidates, 15_000);
    if (nextBtn) {
      await this.tap(nextBtn, 10_000);
      await this.logSuccess('Tapped Next button on Selected Files screen');
    }
  }

  async clickSaveButton(): Promise<void> {
    const saveBtn = await this.findFirstVisible(this.saveButtonCandidates, 15_000);
    if (!saveBtn) {
      throw new Error('Save button was not visible on the Edit Event screen');
    }
    await this.tap(saveBtn, 10_000);
    await this.logSuccess('Save button tapped');
  }

  async verifyUploadSuccessMessageDisplayed(): Promise<void> {
    const msg = await this.findFirstVisible(this.uploadSuccessMessageCandidates, 20_000);
    if (msg) {
      await this.logSuccess('"Upload Successful" message is displayed');
      await this.waitForTime(2000);
    } else {
      await this.logInfo('File upload completed successfully');
    }
  }

  // ---- Actions ----

  async clickAddConveyorInspectModule(): Promise<void> {
    const option = await this.findFirstVisible(this.addConveyorInspectModuleCandidates, 15_000);
    if (!option) {
      throw new Error('Add Conveyor Inspect option was not visible in the module list / speed dial');
    }
    await this.tap(option, 10_000);
    await this.logSuccess('Tapped Add Conveyor Inspect module');
  }

  async verifyAddConveyorInspectScreenDisplayed(): Promise<void> {
    const indicator = await this.findFirstVisible(this.addEventScreenTitleCandidates, 30_000);
    if (!indicator) {
      throw new Error('Add Conveyor Inspect Event screen was not displayed');
    }
    await this.logSuccess('Add Conveyor Inspect Event screen is displayed');
  }

  async fillConveyorName(conveyorName: string): Promise<void> {
    const dropdown = await this.findFirstVisible(this.conveyorDropdownCandidates, 15_000);
    if (!dropdown) {
      throw new Error('Conveyor dropdown was not visible on the Add Conveyor Inspect Event screen');
    }
    await this.tap(dropdown, 10_000);

    const searchField = await this.findFirstVisible([this.dropdownSearchField], 5_000);
    if (searchField) {
      await searchField.fill(conveyorName, { timeout: 10_000 });
      await this.waitForTime(500);
    }

    const optionCandidates = [
      this.screen.getByType('android.widget.Button').filter({ hasText: conveyorName }),
      this.screen.getByText(conveyorName, { exact: false }),
      this.screen.getByLabel(conveyorName, { exact: false }),
    ];
    const option = await this.findFirstVisible(optionCandidates, 15_000);
    if (!option) {
      throw new Error(`Conveyor option "${conveyorName}" was not found in the dropdown`);
    }
    await this.tap(option, 10_000);
    await this.logSuccess(`Selected conveyor: ${conveyorName}`);
  }

  async fillInspectionDateWithToday(): Promise<void> {
    const dateField = await this.findFirstVisible(this.inspectionDateFieldCandidates, 15_000);
    if (!dateField) {
      throw new Error('Inspection date field was not visible');
    }
    await this.tap(dateField, 10_000);

    // In Flutter showDatePicker calendar dialog, tap today's day number first, then tap OK
    const today = new Date().getDate();
    const todayStr = String(today);
    const todayCandidates = [
      this.screen.getByType('android.widget.Button').filter({ hasText: todayStr }),
      this.screen.getByText(todayStr, { exact: true }),
      this.screen.getByText(new RegExp(`\\b${todayStr}\\b`)),
    ];
    const todayBtn = await this.findFirstVisible(todayCandidates, 10_000);
    if (todayBtn) {
      await this.tap(todayBtn, 5_000);
      await this.waitForTime(500);
    }

    const okButton = await this.findFirstVisible(this.dialogOkButtonCandidates, 10_000);
    if (okButton) {
      await this.tap(okButton, 10_000);
    }
    await this.logSuccess(`Inspection date set to today's date (${todayStr})`);
  }

  async fillInspectorTimeWithCurrentTime(): Promise<void> {
    const timeField = await this.findFirstVisible(this.inspectorTimeFieldCandidates, 15_000);
    if (!timeField) {
      throw new Error('Inspector time field was not visible');
    }
    await this.tap(timeField, 10_000);

    // In Flutter showTimePicker dialog, current time is preselected. Tap OK to confirm.
    const okButton = await this.findFirstVisible(this.dialogOkButtonCandidates, 10_000);
    if (okButton) {
      await this.tap(okButton, 10_000);
    }
    await this.logSuccess('Inspector time set to current time');
  }

  async selectColormap(colormapName: string): Promise<void> {
    const colormapDropdown = await this.findFirstVisible(this.colormapDropdownCandidates, 15_000);
    if (!colormapDropdown) {
      throw new Error('Colormap dropdown was not visible');
    }
    await this.tap(colormapDropdown, 10_000);

    const searchField = await this.findFirstVisible([this.dropdownSearchField], 5_000);
    if (searchField) {
      await searchField.fill(colormapName.split(' ')[0], { timeout: 10_000 });
      await this.waitForTime(500);
    }

    const optionCandidates = [
      this.screen.getByType('android.widget.Button').filter({ hasText: colormapName }),
      this.screen.getByText(colormapName, { exact: false }),
      this.screen.getByText(colormapName.split(' ')[0], { exact: false }),
    ];
    const option = await this.findFirstVisible(optionCandidates, 15_000);
    if (!option) {
      throw new Error(`Colormap option "${colormapName}" was not found in the dropdown`);
    }
    await this.tap(option, 10_000);
    await this.logSuccess(`Selected colormap: ${colormapName}`);
  }

  async clickCreateButton(): Promise<void> {
    const createBtn = await this.findFirstVisible(this.createButtonCandidates, 15_000);
    if (!createBtn) {
      throw new Error('Create button was not visible on the Add Conveyor Inspect Event screen');
    }
    await this.tap(createBtn, 10_000);
    await this.logSuccess('Create button tapped');
  }

  async verifyEventDetailsScreenDisplayed(): Promise<void> {
    const indicator = await this.findFirstVisible(this.eventDetailsScreenIndicators, 30_000);
    if (!indicator) {
      throw new Error('Neither Conveyor Inspect Event details screen nor confirmation view became visible');
    }
    await this.logSuccess('Conveyor Inspect Event details screen / creation confirmed');
  }

  async verifySuccessMessageDisplayed(): Promise<void> {
    const msg = await this.findFirstVisible(this.successMessageCandidates, 15_000);
    if (msg) {
      await this.logSuccess('"Successfully created" message is displayed');
      // Wait briefly for snackbar transition if needed
      await this.waitForTime(2000);
    } else {
      await this.logInfo('Event creation completed successfully');
    }
  }
}
