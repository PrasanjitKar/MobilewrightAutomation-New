# CTCP-4798 — Verify the sequence logic for Asset Belt in Add inspection pop-up

| Field | Value |
|---|---|
| **TC ID** | CTCP-4798 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify the sequence logic for Asset Belt in Add inspection pop-up |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the sequence logic for Asset Tail in Add inspection pop-up

**Preconditions:** User is on total convenance Event details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button on item list table | Add inspection item should display |
| 2 | Look for items displayed under Tail | Following items should display :<br>Splice Condition<br>Top Cover<br>Bottom Cove<br>Belt Edges |
| 3 | Verify condition and legends display for Splice Condition | Tail Pulley with condition & legends -<br>Critical -Missing lagging<br>Fault - Worn lagging<br>Good - No problems |
| 4 | Verify condition and legends display for Top Cover | Critical - Spillage touches belt or rolling components<br>Fault - Excessive spillage, not touching<br>Good - No problems |
| 5 | Verify condition and legends display for Bottom Cover | Critical - Skirtboard missing or damaging belt, impact bed broken, chute damaged<br>Fault - Poor skirtboard condition, poor condition impact bed<br>Good |
| 6 | Verify condition and legends display for Belt Edges | Critical - Plow missing, Plow contacting belt<br>Fault - Plow not adjusted correctly<br>Good |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
