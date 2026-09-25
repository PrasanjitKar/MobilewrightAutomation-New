# CTCP-4806 — Verify Belt Construction logic functionality for event added from mobile and checking in web

| Field | Value |
|---|---|
| **TC ID** | CTCP-4806 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify Belt Construction logic functionality for event added from mobile and checking in web |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Belt Construction logic functionality

**Preconditions:** Condering the data is added from mobile and checking in web Initial Score -100% Traffic light color logic : Color Coding: 81%-100% = Green 71%-80% = Yellow 0%-70% = Red

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add inspection item with good condition | Subtract from initial 100% score - 0% for each "Good" item reported (Section / Asset = "Belt ") |
| 2 | Add inspection item with condition as fault | Subtract from initial 100% score : 15% for each "Fault" item reported (Section / Asset = "Belt ") |
| 3 |  | Subtract from initial 100% score : 40% for each "Critical" item reported (Section / Asset = "Belt ") |
| 4 | Verify minimum and maximum score | Maximum score = 100%<br>Minimum score = 0% |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
