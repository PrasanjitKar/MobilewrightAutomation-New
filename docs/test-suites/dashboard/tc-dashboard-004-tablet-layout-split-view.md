# TC-DASHBOARD-004 — Tablet layout — horizontal card strip + inline split-view list panel

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-004 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_tablet_layout` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android (tablet form factor) |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that on a tablet form factor the Home screen renders cards as a horizontally scrollable strip above an inline split-view list panel, instead of the phone's 2-column grid + full-screen navigation.

---

## ✅ Preconditions

- Running on a tablet-sized device/emulator (`DeviceHelper.isPhone()` returns `false`)
- User is logged in with view permission for at least two modules

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe the Home screen layout | A horizontally scrollable row of cards is shown at the top (`CustomScrollView` with `scrollDirection: Axis.horizontal`), sized to ~1/4.6 of screen height |
| 2 | Observe the area below the card strip | An inline, bordered list panel is shown (`getSelectedList(selectedListType)`) inside a `Container` with rounded corners and a grey border |
| 3 | Scroll the card strip horizontally | Additional cards (if present) scroll into view without affecting the list panel below |
| 4 | Note the default selection | `selectedListType` defaults to `ListType.site`, so the Sites list is shown in the panel on first load (if the Sites card is visible) |

---

## 🏁 Expected Results

- Card strip and list panel are both visible simultaneously (split view) — no full-screen navigation occurs from a card tap
- Card strip scrolls independently and horizontally
- List panel initially reflects `ListType.site`

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build(), tablet branch
else ...{
  SizedBox(
    height: MediaQuery.of(context).size.height / 4.6,
    child: Padding(
      padding: const EdgeInsets.only(top: 20.0, left: 20.0),
      child: CustomScrollView(
        controller: _scrollController,
        scrollDirection: Axis.horizontal,
        slivers: [
          SliverFillRemaining(
            hasScrollBody: false,
            child: Row(children: _getHomeCards(context, state)),
          ),
        ],
      ),
    ),
  ),
  Expanded(
    child: Padding(
      padding: const EdgeInsets.only(top: 16, left: 20, right: 20),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(width: 1.2, color: ContinentalColors.grey2),
        ),
        child: getSelectedList(selectedListType),
      ),
    ),
  ),
},

// _HomeScreenState field default
ListType selectedListType = ListType.site;
```

**Semantic labels / locators:**
- `siteCard`, `conveyorCard`, etc. — same card labels as phone, but rendered inline in a `Row`
- The inline list panel exposes the same row-level labels as the corresponding full list screen (e.g. `conveyorListItemFromHomeScreen_$index`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/testdata.csv @Key:dashboard_tablet_layout @regression @both
Scenario: Tablet home screen shows a card strip and inline list panel
  Given the user is logged in on a tablet device
  And the home screen finishes loading
  Then the card strip should be scrollable horizontally
  And the site list should be displayed in the inline list panel
```

---

## 🔗 Related

- [TC-DASHBOARD-003 — Phone layout navigation](./tc-dashboard-003-phone-layout-two-column-grid-navigation.md)
- [TC-DASHBOARD-018 — Tablet card selection highlight and list swap](./tc-dashboard-018-tablet-card-selection-highlight-and-list-swap.md)
- [Suite index](./index.md)
