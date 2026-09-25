# TC-SITES-010 — Offline banner is displayed and site list loads from local cache when offline

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-010 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `sites_offline_mode` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when the device is offline, `SiteListScreen` displays the offline banner with label `offlineTextForSite` ("Working offline") and seamlessly renders cached customer sites from Hive local storage.

---

## ✅ Preconditions

- User previously loaded customer sites while online
- Device network is disconnected (Airplane mode / offline)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Disconnect device internet connectivity | Network status switches to offline |
| 2 | Navigate to `SiteListScreen` | `CompanyListBloc` reads cache via `ctp.companyManager.getCompaniesFromCache()` |
| 3 | Observe the top banner | Text with semantics label `offlineTextForSite` is visible ("Working offline") |
| 4 | Observe the site list | Previously cached customer site rows are rendered |
| 5 | Observe footer | `LastUpdatedTimeAndTotalCountWidget` displays cached count and last sync time |

---

## 🏁 Expected Results

- Offline banner `offlineTextForSite` is displayed
- Cached customer sites remain accessible and navigable while offline

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart
if (state.status.isOffline)
  SemanticsLabel(
    label: 'offlineTextForSite',
    child: Text(AppLocalizations.of(context)!.workingOffline),
  ),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:sites_offline_mode @regression @both
Scenario: Offline banner and cached site list
  Given the user is logged in
  And the device is offline
  When the user navigates to the sites list
  Then the banner "Working offline" should be displayed
  And the cached sites should be listed
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
