# TC-4812 — Validate auto filling and saving functionality for username and password

| Field | Value |
|---|---|
| **TC ID** | TC-4812 |
| **Suite** | LoginPage |
| **Name** | Validate auto filling and saving functionality for username and password |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Summary

Validate auto filling and saving functionality for username and password

## Preconditions

User is on login page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Validate the scenario in case user enter correct user name and password | Save password pop-up should come |
| 2 | Click on save password button | User credentails should get save and user should be login |
| 3 | Now click on logout button | user should be logout |
| 4 | Now enter correct username and incorrect password | ZUser should able to enter data |
| 5 | Click on save buttom | Error message displays but entered username & password should be retain in respective field |

---

*Exported from TestLink*