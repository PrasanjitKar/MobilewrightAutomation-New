# CTCP-3261 — Verify search functionality on conveyor list page

| Field | Value |
|---|---|
| **TC ID** | CTCP-3261 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify search functionality on conveyor list page |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on conveyor list page |
| 2 | Click on the search icon in header and enter the name of conveyor to search | All the conveyors matching the entered search string will be displayed |
| 3 | Do the search operation in case conveyor list data is still loading | While loading the data, the search result matching searched text should display, and post loading all other results matching the search string should display (search and filter should be applied while the data is loading) |
| 4 | Click on displayed conveyor name | Should land to conveyor details page |

**Requirements:** CTCP-14324: Improve Filter and search feature conveyor

**Keywords:** Regression

---

*Exported from TestLink*
