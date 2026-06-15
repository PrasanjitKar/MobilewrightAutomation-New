# TC-2224 — Verify download symbol of conveyor on site details screen when available offline mode is enable

| Field | Value |
|---|---|
| **TC ID** | TC-2224 |
| **Suite** | Company → Site List |
| **Name** | Verify download symbol of conveyor on site details screen when available offline mode is enable |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is on site details screen |
| 2 | Look for donwload symbol for each conveyor listing | For each conveyor listing download symbol should display |
| 3 | Observe the Available offline mode radio button | Available offline mode should be in disabled form |
| 4 | Look for download symbol | Download symbol should be displayed in disabled form |
| 5 | Click on available offline mode | Offline mode should get enable |
| 6 | Look for alert pop-up | Alert pop-up should display with following message and fields :<br>- Site name displayed as heading <br>- Message : This information will be downloaded to your device. Do you wants to continue?<br>-Cancel <br>-Continue button<br>-Cancel button |
| 7 | If user click on Continue button | Avaible offline radio button should get enabled with each listed conveyor data get downloaded in offline mode with green color as indicator |
| 8 | If user click on cancel button instead of continue button | The pop-up should get close |

---

*Exported from TestLink*