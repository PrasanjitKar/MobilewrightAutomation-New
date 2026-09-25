# TC-BELT-SCANS-007 — Free User — free account restrictions on Belt Scans screen

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-007 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_free_user_restrictions` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when `isFreeUser` is true on `BeltScanListScreen`, search icon, filter icon, and manual sync actions in the AppBar are hidden (`actions: []`).

---

## ✅ Preconditions

- User logged in with free/guest role

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Belt Scans screen with `isFreeUser = true` | `BeltScanListScreen` renders |
| 2 | Observe AppBar actions | Search icon, Filter icon, and Sync button are omitted from AppBar |
| 3 | Observe row interaction | Scans are rendered in read-only mode |

---

## 🏁 Expected Results

- Free users receive a streamlined view with advanced filtering and manual sync actions suppressed

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
actions: widget.isFreeUser ?? false ? [] : [
  IconButton(icon: SvgPicture.asset(ContiPlusIcon.searchIcon_24x24), ...),
  ...
]
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:belt_scans_free_user_restrictions @regression @both
Scenario: Free user restrictions on Belt Scans screen
  Given a free user accesses the Belt Scans screen
  Then search, filter, and sync actions should be hidden from the AppBar
```

---

## 🔗 Related

- [TC-BELT-SCANS-001 — List loads](./tc-belt-scans-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
