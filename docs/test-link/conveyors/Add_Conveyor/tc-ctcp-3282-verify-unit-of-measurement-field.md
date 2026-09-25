# CTCP-3282 — Verify Unit of measurement field

| Field | Value |
|---|---|
| **TC ID** | CTCP-3282 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify Unit of measurement field |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on Add conveyor page |
| 2 | Look for unit of measurement field | The field should display with two radio buttons: Imperial, Metric |
| 3 | Select radio button as Imperial | On selecting unit as imperial, the following fields display in imperial units: Belt Width(in), Belt Speed(ft/min), Tons per Hour Peak(stph), Material Density(lb/ft³), Angle of Idlers[deg(°)], Carry side Idler spacing(ft), TakeUp Tension (if known)[lb], Width(in), Rating(piw), Top cover thickness(in), Bottom cover thickness(in), Length(ft) |
| 4 | Select radio button as Metric | On selecting unit as metric, the following fields display in metric units: Belt Width(mm), Belt Speed(m/s), Tons per Hour Peak(t/h), Material Density(kg/m³), Angle of Idlers[deg(°)], Carry side Idler spacing(m), TakeUp Tension (if known)[N], Width(mm), Rating(N/mm), Top cover thickness(mm), Bottom cover thickness(mm), Length(m) |
| 5 | Verify Unit of measure field is mandatory field | Unit of measure is not a mandatory field |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
