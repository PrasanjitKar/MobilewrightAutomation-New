# CTCP-4395 — Verify detail sequence & condition displayed for asset Other Pulleys

| Field | Value |
|---|---|
| **TC ID** | CTCP-4395 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify detail sequence & condition displayed for asset Other Pulleys |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify detail sequence & condition displayed for asset Other Pulleys

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the sequence displayed under Asset Other Pulley | Asset Other Pulley should be displayed in following detail sequence :<br>High Tension Take-up<br>Snub Pulley<br>Bin Pulley<br>Counterweight |
| 2 | Verify the condition displayed when user select detail as High Tension Take-up | Following condition should display : Critical, Fault & Good |
| 3 | Verify the condition displayed when user select detail as Snub Pulley | Following condition should display : Critical, Fault & Good |
| 4 | Verify the condition displayed when user select detail as Bin Pulley | Following condition should display : Critical, Fault & Good |
| 5 | Verify the condition displayed when user select detail as Counter weight | Following condition should display : Critical, Fault & Good |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
