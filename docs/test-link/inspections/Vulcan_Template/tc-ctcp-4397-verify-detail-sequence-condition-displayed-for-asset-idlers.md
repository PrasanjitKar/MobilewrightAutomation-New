# CTCP-4397 — Verify detail sequence & condition displayed for asset Idlers

| Field | Value |
|---|---|
| **TC ID** | CTCP-4397 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify detail sequence & condition displayed for asset Idlers |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify detail sequence & condition displayed for asset Idlers

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the sequence displayed under Idlers | Asset Idlers should be displayed in following detail sequence :<br>Broken/Frozen |
| 2 | Verify the condition displayed when user select detail as Broken/Frozen | Following condition should display : Critical, Fault & Good<br>Following legend should display : Critical - Broken, imminent threat to belt or safety<br>Fault - Frozen, not critical<br>Good - Operating within specification |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
