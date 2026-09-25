# CTCP-4109 — Verify pull to refresh functionality of conveyor list screen

| Field | Value |
|---|---|
| **TC ID** | CTCP-4109 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify pull to refresh functionality of conveyor list screen |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Preconditions:** User is on conveyor list page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Pull to refresh conveyor list page | Loader icon should come when user pulls the screen down |
| 2 | User releases the screen from bottom | As user releases the screen, conveyor list will get refreshed and if there is any new data added or updated the same will load in the list |
| 3 | Observe the count displayed in the bottom of the list | Since conveyor list will not load from start, the count will increment in case new data is there or remain the same |

**Requirements:** CTCP-9541: Mobile: "Refresh through drag conveyor list down" on site level. Loading feedback

**Keywords:** Regression

---

*Exported from TestLink*
