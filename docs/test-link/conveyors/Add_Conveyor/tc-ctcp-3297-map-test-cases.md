# CTCP-3297 — Map Test cases

| Field | Value |
|---|---|
| **TC ID** | CTCP-3297 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Map Test cases |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on Add conveyor page |
| 2 | Fill all the mandatory fields | User should able to fill the mandatory fields |
| 3 | Look for the coordinates fields | Coordinates field should display |
| 4 | Enter coordinates for head (Lat, Long) | User should able to enter lat long value |
| 5 | Observe the map | As user enters head coordinates, pin showing location should display |
| 6 | Enter coordinates for tail position (Lat, Long) | User should able to enter tail position |
| 7 | Observe the map | As user enters tail coordinates, pin showing location should display |
| 8 | Click on Save and close button | The details of conveyor should get saved |
| 9 | Revisit the conveyor from list page | The map should display the entered location for head and tail |
| 10 | Observe conveyor name in the map | Conveyor name should be displayed as label in map |

**Requirements:** CTCP-11375: CR: Mobile: Conveyors - Update Head & Tail Pin Design (V.7); CTCP-12110: CR: Site Map Conveyor Label (V.8) - mobile

**Keywords:** Regression

---

*Exported from TestLink*
