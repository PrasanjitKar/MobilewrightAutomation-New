# CTCP-4108 — Verify back navigation functionality when user scan the monitoring device

| Field | Value |
|---|---|
| **TC ID** | CTCP-4108 |
| **Suite** | Monitoring Devices |
| **Name** | Verify back navigation functionality when user scan the monitoring device |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify back navigation functionality when user scan the monitoring device

**Preconditions:** User scan  QA code of monitoring device via mobile

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Scan QR code of monitoring device | User should be able to scan the device |
| 2 | Post scanning landing page | User should land to view mode of that particular device post scanning |
| 3 | Click on back button | On click back button user will land to device listing screen at site level |
| 4 | Click on back button | User will land to conveyor details screen |

**Requirements:** CTCP-10231:  Mobile : Version v7 : Monitoring devices back navigation changes as per dee [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
