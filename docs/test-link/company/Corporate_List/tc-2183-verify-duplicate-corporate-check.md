# TC-2183 — Verify duplicate corporate check

| Field | Value |
|---|---|
| **TC ID** | TC-2183 |
| **Suite** | Company → Corporate_List |
| **Name** | Verify duplicate corporate check |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is add corporate page |
| 2 | Click on type of company dropdown | It should display two options :<br>-Distributor Corporate <br>-Customer Corporate |
| 3 | Select distributor corporate or customer corporate from dropdown | User should able to select  the options |
| 4 | Enter company name which already exist | User should able enter company name |
| 5 | Enter company address | user should able enter company address |
| 6 | Look for the suggestion displayed in Autosuggest | User should able to select address from autosuggest |
| 7 | Click on save button | The company should not get save, error message should display "Company already exist" |

---

*Exported from TestLink*