# TC-COVER-WEAR-028: Belt Diagram & Interactive Top/Bottom Switch

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_belt_diagram.dart` (`CoverWearBeltDiagram`)

---

## 🎯 Objective
Verify the interactive conveyor belt cross-section diagram widget (`CoverWearBeltDiagram`), ensuring that switching between Top Cover and Bottom Cover updates the active measured cover layer highlight, nominal thickness, compound, and actual thickness field dynamically.

---

## 📋 Preconditions
- User is on `CoverWearAddScreen` or `CoverWearEditScreen`.

---

## 🧪 Test Steps
1. In the Belt Specifications section, locate `CoverWearBeltDiagram`.
2. Inspect the cross-section diagram showing Top Cover, Carcass, and Bottom Cover layers.
3. Tap on the **Top Cover** layer radio/switch.
4. Verify `updateMeasuredCover(true)` sets `measuredCover = 'TOP'`.
5. Verify Top Cover layer is highlighted in the diagram and Actual Thickness input binds to top cover thickness.
6. Tap on the **Bottom Cover** layer radio/switch.
7. Verify `updateMeasuredCover(false)` sets `measuredCover = 'BOTTOM'`.
8. Verify Bottom Cover layer is highlighted in the diagram and Actual Thickness input binds to bottom cover thickness.

---

## 🔍 Expected Results
- Diagram provides clear visual and interactive feedback for selecting the target cover layer.

---

## 📱 Flutter Source Reference
- **Diagram Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_belt_diagram.dart` (`CoverWearBeltDiagram`)
- **Cubit**: `CoverWearCubit.updateMeasuredCover`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_belt_diagram @regression @both
Scenario: Toggle measured cover layer using the interactive belt diagram
  Given the user is on the Cover Wear event form
  When the user taps the "Top Cover" in the belt diagram
  Then the top cover layer should be highlighted as the active measurement target
  When the user taps the "Bottom Cover" in the belt diagram
  Then the bottom cover layer should be highlighted as the active measurement target
```
