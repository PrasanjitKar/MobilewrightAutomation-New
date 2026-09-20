# TC-CONVEYORS-009 — Conveyor row displays name, image, site, and last-updated text

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-009 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_row_core_fields` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify each `ConveyorRow` correctly displays the conveyor's name, image/avatar, site name, and last-updated text.

---

## ✅ Preconditions

- User has view permission for conveyors
- At least one conveyor has a network image; at least one has none (initial-letter placeholder)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Conveyors list | Rows render for each conveyor |
| 2 | Inspect a row with a network image (`image` starting with `http`) | `conveyorImage_$index` shows the network image (using `headerForImage` auth header when online) |
| 3 | Inspect a row with a locally cached image (`imageLocal` set) | `conveyorImage_$index` shows the local file image |
| 4 | Inspect a row without any image | `conveyorImage_$index` shows an initial-letter placeholder avatar |
| 5 | Inspect `conveyorName_$index`, `conveyorSiteName_$index`, `lastUpdateText_$index` | Values match the conveyor's `name`, site/company name, and formatted last-updated text respectively |

---

## 🏁 Expected Results

- Correct avatar source is chosen per the image-source priority: network → local file → initial-letter placeholder
- Name, site name, and last-updated text are accurate and non-empty

---

## 🔍 Flutter Source Reference

```dart
// conveyor_row.dart (image priority logic)
// network image if online and `image` starts with 'http'
// else local file if `imageLocal` is set
// else initial-letter placeholder
```

**Semantic labels:** `conveyorName_$index`, `conveyorImage_$index`, `conveyorSiteName_$index`, `lastUpdateText_$index`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_row_core_fields @regression @both
Scenario: Conveyor row shows correct core fields
  Given the user is on the conveyors list
  Then the conveyor row for "td.ConveyorName" should show the correct name, site, and last-updated text
```

---

## 🔗 Related

- [Suite index](./index.md)
