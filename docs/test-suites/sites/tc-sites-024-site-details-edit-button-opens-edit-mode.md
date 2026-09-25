# TC-SITES-024 — Site Details "Edit" button opens Site Add/Edit screen in edit mode

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-024 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `site_details_edit_navigation` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-details.page.ts`, `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user has edit permission (`BasicModule.customerSiteMap` / `Permission.edit`), the "Edit" button (`editButton`) is visible on `SiteDetailsScreen`, and tapping it opens `SiteAddScreen(company: widget.company)` in edit mode with title "Edit {siteName}" (`editSiteAppbarTitle`).

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` / `Permission.edit`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `SiteDetailsScreen` | Screen loads with action bar |
| 2 | Locate bottom navigation action bar | "Edit" button (`editButton`) is visible |
| 3 | Tap "Edit" button | `Navigator.push` opens `SiteAddScreen(company: company)` |
| 4 | Observe app bar title | `editSiteAppbarTitle` renders "Edit {siteName}" |
| 5 | Observe form fields | All existing site fields (name, corporate, territory, address) are pre-populated |
| 6 | Observe bottom button | Submit button is labeled "Save" (`saveButton`) |

---

## 🏁 Expected Results

- "Edit" button is displayed only when permitted
- Screen transitions into edit mode with all existing data pre-populated

---

## 🔍 Flutter Source Reference

```dart
// site_details_screen.dart — _buildNavigationBar()
Visibility(
  visible: canEdit,
  child: SemanticsLabel(
    label: 'editButton',
    child: CommonActionButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute<dynamic>(
            builder: (_) => SiteAddScreen(company: widget.company),
            settings: const RouteSettings(name: RouteNameKeys.siteAddScreen),
          ),
        );
      },
      title: AppLocalizations.of(context)!.edit,
    ),
  ),
),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_details_edit_navigation @regression @both
Scenario: Open edit site from site details
  Given the user is on the site details screen for "td.SiteName"
  When the user taps the edit button
  Then the edit site screen should open with title "Edit <SiteName>"
  And the submit button should display "Save"
```

---

## 🔗 Related

- [TC-SITES-025 — Edit site and save successfully](./tc-sites-025-edit-site-and-save-successfully.md)
- [Suite index](./index.md)
