# TC-2249 — Verify login by removing the app from background

| Field | Value |
|---|---|
| **TC ID** | TC-2249 |
| **Suite** | Company → Negative cases |
| **Name** | Verify login by removing the app from background |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login into the application | Home page is displayed |
| 2 | Now move the app in background | User should able to move the app in background |
| 3 | Open any other app | User should bale to open any other app |
| 4 | Now move the current app to background | User should able to move the app in background |
| 5 | From background navigate to conti+ app again | App should not ask to login it should land to home screen |

---

*Exported from TestLink*