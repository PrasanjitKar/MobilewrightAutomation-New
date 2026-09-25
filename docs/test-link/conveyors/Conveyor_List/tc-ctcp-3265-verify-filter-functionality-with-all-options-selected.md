# CTCP-3265 — Verify filter functionality with All options selected

| Field | Value |
|---|---|
| **TC ID** | CTCP-3265 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify filter functionality with All options selected |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on conveyor list page |
| 2 | Click on Filter displayed in header | Pop-up should display with filter mentioned on top |
| 3 | Look for field Sort By | Sort By field should display with options: Last Modified, A-Z, Z-A (data should sort accordingly on selection) |
| 4 | Look for Territory dropdown | The territory dropdown should display all territories with multi-select option |
| 5 | Look for Customer corporate field | The customer corporate field should display only those customer corporates which deal in the above selected territory; selection option should be multi-select |
| 6 | Look for site field | Site field should display only those listed sites which belong to the above selected customer corporate; selection option should be multi-select |
| 7 | Look for overall condition field | Overall condition field should display: Good, Average, Poor; multiselect option should be there |
| 8 | Look for inspection items | Inspection item field should display: Completed inspections, Pending inspections |
| 9 | Click on Save button | On click, save button on conveyor list table should display only those conveyors which fall in the above filter |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
