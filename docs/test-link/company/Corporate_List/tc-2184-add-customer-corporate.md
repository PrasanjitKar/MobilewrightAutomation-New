# TC-2184 — Add Customer corporate

| Field | Value |
|---|---|
| **TC ID** | TC-2184 |
| **Suite** | Company → Corporate_List |
| **Name** | Add Customer corporate |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is add customer corporate |
| 2 | Click on type of company dropdown | It should display two options :<br>-Distributor Corporate <br>-Customer Corporate |
| 3 | Select customer corporate from dropdown | User should able to select customer corporate |
| 4 | Enter company name in Company name field | User should able enter company name |
| 5 | Enter company address | user should able enter company address |
| 6 | Upload company logo | user should able to upload company logo |
| 7 | Look for the suggestion displayed in Autosuggest | User should able to select address from autosuggest |
| 8 | Click on save button | The company should get save and user should redirect to Corporate list screen |
| 9 | Look for the company in company list screen | The newly added company should be reflected on the top of corporate list |
| 10 | Click on company name in list | Should land to corporate details screen |
| 11 | Look for header of the page | The header of the page should be company name |
| 12 | Click on corporate card | Should land to corporate details screen |
| 13 | Look for the company details | The details should be same as user filled while creation |

---

*Exported from TestLink*