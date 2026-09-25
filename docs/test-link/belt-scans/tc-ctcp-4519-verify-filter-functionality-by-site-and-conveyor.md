# CTCP-4519 — Verify Filter functionality by site and conveyor

| Field | Value |
|---|---|
| **TC ID** | CTCP-4519 |
| **Suite** | Belt Scan |
| **Name** | Verify Filter functionality by site and conveyor |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Filter functionality by site and conveyor

**Preconditions:** User is logged into mobile application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user login to Mobile application as Master user | Belt Scan card should be displayed on home level |
| 2 | Verify user click on Belt Scan card | Belt Scan list page should be displayed |
| 3 | Verify user is able to see all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from home level | User should be able to view all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from home level |
| 4 | Verify user view the Belt Scan order | User should view the Belt Scan in mobile application in the same order as it is in web |
| 5 | Verify the sort functionality | Belt Scan should be sorted by last modified, ascending and descending order |
| 6 | Verify filter functionality | User should be able to apply filter to the Belt Scan based on Site and conveyor that has belt scan record |
| 7 | Verify based on the selected site conveyor is filtered | Based on selected site, conveyor should be filtered (This will display site and conveyor data having only belt scan record) |
| 8 | Verify user clear the filter from home level | Filters should be cleared and all the belt scan record should be displayed |
| 9 | Verify user is able to see all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from conveyor level | User should be able to view all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from conveyor level |
| 10 | Verify user view the Belt Scan order from conveyor level | User should view the conveyor level Belt Scan in mobile application in the same order as it is in web |
| 11 | Verify the sort functionality | Belt Scan should be sorted by last modified, ascending and descending order |
| 12 | Verify filter functionality | User should be disabled with conveyor and site field as it is already filtered; only device type should be enabled |
| 13 | Verify device type filter | Based on device type selected, filter should be applied |
| 14 | Verify user clear the filter from conveyor level | Filters should be cleared and only belt scan with selected conveyor should be displayed |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
