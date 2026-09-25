# CTCP-4805 — Verify Head logic functionality for event added from mobile and checking in web

| Field | Value |
|---|---|
| **TC ID** | CTCP-4805 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify Head logic functionality for event added from mobile and checking in web |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Head logic functionality for event added from mobile and checking in web

**Preconditions:** Condering the data is added from mobile and checking in web Initial Score -100% Traffic light color logic : Color Coding: 81%-100% = Green 71%-80% = Yellow 0%-70% = Red

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add inspection item with good condition | Subtract from initial 100% score - 0% for each "Good" item reported (Section / Asset = "Head") |
| 2 | Add inspection item with condition as fault | Subtract from initial 100% score : 10% for each "Fault" item reported (Section / Asset = "Head") |
| 3 |  | Subtract from initial 100% score : 30% for each "Critical" item reported (Section / Asset = "Head") |
| 4 | Verify minimum and maximum score | Maximum score = 100%<br>Minimum score = 0% |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
