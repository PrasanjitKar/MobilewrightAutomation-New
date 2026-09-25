# CTCP-4401 — Verify edit and delete event and item functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-4401 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify edit and delete event and item functionality |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify edit and delete event and item functionality

**Preconditions:** Considering Site S1 having conveyor Cv1, CV2 & Cv3 with inspection event conveyor CV1 with item drive Pulley with details as Lagging condition, status To be completed and condition as critical Add conveyor CV2 with item asset as belt alignment with detail Take-up, status To be completed and condition as Fault Add conveyor CV3 with item asset as belt alignment with detail Take-up, status To be completed and condition as Critical Add conveyor CV3 with item asset as Idlers with detail Broken/frozen, status To be completed and condition as Critical Add conveyor CV1 with item Tail Pulley details Load zone and status To be completed and condition as critical

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to view mode of above added item | User should able to navigate to inspection details page |
| 2 | Click on edit button in top | User should land to inspection event edit page |
| 3 | Update the inspection name with suffix edit | User should able to update inspection name |
| 4 | Verify site name should be in disable form | User can not edit site name |
| 5 | Click on edit icon of inspection item of conveyor CV1 with asset as Tail pulley and detail as Lagging. condition -critical | Pop-up should open with heading as Edit inspection item-Tail Pulley - Lagging condition |
| 6 | Verify Conveyor name , Asset & details filed is not editable | User should not able to edit conveyor name , asset & details field |
| 7 | Look for the item order sequence | The item should be sequenced in order :<br>-Tail Pulley details Load zone<br>-drive Pulley with details as Lagging condition<br>-belt alignment with detail Take-up<br>-belt alignment with detail Take-up<br>-Idlers with detail Broken/frozen |
| 8 | Change the condition from Critical to fault for CV1 with item Tail Pulley details Load zone and status To be completed and condition | User should able to update the condition of item |
| 9 | Save the changes | User should able to save the changes |
| 10 | Look for the item order sequence | The item should be sequenced in order :<br>-Tail Pulley details Load zone<br>-drive Pulley with details as Lagging condition<br>-belt alignment with detail Take-up<br>-belt alignment with detail Take-up<br>-Idlers with detail Broken/frozen |
| 11 | Navigate to inspection event list page | Updated multi conveyor inspect event should be displayed |
| 12 | Look for the  conveyor | 3 should be displayed in conveyor label and on hover should display conveyor name |
| 13 | Look for  Condition | Three flags should be displayed Critical(count-3), Fault(2) and Good(0) |
| 14 | Look for  Status | To be completed icon should be displayed with count as 5 |
| 15 | Look for inspection name | Updated inspection event  name should be displayed in list |
| 16 | Verify delete item functionality via click on delete icon details page in edit mode | Confirmation pop-up should display with items name displayed for delete, post Yes click item entry should get delete from list |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
