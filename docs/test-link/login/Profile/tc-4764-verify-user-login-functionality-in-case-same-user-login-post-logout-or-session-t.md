# TC-4764 — Verify user login functionality in case same user login post logout or session timeout

| Field | Value |
|---|---|
| **TC ID** | TC-4764 |
| **Suite** | Profile |
| **Name** | Verify user login functionality in case same user login post logout or session timeout |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Summary

Verify user login functionality in case same user login post logout or session timeout

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login to application | User should able to login to application and entire data is loaded |
| 2 | Now navigate to profile and user intentionally logout | User should able to logout |
| 3 | Now login with the same user again | Observe post logout if same user login, all data should instantly get load for all modules as the data is served from mobile chache |
| 4 | validate the same behaviour if user logout via session timeout | The functionality should work as mentioned in above step if same user login again |

---

*Exported from TestLink*