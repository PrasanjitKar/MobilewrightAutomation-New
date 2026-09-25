# CTCP-4379 — Verify the filter functionality displayed in header

| Field | Value |
|---|---|
| **TC ID** | CTCP-4379 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify the filter functionality displayed in header |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the functionality for inspection date column

**Preconditions:** User is on inspection list page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for filter icon displayed in header | Filter icon should display |
| 2 | Click on filter icon | On click following option should display : Sort By : Last modified, A-Z, Z-A, Uploaded, Upload Pending |
| 3 | Verify filter | User can apply any date filter via calendar |
| 4 | Verify by default sorting of inspection event | By default sorting of inspection item should be on last modified date |
| 5 | Verify A-Z sorting filter | ON selecting A-Z sorting inspection event should be sort alphabetically from A-Z |
| 6 | Verify Z-A sorting filter | ON selecting Z-A sorting inspection event should be sort alphabetically from Z-A |
| 7 | Select Uploaded radio button | Event date should display only uploaded inspection not  uploading inspection event |
| 9 | Select Uploading radio button | Event date should display only Uploading inspection not Draft and Uploaded inspection event |
| 10 | Verify customer corporate filter | By selecting customer corporate, only selected customer corporates inspection event should display |
| 11 | Select site filter only | In case user select only site filter then only selected conveyor related inspection events should display |
| 12 | Select conveyor filter only | In case user select only conveyor filter then only selected conveyor related inspection events should display |
| 13 | Select condition filter only | In case user select only condition filter then only selected condition related inspection events should display |
| 14 | Select status filter only | In case user select only status filter then only selected status related inspection events should display |
| 15 | Verify the field type | Site is mandatory field |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
