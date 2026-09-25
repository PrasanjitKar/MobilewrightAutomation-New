# TC-SITES-040: E2E Corporate & Site Hierarchy Lifecycle (Create Corporate, Add Site, GPS Coordinates, Delete)

> **Suite**: `sites` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/companies/` & `lib/src/blocs/company/`

---

## 🎯 Objective
Execute the complete end-to-end organizational hierarchy lifecycle:
1. Create a parent Customer Corporate (`CompanyAddScreen`).
2. Add a child Customer Site (`SiteAddScreen`) with GPS latitude/longitude coordinates and address.
3. Verify the site appears in `SiteListScreen` and under the Corporate hierarchy.
4. Update site details (address, timezone).
5. Delete the site and corporate with confirmation and verify cascading removal.

---

## 📋 Preconditions
- User has `AdminModule.corporateManagement` and `BasicModule.customerSiteMap` add/edit/delete permissions.

---

## 🧪 Test Steps
1. Navigate to Companies -> tap Add Corporate.
2. Enter Corporate Name "E2E Mining Corp", Country, and save.
3. Open Corporate details -> tap **Add Site**.
4. Enter Site Name "E2E Copper Pit #1", GPS Latitude "-23.8634", Longitude "-69.1328", Address, and save.
5. Verify Site appears in `SiteListScreen` with proper parent corporate name.
6. Verify Dashboard "Sites" count increments by 1.
7. Tap site -> edit timezone to "America/Santiago" -> save.
8. Delete Site -> confirm modal dialog -> verify removed from list.
9. Delete Corporate -> confirm modal dialog -> verify removed from list.

---

## 🔍 Expected Results
- Complete organizational hierarchy management works seamlessly end-to-end.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/companies/company_add_screen.dart`
- `lib/src/ui/screens/companies/site_add_screen.dart`
- `lib/src/blocs/company/list/company_list_bloc.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_e2e_hierarchy @e2e @both
Scenario: End-to-End Corporate and Site Hierarchy Lifecycle
  Given the user creates a corporate "E2E Mining Corp"
  When the user adds a customer site "E2E Copper Pit #1" with GPS coordinates
  Then the site should appear in the Site List and Dashboard count should increment
  When the user deletes the site and corporate
  Then both should be removed and Dashboard count should decrement
```
