# TC-BELT-SCANS-034 — Network Error — error logging and fallback to cache

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-034 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_network_error_fallback` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when network requests to `ctp.beltScanManager.get()` throw an exception (e.g. 500 error or network timeout), `BeltScanListBloc` logs the error to Firebase Analytics (`ApiKeys.apiError`), falls back gracefully to cached data, and emits `ListStatus.offline`.

---

## ✅ Preconditions

- Network mock returns error or disconnects mid-request

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Trigger belt scan list load while backend API simulates an error | API throws exception |
| 2 | Check analytics and error logging | `firebaseAnalytics.logEvent(name: ApiKeys.apiError)` executes |
| 3 | Check BLoC state | Emits `ListStatus.offline` with cached scan list |
| 4 | Inspect list UI | Cached records remain displayed without crashing or blank screen |

---

## 🏁 Expected Results

- API failures are trapped, logged, and handled gracefully via cache fallback

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
catch (e) {
  await firebaseAnalytics.logEvent(
    name: ApiKeys.apiError,
    parameters: firebaseEventParameters(description: 'Belt scan list'),
  );
  emit(state.copyWith(status: ListStatus.offline, beltScanFullList: cache));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_network_error_fallback @regression @both
Scenario: Handle network API errors with cache fallback
  Given a network API failure occurs while loading Belt Scans
  Then the error should be logged and the UI should fall back to cached data
```

---

## 🔗 Related

- [TC-BELT-SCANS-033 — Offline mode](./tc-belt-scans-033-offline-mode-working-banner-cache.md)
- [Suite index](./index.md)
