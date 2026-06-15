# TC-2178 — verify complete view flow for corporate

| Field | Value |
|---|---|
| **TC ID** | TC-2178 |
| **Suite** | Company → Corporate_List |
| **Name** | verify complete view flow for corporate |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on corporate list page |
| 2 | Look for a corporate having site count displayed in listing | The respective corporate should display |
| 3 | Click on respective corporate listing | The corporate should navigate to corporate details screen |
| 4 | Look for the fields displayed on page | Following fields should display :<br>- Corporate card showing :<br>   - Corporate name <br>   -City and country of corporate <br>   -Market & country label<br>   - Company logo<br>   - Count of sites<br>- All the sites listed in corporate with :<br>   - Site logo<br>   - Site name <br>   - Site type(Customer site or distributor shop)<br>   - Territory of site or shop<br>   -Inspection alert symbol<br>   -Linked conveyor count |
| 5 | Click on corporate card | Should land to corporate details page |
| 6 | Look for all the field displayed | Following fields should display :<br>-Company Logo(Disable)<br>-Type of company(Disable)<br>-No of sites<br>-Market & Territory<br>-Company Name(Disable)<br>-Street & No(Disable)<br>-Country(Disable)<br>-City(Disable)<br>-State(Disable)<br>-Zip Code(Disable)<br>-Address(Disable) |
| 7 | Try to edit any of the fields | User should not be able to edit any of the fields |
| 8 | Look for no of sites | The count of site should be same as displayed in previous corporate screen |
| 9 | Look for labels displayed in market & Territory field | Should display all markets and territory of which corporate and site belongs too. |

---

*Exported from TestLink*