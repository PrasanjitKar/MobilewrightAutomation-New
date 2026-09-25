# TC-CONVEYOR-INSPECT-030 — Form Validation — mandatory fields and empty upload validation

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-030 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_form_validation` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `AddEditConveyorInspectEvent` validates all mandatory inputs (Site, Conveyor, Inspection Type, and at least one image package for LHS or RHS), blocks submission, and highlights missing fields with red error messages when empty.

---

## ✅ Preconditions

- User is on `AddEditConveyorInspectEvent` screen with all fields empty

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `AddEditConveyorInspectEvent`, tap "Create" without filling any fields | Form validation triggers |
| 2 | Check Site field | Red error text: "Please select a site" |
| 3 | Check Conveyor field | Red error text: "Please select a conveyor" |
| 4 | Fill Site and Conveyor, but do not attach any photos or thermal scans | Form remains incomplete |
| 5 | Tap "Create" button | Banner/Toast displays: "Please attach at least one inspection image or thermal scan" |

---

## 🏁 Expected Results

- User cannot submit incomplete or invalid conveyor inspection events

---

## 🔍 Flutter Source Reference

```dart
// add_edit_conveyor_inspect_event.dart
if (_formKey.currentState?.validate() != true || (lhsFiles.isEmpty && rhsFiles.isEmpty)) {
  showToast(context, 'Please attach at least one inspection image');
  return;
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_form_validation @regression @both
Scenario: Validate mandatory fields on Add Conveyor Inspect form
  Given the user is on the Add Conveyor Inspect form
  When the user taps Create without filling mandatory fields
  Then validation errors should highlight Site, Conveyor, and Image attachments
  And the inspection should not be submitted
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-002 — Create thermal event](./tc-conveyor-inspect-002-create-thermal-inspection-event.md)
- [Suite index](./index.md)
