# CTCP-4394 — Verify detail sequence & condition displayed for asset Belt

| Field | Value |
|---|---|
| **TC ID** | CTCP-4394 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify detail sequence & condition displayed for asset Belt |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify detail sequence & condition displayed for asset Belt

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the sequence displayed under Asset belt | Asset Belt should be displayed in following detail sequence :<br>Splice Condition1<br>Splice Condition 2<br>Top cover wear<br>Bottom Cover wear<br>Visible Damage |
| 2 | Verify the condition displayed when user select detail as Splice Condition1 | Following condition should display : Critical, Fault & Good |
| 3 | Verify the condition displayed when user select detail as Splice Condition 2 | Following condition should display : Critical, Fault & Good |
| 4 | Verify the condition displayed when user select detail as Top cover wear | Following condition should display : Critical, Fault & Good |
| 5 | Verify the condition displayed when user select detail as Bottom cover wear | Following condition should display : Critical, Fault & Good |
| 6 | Verify the condition displayed when user select detail as visible damage | Following condition should display : Critical, Fault & Good |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
