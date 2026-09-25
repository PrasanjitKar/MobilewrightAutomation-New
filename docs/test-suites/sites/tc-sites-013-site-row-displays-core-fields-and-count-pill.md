# TC-SITES-013 — Site row displays avatar, site name, company type, territory chip, and conveyor count pill

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-013 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `site_row_core_fields` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that each row in `SiteListScreen` rendered by `CompanyRow` displays the avatar image, site name (`siteName_$index`), company type (`companyType_$index`), uppercase territory chip (`ContiplusChip`), and `CountPill` (`count-$index`) with conveyor icon and count.

---

## ✅ Preconditions

- User has customer sites with assigned territories and conveyors

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `SiteListScreen` | List loads with customer site rows |
| 2 | Inspect row `siteListItem_$index` | Avatar shows image (`siteImage_$index`/`siteFileImage_$index`) or initial letter avatar (`siteAvatar_$index`) |
| 3 | Inspect title | `siteName_$index` renders `company.name` in bold 16px font |
| 4 | Inspect subtitle | `companyType_$index` renders "Customer Site", followed by territory chip in uppercase |
| 5 | Inspect trailing count | `CountPill` displays `company.conveyorsCount` with the conveyor SVG icon |
| 6 | Inspect trailing chevron | Right arrow icon (`rightArrowIcon_20x20`) is displayed |

---

## 🏁 Expected Results

- All visual elements of `CompanyRow` match the site data model
- Conveyor count accurately reflects `company.conveyorsCount`

---

## 🔍 Flutter Source Reference

```dart
// company_row.dart
CountPill(count: count, isCorporate: isCorporate, index: index);
...
SemanticsLabel(
  label: 'siteName_$index',
  child: Text(company.name!, maxLines: 1, style: ContiplusStyle.boldFonts16pxBFont),
),
SemanticsLabel(
  label: 'companyType_$index',
  child: Text(companyTypeModel?.name ?? '', style: ContiplusStyle.regularFont12pxR),
),
if (market.isNotEmpty)
  ContiplusChip(label: market.toUpperCase(), index: index),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_row_core_fields @regression @both
Scenario: Verify site row core fields and count pill
  Given the user is on the sites list screen
  Then the site row "0" should display site name "td.ExpectedName"
  And the site row "0" should display company type "Customer Site"
  And the site row "0" should display conveyor count "td.ExpectedCount"
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
