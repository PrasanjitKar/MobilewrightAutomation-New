# TC-2242 — Verify duplicate check in edit site

| Field | Value |
|---|---|
| **TC ID** | TC-2242 |
| **Suite** | Company → Add_Edit-Site/Shop |
| **Name** | Verify duplicate check in edit site |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on site list page |
| 2 | Look for a corporate having site count displayed in listing | The respective corporate should display |
| 3 | Click on respective corporate listing | The corporate should navigate to corporate details screen |
| 4 | Look for corporate card | Corporate card should display with site listing |
| 5 | Click on site listing which needs to edit | On click it should land to site details page |
| 6 | Look for the fields displayed | All fields should display in disable form |
| 7 | Click on three dots in header | Should display edit label |
| 8 | Click on edit label | All fields should now display in enable form |
| 9 | Look for header of the page | The header of the page should be Edit - Site name |
| 10 | Enter already present site name | User should able to enter site name |
| 11 | Click on save button | Error message should display : site already exist |

---

*Exported from TestLink*