# TC-CONVEYOR-INSPECT-022 — Findings — expandable defect cards, thermal images, side badges, and GPS location

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-022 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_finding_cards` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectFindingDetails` renders expandable defect cards with finding index, idler number, severity color strip, LHS/RHS badge, thermal anomaly temperature reading, attached radiometric photo thumbnail, and GPS coordinates.

---

## ✅ Preconditions

- Inspection event has multiple findings on both LHS and RHS

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectDetailsScreen`, scroll to "Findings" section | Defect list cards display |
| 2 | Observe a finding card header | Displays Idler Number (e.g. `#42`), Side badge (`LHS`), and Temp (`+28.4 °C delta`) |
| 3 | Tap on the finding card | Card expands to show full details |
| 4 | Verify expanded details | Displays thermal photo thumbnail, component type, failure description, and lat/long |
| 5 | Tap the photo thumbnail | Opens full-screen radiometric image viewer |

---

## 🏁 Expected Results

- Defect findings provide clear diagnostic context with expandable visual media

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_finding_details.dart
ExpansionTile(
  title: Text('Idler #${finding.idlerNumber} - ${finding.temperatureDelta}°C'),
  children: [
    CachedNetworkImage(imageUrl: finding.thermalImageUrl),
    Text('GPS: ${finding.latitude}, ${finding.longitude}'),
  ],
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_finding_cards @regression @both
Scenario: Expand and inspect conveyor defect finding details
  Given the user is on the Conveyor Inspect details screen
  When the user taps on a finding card
  Then the card should expand showing thermal image, idler number, delta temp, and GPS
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-024 — Fullscreen image viewer](./tc-conveyor-inspect-024-thermal-fullscreen-image-viewer.md)
- [Suite index](./index.md)
