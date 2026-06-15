# TC-2229 — Add customer site

| Field | Value |
|---|---|
| **TC ID** | TC-2229 |
| **Suite** | Company → Add_Edit-Site/Shop |
| **Name** | Add customer site |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is add site page |
| 2 | Click on type of company dropdown | It should display two options :<br>-Customer Site<br>-Distributor shop |
| 3 | Select customer site from dropdown | User should able to select customer site |
| 4 | Enter Site name in site name field | User should able enter site name |
| 5 | Upload site logo | site logo should get upload |
| 6 | Select customer corporate from dropdown | User should bale to select customer corporate from dropdown |
| 7 | Select Associate distributor shop | User should able to select associate distributor shop |
| 8 | Enter site address | user should able enter site  address |
| 9 | Look for the suggestion displayed in Autosuggest | User should able to select address from autosuggest |
| 10 | <p>Click on territory manager field&nbsp;</p> | <p>Territory manager can not be selected until the territory is selected</p> |
| 11 | <p>Now select territory for sites&nbsp;</p> | <p>User should able to select territory for site from dropdown&nbsp;</p> |
| 12 | <p>Now select territory manager from dropdown&nbsp;</p> | <p>The list should show the territory managers that have an assignment for the selected territory.</p> |
| 13 | Click on save button | The company should get save and user should redirect to Corporate list screen |
| 14 | Look for the site in site list screen | The newly added site should be reflected on the top of site list |
| 15 | Click on site name in list | Should land to site details screen |
| 16 | Look for header of the page | The header of the page should be site name |
| 17 | Click on site card | Should land to site details screen |
| 18 | Look for the site details | The details should be same as user filled while creation |

---

*Exported from TestLink*