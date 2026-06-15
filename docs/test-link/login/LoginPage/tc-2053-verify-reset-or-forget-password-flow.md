# TC-2053 — Verify reset or forget password flow

| Field | Value |
|---|---|
| **TC ID** | TC-2053 |
| **Suite** | LoginPage |
| **Name** | Verify reset or forget password flow |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Summary

Verify reset or forget password flow

## Preconditions

user is on application login page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Preconditon: | User is in verification page |
| 2 | Enter registered email id | User should be able to enter the email id in email id field |
| 3 | Click on submit | Reset password page displyed |
| 4 | Enter secret code recived to the registed email id | User should be able to enter the secret code in the verification field |
| 5 | Enter the new and old password | old and new password should be displayed |
| 6 | Click on submit button | User should be redirected to login page |

---

*Exported from TestLink*