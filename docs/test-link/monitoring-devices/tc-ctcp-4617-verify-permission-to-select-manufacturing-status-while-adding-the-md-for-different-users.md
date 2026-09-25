# CTCP-4617 — Verify permission to select Manufacturing status while adding the MD for different users

| Field | Value |
|---|---|
| **TC ID** | CTCP-4617 |
| **Suite** | Monitoring Devices |
| **Name** | Verify permission to select Manufacturing status while adding the MD for different users |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

**Summary:** Verify permission to select Manufacturing status while adding the MD for different users

**Preconditions:** User is on MD listing page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as Master user and click on Add icon in MD Listing screen | Master user is able to select the status "Manufacturuing.) |
| 2 | Login as CCM user and click on Add icon in MD Listing screen | CCM is able to select the status "Manufacturuing. |
| 3 | Login as Key user and click on Add icon in MD Listing screen | Key is able to select the status "Manufacturuing. |
| 4 | Login as customer user and click on Add icon in MD Listing screen | Customer user should not be able to select the status "Manufacturuing. |
| 5 | Login as Distributor user and click on Add icon in MD Listing screen | Distributor user should not be able to select the status "Manufacturuing. |
| 6 | Login as Std Conti user and click on Add icon in MD Listing screen | Std Conti user should not be able to select the status "Manufacturuing. |
| 7 | Login as Market Manager user and click on Add icon in MD Listing screen | Market Manager user should not be able to select the status "Manufacturuing. |
| 8 | Login as Territory Manager user and click on Add icon in MD Listing screen | Territory Manager user should not be able to select the status "Manufacturuing. |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
