# CTCP-4608 — Verify user should be able to add monitoring devices from device listing screen

| Field | Value |
|---|---|
| **TC ID** | CTCP-4608 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user should be able to add monitoring devices from device listing screen |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user should be able to add monitoring devices from device listing screen

**Preconditions:** USer is logged into mobile app and is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify "+" button available to initiate the action on the device listing screen | "+" ion is displayed |
| 2 | Verify user click on + icon | Add monitoring device header should be displayed with Create and cancel button |
| 3 | Verify the field in step1 Add device tab | Add device tab should be hoghlighted with below input fields<br>Device Name *<br>Device Type *<br>CordProtect<br>LoadSense<br>MultiProtect<br>Other<br>RipProtect<br>SurfaceProtect<br>Brand<br>Serial Number<br>Firmware Version<br>Remote Connection<br>Installation Date<br>Commissioning Date<br>Last Service Date<br>Access to System Software<br>Belt / Conveyor Saves<br>Status *<br>Running<br>Not in Operation<br>Prior to Commissioning<br>Manufacturing<br>Comments |
| 4 | Verify user enter all the fields in step 1 click on next button | Step 2: "Add Location" tab selected with below fields<br>Associated Distributor<br>Site *<br>Conveyor *<br>Time Zone *<br>Latitude<br>Longitude |
| 5 | Verify default time zone dropdown | local device timezone should be default and user is allowed to change the drop down |
| 6 | Verify user enter all the values in step 2 and click on cancel | Monitoring device is not created and redirected to device listing page |
| 7 | Verify user click on + icon and enter all the details in step and step2 and click on create button | Monitoring Device should be created |
| 8 | Verify all the drop down fields search field in dropdown is removed<br>Drop dwon fields are<br>1. Device type<br>2. Remote Connection<br>3.Status<br>4. Associated distributor<br>5. Site<br>6. Conveyor | search field in dropdown should removed if dropdown list is not scrollable. |
| 9 | Verify user search for the newly created device | Newly created device should be displayed when searched |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1] CTCP-15199:  [Monitoring device] Mobile: Adding new field TimeZone [Version : 1] CTCP-17015:  Remove Search in dropdown if list is not scrollable [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
