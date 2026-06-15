# TC-4652 — Verify the logic to display conveyor name in case site pointing toward north, conveyor line make 180

| Field | Value |
|---|---|
| **TC ID** | TC-4652 |
| **Suite** | Company → Site List |
| **Name** | Verify the logic to display conveyor name in case site pointing toward north, conveyor line make 180 |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Preconditions

<p>Site contain multiple conveyor pointing toward north and conveyor line make &gt;180 degree&nbsp;</p>

## Summary

<p>Verify the logic to display conveyor name in case site pointing toward north, conveyor line make 180</p>

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | <p>User is on site details page with multiple conveyor and one conveyor make &gt;180 degree angle&nbsp;</p> | <p>Required data should be available&nbsp;</p> |
| 2 | <p>Verify conveyor name displayed&nbsp;</p> | <p>If conveyor line angle is larger than 180&deg;, then we need to turn the Conveyor text label by 180&deg; for better readability.&nbsp;</p><br><br><p><img alt="Mobile_inspection v9.png" src="https://jira.auto.continental.cloud/secure/attachment/2858532/Mobile_inspection%20v9.png" /></p> |

---

*Exported from TestLink*