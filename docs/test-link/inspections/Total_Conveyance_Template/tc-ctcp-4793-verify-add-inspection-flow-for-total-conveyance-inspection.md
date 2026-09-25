# CTCP-4793 — Verify Add inspection flow for Total Conveyance inspection

| Field | Value |
|---|---|
| **TC ID** | CTCP-4793 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify Add inspection flow for Total Conveyance inspection |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Add inspection flow for Total Conveyance inspection

**Preconditions:** User is on inspection list page -Site S1 having conveyor C1 already exist & S1 belongs to Total Conveyance Corporate

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button | User land to New inspection event page |
| 2 | Select site name as S1 from Site dropdown | User should able to select Site S1 from the list & Site field should be mandatory field |
| 3 | Look for conveyor name field | Only conveyors linked to selected site should display(Mandatory field) |
| 4 | Look for inspection template field | TOTAL CONVEYANCE should be displayed as template name |
| 5 | Look for inspection date field | It should be the date on which the inspection event is created |
| 6 | Look for inspector name field | Inspector name should be displayed as the user with which account is logged in |
| 7 | Look for Inspection name field | Inspection name field should be combination of Current date and Site name(Name should be mandatory field) |
| 8 | Look for the productivity field | Productivity value should be user input field & it should accept numeric values only |
| 9 | Look for Uptime field | Uptime value should be user input field & it should accept numeric values only |
| 10 | Look for location displays in site map | Site location should be displayed in site map |
| 11 | Look for back button displayed in header | On click :<br>Waring pop-up should display- Are you sure you want to leave inspection without saving with Yes and No button<br>If user click on No - User remains on same page<br>If user click on Yes  - Inspection event should create without inspection item as its not added, Also event should display in listing screen |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
