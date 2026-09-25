# CTCP-4881 — Verify critical filter functionality on conveyor list page

| Field | Value |
|---|---|
| **TC ID** | CTCP-4881 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify critical filter functionality on conveyor list page |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Preconditions:** Navigate to conveyor list page in mobile

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to conveyor list | User lands to conveyor list page |
| 2 | Add conveyor with critical toggle button selected | User should able to add conveyor |
| 3 | On user list page apply filter of critical field | User should able to perform critical filter via selecting yes button |
| 4 | Look for the data displayed in conveyor list | All conveyors marked as critical should be displayed in list |
| 5 | Now select option as No in critical filter | On selecting option as No, no conveyor marked as critical should display in list |

**Requirements:** CTCP-17606: [Mobile] Introduce "Critical" filter for Conveyors table for Mobile and Tablet

**Keywords:** Regression

---

*Exported from TestLink*
