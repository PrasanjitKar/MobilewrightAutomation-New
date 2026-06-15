# TC-2211 — verify complete view flow for site

| Field | Value |
|---|---|
| **TC ID** | TC-2211 |
| **Suite** | Company → Site List |
| **Name** | verify complete view flow for site |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on site list page |
| 2 | Look for a site having conveyor count displayed in listing | The respective site should display |
| 3 | Click on respective site listing | On click should navigate to site details screen |
| 4 | Look for the fields displayed on page | Following fields should display :<br>- Site card showing :<br>   - Site name <br>   -Address <br>   -Market & country label<br>   - Company logo<br>   - Count of conveyors<br>- All the conveyors listed in site with :<br>   - conveyor logo<br>   - Conveyor name <br>   - Site name, city<br>   - Last updated e.g.- 6 Aug 2022<br>   -Inspection alert symbol with count<br>   -Download symbol<br>   -Three dots(Edit and Delete) |
| 5 | Click on site card card | Should land to site  details page |
| 6 | Look for all the field displayed | Following fields should display :<br>-Company Logo(Disable)<br>-Territory Manager Name(Disable)<br>-Territory manager number(Disable)<br>-Number of conveyors (Disable)<br>-Market & Territory label(Disable)<br>-Under company information<br>   -Company Name(Disable)<br>   -Type of company(Disable)<br>-Under Additional imformationCountry<br>    - Address(Disable)<br>    -Map |
| 7 | Try to edit any of the fields | User should not be able to edit any of the fields |
| 8 | Look for no of conveyors | The count of conveyor should be same as displayed in previous site screen |
| 9 | Look for labels displayed in market & Territory field | Should display all markets and territory of which Site belongs too. |

---

*Exported from TestLink*