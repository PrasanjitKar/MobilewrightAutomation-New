# CTCP-4398 — Verify detail sequence & condition displayed for asset Drive Pulley

| Field | Value |
|---|---|
| **TC ID** | CTCP-4398 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify detail sequence & condition displayed for asset Drive Pulley |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify detail sequence & condition displayed for asset Drive Pulley

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the sequence displayed under Asset Drive Pulley | Asset Drive Pulley should be displayed in following detail sequence :<br>Lagging Condition<br>Primary Cleaner Condition<br>Secondary Cleaner Condition |
| 2 | Verify the condition displayed when user select detail as Lagging Condition | Following condition should display : Critical, Fault & Good |
| 3 | Verify the condition displayed when user select detail Primary Cleaner Condition | Following condition should display : Critical, Fault & Good |
| 4 | Verify the condition displayed when user select detail Secondary Cleaner Condition | Following condition should display : Critical, Fault & Good |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
