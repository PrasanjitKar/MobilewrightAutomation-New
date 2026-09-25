# TC-FIELD-SERVICE-040 — Offline Creation — offline creation and pending upload badge

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-040 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_offline_creation` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts`, `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that creating a field service form while offline saves it locally to Hive with `isPending: true` and displays the "Upload Pending" status badge on the card.

---

## ✅ Preconditions

- Device in Airplane mode (offline)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable Airplane mode | Offline |
| 2 | Create and complete a new CBLM or SCBSQAF form, tap Create | Form saves locally in Hive cache |
| 3 | Observe list screen | New record displays with "Upload Pending" status pill and upload icon |

---

## 🏁 Expected Results

- Offline form creation persists locally with pending indicator

---

## 🔍 Flutter Source Reference

```dart
// field_service_card.dart
Text(isUploadFailed ? 'Upload Failed' : AppLocalizations.of(context)!.uploadPending, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_offline_creation @regression @both
Scenario: Create field service form in offline mode
  Given the device is offline
  When the user fills and saves a new field service form
  Then the form should be stored locally with an "Upload Pending" badge
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-042 — Auto sync](./tc-field-service-042-manual-and-auto-sync-on-reconnection.md)
- [Suite index](./index.md)
