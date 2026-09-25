# Gap Analysis — Master Index

> This folder contains test coverage gap analyses for the Conti+ Mobile QA automation project.
> Each file compares `docs/test-suites/<module>/` (automation-ready TCs) against `docs/test-link/<module>/` (TestLink historical exports) and the Flutter codebase, identifying missing coverage, misplaced TCs, and actions.

## Modules Analysed

| Module | File | test-suites TCs | test-link TCs (in-scope) | Gaps Found | Gaps Addressed | Last Updated |
|---|---|---|---|---|---|---|
| [Login](./login.md) | `login.md` | 43 | 41 of 82 | 12 | 12 ✅ | 2026-06-15 |
| [Dashboard](./dashboard.md) | `dashboard.md` | 46 | 17 of 27 (+18 cross-module) | 10 misplaced in TL | 46 ✅ | 2026-09-23 |
| [Belt Scans](./belt-scans.md) | `belt-scans.md` | 36 | 17 of 17 | 0 gaps (expanded & refined) | 36 ✅ | 2026-09-23 |
| [Company & Sites](./company.md) | `company.md` | 41 | 88 of 92 | 35 redundant in TL | 41 ✅ | 2026-09-23 |
| [Conveyors](./conveyors.md) | `conveyors.md` | 36 | 65 of 65 | 25 fragmented in TL | 36 ✅ | 2026-09-23 |
| [Heavy Equipment](./heavy-equipment.md) | `heavy-equipment.md` | 29 | 10 of 12 (2 OS/browser) | 0 gaps (expanded & refined) | 29 ✅ | 2026-09-23 |
| [Inspections](./inspections.md) | `inspections.md` | 40 | 91 of 91 (50+ redundant in TL) | 50+ redundant in TL | 40 ✅ | 2026-09-23 |
| [Minuteman Calculation](./minuteman.md) | `minuteman.md` | 35 | 18 of 18 | 0 gaps (expanded & refined) | 35 ✅ | 2026-09-23 |
| [Monitoring Devices](./monitoring-devices.md) | `monitoring-devices.md` | 37 | 43 of 52 (9 in File Manager) | 9 misplaced in TL | 37 ✅ | 2026-09-23 |

## How to Read a Gap Report

Each gap report answers:
1. **Which folder has higher coverage quality** — and why
2. **Where each source lacks** — specific functional areas missing
3. **Which tests are adequate** — ready for automation as-is
4. **What changes were required** — prioritised action plan with results
5. **Module boundary issues** — TCs that are in the wrong module

## Status Legend

| Symbol | Meaning |
|---|---|
| ✅ | Covered and adequate |
| ⚠️ | Covered but needs improvement |
| ❌ | Missing — action required |
| 🔴 | Blocked on infrastructure |
| ✅ ADDRESSED | Gap documented and TC created in test-suites/ |

## Running a Gap Analysis

For a new module:
1. Read `docs/test-link/<module>/index.md` for the TestLink TC list
2. Read `docs/test-suites/<module>/index.md` for the current automation-ready TCs
3. Cross-reference the Flutter source in `CT-CONTIPLUS/ctp-contiplus-flutter-app`
4. Create `docs/gap/<module>.md` following the login.md format
5. Address each gap by creating TCs in `docs/test-suites/<module>/`
6. Mark gaps `✅ ADDRESSED` with links to the new TC files

---

*Add a new `<module>.md` file here whenever a new module is analysed.*
