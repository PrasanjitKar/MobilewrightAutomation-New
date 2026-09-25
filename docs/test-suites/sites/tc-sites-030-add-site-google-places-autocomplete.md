# TC-SITES-030 — Add Site — address search via Google Places autocomplete populates coordinates

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-030 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_site_places_autocomplete` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that typing an address in `addressAutocompleteTextField` queries `GPlacesAutocompleteCubit`, displays predictions, and selecting a place extracts street, city, state, country, zipCode, latitude, and longitude, updating the map marker preview.

---

## ✅ Preconditions

- User is on `SiteAddScreen` with active network connection

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Scroll to "Additional Details" on `SiteAddScreen` | Address autocomplete field is visible |
| 2 | Type an address query (e.g. "Continental Hanover") in `addressAutocompleteTextField` | `GPlacesAutocompleteCubit.autocomplete()` fetches predictions list |
| 3 | Tap a prediction from the dropdown options | `GPlacesAutocompleteCubit.loadDetails(placeId)` resolves place details |
| 4 | Verify state update | `company.location` is populated with city, state, country, zipCode, latitude, longitude; `company.street` is populated |
| 5 | Inspect Map preview | `ContiMap` renders a marker at the selected coordinates |

---

## 🏁 Expected Results

- Places autocomplete retrieves accurate suggestions
- Selection resolves coordinates and updates the map marker accordingly

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — addressSearchField()
SemanticsLabel(
  label: 'addressAutocompleteTextField',
  child: Autocomplete<Prediction>(
    optionsBuilder: (TextEditingValue textEditingValue) async {
      context.read<GPlacesAutocompleteCubit>().autocomplete(textEditingValue.text);
      return state.predictions;
    },
    displayStringForOption: (p) => p.description,
    onSelected: (value) {
      FocusManager.instance.primaryFocus?.unfocus();
      cubit.loadDetails(value.placeId);
    },
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_places_autocomplete @regression @both
Scenario: Address search via Google Places autocomplete
  Given the user is on the Add Site screen
  When the user types "td.AddressQuery" in the address field
  And the user selects prediction "td.ExpectedAddress"
  Then the address should resolve and position the map marker at "td.ExpectedLat", "td.ExpectedLng"
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
