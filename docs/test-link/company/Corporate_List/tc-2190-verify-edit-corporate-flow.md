# TC-2190 — verify Edit corporate flow

| Field | Value |
|---|---|
| **TC ID** | TC-2190 |
| **Suite** | Company → Corporate_List |
| **Name** | verify Edit corporate flow |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on corporate list page |
| 2 | Look for a corporate having site count displayed in listing | The respective corporate should display |
| 3 | Click on respective corporate listing | The corporate should navigate to corporate details screen |
| 4 | Look for corporate card | Corporate card should display |
| 5 | Click on corporate card | On click it should land to corporate details page |
| 6 | Look for the fields displayed | All fields should display in disable form |
| 7 | Click on three dots in header | Should display edit label |
| 8 | Click on edit label | All fields should now display in enable form |
| 9 | Look for header of the page | The header of the page should be Edit - Corporate name |
| 10 | Edit some of the fields | User should able to edit the fields, fields display :<br>-Company Name <br>-Logo<br>-Address |
| 11 | Click on save button | The fields should get save with updated changes |
| 12 | Verify the update changes | Navigate again to corporate details page and look for update changes |

---

*Exported from TestLink*