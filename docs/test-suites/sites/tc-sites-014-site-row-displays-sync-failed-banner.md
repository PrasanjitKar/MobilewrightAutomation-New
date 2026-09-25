# TC-SITES-014 — Site row displays rotated "Sync Failed" banner when background sync fails

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-014 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `site_sync_failed_banner` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a locally edited site fails to sync with the server during `CompanySyncEvent`, `company.isSyncFailed` is set to `true` and `CompanyRow` displays a rotated red banner with semantics label `syncFailed_$index` ("Sync Failed").

---

## ✅ Preconditions

- A site was edited offline and queued for sync
- Background sync encountered a network or server failure

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `SiteListScreen` | List renders with customer sites |
| 2 | Locate the site with failed sync (`isSyncFailed == true`) | A rotated (-15 deg) banner appears across the row |
| 3 | Inspect banner | `syncFailed_$index` shows text "Sync Failed" in bold red (`ContinentalColors.red2`) |
| 4 | Reconnect to network and trigger sync | Successful sync clears `isSyncFailed` and hides the banner |

---

## 🏁 Expected Results

- "Sync Failed" badge is prominently visible on rows with sync issues
- Banner clears automatically once synchronization completes successfully

---

## 🔍 Flutter Source Reference

```dart
// company_row.dart
Visibility(
  visible: company.isSyncFailed ?? false,
  child: RotationTransition(
    turns: const AlwaysStoppedAnimation(-15 / 360),
    child: Center(
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: const Color(0x80CDCDCD),
          borderRadius: BorderRadius.circular(3),
          border: Border.all(color: ContinentalColors.red2),
        ),
        child: SemanticsLabel(
          label: 'syncFailed_$index',
          child: Text(
            AppLocalizations.of(context)!.syncFailed,
            style: const TextStyle(
              fontSize: 14,
              color: ContinentalColors.red2,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ),
    ),
  ),
),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_sync_failed_banner @regression @both
Scenario: Site row displays sync failed banner
  Given the user is on the sites list screen
  When a site has a pending sync failure
  Then the site row should display the "Sync Failed" badge
```

---

## 🔗 Related

- [TC-SITES-027 — Edit site offline saves locally](./tc-sites-027-edit-site-offline-saves-locally-for-sync.md)
- [Suite index](./index.md)
