# CTCP-4363 — Verify inspection card count data at conveyor level

| Field | Value |
|---|---|
| **TC ID** | CTCP-4363 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify inspection card count data at conveyor level |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify inspection card count data at conveyor level

**Preconditions:** User have logged in to Conti + application and landed to home page Refer site S1 and conveyor A1, A2, A3 & A4 inspection data added above

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to conveyor  details page A1 | User navigate to Conveyor details page of A1 |
| 2 | Look for inspection card count | The inspection card should display following count : Event count -1 To be completed -0<br>Green flag should not be displayed in inspection card |
| 3 | Navigate to conveyor  details page A2 | User navigate to Conveyor details page of A2 |
| 4 | Look for inspection card count | The inspection card should display following count :<br>Event count -1<br>To be completed -1<br>Yellow-1 |
| 5 | Navigate to conveyor  details page A3 | User navigate to Conveyor details page of A3 |
| 6 | Look for inspection card count | The inspection card should display following count :<br>Event count -1<br>To be completed -1<br>Orange-1 |
| 7 | Navigate to conveyor  details page A4 | User navigate to Conveyor details page of A4 |
| 8 | Look for inspection card count | The inspection card should display following count :<br>Event count -1<br>To be completed -1<br>Red-1 |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
