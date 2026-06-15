# TC-2196 — Verify user should not able to edit company type

| Field | Value |
|---|---|
| **TC ID** | TC-2196 |
| **Suite** | Company → Corporate_List |
| **Name** | Verify user should not able to edit company type |
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
| 10 | look for Type of company field | User should able to edit the fields, fields display :<br>-Company Name <br>-Logo<br>-Address |

---

*Exported from TestLink*