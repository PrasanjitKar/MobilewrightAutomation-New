# CTCP-4511 — Verify user Download Belt Scan pdf

| Field | Value |
|---|---|
| **TC ID** | CTCP-4511 |
| **Suite** | Belt Scan |
| **Name** | Verify user Download Belt Scan pdf |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user Download Belt Scan pdf

**Preconditions:** User should have the Belt Scan added

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user login to Mobile application as Master user | Belt Scan card should be displayed on home level |
| 2 | Verify user click on Belt Scan card | Belt Scan list page should be displayed |
| 3 | Verify Download option available on list view | Download option in list view available |
| 4 | Verify user click on one of the Belt Scan Record | PDF preview of Belt Scan should be available with download option |
| 5 | Verify user click on download option | Belt Scan Record should be downloaded and saved in the mobile. |
| 6 | Verify user view the downloaded file | Downloaded file content should be same as in web and mobile download file |
| 7 | Verify downloaded file name | Downloaded file name should be same file name that was uploaded in the web application |
| 8 | Verify the above steps from conveyor as well | User should be able to download Belt Scan Record from conveyor level |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
