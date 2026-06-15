# TC-2185 — Verify upload image functionality via camera

| Field | Value |
|---|---|
| **TC ID** | TC-2185 |
| **Suite** | Company → Corporate_List |
| **Name** | Verify upload image functionality via camera |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition : | User is add customer corporate |
| 2 | Look for profile image icon | Profile image icon should display |
| 3 | Click on profile image | On click pop-up should display in footer :<br>-Camera <br>-Gallery |
| 4 | Click on camera | As user click on camera, device camera should open |
| 5 | Capture image | User should able to capture image with following options :<br>-Cross button(On click should land to add corporate screen)<br>-Tick mark(on Click image should upload)<br>- Return symbol(On click current image should get removed and camera opens again to take new image) |
| 6 | Click on Tick option | On click image should get save and user should redirect to add corporate screen |

---

*Exported from TestLink*