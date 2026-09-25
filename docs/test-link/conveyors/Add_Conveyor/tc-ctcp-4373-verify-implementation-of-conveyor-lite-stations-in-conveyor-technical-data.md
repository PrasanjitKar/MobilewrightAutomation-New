# CTCP-4373 — Verify implementation of Conveyor Lite (Stations) in conveyor technical data

| Field | Value |
|---|---|
| **TC ID** | CTCP-4373 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify implementation of Conveyor Lite (Stations) in conveyor technical data |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Preconditions:** User is on add conveyor page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for stations field under conveyor lite stepper | Stations field should display under conveyor lite stepper |
| 2 | Look for checkbox display under station column | Total six station checkboxes should display |
| 3 | Click on 4th checkbox | Observe in Drive & Takeup, max four radio buttons should display in each column |
| 4 | Select the drive and takeup & save the conveyor | Conveyor should get saved as other field values are already filled |
| 5 | Now navigate to conveyor details in view mode | Selected stations field value should display in conveyor technical data |
| 6 | Login in web with same user and observe the same conveyor | Stations data should be the same in web also for same conveyor |

**Requirements:** CTCP-11808: CR: Mobile – Conveyor – Technical Data – Conveyor Lite (Stations)

**Keywords:** Regression

---

*Exported from TestLink*
