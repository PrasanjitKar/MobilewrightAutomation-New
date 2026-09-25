# CTCP-4615 — Verify the quick action are available for device added from mobile and their functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-4615 |
| **Suite** | Monitoring Devices |
| **Name** | Verify the quick action are available for device added from mobile and their functionality |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the quick action are available for device added from mobile and their functionality

**Preconditions:** User is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on the 'Monitoring Devices' card is visible on the Home page. | User is navigated to Monitoring Devices list page. |
| 2 | Verify the Quick actions are available for each Device under Device list screen | User could see below Quick actions:<br>- File Manager<br>- Access to System Software<br>- Monitoring Device Location<br>- QR Code |
| 3 | Verify user click on file manger icon | User is redirected to file manger of the conveyor level with default folder( created under monitoring device folder<br>Folder name will be device name |
| 4 | Verify user should be able to upload image, video and files | Images, videos and files should be uplodaed |
| 5 | Verify the uploaded files should be able to download | Uploaded files should be downloaded in the device |
| 6 | Verify user click on Access to system software link | USer should be redirected to the link provided in the system software link |
| 7 | Verify user click on monitoring device location | Monitoring Device pin should be displayed on the maps with the name of the device |
| 8 | Verify user click on the QR code icon | QR code should be displayed |
| 9 | Verify user download the QR code | QA should be downloaded in the device with device name |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
