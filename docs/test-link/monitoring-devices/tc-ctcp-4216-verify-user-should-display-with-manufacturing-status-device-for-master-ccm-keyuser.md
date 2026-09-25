# CTCP-4216 — Verify user should display with Manufacturing status device for Master/CCM/Keyuser

| Field | Value |
|---|---|
| **TC ID** | CTCP-4216 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user should display with Manufacturing status device for Master/CCM/Keyuser |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user should display with Manufacturing status device for Master/CCM/Keyuser

**Preconditions:** Master/CCM/Key User should add device with manufacturing status from web

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify as master user, add a device with status as manufacturing | Device should be added in web and check the count |
| 2 | Verify as master user in mobile, check the Monitoring device card | Card count should display the Yellow flag |
| 3 | Verify mobile user navigate to listing screen | Manufactur device that was added from the web should be displayed. |
| 4 | Verify the file manager icon will be disabled for Manufacturing status device | File manger folder is disabled for the user |
| 5 | Verify the step from 1-4 for CCM | Expected Result from Step1-4 should be dipslayed |
| 6 | Verify from step1-4 for Key USer | Expected Result: from step1-4 should be working as expected |
| 7 | Verify for the above mentioned user, Yellow condition flag should be displayed | Yellow condition flag should be displayed and correct count as per web should be displayed |

**Requirements:** CTCP-13332:  Support Monitoring device Manufacturing status in Mobile [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
