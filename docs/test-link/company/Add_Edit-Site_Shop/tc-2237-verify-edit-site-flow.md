# TC-2237 — verify Edit site flow

| Field | Value |
|---|---|
| **TC ID** | TC-2237 |
| **Suite** | Company → Add_Edit-Site/Shop |
| **Name** | verify Edit site flow |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on Site details screen |
| 2 | Look for a site having conveyor count displayed in listing | The respective site should display conveyor count |
| 3 | Click on respective site listing | The site should navigate to site details screen |
| 4 | Look for site card | site card should display |
| 5 | Click on site card | On click it should land to site details page |
| 6 | Look for the fields displayed | All fields should display in disable form |
| 7 | Click on three dots in header | Should display edit label |
| 8 | Click on edit label | All fields should now display in enable form |
| 9 | Look for header of the page | The header of the page should be Edit - Site name |
| 10 | Edit some of the fields | User should able to edit the fields, fields display :<br>-Company Name <br>-Logo<br>-Address<br>-Territory manager |
| 11 | Click on save button | The fields should get save with updated changes |
| 12 | Verify the update changes | Navigate again to site details page and look for update changes |

---

*Exported from TestLink*