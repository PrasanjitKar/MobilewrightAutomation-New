# CTCP-4795 — Verify the sequence logic for Asset Tail in Add inspection pop-up

| Field | Value |
|---|---|
| **TC ID** | CTCP-4795 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify the sequence logic for Asset Tail in Add inspection pop-up |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the sequence logic for Asset Tail in Add inspection pop-up

**Preconditions:** User is on total convenance Event details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button on item list table | Add inspection item should display |
| 2 | Look for items displayed under Tail | Following items should display :<br>Tail Pulley<br>Material Spillage / Carryback<br>Load Zone<br>Auxillary Equipment<br>Transitions<br>Belt Alignment / Pipe Formation |
| 3 | Verify condition and legends display for Tail pulley | Tail Pulley with condition & legends -<br>Critical -Missing lagging<br>Fault - Worn lagging<br>Good - No problems |
| 4 | Verify condition and legends display for Material Spillage / Carryback | Critical - Spillage touches belt or rolling components<br>Fault - Excessive spillage, not touching<br>Good - No problems |
| 5 | Verify condition and legends display for  Load Zone | Critical - Skirtboard missing or damaging belt, impact bed broken, chute damaged<br>Fault - Poor skirtboard condition, poor condition impact bed<br>Good |
| 6 | Verify condition and legends display for Auxillary Equipment | Critical - Plow missing, Plow contacting belt<br>Fault - Plow not adjusted correctly<br>Good |
| 7 | Verify condition and legends display for Transitions | Critical - transition idlers missing<br>Fault - Transition idlers in poor condition<br>Good |
| 8 | Verify condition and legends display for Belt Alignment / Pipe Formation | Critical - Belt contacting structure, pipe overlap switching<br>Fault - Poor pipe formation<br>Good |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
