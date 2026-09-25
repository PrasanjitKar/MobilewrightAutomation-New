# TC-INSPECTIONS-020 — Add Event — site selection auto-generates name and populates template

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-020 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_site_auto_name` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting a site on `AddInspectionEventScreen` executes `setSiteForInspection()`, resolves the site/corporate template, links territory/market IDs, auto-populates the Inspection Name formatted as `<dd MMM yyyy> <SiteName>`, and updates the Site Map.

---

## ✅ Preconditions

- User is on `AddInspectionEventScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `AddInspectionEventScreen`, observe Inspection Name before selecting site | Inspection Name is blank |
| 2 | Open "Site" autocomplete dropdown (`siteInputField`) | Lists available customer sites |
| 3 | Select "Apex Mining Quarry" | `setSiteForInspection()` triggers |
| 4 | Observe Inspection Name (`inspectionName`) | Auto-populates with format e.g. "21 Sep 2026 Apex Mining Quarry" |
| 5 | Observe Inspection Template field | Read-only field displays resolved template name |
| 6 | Observe Site Map (`siteMap`) | Center pins move to site coordinates and conveyor markers load |

---

## 🏁 Expected Results

- Selecting a site automatically configures inspection name, template hierarchy, and geographic map markers

---

## 🔍 Flutter Source Reference

```dart
// inspection_details_cubit.dart — setSiteForInspection()
final dateFormat = DateFormat('dd MMM yyyy');
i.name = '${dateFormat.format(i.inspectionDate ?? DateTime.now())} ${company.name}';
i.siteLevelInspectionTemplate = getTemplateData(company.companyId);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_site_auto_name @regression @both
Scenario: Auto-generate inspection name on site selection
  Given the user is on the Add Inspection Event screen
  When the user selects site "Apex Mining Quarry"
  Then the inspection name should automatically populate as "<Date> Apex Mining Quarry"
  And the site map should update with the selected site's location
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Create inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
