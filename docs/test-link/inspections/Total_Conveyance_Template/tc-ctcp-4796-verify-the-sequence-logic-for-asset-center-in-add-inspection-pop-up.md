# CTCP-4796 — Verify the sequence logic for Asset Center in Add inspection pop-up

| Field | Value |
|---|---|
| **TC ID** | CTCP-4796 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify the sequence logic for Asset Center in Add inspection pop-up |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the sequence logic for Asset Center in Add inspection pop-up

**Preconditions:** User is on total convenance Event details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button on item list table | Add inspection item should display |
| 2 | Look for items displayed under Centre | Following items should display :<br>Carry Idlers<br>Conveyor Structure<br>Material Spillage / Carryback Transitions<br>Belt Alignment / Pipe Formation<br>Guards / E-Stops |
| 3 | Verify condition and legends display for Return Idlers | Critical - Broken or frozen idlers<br>Fault - Idlers with vibration, heat, or noise<br>Good |
| 4 | Verify condition and legends display for Material Spillage / Carryback | Critical - Broken or frozen idlers<br>Fault - Idlers with vibration, heat, or noise<br>Good |
| 5 | Verify condition and legends display for  Conveyor Structure | Critical - Structure damage w/ potential impact to belt or safety<br>Fault- Structure damage, not impacting belt<br>Good |
| 6 | Verify condition and legends display for Material Spillage / Carryback | Critical - Spillage touches belt or rolling components<br>Fault - Excessive spillage, not touching<br>Good - No problems |
| 7 | Verify condition and legends display for Belt Alignment / Pipe Formation | Critical - Belt contacting structure, pipe overlap switching<br>Fault - Poor pipe formation<br>Good |
| 8 | Verify condition and legends display for Guards / E-Stops | Critical - Guards missing or e-stop non functional<br>Fault - Guards damaged or improperly installed<br>Good |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
