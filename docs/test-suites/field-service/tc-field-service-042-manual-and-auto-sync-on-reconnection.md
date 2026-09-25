# TC-FIELD-SERVICE-042 — Sync & Reconnect — manual sync confirmation and auto-sync on reconnect

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-042 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_sync_reconnect` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the sync icon in the app bar prompts a confirmation dialog before executing hard load, and restoring network connection automatically syncs the pending queue.

---

## ✅ Preconditions

- Pending offline forms queued; app on list screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the sync icon in the app bar | `AlertDialog` displays with text `syncConfirmation` and OK/Cancel buttons |
| 2 | Tap "OK" | `FieldServiceListLoadEvent(hardLoad: true)` dispatches and re-syncs all records |
| 3 | Go offline, create a form, then turn on Wi-Fi/Cellular | Network listener fires `FieldServiceSyncEvent` and automatically uploads pending form |

---

## 🏁 Expected Results

- Manual sync requires confirmation and automatic reconciliation triggers upon network restore

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart & field_service_list_bloc.dart
AlertDialog(content: Text(AppLocalizations.of(context)!.syncConfirmation), ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_sync_reconnect @regression @both
Scenario: Manual sync confirmation and automatic queue reconciliation
  Given pending field service items exist
  When the user taps sync and confirms the popup
  Then full list hard load should execute and pending items synchronize
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-040 — Offline creation](./tc-field-service-040-offline-creation-pending-badge.md)
- [Suite index](./index.md)
