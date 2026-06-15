# Test-Link — Suite Registry

This folder contains TestLink XML exports converted to Markdown test case documentation for the **Conti+ Mobile QA** automation project.

> **Note:** All test cases are initially marked `📋 Planned`. Update status to `🟢 Active — Automated` once a scenario is automated and passing.

## 📊 Overall KPI

| Metric | Count |
|---|---|
| Total Modules | 1 |
| Total TCs | 82 |
| 📋 Planned | 82 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |

## Module Registry

| Module | Sub-Suites | Total TCs | Automated | Status |
|---|---|---|---|---|
| [Login](./login/index.md) | LoginPage, Home, Profile, Negative | 82 | 0 (0%) | ⚪ Not Started |

## Folder Structure

```
docs/test-link/
├── index.md                    ← This file — master registry
└── login/
    ├── index.md                ← Login module overview (82 TCs)
    ├── Login.testsuite.xml     ← Original TestLink export
    ├── LoginPage/
    │   ├── index.md            ← 30 TCs
    │   └── tc-<id>-<slug>.md  ← Individual TC files
    ├── Home/
    │   ├── index.md            ← 27 TCs
    │   └── tc-<id>-<slug>.md
    ├── Profile/
    │   ├── index.md            ← 21 TCs
    │   └── tc-<id>-<slug>.md
    └── Negative/
        ├── index.md            ← 4 TCs
        └── tc-<id>-<slug>.md
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
