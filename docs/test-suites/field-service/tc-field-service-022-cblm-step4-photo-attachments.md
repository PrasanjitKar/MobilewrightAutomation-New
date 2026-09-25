# TC-FIELD-SERVICE-022 — CBLM Photos — CBLM step 4 photo attachments (add, view, delete)

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-022 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_photos` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on Step 4 (Additional Details), users can attach photos from camera/gallery, view full-screen previews, and delete attached images.

---

## ✅ Preconditions

- Advanced to Step 4 of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the photo upload container | Image picker sheet opens with Camera and Gallery options |
| 2 | Select an image from gallery | Image compresses and displays thumbnail in grid |
| 3 | Tap thumbnail | Opens `FullScreenImageView` |
| 4 | Tap delete icon on thumbnail | Image is removed from attachments |

---

## 🏁 Expected Results

- Photo attachment workflow functions smoothly with compression and full-screen view

---

## 🔍 Flutter Source Reference

```dart
// additional_details_step.dart
_buildPhotoUploadSection(state) & FullScreenImageView(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_photos @regression @both
Scenario: Attach and manage photos in CBLM Step 4
  Given the user is on Step 4 Additional Details
  When the user attaches a photo from gallery
  Then the photo thumbnail should be visible and can be viewed full screen or deleted
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-023 — Comments & signature](./tc-field-service-023-cblm-step4-comments-digital-signature.md)
- [Suite index](./index.md)
