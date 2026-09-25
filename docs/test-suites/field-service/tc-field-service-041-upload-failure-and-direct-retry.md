# TC-FIELD-SERVICE-041 — Upload Failure — upload failure red tint and direct retry button

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-041 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_upload_failure` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a form upload fails, the card is tinted with `ContinentalColors.uploadFailedRed`, displays an "Upload Failed" badge with a refresh icon, and tapping refresh triggers `FieldServiceSyncEvent` for retry.

---

## ✅ Preconditions

- Form sync failed due to network disruption or server timeout

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe failed form on `FieldServiceListScreen` | Card background is light red; shows "Upload Failed" pill and refresh icon |
| 2 | Tap the refresh icon | `FieldServiceSyncEvent(device: fieldServiceModel)` dispatches to re-upload form |
| 3 | On successful sync | Red tint and failed pill clear |

---

## 🏁 Expected Results

- Failed uploads are visibly flagged and recoverable via single-tap retry

---

## 🔍 Flutter Source Reference

```dart
// field_service_card.dart
color: isUploadFailed ? ContinentalColors.uploadFailedRed : ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_upload_failure @regression @both
Scenario: Retry failed field service form upload
  Given a field service form upload previously failed
  Then the card should have a red background and "Upload Failed" badge
  When the user taps the retry refresh button
  Then the form upload should re-execute
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-040 — Offline creation](./tc-field-service-040-offline-creation-pending-badge.md)
- [Suite index](./index.md)
