# TC-PROFILE-005: Report Issue Dialog & Log Export

> **Suite**: `profile` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/widgets/report_issue_dialog.dart` (`ReportIssueView`, `ReportIssueDialog`)

---

## 🎯 Objective
Verify opening the "Report Issue" feedback modal from the Profile grid, typing comments, triggering log directory compression (`.zip`), device metadata attachment, and launching the email composer or system share sheet.

---

## 📋 Preconditions
- User is on `ProfileScreen`.

---

## 🧪 Test Steps
1. On `ProfileScreen`, tap the **Report Issue** card (`caution_24x24`).
2. Verify `ReportIssueDialog` opens with:
   - Dialog title "Report Issue".
   - Multiline Comments text area.
   - Cancel and Submit action buttons.
3. Enter issue description in the Comments field (e.g., "Encountered sync delay in Cover Wear module").
4. Tap **Submit**.
5. Verify `FlutterLogs.exportLogs()` is invoked and loading spinner displays.
6. Verify device logs are zipped into `Logs_<timestamp>.zip` and metadata is appended.
7. Verify email composer is opened with subject "Error Report", recipient `supportEmailId`, comments body, and `.zip` attachment.
8. If email client is unavailable, verify fallback `ConfirmationDialogTemplate` opens to save/share the zip file.

---

## 🔍 Expected Results
- Diagnostics report with complete device logs is compiled and forwarded for support analysis.

---

## 📱 Flutter Source Reference
- **Dialog Widget**: `lib/src/ui/widgets/report_issue_dialog.dart` (`showReportIssueDialog`)
- **Logging**: `lib/src/ui/screens/log/logging_service.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_report_issue @regression @both
Scenario: Submit feedback and export logs via Report Issue dialog
  Given the user is on the Profile screen
  When the user taps Report Issue
  And enters comments in the feedback dialog
  And taps Submit
  Then the logs should be compiled into a zip file
  And the system email composer or share sheet should open with the attachment
```
