# CTCP-3284 — Verify upload image functionality via Camera

| Field | Value |
|---|---|
| **TC ID** | CTCP-3284 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify upload image functionality via Camera |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on Add conveyor page |
| 2 | Click on image icon | On click, following options should display: Gallery, Camera |
| 3 | Select Camera option | The device camera should open |
| 4 | Capture the image | User should able to capture the image with three options displayed at bottom: Return (opens camera again), Tick (updates the image in profile), Cross (lands to Add conveyor screen) |
| 5 | Select tick option | User should land to Add conveyor screen with the same image updated in profile |
| 6 | Click on save button | The image should get saved |
| 7 | Verify conveyor profile image gets updated | The profile image of conveyor should get updated with the same image |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
