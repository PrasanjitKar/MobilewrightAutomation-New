# TC-BELT-SCANS-036: E2E Steel Cord Damage Belt Scan Lifecycle (Ingest, Analyze, Severity Filter, PDF Report)

> **Suite**: `belt-scans` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/belt_scan/` & `lib/src/blocs/belt_scan/`

---

## 🎯 Objective
Execute the full end-to-end Belt Scan analysis workflow:
1. Access Belt Scans list screen from Dashboard or Conveyor Hub.
2. Filter scans by Criticality, Corporate, Site, and Date range.
3. Open a steel cord magnetic induction scan record.
4. Inspect damage summary cards (Total Events, Critical Cord Breaks, Major/Minor Cord Damage, Splice Integrity).
5. Open interactive cross-sectional cord profile and longitudinal map.
6. Generate, stream, and share the comprehensive Belt Scan PDF report.

---

## 📋 Preconditions
- User has `BasicModule.beltScan` permissions (`view`, `download`).
- Belt scan dataset exists.

---

## 🧪 Test Steps
1. Navigate to Belt Scans from Dashboard "Belt Scans" card.
2. Open filter modal -> filter by Criticality = "Yes" and select Customer Site -> tap Apply.
3. Verify filtered list displays matching scan records with cord damage badges.
4. Tap the latest scan record -> open `BeltScanDetailsScreen`.
5. Verify damage breakdown:
   - Cord Breaks count and location (meter mark).
   - Splice Condition and step layout verification.
   - 2D/3D Magnetic flux density graph visualization.
6. Tap **View PDF Report** -> verify authenticated PDF stream loads and displays all scan maps and engineering recommendations.
7. Tap Share icon -> verify system share sheet opens with the report file.

---

## 🔍 Expected Results
- Complete scan examination and PDF reporting workflow operates smoothly.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/belt_scan/belt_scan_list_screen.dart`
- `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart`
- `lib/src/blocs/belt_scan/`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/beltscandata.csv @Key:belt_scan_e2e @e2e @both
Scenario: End-to-End Belt Scan cord damage analysis and report generation
  Given the user navigates to Belt Scans and filters by critical scans
  When the user opens a steel cord scan record
  Then damage statistics, cord breaks, and splice integrity should be displayed
  And the user can view and share the comprehensive scan PDF report
```
