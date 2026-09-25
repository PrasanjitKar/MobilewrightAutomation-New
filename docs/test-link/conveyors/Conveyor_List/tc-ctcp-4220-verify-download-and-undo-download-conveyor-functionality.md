# CTCP-4220 — Verify download & undo download conveyor functionality from mobile conveyor list screen

| Field | Value |
|---|---|
| **TC ID** | CTCP-4220 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify download & undo download conveyor functionality from mobile conveyor list screen |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify download conveyor functionality from mobile conveyor list screen

**Preconditions:** User is on conveyor list screen and the following records already exist in the application: Conveyor A, Conveyor B & Conveyor C. Cover wear: Conveyor A, B & C each contain a cover wear record. Inspections: Conveyor A has Single cv inspection 1, Multiple cv inspection 2 (A & B), Multiple cv inspection 3 (A & C); Conveyor B has Multiple cv inspection 2 (A & B); Conveyor C has Multiple cv inspection 3 (A & C) and Single cv inspection 4.

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User should be on conveyor list screen with already existing data mentioned in precondition | User is on conveyor list screen |
| 2 | User downloads "Conveyor A", "Conveyor B", "Conveyor C" | Inspections offline available: Conveyor A - Single cv inspection 1, Multiple cv inspection 2 (A & B), Multiple cv inspection 3 (A & C); Conveyor B - Multiple cv inspection 2 (A & B); Conveyor C - Multiple cv inspection 3 (A & C), Single cv inspection 4 |
| 3 | Look for cover wear record | All cover wear records should be available offline for conveyor A, B & C |
| 4 | User undo download "Conveyor A" | Inspections offline available: Conveyor A - Multiple cv inspection 2 (A & B), Multiple cv inspection 3 (A & C); Conveyor B - Multiple cv inspection 2 (A & B); Conveyor C - Multiple cv inspection 3 (A & C), Single cv inspection 4 |
| 5 | User undo download "Conveyor B" | Inspections offline available: Conveyor A - Multiple cv inspection 3 (A & C); Conveyor B - none; Conveyor C - Multiple cv inspection 3 (A & C), Single cv inspection 4 |
| 6 | User undo download "Conveyor C" | Inspections offline available: Conveyor A - none; Conveyor B - none; Conveyor C - none |

**Requirements:** CTCP-9542: Mobile: "Download Conveyor" — after downloading Conveyor, it needs to be possible to undo the download

**Keywords:** Regression

---

*Exported from TestLink*
