# CTCP-4112 — Verify QR code scanning functionality in case Conti+ app is installed but user not have access of HE

| Field | Value |
|---|---|
| **TC ID** | CTCP-4112 |
| **Suite** | Heavy Equipment |
| **Name** | Verify QR code scanning functionality in case Conti+ app is installed but user not have access of HE |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify QR code scanning functionality in case Conti+ app is installed but user not have access of HE

**Preconditions:** User do not have access of HE module via permission and assignment screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Scan the QR code | If Conti+ 2.0 App installed on phone and user has *not* required assignment and permission to access object, show "Access denied" in Conti+ 2.0 App |
| 2 | Scan the QR code | If Conti+ 2.0 App installed on phone and user has *not* required assignment and permission to access object, show "Access denied" in Conti+ 2.0 App |

**Requirements:** CTCP-10221: Heavy Equipment Mobile: Scan QR Code using Phone Camera

**Keywords:** Regression

---

*Exported from TestLink*
