# TC-SITES-003 — View Site Details — displays company information and map with site markers

> Suite: [Sites](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-003 |
| **Suite** | sites |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `view_site_details` |
| **Feature File** | `features/smoke/sites.feature` |
| **Page Objects** | `src/pages/site-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the header card on the Company Résumé screen opens the `SiteDetailsScreen`, rendering the site's metadata, conveyor count, market/territory chips, associated distributor, and interactive Google Map with site and conveyor markers.

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` / `Permission.view`
- An existing customer site with conveyors and valid coordinates exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From Sites list, tap on a site row | `CompanyResumeScreen` opens |
| 2 | Tap the site header card (`siteHeaderInfo`) | `SiteDetailsScreen` opens with title "View Detail {siteName}" (`siteDetailsAppbarTitle`) |
| 3 | Verify "Site Details" section | Displays rounded avatar, Site Name, Number of Conveyors (`noOfConveyors`), Market chip, and Territory chip |
| 4 | Verify "Company Information" section | Displays "Type of Company", "Associated Distributor", and "Territory Manager" |
| 5 | Verify "Additional Details" section | Displays full address and interactive `ContiMap` |
| 6 | Observe the map | A marker is placed at the site's latitude/longitude along with conveyor route markers |
| 7 | Tap "Cancel" button (`cancelButton`) | Returns back to `CompanyResumeScreen` |

---

## 🏁 Expected Results

- All site details are rendered in read-only input fields
- Google Map correctly loads with markers matching site coordinates and its conveyors
- Cancel button returns to the previous screen without errors

---

## 🔍 Flutter Source Reference

```dart
// site_details_screen.dart
Widget map() {
  return Padding(
    padding: const EdgeInsets.only(top: 8.0),
    child: SizedBox(
      height: DeviceHelper.isPhone() ? 300 : 222,
      child: ContiMap(
        conveyorList: widget.conveyorList ?? [],
        markers: [
          if (widget.company.location != null)
            ContiMapMarker(
              lat: widget.company.location!.latitude!,
              long: widget.company.location!.longitude!,
              title: widget.company.name ?? '',
            ),
        ],
      ),
    ),
  );
}
```

**Semantic labels / locators:**
- `siteDetailsAppbarTitle` — screen title
- `siteDetailsArrowBack` — back button
- `noOfConveyors` — conveyor count
- `editButton` — edit button
- `cancelButton` — cancel button

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:view_site_details @smoke @both
Scenario: View site details and interactive map
  Given the user is logged in
  When the user selects site "td.SiteName" from the sites list
  And the user taps the site header card
  Then the site details screen should be displayed for "td.SiteName"
  And the site conveyor count should match "td.ExpectedCount"
  And the site map should display the location marker
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [TC-SITES-022 — Site Details displays info and address](./tc-sites-022-site-details-displays-company-info-and-address.md)
- [Suite index](./index.md)
