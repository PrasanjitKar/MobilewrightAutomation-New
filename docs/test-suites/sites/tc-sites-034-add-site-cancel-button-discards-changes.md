# TC-SITES-034 — Add Site — cancel button discards changes and navigates back

> Suite: [Sites](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-034 |
| **Suite** | sites |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_site_cancel_discard` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the "Cancel" button on `SiteAddScreen` pops the navigator, discards any entered form data without making API or database changes, and returns the user to the previous screen.

---

## ✅ Preconditions

- User navigates to `SiteAddScreen` from `SiteListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `SiteAddScreen`, enter values into "Customer Site Name", "Territory", and "Address" | Form contains uncommitted changes |
| 2 | Tap the "Cancel" button (`cancelButton`) or App Bar back arrow (`arrowBackIcon`) | `Navigator.pop(context)` is executed |
| 3 | Observe previous screen (`SiteListScreen`) | User is returned to `SiteListScreen` |
| 4 | Verify site list | No new site entry is created in list or storage |

---

## 🏁 Expected Results

- Navigates back cleanly without saving data

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — _getButtons()
ContiplusButton(
  title: ContiplusLocalization.of(context).strings.cancel,
  isSecondaryButton: true,
  onPressed: () {
    Navigator.of(context).pop();
  },
  key: const Key('cancelButton'),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_cancel_discard @regression @both
Scenario: Cancel site creation discards form changes
  Given the user is on the Add Site screen
  When the user enters site name "Draft Site Name"
  And the user taps the Cancel button
  Then the user should be returned to the Sites List screen
  And no site named "Draft Site Name" should exist in the list
```

---

## 🔗 Related

- [TC-SITES-001 — Sites List loads with permitted view](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
