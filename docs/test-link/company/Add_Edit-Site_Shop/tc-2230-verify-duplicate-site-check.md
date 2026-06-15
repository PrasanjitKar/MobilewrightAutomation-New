# TC-2230 — Verify duplicate site check

| Field | Value |
|---|---|
| **TC ID** | TC-2230 |
| **Suite** | Company → Add_Edit-Site/Shop |
| **Name** | Verify duplicate site check |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is add site page |
| 2 | Click on type of company dropdown | It should display two options :<br>-Distributor shop <br>-Customer site |
| 3 | Select distributor shop or customer site from dropdown | User should able to select  the options |
| 4 | Enter site name which already exist in that corporate | User should able enter site name |
| 5 | Enter company address | user should able enter company address |
| 6 | Look for the suggestion displayed in Autosuggest | User should able to select address from autosuggest |
| 7 | Click on save button | The site should not get save, error message should display "Site already exist" |

---

*Exported from TestLink*