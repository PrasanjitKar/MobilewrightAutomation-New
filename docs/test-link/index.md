# Test-Link — Suite Registry

This folder contains TestLink XML exports converted to Markdown test case documentation for the **Conti+ Mobile QA** automation project.

> **Note:** All test cases are initially marked `📋 Planned`. Update status to `🟢 Active — Automated` once a scenario is automated and passing.

## 📊 Overall KPI

| Metric | Count |
|---|---|
| Total Modules | 7 |
| Total TCs | 411 |
| 📋 Planned | 411 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |

## Module Registry

| Module | Sub-Suites | Total TCs | Automated | Status |
|---|---|---|---|---|
| [Login](./login/index.md) | LoginPage, Home, Profile, Negative | 82 | 0 (0%) | ⚪ Not Started |
| [Company](./company/index.md) | Corporate_List, Site_List, Add_Edit-Site_Shop, Negative_cases | 92 | 0 (0%) | ⚪ Not Started |
| [Belt Scans](./belt-scans/index.md) | Belt Scan | 17 | 0 (0%) | ⚪ Not Started |
| [Conveyors](./conveyors/index.md) | Conveyor_List, Add_Conveyor, Conveyor_Details | 65 | 0 (0%) | ⚪ Not Started |
| [Heavy Equipment](./heavy-equipment/index.md) | Heavy Equipment | 12 | 0 (0%) | ⚪ Not Started |
| [Inspections](./inspections/index.md) | Card_Logic, Default_Template, Vulcan_Template, Corporate_List, Map, Total_Conveyance_Template | 91 | 0 (0%) | ⚪ Not Started |
| [Monitoring Devices](./monitoring-devices/index.md) | Monitoring Devices | 52 | 0 (0%) | ⚪ Not Started |

## Folder Structure

```
docs/test-link/
├── index.md                         ← This file — master registry
├── login/
│   ├── index.md                     ← Login module overview (82 TCs)
│   ├── Login.testsuite.xml          ← Original TestLink export
│   ├── LoginPage/                   ← 30 TCs
│   ├── Home/                        ← 27 TCs
│   ├── Profile/                     ← 21 TCs
│   └── Negative/                    ← 4 TCs
├── company/
│   ├── index.md                     ← Company module overview (92 TCs)
│   ├── Company.testsuite-deep.xml   ← Original TestLink export
│   ├── Corporate_List/              ← 34 TCs
│   ├── Site_List/                   ← 30 TCs
│   ├── Add_Edit-Site_Shop/          ← 19 TCs
│   └── Negative_cases/              ← 9 TCs
└── belt-scans/
    ├── index.md                     ← Belt Scans module overview (17 TCs)
    ├── BeltScan.doc                  ← Original TestLink HTML export
    └── tc-ctcp-<id>-<slug>.md        ← 17 TC files
└── conveyors/
    ├── index.md                     ← Conveyors module overview (65 TCs)
    ├── conveyors.doc                 ← Original TestLink HTML export
    ├── Conveyor_List/                ← 23 TCs
    ├── Add_Conveyor/                 ← 30 TCs
    └── Conveyor_Details/             ← 12 TCs
└── heavy-equipment/
    ├── index.md                     ← Heavy Equipment module overview (12 TCs)
    ├── HeavyEquipment.doc            ← Original TestLink HTML export
    └── tc-ctcp-<id>-<slug>.md        ← 12 TC files
└── inspections/
    ├── index.md                     ← Inspections module overview (91 TCs)
    ├── inspections.doc              ← Original TestLink HTML export
    ├── Card_Logic/                  ← 10 TCs
    ├── Default_Template/            ← 22 TCs
    ├── Vulcan_Template/             ← 39 TCs
    ├── Corporate_List/              ← 2 TCs
    ├── Map/                         ← 3 TCs
    └── Total_Conveyance_Template/   ← 15 TCs
└── monitoring-devices/
    ├── index.md                     ← Monitoring Devices module overview (52 TCs)
    ├── monitoringDevices.doc        ← Original TestLink HTML export
    └── tc-ctcp-<id>-<slug>.md       ← 52 TC files
```

## Status Values

| Status | Meaning |
|--------|---------|
| `📋 Planned` | TC documented; no automation yet |
| `🟢 Active — Automated` | Feature file, steps, page object all exist and passing |
| `🔵 Active — In Progress` | Being automated (tagged `@inprogress`) |
| `⚠️ Failing` | Automated but currently failing |
| `🚫 Deprecated` | No longer relevant |
| `🔴 Blocked` | Cannot be automated without external dependency |

---

*Source: TestLink exports. Last updated: 2026-06-15.*
