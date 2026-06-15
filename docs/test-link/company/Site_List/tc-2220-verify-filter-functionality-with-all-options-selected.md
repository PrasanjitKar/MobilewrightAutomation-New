# TC-2220 — Verify filter functionality with All options selected

| Field | Value |
|---|---|
| **TC ID** | TC-2220 |
| **Suite** | Company → Site List |
| **Name** | Verify filter functionality with All options selected |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on conveyor list page |
| 2 | Click on Filter displayed in header | Pop-up should display with filter mentioned on top |
| 3 | Look for field Sort By | Sort By field should display with following options :<br>-Last Modified(On selecting Data should sort accordingly)<br>-A-Z(On selecting Data should sort accordingly)<br>-Z-A(On selecting Data should sort accordingly) |
| 4 | Look for Territory dropdown | The territory dropdown should display all territories with multi-select option |
| 5 | Look for Customer corporate field | The customer corporate field should display only those customer corporate which deals in above selected territory, Selection option should be multi-select. |
| 6 | Look for site field | Site field should display only those listed sites which belongs to above selected customer corporate, Selection option should be multi-select. |
| 7 | Look for overall condition field | Overall condition field should display :<br>-Good <br>-Average <br>-Poor<br>Multiselect option should be there. |
| 8 | Look for inspection items | Inspection item field should display :<br>-Completed inspections <br>-Pending inspections |
| 9 | Click on Save button | On click save button on conveyor list table it should display me only those conveyor which fall in above filter. |

---

*Exported from TestLink*