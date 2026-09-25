# CTCP-4797 — Verify the sequence logic for Asset Head in Add inspection pop-up

| Field | Value |
|---|---|
| **TC ID** | CTCP-4797 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify the sequence logic for Asset Head in Add inspection pop-up |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the sequence logic for Asset Head in Add inspection pop-up

**Preconditions:** User is on total convenance Event details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button on item list table | Add inspection item should display |
| 2 | Look for items displayed under Centre | Following items should display :<br>Head Pulley<br>Drive Pulley<br>Take-up Pulley<br>Belt Cleaners<br>Transition<br>Belt Alignment / Pipe Formation<br>Material Spillage / Carryback |
| 3 | Verify condition and legends display for Head Pulley | Critical- Missing lagging<br>Fault - Worn lagging<br>Good - No problems |
| 4 | Verify condition and legends display for Drive Pulley | Critical- Missing lagging<br>Fault - Worn lagging<br>Good - No problems |
| 5 | Verify condition and legends display for  Take-up Pulley | Critical- Missing lagging<br>Fault - Worn lagging<br>Good - No problems |
| 6 | Verify condition and legends display for Belt Cleaners | Critical - Cleaner missing, cleaner damaging belt<br>Fault - Plow not adjusted correctly<br>Good |
| 7 | Verify condition and legends display for Transition | Critical - transition idlers missing<br>Fault - Transition idlers in poor condition<br>Good |
| 8 | Verify condition and legends display for Belt Alignment / Pipe Formation | Critical - Belt contacting structure, pipe overlap switching<br>Fault - Poor pipe formation<br>Good |
| 9 | Verify condition and legends display for Material Spillage / Carryback | Critical - Spillage touches belt or rolling components<br>Fault - Excessive spillage, not touching<br>Good - No problems |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
