# TC-SITES-016 — Company Résumé search bar filters child conveyors by name

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-016 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `company_resume_conveyor_search` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-resume.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the search icon on `CompanyResumeScreen` reveals the search input `searchConveyorsTextField`, and typing a query dispatches `ConveyorListSearchEvent(search: query)` to filter the child conveyor rows by name in real time.

---

## ✅ Preconditions

- User is on `CompanyResumeScreen` for a site with multiple conveyors

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `CompanyResumeScreen`, tap the search button (`searchButtonForConveyor`) | Search container `searchConveyorsTextField` expands with close icon |
| 2 | Type a conveyor name query in `searchConveyorsTextField` | `ConveyorListSearchEvent` is dispatched |
| 3 | Observe sub-list | Only conveyors matching the query are displayed |
| 4 | Tap the close icon (`Icons.close`) on the search field | Search text is cleared, search bar closes, and the full conveyor list restores |

---

## 🏁 Expected Results

- Search dynamically filters child conveyors
- Dismissing search clears search state and restores all conveyors for the site

---

## 🔍 Flutter Source Reference

```dart
// company_resume_screen.dart — _buildSearchWidget()
SemanticsLabel(
  label: 'searchConveyorsTextField',
  child: TextField(
    controller: _searchCtrl,
    onChanged: (value) {
      final ConveyorListBloc conveyorListBloc = BlocProvider.of<ConveyorListBloc>(context);
      conveyorListBloc.add(ConveyorListSearchEvent(search: value));
    },
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:company_resume_conveyor_search @regression @both
Scenario: Search conveyors within site resume
  Given the user is on the company resume screen for a site
  When the user taps the search icon
  And the user types conveyor name "td.ConveyorSearchTerm"
  Then only matching conveyors should appear in the sub list
  When the user taps the search close button
  Then all site conveyors should be restored
```

---

## 🔗 Related

- [TC-SITES-015 — Tap site row opens Company Résumé](./tc-sites-015-tap-site-row-opens-company-resume.md)
- [Suite index](./index.md)
