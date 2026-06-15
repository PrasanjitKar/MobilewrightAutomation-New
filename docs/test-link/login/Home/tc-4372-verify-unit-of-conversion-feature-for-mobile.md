# TC-4372 — Verify unit of conversion feature for mobile

| Field | Value |
|---|---|
| **TC ID** | TC-4372 |
| **Suite** | Home |
| **Name** | Verify unit of conversion feature for mobile |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Summary

Verify unit of conversion feature for mobile

## Preconditions

User is on setting screen Click on setting icon User will navigate to unit fo conversion screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User should be on unit conversion page | User is on unit conversion page |
| 2 | Select the unit via radio button and click on save changes button | Via radio button user select the unit as metric and save the changes |
| 3 | Now navigate to conveyor Add screen and add conveyor | Observe metric value should be displayed for all fields |
| 4 | Now logount he application | User should be able to logout |
| 5 | Now login with same user | User should be able to login |
| 6 | Now observe unit selection unit | unit selection should be metric only |
| 7 | Login to web application with same user | Observe in web application also the unit should be metric for all modules |
| 8 | Now from mobile change the unit to imperial and save the changes | User should be able to change the unit to imperial and save the chnages |
| 9 | Now navigate to any module having unit conversion eg conveyor, cover wear | Observe all fields value should be converted to imperial |
| 10 | Logount with user in mobile and login again | Post login also by default unit selection for same user in web and mobile will be imperial |

---

*Exported from TestLink*