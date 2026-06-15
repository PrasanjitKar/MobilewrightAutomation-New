# TC-2195 — Verify duplicate check in edit corporate

| Field | Value |
|---|---|
| **TC ID** | TC-2195 |
| **Suite** | Company → Corporate_List |
| **Name** | Verify duplicate check in edit corporate |
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
| 10 | Enter already present corporate name | User should able to enter corporate name |
| 11 | Click on save button | Error message should display : corporate already exist |

---

*Exported from TestLink*