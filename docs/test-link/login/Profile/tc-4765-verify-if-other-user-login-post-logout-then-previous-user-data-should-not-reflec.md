# TC-4765 — Verify if other user login post logout then previous user data should not reflect

| Field | Value |
|---|---|
| **TC ID** | TC-4765 |
| **Suite** | Profile |
| **Name** | Verify if other user login post logout then previous user data should not reflect |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Summary

Verify if other user login post logout then previous user data should not reflect

## Preconditions

Verify if other user login post logout then previous user data should not reflect

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login to application | User should able to login |
| 2 | Now logout and login with other user account | For new user, old user data should not load and data should load from start |
| 3 | Observe same behavior should happen in case old user logout via session timeout and new user login | For new user, old user data should not load and data should load from start |

---

*Exported from TestLink*