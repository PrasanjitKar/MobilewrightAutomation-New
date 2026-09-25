# CTCP-4393 — Verify detail sequence & condition displayed for asset Tail pulley

| Field | Value |
|---|---|
| **TC ID** | CTCP-4393 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify detail sequence & condition displayed for asset Tail pulley |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify detail sequence & condition displayed for asset Tail pulley

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the sequence displayed under Asset tail Pulley | Asset Tail Pulley should be displayed in following detail sequence :<br>Lagging Condition<br>v-Plow Wiper Rubber Condition<br>Skirt Rubber Condition<br>Load Zone |
| 2 | Verify the condition displayed when user select detail as Lagging Condition | Following condition should display : Critical, Fault & Good |
| 3 | Verify the condition displayed when user select detail as v-Plow Wiper Rubber Condition | Following condition should display : Critical, Fault & Good |
| 4 | Verify the condition displayed when user select detail as Skirt Rubber Condition | Following condition should display : Critical, Fault & Good |
| 5 | Verify the condition displayed when user select detail as Load Zone | Following condition should display : Critical, Fault & Good |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
