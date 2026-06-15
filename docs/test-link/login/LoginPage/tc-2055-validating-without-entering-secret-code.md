# TC-2055 — Validating without entering secret code

| Field | Value |
|---|---|
| **TC ID** | TC-2055 |
| **Suite** | LoginPage |
| **Name** | Validating without entering secret code |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Preconditon: | User is in resetpassword page |
| 2 | Enter emial id | User should be able to the enter the mail id |
| 3 | Donot enter the secret code in the verification code | User should be able to enter the secret code in the verification field |
| 4 | Enter the new password and confirm password | User should be abkle to Enter the new password and confirm password |
| 5 | click on submit button | Application should show an error message stating "Please enter verification code" |

---

*Exported from TestLink*