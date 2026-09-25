# TC-COVER-WEAR-035: Measurement Photo Attachments & Fullscreen Preview

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart` (`_buildPhotoSection`)

---

## 🎯 Objective
Verify capturing camera photos or selecting gallery images as attachments for a measurement reading, viewing them in the thumbnail carousel, removing attachments, and opening fullscreen image preview.

---

## 📋 Preconditions
- User is adding a measurement reading.

---

## 🧪 Test Steps
1. In the Photos section of `CoverWearAddMeasurementScreen`, tap `Add Photo`.
2. Choose **Camera** (or Gallery) and capture a belt wear photo.
3. Verify the photo is compressed and added as a thumbnail in the attachment list.
4. Tap the thumbnail to open `PhotoPreviewScreen` (fullscreen pinch-to-zoom).
5. Verify image displays clearly with close button.
6. Close preview, tap the `Delete` icon on the thumbnail.
7. Verify photo is removed from the draft reading attachments.
8. Add a photo, complete reading, and tap Save.
9. Verify photo is uploaded or queued for offline background sync.

---

## 🔍 Expected Results
- Photo attachments enhance inspection reports and work seamlessly online and offline.

---

## 📱 Flutter Source Reference
- **Photo Section**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart` (`_buildPhotoSection`)
- **Preview Screen**: `lib/src/ui/widgets/photo_viewer_widget.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_photos @regression @both
Scenario: Attach, preview, and remove photos on Cover Wear measurement
  Given the user is on the Add Measurement screen
  When the user attaches a photo from camera or gallery
  Then a photo thumbnail should appear in the attachment carousel
  When the user taps the thumbnail
  Then fullscreen photo preview should be displayed
```
