# TC-HEAVY-EQUIPMENT-015 — Thumbnail Image — equipment thumbnail authenticated image loading

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-015 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_thumbnail` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that equipment images load through `CachedNetworkImage` with authenticated Cognito headers, falling back to SVG placeholder when no image URL is provided.

---

## ✅ Preconditions

- Equipment records with and without thumbnail images

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe equipment row with image URL | Image fetches with Cognito `Authorization` header and renders in rounded box |
| 2 | Observe equipment row without image URL | Displays default SVG placeholder icon |

---

## 🏁 Expected Results

- Equipment thumbnail images render reliably with fallback protection

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_row.dart
CachedNetworkImage(httpHeaders: header != null ? {'Authorization': header!} : null, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_thumbnail @regression @both
Scenario: Load authenticated thumbnail image for heavy equipment
  Given heavy equipment items exist in the list
  Then items with image URLs should render authenticated thumbnails and others fallback to placeholder
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-013 — Phone row](./tc-heavy-equipment-013-row-presentation-phone-layout.md)
- [Suite index](./index.md)
