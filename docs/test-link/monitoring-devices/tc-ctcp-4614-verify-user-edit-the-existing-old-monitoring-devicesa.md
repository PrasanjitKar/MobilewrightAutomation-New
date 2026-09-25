# CTCP-4614 — Verify user edit the existing old monitoring devicesa

| Field | Value |
|---|---|
| **TC ID** | CTCP-4614 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user edit the existing old monitoring devicesa |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user edit the existing old monitoring devicesa

**Preconditions:** USer is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user select an old exiting monitoring device and edit the device | device should be in editing mode |
| 2 | Verify the time zone value for old existing device | Local time zone should be displayed as default time zon for old existing time zone |
| 3 | Verify user change the time zon in the edit mode | Time zone should be changed |
| 4 | Verify user update few fields and save | Device should be updated successfully and count should be updated accordingly |
| 5 | Verify user view the updated device | Updated data should be displayed in the view mode |
| 6 | Verify in the view mode user should not be able to edit any of the fields | No fields should be editable in the view mode. |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1] CTCP-15199:  [Monitoring device] Mobile: Adding new field TimeZone [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
