# CTCP-4657 — Verify on hard refresh filter should not get removed

| Field | Value |
|---|---|
| **TC ID** | CTCP-4657 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify on hard refresh filter should not get removed |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Preconditions:** User is on conveyor list page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Apply filter on conveyor list | User should able to apply filter |
| 2 | Hard refresh the conveyor list page | The list page should get hard refreshed |
| 3 | Observe the filter applied before | Filter should be applied even though hard refresh being called |

**Requirements:** CTCP-14324: Improve Filter and search feature conveyor

**Keywords:** Regression

---

*Exported from TestLink*
