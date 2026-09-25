# TC-INSPECTIONS-025 — Add Item — capture/upload up to 3 photos with on-device annotation/crop

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-025 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_item_photos` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-item-details.page.ts`, `src/pages/image-editor.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `InspectionItemDetails` permits capturing or picking up to 3 photos per finding (`kMaxItemPhotos = 3`), opens the image annotation editor (`EditImageModal`), and enforces the 3-photo ceiling by displaying a snackbar error message when exceeded.

---

## ✅ Preconditions

- Camera and Gallery permissions are granted

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionItemDetails`, tap "Upload Images" button (`uploadImagesButton`) | Bottom sheet opens offering Camera or Gallery source |
| 2 | Select 2 photos | Photos are compressed and added to thumbnail tray (`inspectionImages`) |
| 3 | Tap a photo thumbnail (`editorViewImage`) | Image editor modal opens allowing crop, rotate, and markup drawing |
| 4 | Save annotation | Annotated image replaces thumbnail |
| 5 | Tap "Add Photo" (`addInspectionImage`) and select 1 more photo | 3rd photo added (total = 3) |
| 6 | Attempt to add a 4th photo | Snackbar displays `maxPhotosAllowedMessage` ("Maximum 3 photos allowed") |

---

## 🏁 Expected Results

- Photo upload, thumbnail preview, and on-device image editing work seamlessly
- 3-photo ceiling is strictly enforced

---

## 🔍 Flutter Source Reference

```dart
// inspection_item_details.dart
const int kMaxItemPhotos = 3;
if (remainingSlots <= 0) {
  showContiSnackBar(context, l10n.maxPhotosAllowedMessage);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_item_photos @regression @both
Scenario: Attach and annotate inspection finding photos
  Given the user is on the Inspection Item Details screen
  When the user uploads 2 photos and annotates the first photo
  And the user uploads a 3rd photo
  Then 3 photo thumbnails should be displayed
  When the user attempts to upload a 4th photo
  Then an error message "Maximum 3 photos allowed" should be displayed
```

---

## 🔗 Related

- [TC-INSPECTIONS-024 — Add item condition and status](./tc-inspections-024-add-inspection-item-condition-and-status.md)
- [Suite index](./index.md)
