# TC-SITES-033 — Add Site — image picker uploads avatar photo via camera/gallery

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-033 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_site_image_upload` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the avatar image picker (`ContiplusImageRoundedPicker`) on `SiteAddScreen` allows selecting a photo from Gallery or Camera, renders the selected local image in the avatar, and uploads the image during site creation.

---

## ✅ Preconditions

- Camera and Gallery permissions are granted on the device

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `SiteAddScreen` | Avatar placeholder is displayed |
| 2 | Tap the circular avatar picker widget | Image source selection bottom sheet (Camera / Gallery) opens |
| 3 | Select an image file | `onChange(file)` callback receives the selected `XFile` |
| 4 | Observe avatar preview | Selected image renders inside the circular avatar |
| 5 | Complete mandatory fields and tap "Create" | `ibd.imageManager.upload()` uploads the file; `company.image` is assigned the uploaded URL |
| 6 | Verify created site in list | Site row renders the uploaded image via `siteImage_$index` |

---

## 🏁 Expected Results

- Image is picked, previewed, uploaded, and linked to the created site record

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart
ContiplusImageRoundedPicker(
  radius: 64,
  imageURL: company.image,
  localImage: widget.company?.localImage,
  onChange: (file) {
    setState(() {
      fileImage = file;
    });
  },
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_image_upload @regression @both
Scenario: Upload site avatar image
  Given the user is on the Add Site screen
  When the user picks an image from the gallery
  Then the image preview should be displayed in the avatar
  When the user completes required fields and taps create
  Then the site should be created with the uploaded image
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
