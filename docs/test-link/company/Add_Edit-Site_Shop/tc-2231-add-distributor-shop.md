# TC-2231 — Add Distributor shop

| Field | Value |
|---|---|
| **TC ID** | TC-2231 |
| **Suite** | Company → Add_Edit-Site/Shop |
| **Name** | Add Distributor shop |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is add customer site |
| 2 | Click on type of company dropdown | It should display two options :<br>-Distributor shop <br>-Customer site |
| 3 | Select distributor shop from dropdown | User should able to select distributor shop |
| 4 | Enter Shop name in Company name field | User should able enter shop name |
| 5 | Select distributor corporate | User should able to select distributor corporate |
| 6 | Enter company address | user should able enter company address |
| 7 | <p>Click on territory manager field&nbsp;</p> | <p>Territory manager can not be selected until the territory is selected</p> |
| 8 | <p>Now select territory for shop</p> | <p>User should able to select territory for shop from dropdown&nbsp;</p> |
| 9 | <p>Now select territory manager from dropdown&nbsp;</p> | <p>The list should show the territory managers that have an assignment for the selected territory.</p> |
| 10 | Upload company logo | user should able to upload company logo |
| 11 | Look for the suggestion displayed in Autosuggest | User should able to select address from autosuggest |
| 12 | Click on save button | The company should get save and user should redirect to site list screen |
| 13 | Look for the site in site list screen | The newly added site should be reflected on the top of Site list |
| 14 | Click on site name in list | Should land to site details screen |
| 15 | Look for header of the page | The header of the page should be company name |
| 16 | Click on site card | Should land to site details screen |
| 17 | Look for the site details | The details should be same as user filled while creation |

---

*Exported from TestLink*