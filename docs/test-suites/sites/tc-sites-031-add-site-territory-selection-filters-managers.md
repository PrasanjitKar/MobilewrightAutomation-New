# TC-SITES-031 — Add Site — territory selection dynamically filters territory managers list

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-031 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_site_territory_manager_filter` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that selecting a Territory in `SiteAddScreen` updates `company.marketId`, enables the "Territory Manager" autocomplete dropdown, and filters available territory managers to only users assigned to the chosen territory's market.

---

## ✅ Preconditions

- User is on `SiteAddScreen`
- Market and Territory master data are loaded

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe "Territory Manager" dropdown before selecting a territory | Dropdown is disabled (`_territoryCtrl.text.isEmpty`) |
| 2 | Open "Territory" autocomplete and select a territory (e.g. "Germany North") | Territory is selected; `company.marketId` is set |
| 3 | Observe "Territory Manager" dropdown | Dropdown becomes enabled |
| 4 | Open "Territory Manager" dropdown | Lists only territory managers associated with "Germany North" |
| 5 | Select a Territory Manager | Selected manager's name and user ID are populated |
| 6 | Change Territory to a different territory | Territory Manager field resets to empty |

---

## 🏁 Expected Results

- Territory manager options dynamically respond to territory selection
- Switching territory clears previously selected territory manager

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — _getTerritoryBloc() & _getTerritoryManagerBloc()
territoryManagers = state.territories
    ?.where((element) => element.markets?.any((market) => market.id == territoryValue) ?? false)
    .toList() ?? [];
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_territory_manager_filter @regression @both
Scenario: Territory selection filters territory managers
  Given the user is on the Add Site screen
  When the user selects territory "td.TerritoryName"
  Then the territory manager dropdown should be enabled
  And the options should only include managers for "td.TerritoryName"
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
