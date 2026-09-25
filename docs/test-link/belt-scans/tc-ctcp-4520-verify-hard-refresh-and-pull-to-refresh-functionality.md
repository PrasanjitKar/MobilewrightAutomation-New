# CTCP-4520 — Verify hard refresh and pull to refresh functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-4520 |
| **Suite** | Belt Scan |
| **Name** | Verify hard refresh and pull to refresh functionality |
| **Priority** | Low |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify hard refresh and pull to refresh functionality

**Preconditions:** User is logged into mobile application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user is on belt scan listing page from home level | Belt scan record should be displayed |
| 2 | Verify user add belt scan record from web | Belt scan record should be added |
| 3 | Verify user perform pull to refresh | Belt scan record added from the web should be displayed after pull to refresh and all other records should be displayed |
| 4 | Verify user is on belt scan listing page from conveyor level | Belt scan record for the respective conveyor should be displayed |
| 5 | Verify user add belt scan record from conveyor level from web | Belt scan record should be added from conveyor level |
| 6 | Verify user perform pull to refresh | Belt scan record added from the web should be displayed after pull to refresh and all other records with respect to conveyor should be displayed |
| 7 | Verify user add belt scan record from web | Belt scan record should be added |
| 8 | Verify user perform hard refresh (for both home and conveyor level) | Belt scan record added from the web should be displayed after hard refresh and all other records should be displayed |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
