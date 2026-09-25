# CTCP-4114 — Verify QR scan in case Conti+ app is not installed and user don't have the permission also

| Field | Value |
|---|---|
| **TC ID** | CTCP-4114 |
| **Suite** | Heavy Equipment |
| **Name** | Verify QR scan in case Conti+ app is not installed and user don't have the permission also |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify QR scan in case Conti+ app is not installed and user don't have the permission also

**Preconditions:** User don't have the access right to HE module

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Scan the QR code | If Conti+ 2.0 App is not installed on phone, open link in default browser (e.g. Safari). After login with user credentials that have *not* required assignment and permission, show "Access denied". |

**Requirements:** CTCP-10221: Heavy Equipment Mobile: Scan QR Code using Phone Camera

**Keywords:** Regression

---

*Exported from TestLink*
