# CTCP-3291 — Verify carcass field

| Field | Value |
|---|---|
| **TC ID** | CTCP-3291 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify carcass field |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on installed belt page |
| 2 | Look for carcass field | Carcass field should display with options: DPP, EE, EP, EPP, PN, PP, ST |
| 3 | Select option except ST | User should able to select the respective options |
| 4 | Select option as ST | Two more fields get added: Cord Pitch (accepts integer value only), Cord Diameter (accepts integer value only) |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
