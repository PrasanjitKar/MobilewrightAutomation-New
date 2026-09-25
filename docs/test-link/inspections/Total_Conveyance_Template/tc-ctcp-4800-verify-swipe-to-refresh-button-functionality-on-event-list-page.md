# CTCP-4800 — Verify swipe to refresh button functionality on event list page

| Field | Value |
|---|---|
| **TC ID** | CTCP-4800 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify swipe to refresh button functionality on event list page |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify swipe to refresh button functionality on event list page

**Preconditions:** User is on total convenance Event details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User is on event list page of mobile account | User should able to navigate |
| 2 | Login via same user account in web | User should able to navigate now Add inspection event |
| 3 | Look for the inspection added via web in mobile account | Added inspection won't be displayed in web |
| 4 | Now pull to refresh the table via list table refresh button | On pull to refresh the newly added data should reflect |
| 5 | If user click on hard refresh button via header refresh button | This will also load the new  data but whole inspection list data will load from initial |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
