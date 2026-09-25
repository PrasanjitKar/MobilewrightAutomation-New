# CTCP-3296 — Add details of fields displayed under Conveyor lite page

| Field | Value |
|---|---|
| **TC ID** | CTCP-3296 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Add details of fields displayed under Conveyor lite page |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on Add conveyor page |
| 2 | Click on conveyor lite link or next button of details page | User should navigate to conveyor lite page |
| 3 | Input Belt Width | Input belt width, mandatory field |
| 4 | Input Belt Speed | Belt Speed is mandatory field, accepts integers only |
| 5 | Tons per hour Peak | Field Tons per Hour Peak is mandatory field, accepts integers only |
| 6 | Click at Peak Material Name drop down list and select a value | Value is selected, mandatory field |
| 7 | Input Material Density | Material Density is filled out, mandatory field |
| 8 | Input Angle of Idlers | Angle of Idlers is filled out, mandatory field |
| 9 | Input Carry Side Idler Spacing | Carry Side Idler Spacing is filled out, mandatory field |
| 10 | Input Drive Angle | Select value from dropdown, mandatory value |
| 11 | Input Take Up Tension | Take Up Tension is filled out |
| 12 | Select Friction factor field | At Friction Factor, selected radio button between options (mandatory field): 1. Conveyor with Permanent or other well aligned structures with normal maintenance; 2. Temporary, portable, or poorly aligned conveyors. Also for cold weather conveyor less than zero continuously |
| 13 | Input Friction Factor | Input Friction Factor is filled out |
| 14 | Select Surcharge Angle from drop down list | Value is selected |
| 15 | Select Drive Pulley surface from Details drop down list | Value is selected |
| 16 | Input Length Factor | Length factor is filled out |
| 17 | At Idler Offset Type drop down list select a value | Value is selected |
| 18 | At Take Up Details drop down list select a value | Take Up Details is selected |
| 19 | Select station field radio button | User should able to select radio button |
| 20 | Click Save & Close | Conveyor name is displayed at the top of the conveyors list with the up arrow |
| 21 | Click on the Up arrow | Device is synchronized, conveyor saved into database and conveyor information visible from any mobile device or web browser |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
