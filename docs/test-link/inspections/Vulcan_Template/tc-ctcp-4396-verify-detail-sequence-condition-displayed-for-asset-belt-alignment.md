# CTCP-4396 — Verify detail sequence & condition displayed for asset Belt Alignment

| Field | Value |
|---|---|
| **TC ID** | CTCP-4396 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify detail sequence & condition displayed for asset Belt Alignment |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify detail sequence & condition displayed for asset Other Pulleys

**Preconditions:** Verify detail sequence & condition displayed for asset Belt Alignment

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the sequence displayed under Asset Belt Alignment | Asset Belt Alignment should be displayed in following detail sequence :<br>Take-up<br>Head Pulley<br>Tail<br>Overall |
| 2 | Verify the condition displayed when user select detail Take-up | Following condition should display :  Fault & Good<br>Displayed legend should be : Fault - Off-L or Off-R (Facing Head Pulley)<br>Good - Centered |
| 3 | Verify the condition displayed when user select detail as Head Pulley | Following condition should display :  Fault & Good<br>Displayed legend should be : Fault - Off-L or Off-R (Facing Head Pulley)<br>Good - Centered |
| 4 | Verify the condition displayed when user select detail as Tail | Following condition should display :  Fault & Good<br>Displayed legend should be : Fault - Off-L or Off-R (Facing Head Pulley)<br>Good - Centered |
| 5 | Verify the condition displayed when user select detail as Overall | Following condition should display :  Fault & Good<br>Displayed legend should be : Fault - Off-L or Off-R (Facing Head Pulley)<br>Good - Centered |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
