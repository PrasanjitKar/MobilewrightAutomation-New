# TC-2225 — Verify functionality to disable available offline mode

| Field | Value |
|---|---|
| **TC ID** | TC-2225 |
| **Suite** | Company → Site List |
| **Name** | Verify functionality to disable available offline mode |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on site details screen |
| 2 | Look for oavaible offline mode | Avaibale offline mode should be displayed in enabled form |
| 3 | Click on avaible offline radio button again | Pop-up should display with following message and fields :<br>Site name should be displayed in heading <br>-Message : Delete stored data. Do you want to continue ?<br>-Cancel button<br>-Continue button |
| 4 | If user click on continue button | Avaible offline mode should get disbale with data downloaded get removed from device |
| 5 | If user click on cancel button instead of continue button | The offline mode still be in enabled form |

---

*Exported from TestLink*