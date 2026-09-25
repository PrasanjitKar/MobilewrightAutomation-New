# TC-PROFILE-009: Logout Action & Session Clearance

> **Suite**: `profile` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_screen.dart` (`logoutButton`) & `AuthenticationBloc`

---

## 🎯 Objective
Verify tapping the orange **Logout** button on `ProfileScreen` dispatches `AuthenticationLogOutEvent()`, logs Firebase analytics event `'Clicked Logout button'`, clears active session tokens and local Hive caches, and redirects the user back to the Welcome/Login screen.

---

## 📋 Preconditions
- User is logged in and on `ProfileScreen`.

---

## 🧪 Test Steps
1. On `ProfileScreen`, scroll down to the bottom.
2. Locate the primary orange **Logout** button.
3. Tap **Logout**.
4. Verify Firebase analytics logs: `'Clicked Logout button'`.
5. Verify `LoggingService().logInfo('Triggering logout event from profile screen')`.
6. Verify `AuthenticationBloc.add(AuthenticationLogOutEvent())` is dispatched.
7. Verify authentication state transitions to `AuthenitcationUnauthorizedState`.
8. Verify user session token is purged and Hive storage is cleaned.
9. Verify navigation pops all routes and displays the Welcome / Login screen.

---

## 🔍 Expected Results
- Session is safely terminated and user returns to unauthenticated Welcome screen.

---

## 📱 Flutter Source Reference
- **Button Widget**: `lib/src/ui/screens/profile/profile_screen.dart` (`logoutButton`)
- **BLoC**: `lib/src/blocs/authentication/authentication_bloc.dart` (`AuthenticationLogOutEvent`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_logout @smoke @both
Scenario: Logout user from Profile screen
  Given the user is on the Profile screen
  When the user taps the Logout button
  Then the user session should be cleared
  And the Welcome screen should be displayed
```
