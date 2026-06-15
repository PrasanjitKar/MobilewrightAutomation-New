# TC-LOGIN-039 — Network switch (WiFi ↔ mobile data) mid-login

> Suite: [Login](./index.md) | Priority: Low | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-039 |
| **Suite** | login |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires device-level network toggle (Settings/Control Centre) — cannot be automated via MobileWright WebView API |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Conti+ app handles network transitions (WiFi to mobile data or vice versa) gracefully during the login flow, either completing the login if connectivity is maintained or showing an appropriate error if connectivity drops.

---

## ✅ Preconditions

- Device supports both WiFi and mobile data
- App is on the Login screen

---

## 🔢 Test Steps — Scenario A: Switch before tapping Login

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter valid credentials on Login screen | Fields populated |
| 2 | Disable WiFi; enable mobile data (or vice versa) | Network type changes; brief connectivity gap possible |
| 3 | Tap Login | ConnectivityHelper re-checks `isOnline` |
| 4 | Observe result | If still online → Login succeeds; if offline gap → `offlineError` shown then retry succeeds |

### Scenario B: Switch mid-API call

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap Login — API call begins | `AuthenticationLoadingState` active |
| 2 | Immediately switch WiFi ↔ mobile data | Network interruption |
| 3 | Observe result | API call either completes on new network or fails with `authenticationError` |
| 4 | Retry login | Login succeeds on retry |

---

## 🏁 Expected Results

- App uses `ConnectivityHelper.isOnline` — a snapshot check, not a stream
- Brief network switch (< 1s) may succeed if the API call completes on either interface
- Total offline state → `offlineError`
- No crash or frozen state on network switch

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — connectivity check
final bool isOnline = connectivityHelper.isOnline;
if (isOnline) {
  // proceed with API call
} else {
  emit(AuthenticationErrorState(errorKey: 'offlineError', ...));
}
```

---

## 📝 Suggested Gherkin

```gherkin
# Cannot be automated — requires physical network toggle
# Manual test steps documented above
```

---

## 🔗 Related

- [TC-LOGIN-013 — Offline login error](./tc-login-013-login-offline-error.md)
- [TC-LOGIN-038 — App backgrounding](./tc-login-038-app-backgrounding.md)
- [Suite index](./index.md)
