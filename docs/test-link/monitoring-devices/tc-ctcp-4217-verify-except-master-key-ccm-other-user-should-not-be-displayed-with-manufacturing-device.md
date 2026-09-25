# CTCP-4217 — Verify Except Master/Key/CCM, other user should not be displayed with manufacturing device.

| Field | Value |
|---|---|
| **TC ID** | CTCP-4217 |
| **Suite** | Monitoring Devices |
| **Name** | Verify Except Master/Key/CCM, other user should not be displayed with manufacturing device. |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Except Master/Key/CCM, other user should not be displayed with manufacturing device.

**Preconditions:** User logged in as Cust/Dist/MM/TM/Std cont User and is on monitoring device listing page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as Cust user and navigate to MD page | Device having status with manifacturing should not be displayed |
| 2 | Login as Distuser and navigate to MD page | Device having status with manifacturing should not be displayed |
| 3 | Login as MM user and navigate to MD page | Device having status with manifacturing should not be displayed |
| 4 | Login as TM user and navigate to MD page | Device having status with manifacturing should not be displayed |
| 5 | Login as std conti user and navigate to MD page | Device having status with manifacturing should not be displayed |

**Requirements:** CTCP-13332:  Support Monitoring device Manufacturing status in Mobile [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
