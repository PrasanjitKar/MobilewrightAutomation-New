# TC-SITES-027 — Edit Site offline — saves changes locally and triggers background sync when online

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-027 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `edit_site_offline_sync` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts`, `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user edits a site while offline, `CompanyBloc` saves the updated model locally via `ctp.companyManager.saveCompany(company)`, emits `CompanyUpdateState`, and enqueues `CompanySyncEvent` to synchronize changes once internet connectivity is restored.

---

## ✅ Preconditions

- User has edit permission on `BasicModule.customerSiteMap`
- Device is disconnected from internet (offline mode)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Put device in offline mode | App switches to offline state |
| 2 | Open `SiteAddScreen` in edit mode for a site | Form opens with local cached data |
| 3 | Edit site fields and tap "Save" (`saveButton`) | Dispatches `CompanyUpdateEvent` |
| 4 | Observe local save | `saveCompany(company)` saves to Hive cache; `CompanyUpdateState` is emitted |
| 5 | Observe snackbar & navigation | "Company Updated" message appears; screen pops back |
| 6 | Restore internet connectivity | `CompanySyncEvent` triggers sequential sync of pending companies |
| 7 | Observe sync outcome | Local edits are synchronized to server and `CompanySyncedState` is emitted |

---

## 🏁 Expected Results

- Edits made offline are persisted to local storage
- Automatic background synchronization updates the server upon reconnection

---

## 🔍 Flutter Source Reference

```dart
// company_bloc.dart — _mapCompanyUpdateEventToState()
if (event.isFreeUser ?? false) {
  await ctp.companyManager.updateCompanyCache(event.company);
} else {
  if (event.companyImage != null) {
    event.company.localImage = event.companyImage?.path;
  }
  await ctp.companyManager.saveCompany(event.company);
}
emit(CompanyUpdateState(event.company));
add(const CompanySyncEvent());
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:edit_site_offline_sync @regression @both
Scenario: Edit site while offline and synchronize
  Given the device is offline
  When the user edits site "td.SiteName" and taps save
  Then the site should be saved locally
  When the device reconnects to the network
  Then the pending site changes should sync with the server
```

---

## 🔗 Related

- [TC-SITES-014 — Site row sync failed banner](./tc-sites-014-site-row-displays-sync-failed-banner.md)
- [TC-SITES-025 — Edit site and save successfully](./tc-sites-025-edit-site-and-save-successfully.md)
- [Suite index](./index.md)
