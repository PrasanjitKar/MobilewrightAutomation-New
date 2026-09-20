# TC-DASHBOARD-021 — Sync icon shows a confirmation dialog before syncing

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-021 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_sync_confirmation` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify tapping the sync icon (for non-guest users) shows a confirmation `AlertDialog` before actually syncing, and that OK/Cancel behave correctly. The sync icon is only rendered for `isFreeUser == false`.

---

## ✅ Preconditions

- User is logged in as a full (non-guest/non-free) user
- `SummaryState.status != SummaryStatus.loading` at the time of tapping (otherwise the dialog is skipped)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Home tab (page 0), tap `syncIcon` | `syncPopupContent` dialog appears with the localized `syncConfirmation` text |
| 2 | Tap `syncPopupCancelButton` | Dialog closes; no sync event is dispatched; analytics logs a "Clicked cancel button from Summary" event |
| 3 | Re-tap `syncIcon`, then tap `syncPopupOkButton` | Dialog closes; the sync/refresh flow for the current tab (Home → Summary) is triggered |
| 4 | Repeat from the Conveyors (page 1), Companies (page 2), Inspections (page 4), and Sites (page 6) tabs | Dialog content is identical, but the OK action triggers the sync flow scoped to that tab's module instead of Summary |
| 5 | As a guest/free user, inspect the app bar | `syncIcon` is not rendered at all |

---

## 🏁 Expected Results

- Dialog only appears when not already syncing
- Cancel dismisses without side effects
- OK dismisses and triggers the module-scoped sync/refresh corresponding to the active tab
- Sync icon is fully absent for guest/free users

---

## 🔍 Flutter Source Reference

```dart
// conti_app_bar.dart — sync icon + confirmation dialog
if (isFreeUser == false)
  BlocBuilder<SummaryBloc, SummaryState>(
    builder: (context, summaryState) {
      return SemanticsLabel(
        label: 'syncIcon',
        child: IconButton(
          onPressed: () {
            if (summaryState.status != SummaryStatus.loading) {
              showDialog<dynamic>(
                context: context,
                builder: (context) => AlertDialog(
                  content: SemanticsLabel(
                    label: 'syncPopupContent',
                    child: Text(AppLocalizations.of(context)!.syncConfirmation),
                  ),
                  actions: [
                    SemanticsLabel(
                      label: 'syncPopupOkButton',
                      child: TextButton(
                        child: Text(AppLocalizations.of(context)!.ok),
                        onPressed: () {
                          Navigator.of(context).pop();
                          if (state.selectedPage == 0) { /* sync Summary */ }
                          else if (state.selectedPage == 1) { /* sync Conveyor */ }
                          else if (state.selectedPage == 2) { /* sync Company */ }
                          else if (state.selectedPage == 4) { /* sync Inspection */ }
                          else if (state.selectedPage == 6) { /* sync Site */ }
                        },
                      ),
                    ),
                    SemanticsLabel(
                      label: 'syncPopupCancelButton',
                      child: TextButton(/* logs cancel analytics event, pops dialog */),
                    ),
                  ],
                ),
              );
            }
          },
          icon: SvgPicture.asset(ContiPlusIcon.syncIcon /* representative */),
        ),
      );
    },
  ),
```

**Semantic labels / locators:**
- `syncIcon` — app bar sync button (hidden for guest/free users)
- `syncPopupContent` — dialog message text
- `syncPopupOkButton` / `syncPopupCancelButton` — dialog action buttons

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_sync_confirmation @regression @both
Scenario: Sync icon shows confirmation dialog before syncing
  Given the user is logged in
  And the home screen finishes loading
  When the user taps the sync icon
  Then the sync confirmation dialog should be displayed
  When the user confirms the sync dialog
  Then the sync confirmation dialog should be dismissed
```

---

## 🔗 Related

- [TC-DASHBOARD-020 — Pull to refresh](./tc-dashboard-020-pull-to-refresh.md)
- [TC-DASHBOARD-022 — Sync loading indicator](./tc-dashboard-022-sync-loading-indicator.md)
- [Suite index](./index.md)
