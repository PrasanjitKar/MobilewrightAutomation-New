# CTCP-4570 — Verify inspection map functionality in case user device location is off

| Field | Value |
|---|---|
| **TC ID** | CTCP-4570 |
| **Suite** | Inspections → Map |
| **Name** | Verify inspection map functionality in case user device location is off |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify inspection map functionality in case user device location is off

**Preconditions:** Considering site S1 is created with location. Conveyor C1 has head and tail position & is mapped to Site S1. User is adding inspection to conveyor C1. Location permission of device is off.

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User is on add inspection info screen | On inspection info screen site map location should display with conveyor name along with head and tail position |
| 2 | Add item in event | User should able to add item |
| 3 | Look for map load in item screen | Conveyor location should display not user current location as location service is off |
| 4 | Click on map section | Map should open in full screen mode |
| 5 | Look for direction indicator | No Direction indicator should display in full screen mode |
| 6 | Save the item | User should able to save the item |

**Requirements:** CTCP-13538:  Inspection Site Map changes [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
