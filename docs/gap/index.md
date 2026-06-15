# Gap Analysis — Master Index

> This folder contains test coverage gap analyses for the Conti+ Mobile QA automation project.
> Each file compares `docs/test-suites/<module>/` (automation-ready TCs) against `docs/test-link/<module>/` (TestLink historical exports) and the Flutter codebase, identifying missing coverage, misplaced TCs, and actions.

## Modules Analysed

| Module | File | test-suites TCs | test-link TCs (in-scope) | Gaps Found | Gaps Addressed | Last Updated |
|---|---|---|---|---|---|---|
| [Login](./login.md) | `login.md` | 42 | 41 of 82 | 12 | 12 ✅ | 2026-06-15 |

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
