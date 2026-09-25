# CTCP-4568 — Verify inspection map condition in case conveyor is not having any location

| Field | Value |
|---|---|
| **TC ID** | CTCP-4568 |
| **Suite** | Inspections → Map |
| **Name** | Verify inspection map condition in case conveyor is not having any location |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify inspection map condition in case conveyor is not having any location

**Preconditions:** Considering site S1 is created with location. Conveyor C1 without head and tail position is mapped to Site S1. User is adding inspection to conveyor C1. Location permission is on

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User is on add inspection info screen | On inspection info screen site map location should display |
| 2 | Add item in event | User should able to add item |
| 3 | Look for map load in item screen | Current location of user should load in item map |
| 4 | Click on map section | Map should open in full screen mode |
| 5 | Look for direction indicator | Direction indicator should display in full screen mode |
| 6 | Save the item | User should able to save the item |
| 7 | Save the event | User should able to save the event |
| 8 | Now navigate to view mode of same inspection event | In view mode on inspection info screen site location should display & on item list screen map should display user pin location |
| 9 | Now navigate to edit mode of same inspection event | User should able to edit the inspection event |
| 10 | Now navigate to edit mode of same inspection event | In edit mode also same location should display which user have added and displayed in view mode |

**Requirements:** CTCP-13538:  Inspection Site Map changes [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
