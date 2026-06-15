# TC-2208 — Verify filter when all fields selected

| Field | Value |
|---|---|
| **TC ID** | TC-2208 |
| **Suite** | Company → Site List |
| **Name** | Verify filter when all fields selected |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on site list page |
| 2 | Select corporate type | User can select corporate type |
| 3 | Select territory from dropdown | User can select territory form dropdown as checkbox options |
| 4 | Select corporate name | Dropdown should display only those corporate which belongs to Corporate and territory filter selected above |
| 5 | Select the corporate | User can single select and multi select corporate via checkbox |
| 6 | Click on save button | Filter should get save, pop-up closes and user redirect to Corporate list page |
| 7 | Look for data displayed in corporate list screen | It should display only those corporate for which filter has been applied |

---

*Exported from TestLink*