# Test-Link — Suite Registry

This folder contains TestLink XML exports converted to Markdown test case documentation for the **Conti+ Mobile QA** automation project.

> **Note:** All test cases are initially marked `📋 Planned`. Update status to `🟢 Active — Automated` once a scenario is automated and passing.

## 📊 Overall KPI

| Metric | Count |
|---|---|
| Total Modules | 2 |
| Total TCs | 174 |
| 📋 Planned | 174 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |

## Module Registry

| Module | Sub-Suites | Total TCs | Automated | Status |
|---|---|---|---|---|
| [Login](./login/index.md) | LoginPage, Home, Profile, Negative | 82 | 0 (0%) | ⚪ Not Started |
| [Company](./company/index.md) | Corporate_List, Site_List, Add_Edit-Site_Shop, Negative_cases | 92 | 0 (0%) | ⚪ Not Started |

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
└── company/
    ├── index.md                     ← Company module overview (92 TCs)
    ├── Company.testsuite-deep.xml   ← Original TestLink export
    ├── Corporate_List/              ← 34 TCs
    ├── Site_List/                   ← 30 TCs
    ├── Add_Edit-Site_Shop/          ← 19 TCs
    └── Negative_cases/              ← 9 TCs
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
