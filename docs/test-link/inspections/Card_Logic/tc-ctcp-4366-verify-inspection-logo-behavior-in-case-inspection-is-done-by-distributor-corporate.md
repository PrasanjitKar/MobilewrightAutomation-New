# CTCP-4366 — Verify inspection logo behavior in case inspection is done by distributor corporate

| Field | Value |
|---|---|
| **TC ID** | CTCP-4366 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify inspection logo behavior in case inspection is done by distributor corporate |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify inspection logo behavior in case inspection is done by distributor corporate

**Preconditions:** Considering Dist user A belongs to Dist corporate DC, Dist corp having profile image. Login with user A in mobile and two inspection event : Inspection 1 - Don't add any inspection logo Inspection 2 - Add insepction logo

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login to mobile application with Dist user A | User should be able to login |
| 2 | Donwnload inspection report of inspection 1 | Dist corporate logo to which Dist user belongs will be dispalyed in pdf report in left hand side. If distributor corporate logo and custom inspection logog added by dist user is not there then conti logo will be dispalyed in pdf report |
| 3 | Donwload inspection 2 | Observe in pdf report custome added dist logo which creating the inspection will be dispalyed |

**Requirements:** CTCP-11119:  Inspections - Mobile [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
