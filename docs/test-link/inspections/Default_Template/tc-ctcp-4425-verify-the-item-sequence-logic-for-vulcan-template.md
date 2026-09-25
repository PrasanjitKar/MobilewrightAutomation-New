# CTCP-4425 — Verify the item sequence logic for Vulcan template

| Field | Value |
|---|---|
| **TC ID** | CTCP-4425 |
| **Suite** | Inspections → Default_Template |
| **Name** | Verify the item sequence logic for Vulcan template |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the item sequence logic for Vulcan template

**Preconditions:** Following data should be created for inspection 1. Corporate CV1 2. Site S1 3. Conveyor CV1, CV2 4. Inspection event- Multi inspect 5. Item with conveyor CV1 Item1.1 -To be completed, Good Item1.2 -To be completed, Critical Item1.3 -To be completed, Fault Item1.4 -To be completed, Poor 6. Item with conveyor CV2 Item2.1 -Completed, Good Item2.2 -Completed, Critical Item2.3 -To be completed, Fault Item2.4 -To be completed, Poor

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to view mode of above added item | User should able to navigate to inspection details page |
| 2 | Click on edit button in top | User should land to inspection event edit page |
| 3 | Update the inspection name with suffix edit | User should able to update inspection name |
| 4 | Verify site name should be in disable form | User can not edit site name |
| 5 | Look for condition and status count | Following Data should display :<br>1. Conveyor name CV1 & CV2<br>2. Critical Data with Completed and To be completed count<br>3. Poor Data with Completed and To be completed count<br>4. fault Data with Completed and To be completed count<br>5. Good Data with Completed and To be completed count<br>The count should in table should match with inspection event details count |
| 6 | Verify Conveyor name , Asset & details filed is not editable | User should not able to edit conveyor name , asset & details field |
| 7 | Look for the item order sequence in view mode | Following item order should display :<br>1st data should arranged as per conveyor<br>Then data should arrange as per condition<br>Then in case condition is same then asset sequence order will consider |
| 8 | Change the item 1.1 condition from Good to fault  and status from To be completed to completed | User should able to update the condition of item |
| 9 | Save the changes | User should able to save the changes |
| 10 | Look for order sequence | Updated order sequence should display :<br>1st data should arranged as per conveyor<br>Then data should arrange as per condition<br>Then in case condition is same then asset sequence order will consider |
| 11 | Navigate to inspection event list page | Updated multi conveyor inspect event should be displayed |
| 12 | Look for the Data conveyor | 2 should be displayed in conveyor label |
| 13 | Look for  Condition | Updated condition flag count should display |
| 14 | Look for  Status | Updated status count should display |
| 15 | Look for inspection name | Updated inspection event  name should be displayed in list |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
