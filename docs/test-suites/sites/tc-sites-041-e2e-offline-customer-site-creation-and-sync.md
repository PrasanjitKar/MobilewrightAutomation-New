# TC-SITES-041: E2E Offline Customer Site Creation & Synchronization

> **Suite**: `sites` | **Priority**: `High` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/company/` & `CompanySyncBloc`

---

## 🎯 Objective
Verify end-to-end offline customer site creation: saving site locally with pending flag and temporary UUID while offline, displaying pending status in list, and automatic synchronization when connectivity is restored.

---

## 📋 Preconditions
- User is logged in with corporate master data cached.
- Device network is offline.

---

## 🧪 Test Steps
1. Disconnect device network (Airplane Mode).
2. Open `SiteAddScreen`, select Corporate, enter Site Name "Offline Site Alpha", and tap Save.
3. Verify site is stored in local Hive/SQLite database with `isPending: true`.
4. Verify `SiteListScreen` displays the site with a yellow pending sync badge.
5. Reconnect network (Airplane Mode OFF).
6. Trigger pull-to-refresh or tap the pending sync icon.
7. Verify site syncs to the server, server ID is assigned, and pending badge clears.

---

## 🔍 Expected Results
- Offline customer site creation syncs seamlessly to the cloud upon reconnection.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/companies/site_add_screen.dart`
- `lib/src/blocs/company/list/company_list_bloc.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_e2e_offline_sync @e2e @both
Scenario: End-to-End Offline Customer Site Creation and Synchronization
  Given the device is offline
  When the user creates a customer site "Offline Site Alpha"
  Then the site should be stored locally with pending sync status
  When the device goes online and sync is triggered
  Then the site should sync to the server successfully
```
