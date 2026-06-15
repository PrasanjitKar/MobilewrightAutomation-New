# Gap Analysis — Login Module Test Coverage

> **Scope:** Login authentication module — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/login/` — Flutter source-derived TC documentation (30 TCs)  
> - `docs/test-link/login/` — TestLink XML export (82 TCs across 4 sub-suites)  
> **Analysis date:** 2026-06-15  
> **Author:** Copilot Gap Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/login | test-link/login |
|--------|-----------------|----------------|
| Total TCs | 30 | 82 |
| TCs in scope (auth only) | 30 | ~41 |
| TCs misplaced / wrong module | 0 | ~41 (Home: 27, Profile non-auth: 14) |
| Automation-ready (has Gherkin + locators) | 30 (100%) | 0 (0%) |
| Flutter source references | ✅ All 30 | ❌ None |
| Blocking infra identified | 4 TCs flagged | Not identified |
| Redundant / overlapping TCs | 0 | ~12 |
| Depth (avg steps per TC) | 6–10 | 2–4 |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High | ⭐⭐ Low–Medium |

**Verdict:** `test-suites/login/` is the authoritative source for automation. `test-link/` has historical breadth but low automation value and significant scope pollution. **26 out of 30 test-suites TCs can proceed to automation immediately.** 4 are blocked on infrastructure. 9 functional areas from test-link are missing from test-suites and should be added.

---

## 1. Scope Comparison — What Each Source Covers

### 1.1 test-suites/login/ Coverage Map (30 TCs)

| Functional Area | TCs | Completeness |
|---|---|---|
| Splash screen branding | TC-001 | ✅ Complete |
| Welcome screen UI | TC-002 | ✅ Complete |
| Continental Account button | TC-003 | ✅ Complete |
| Continue as Guest | TC-004 | ✅ Complete |
| Login screen UI | TC-005 | ✅ Complete |
| Successful login | TC-006 | ✅ Complete |
| Email auto-lowercase | TC-007 | ✅ Complete |
| Password visibility toggle | TC-008 | ✅ Complete |
| Login form — empty fields | TC-009 | ✅ Complete (Outline × 3) |
| Login form — invalid email | TC-010 | ✅ Complete (Outline × 4) |
| Login form — invalid password policy | TC-011 | ✅ Complete (Outline × 4) |
| Invalid credentials | TC-012 | ✅ Complete |
| Offline login error | TC-013 | ✅ Documented, 🔴 Blocked |
| Login loading / double-submit | TC-014 | ✅ Complete |
| Autofill support | TC-015 | ✅ Complete |
| Back button (Login → Welcome) | TC-016 | ✅ Complete |
| Forgot password navigation | TC-017 | ✅ Complete |
| Forgot password screen UI | TC-018 | ✅ Complete |
| Forgot password — valid email | TC-019 | ✅ Documented, 🔴 Blocked |
| Forgot password — validation | TC-020 | ✅ Complete (Outline × 2) |
| Verification code already received | TC-021 | ✅ Complete |
| Back navigation (ForgotPw → Login) | TC-022 | ✅ Complete |
| Reset password screen UI | TC-023 | ✅ Complete |
| Reset password — success | TC-024 | ✅ Documented, 🔴 Blocked |
| Reset password — validation | TC-025 | ✅ Complete (Outline × 5) |
| First-time login (change pw) | TC-026 | ✅ Complete |
| Change password — success | TC-027 | ✅ Documented, 🔴 Blocked |
| Change password — validation | TC-028 | ✅ Complete (Outline × 4) |
| Session expiry | TC-029 | ✅ Complete |
| Password policy reference | TC-030 | ✅ Complete |

### 1.2 test-link/login/ Coverage Map (82 TCs)

| Sub-Suite | TCs | In-scope for Login Auth? | Assessment |
|---|---|---|---|
| **LoginPage** | 30 | ✅ Yes (all auth-related) | Partially overlapping with test-suites |
| **Home** | 27 | ❌ No — belongs in Home module | **Entirely misplaced** |
| **Profile** | 21 | ⚠️ Partial (6 auth-adjacent TCs) | 15 TCs misplaced in Profile module |
| **Negative** | 4 | ✅ Yes (device/network edge cases) | Relevant but partially blocked |
| **Total in scope** | **~41** | | |

---

## 2. Coverage Quality Assessment

### 2.1 test-suites/login/ — Quality Rating: ⭐⭐⭐⭐⭐ HIGH

**Strengths:**
- ✅ Every TC has a clear **Objective**, **Preconditions**, **Exact Test Steps**, and **Expected Results**
- ✅ All TCs include **Flutter source references** (file, class, widget, exact code snippets)
- ✅ **Semantic labels** (`emailTextFieldBox`, `loginButton`, `forgotPasswordText`, etc.) enable reliable locators
- ✅ **Exact i18n strings** from `app_en.arb` ensure test assertions match production text
- ✅ **BLoC state machine** coverage: every state (`AuthenticationLoadingState`, `AuthenticationErrorState`, `AuthenticationAuthorizedState`, etc.) is exercised
- ✅ **Scenario Outline** patterns for validation TCs reduce redundancy while increasing data breadth
- ✅ **Platform tags** (`@ios`, `@android`, `@both`) route tests to correct MobileWright projects
- ✅ **Blocked TCs clearly flagged** with infrastructure blockers identified upfront
- ✅ **Suggested Gherkin** with `@DataFile`, `@Key`, suite tags ready to copy into feature files
- ✅ **Cross-references** between related TCs enable efficient navigation

**Weaknesses / Gaps:**
- ❌ Missing: Logout flow (covered in test-link Profile TC-2121)
- ❌ Missing: Delete account flow (test-link TC-2124)
- ❌ Missing: Paste password in login field (test-link TC-2066)
- ❌ Missing: Leading/trailing spaces in email field (test-link TC-2061/2062)
- ❌ Missing: Terms and conditions link validation (test-link TC-2059)
- ❌ Missing: App reinstall / fresh install login behaviour (test-link TC-4694)
- ❌ Missing: Multi-user session isolation — login after logout from different account (test-link TC-4765)
- ❌ Missing: App behaviour after background/foreground switch during login
- ❌ Missing: Verify old password cannot be reused after change (test-link TC-2063)

---

### 2.2 test-link/LoginPage/ — Quality Rating: ⭐⭐ LOW-MEDIUM

**Strengths:**
- ✅ Broad coverage of login page behaviours (30 distinct TCs)
- ✅ Identifies some edge cases: spaces in fields, paste, cross-browser, terms and conditions
- ✅ Covers newer scenarios added later: first-login flow (TC-4658), autofill (TC-4812), uninstall (TC-4694)
- ✅ Marks execution type correctly (Automated vs Manual)

**Weaknesses:**
- ❌ Steps are extremely thin: "Precondition:" appears as an action step in almost every TC
- ❌ Zero Flutter source references or semantic label information
- ❌ No page object, step definition, or test data key references
- ❌ No Gherkin or BDD structure
- ❌ Expected results are vague (e.g., "User should be able to login")
- ❌ No blocking infra issues identified (TC-2053 reset flow requires email OTP but is marked Automated)
- ❌ Several TCs are individual scenarios for what test-suites covers in a single Scenario Outline (TC-2044 through TC-2048 → all covered by TC-LOGIN-009/010/011)
- ❌ Cross-browser testing (TC-2058) is a web concept — irrelevant for mobile; platform distinction (@ios/@android) is the mobile equivalent

---

### 2.3 test-link/Home/ — Quality Rating: ⭐ NOT APPLICABLE (Wrong Module)

**This sub-suite should NOT be under Login.** All 27 TCs cover Home screen functionality:
- Home screen UI validation
- Navigation to module lists (Corporate, Sites, Conveyor, Inspections)
- Search functionality
- Filter dropdowns (Territory, Site, Conveyor)
- Count indicators per category
- Colour codes and pie diagrams
- Last-updated timestamp
- Unit conversion feature

**Action Required:** Move all 27 TCs to a **separate `docs/test-suites/home/` module**. These have zero overlap with authentication and inflate the Login module's TC count artificially.

---

### 2.4 test-link/Profile/ — Quality Rating: ⭐⭐ LOW (Partially Misplaced)

**6 TCs are auth-adjacent and relevant:**

| TC | Title | Belongs in |
|---|---|---|
| TC-2116 | Validating Change password button | Login/Profile |
| TC-2117 | Change password page fields + eye icon + save | Login/Profile |
| TC-2118 | Eye icon validation | Login (covered by TC-008) |
| TC-2121 | Validating logout button | Login module — **MISSING from test-suites** |
| TC-4764 | Login after logout / session timeout | Login (covered by TC-029) |
| TC-4765 | Other user login after logout — no data bleed | Login — **MISSING from test-suites** |

**15 TCs are misplaced and belong in a Profile module:**
TC-2099 (settings), TC-2101 (unit of measure), TC-2103/2108 (back buttons), TC-2109 (profile field), TC-2110 (profile picture), TC-2111 (privacy), TC-2112 (report issue), TC-2113 (my information), TC-2114/2115 (profile section/editable fields), TC-2120 (change pw mismatch), TC-2122 (cross-browser), TC-2124 (delete account)

**Action Required:** Create `docs/test-suites/profile/` module for the 15 misplaced TCs.

---

### 2.5 test-link/Negative/ — Quality Rating: ⭐⭐⭐ MEDIUM (Valid but Underspecified)

All 4 TCs cover real device-level scenarios:

| TC | Title | test-suites Coverage |
|---|---|---|
| TC-2125 | App functionality after incoming call | ❌ Missing |
| TC-2126 | App functionality offline | ✅ TC-013 (🔴 Blocked) |
| TC-2127 | App switching between applications | ❌ Missing |
| TC-2129 | Switching between mobile data and WiFi | ❌ Missing |

These are all infrastructure-dependent (require physical device interaction) but are **real test scenarios** that test-suites doesn't currently document. They should be added as Blocked TCs.

---

## 3. Detailed Gap Matrix — test-suites vs test-link

### 3.1 Areas Well Covered in test-suites (✅ — Adequate, No Change Needed)

| Functional Area | test-suites TC | test-link Equivalent | Quality Verdict |
|---|---|---|---|
| Splash screen | TC-001 | *(not covered in test-link)* | ✅ test-suites better |
| Welcome screen UI | TC-002 | TC-2041 (partial) | ✅ test-suites better |
| Continental Account flow | TC-003 | TC-2043 | ✅ test-suites better |
| Continue as Guest | TC-004 | TC-2041 (partial) | ✅ test-suites better |
| Login screen UI | TC-005 | TC-2041 | ✅ test-suites better |
| Successful login | TC-006 | TC-2042 | ✅ test-suites better |
| Email auto-lowercase | TC-007 | *(not explicit in test-link)* | ✅ test-suites only |
| Password visibility toggle | TC-008 | TC-2064, TC-2065 | ✅ test-suites covers both in 1 TC |
| Empty field validation | TC-009 | TC-2047, TC-2048 | ✅ test-suites uses Outline, more efficient |
| Invalid email | TC-010 | TC-2045 (partial) | ✅ test-suites better |
| Invalid password | TC-011 | *(scattered across multiple test-link TCs)* | ✅ test-suites clearer |
| Invalid credentials | TC-012 | TC-2044, TC-2046 | ✅ test-suites covers both in 1 TC |
| Offline login | TC-013 | TC-2126 | ⚠️ Both blocked; aligned |
| Loading state | TC-014 | *(not in test-link)* | ✅ test-suites only |
| Autofill | TC-015 | TC-4812 | ✅ test-suites better (Flutter source) |
| Back button Login→Welcome | TC-016 | TC-2043 | ✅ test-suites better |
| Forgot pw navigation | TC-017 | TC-2049 | ✅ test-suites better |
| Forgot pw screen UI | TC-018 | TC-2050 (partial) | ✅ test-suites better |
| Forgot pw valid email | TC-019 | TC-2053 (partial) | ⚠️ Both blocked on OTP |
| Forgot pw validation | TC-020 | TC-2051 (partial) | ✅ test-suites better |
| Code already received | TC-021 | *(not in test-link)* | ✅ test-suites only |
| Back button on ForgotPw | TC-022 | TC-2052, TC-2054 | ✅ test-suites covers both in 1 TC |
| Reset pw screen UI | TC-023 | TC-2056 (partial) | ✅ test-suites better |
| Reset pw success | TC-024 | TC-2053 | ⚠️ Both blocked on OTP |
| Reset pw validation | TC-025 | TC-2055, TC-2057 | ✅ test-suites uses Outline |
| First-login change pw | TC-026 | TC-4658 | ✅ test-suites better |
| Change pw success | TC-027 | TC-2117, TC-2119 | ⚠️ Both blocked on reversible account |
| Change pw validation | TC-028 | TC-2120, Profile TCs | ✅ test-suites clearer |
| Session expiry | TC-029 | TC-4764 | ✅ test-suites better |
| Password policy | TC-030 | TC-2060 (partial) | ✅ test-suites has regex + examples |

### 3.2 Gaps in test-suites — Missing Functional Areas (❌ Action Required)

| # | Missing Area | test-link Source | Priority | Action |
|---|---|---|---|---|
| G-01 | **Logout flow** | TC-2121 | High | ✅ **ADDRESSED** → [TC-LOGIN-031](../test-suites/login/tc-login-031-logout-flow.md) |
| G-02 | **Delete account functionality** | TC-2124 | High | ✅ **ADDRESSED** → [TC-LOGIN-032](../test-suites/login/tc-login-032-delete-account.md) |
| G-03 | **Multi-user session isolation** (no data bleed after logout) | TC-4765 | High | ✅ **ADDRESSED** → [TC-LOGIN-033](../test-suites/login/tc-login-033-multi-user-session-isolation.md) |
| G-04 | **Paste password** in login field | TC-2066 | Medium | ✅ **ADDRESSED** → [TC-LOGIN-034](../test-suites/login/tc-login-034-paste-password.md) |
| G-05 | **Spaces around email/password** input edge case | TC-2061, TC-2062 | Medium | ✅ **ADDRESSED** → [TC-LOGIN-035](../test-suites/login/tc-login-035-email-password-spaces-trim.md) + TC-009 updated |
| G-06 | **Terms and conditions / Legal & Privacy link** | TC-2059 | Medium | ✅ **ADDRESSED** → [TC-LOGIN-036](../test-suites/login/tc-login-036-legal-privacy-link.md) |
| G-07 | **App reinstall** — login credentials cleared | TC-4694 | Medium | ✅ **ADDRESSED** → [TC-LOGIN-037](../test-suites/login/tc-login-037-app-reinstall.md) |
| G-08 | **App resume from background** / multitasking during login | TC-2127 | Medium | ✅ **ADDRESSED** → [TC-LOGIN-038](../test-suites/login/tc-login-038-app-backgrounding.md) 🔴 Blocked |
| G-09 | **Network switch** (WiFi ↔ mobile data) mid-flow | TC-2129 | Low | ✅ **ADDRESSED** → [TC-LOGIN-039](../test-suites/login/tc-login-039-network-switch.md) 🔴 Blocked |
| G-10 | **Incoming call** interruption during login | TC-2125 | Low | ✅ **ADDRESSED** → [TC-LOGIN-040](../test-suites/login/tc-login-040-incoming-call.md) 🔴 Blocked |
| G-11 | **Old password rejection** after change | TC-2063 | Medium | ✅ **ADDRESSED** → [TC-LOGIN-041](../test-suites/login/tc-login-041-old-password-rejected.md) 🔴 Blocked |

---

## 4. What test-link Covers That Requires Module Migration

### 4.1 Home Module (27 TCs) → Should move to `docs/test-suites/home/`

These TCs are **incorrectly grouped under Login** in TestLink. They cover the Home dashboard screen — a completely separate module from authentication.

| Area | TC Count | Recommended Module |
|---|---|---|
| Home page validation + fields | 2 | `test-suites/home/` |
| + button (add new record) | 1 | `test-suites/home/` |
| Module navigation (Corporate/Site/Conveyor/Inspection) | 4 | `test-suites/home/` |
| Search functionality | 1 | `test-suites/home/` |
| Filter dropdowns (Territory/Site/Conveyor) + Cancel/Save | 5 | `test-suites/home/` |
| Profile + Refresh buttons | 2 | `test-suites/home/` |
| Category counts (Site/Conveyor/CoverWear/Inspection/FileManager) | 5 | `test-suites/home/` |
| Colour codes, pie diagram, storage indicator | 3 | `test-suites/home/` |
| Cross-browser counts | 1 | `test-suites/home/` |
| Last updated timestamp | 1 | `test-suites/home/` |
| Unit conversion | 1 | `test-suites/home/` |

**Impact if not migrated:** Login module appears to have 82 TCs when it really has ~41. Inflated KPI misleads automation planning.

### 4.2 Profile Module (15 TCs) → Should move to `docs/test-suites/profile/`

| Area | TCs | Recommended Module |
|---|---|---|
| Settings button + Unit of measure dropdown | TC-2099, TC-2101 | `test-suites/profile/` |
| Back button navigation | TC-2103, TC-2108 | `test-suites/profile/` |
| Profile field, profile picture | TC-2109, TC-2110 | `test-suites/profile/` |
| Privacy settings & Legal tab | TC-2111 | `test-suites/profile/` |
| Report issue | TC-2112 | `test-suites/profile/` |
| My information, user profile section | TC-2113, TC-2114 | `test-suites/profile/` |
| Editable personal information | TC-2115 | `test-suites/profile/` |
| Change pw mismatch (profile path) | TC-2120 | `test-suites/profile/` (overlaps with TC-028) |
| Cross-browser field validation | TC-2122 | `test-suites/profile/` |

---

## 5. Coverage Adequacy Assessment

### 5.1 Which Folder Has Higher Coverage Quality

| Dimension | test-suites/login/ | test-link/login/ |
|---|---|---|
| **Automation readiness** | ✅ 100% — Gherkin, locators, data keys | ❌ 0% — no automation metadata |
| **Source-backed accuracy** | ✅ Flutter code references on every TC | ❌ No source references |
| **Step specificity** | ✅ 6–10 detailed steps with exact actions | ❌ 2–4 vague steps |
| **Error message accuracy** | ✅ Exact i18n strings from ARB files | ❌ Paraphrased / approximated |
| **Scope correctness** | ✅ Auth module only | ❌ Includes Home + Profile modules |
| **Platform coverage** | ✅ @ios, @android, @both explicitly tagged | ❌ No platform differentiation |
| **Blocked TC visibility** | ✅ 4 TCs clearly flagged with reasons | ❌ Blocking issues not identified |
| **Redundancy** | ✅ Low — Outlines consolidate similar cases | ❌ High — TC-2044 through TC-2048 are individual permutations |
| **Breadth** | ⚠️ Missing 11 functional areas | ✅ Broader breadth (but lower quality) |

**Conclusion: `test-suites/login/` is the high-quality, automation-ready source. `test-link/login/` has breadth value but zero automation value.**

### 5.2 Is the Current test-suites Coverage Adequate?

**For Phase 1 automation (Sprint 1–3):** ✅ **Yes** — The 26 currently unblocked TCs cover all critical paths:
- Full happy path login ✅
- All form validations (email, password, empty) ✅
- All navigation flows (Back, ForgotPw, ResetPw, ChangePw) ✅
- First-login forced change ✅
- Session handling ✅
- UI completeness (splash, welcome, login, forgot, reset, change) ✅

**For comprehensive coverage:** ⚠️ **Partially** — The 11 functional gaps (G-01 to G-11) represent real behaviours in the app that are not yet documented. The highest-priority ones (logout, delete account, multi-user session isolation) should be added before Sprint 3.

**For the blocked TCs:** 🔴 4 TCs (TC-013, TC-019, TC-024, TC-027) require infrastructure (email inbox, reversible test account, network toggle) that must be provisioned before they can be automated.

---

## 6. Changes Required — Prioritised Action Plan

### 🔴 High Priority (Do Before Sprint 3)

| Action | Target | Effort |
|---|---|---|
| Add TC-LOGIN-031: Logout flow | `test-suites/login/` | Small |
| Add TC-LOGIN-032: Delete account | `test-suites/login/` | Small |
| Add TC-LOGIN-033: Multi-user session isolation | `test-suites/login/` | Small |
| Add TC-LOGIN-041: Old password rejected after change | `test-suites/login/` | Small |
| Update `test-suites/login/index.md` KPI for new TCs | `test-suites/login/` | Trivial |

### 🟡 Medium Priority (Sprint 4–5 planning)

| Action | Target | Effort |
|---|---|---|
| Add TC-LOGIN-034: Paste password | `test-suites/login/` | Small |
| Add TC-LOGIN-035: Spaces around email/password | `test-suites/login/` | Small |
| Add TC-LOGIN-036: Terms and conditions link | `test-suites/login/` | Small |
| Add TC-LOGIN-037: App reinstall login | `test-suites/login/` | Small |
| Create `docs/test-suites/home/` module | `test-suites/home/` | Medium |
| Create `docs/test-suites/profile/` module | `test-suites/profile/` | Medium |
| Update `test-link/login/index.md` to note module boundary issues | `test-link/login/` | Trivial |

### 🟢 Low Priority / Infrastructure-Dependent (After infra provisioned)

| Action | Target | Effort |
|---|---|---|
| Add TC-LOGIN-038: App backgrounding/multitasking | `test-suites/login/` | Small (Blocked) |
| Add TC-LOGIN-039: Network switch WiFi ↔ data | `test-suites/login/` | Small (Blocked) |
| Add TC-LOGIN-040: Incoming call interruption | `test-suites/login/` | Small (Blocked) |
| Provision test email inbox for TC-019, TC-024 | Infrastructure | High effort |
| Provision reversible test account for TC-027 | Infrastructure | Medium effort |

---

## 7. Recommended Final TC Count (After Gaps Filled)

| Source / Module | Current TCs | After Fixes | Change |
|---|---|---|---|
| `test-suites/login/` (auth scope) | 30 | **41** | +11 (gaps G-01 to G-11) |
| `test-suites/home/` (new module) | 0 | **27** | +27 (migrated from test-link) |
| `test-suites/profile/` (new module) | 0 | **15** | +15 (migrated from test-link) |
| `test-link/login/` (keep as historical) | 82 | 82 | No changes (read-only archive) |

---

## 8. Summary Verdict

| Question | Answer |
|---|---|
| **Which folder has higher coverage quality?** | `test-suites/login/` — significantly better in every automation dimension |
| **Where does test-suites/login/ lack?** | 11 functional areas: logout, delete account, session isolation, paste, spaces, T&C, reinstall, backgrounding, network switch, call interruption, old password rejection |
| **Where does test-link/login/ lack?** | All automation metadata; also 41/82 TCs are the wrong module entirely |
| **Are test-suites TCs adequate for Sprint 1–3?** | ✅ Yes — 26 unblocked TCs cover all critical and high-priority authentication paths |
| **What changes are required for good coverage?** | Add 11 missing TCs (5 high-priority, 4 medium, 2 low/blocked); create Home and Profile modules for 42 misplaced test-link TCs |
| **Is the overall coverage direction correct?** | ✅ Yes — test-suites approach (source-backed, automation-ready, BLoC-aligned) is the right direction and should be extended to all other modules |

---

## ✅ Gap Resolution Status — Updated 2026-06-15

All 11 identified gaps have been addressed. In addition, **1 bonus gap (G-12)** was discovered during codebase optimization and addressed.

| Gap | Status | TC Created |
|---|---|---|
| G-01 Logout flow | ✅ Addressed | TC-LOGIN-031 |
| G-02 Delete account | ✅ Addressed | TC-LOGIN-032 |
| G-03 Multi-user session isolation | ✅ Addressed | TC-LOGIN-033 |
| G-04 Paste password | ✅ Addressed | TC-LOGIN-034 |
| G-05 Spaces in email/password | ✅ Addressed | TC-LOGIN-035 + TC-009 updated |
| G-06 Legal & Privacy link | ✅ Addressed | TC-LOGIN-036 |
| G-07 App reinstall | ✅ Addressed | TC-LOGIN-037 |
| G-08 App backgrounding | ✅ Addressed (🔴 Blocked) | TC-LOGIN-038 |
| G-09 Network switch | ✅ Addressed (🔴 Blocked) | TC-LOGIN-039 |
| G-10 Incoming call | ✅ Addressed (🔴 Blocked) | TC-LOGIN-040 |
| G-11 Old password rejection | ✅ Addressed (🔴 Blocked) | TC-LOGIN-041 |
| G-12 Account activation flow *(bonus — found during codebase review)* | ✅ Addressed (🔴 Blocked) | TC-LOGIN-042 |

### Optimizations Applied to Existing TCs

| TC | Optimization |
|---|---|
| TC-LOGIN-003 | Added Hive clear (`clearAllHiveData()`) detail for Continental Account button + corrected state to `AuthenticationContinentalLoginState` |
| TC-LOGIN-006 | Added 500ms iOS autofill delay + `TextInput.finishAutofillContext()` call + corrected state name to `AuthenitcationAuthorizedState` |
| TC-LOGIN-009 | Added note: spaces-only input treated as empty (trimmed before validation) |
| TC-LOGIN-012 | Corrected error state to `AuthenticationLoginErrorState` (distinct from `AuthenticationErrorState`) |
| TC-LOGIN-013 | Corrected error state to `AuthenticationLoginErrorState(errorKey: 'offlineError')` |
| TC-LOGIN-026 | Corrected first-login state to `AuthenticationRedirectChangePasswordState` |
| TC-LOGIN-029 | Corrected unauthorized state to `AuthenitcationUnauthorizedState` (source typo preserved) |

### Updated KPI (post-gap resolution)

| Metric | Before | After |
|---|---|---|
| Total TCs in test-suites/login | 30 | **42** |
| 📋 Planned (automatable) | 26 | **33** |
| 🔴 Blocked | 4 | **9** |
| Functional areas covered | 19 | **28** |

---

*Gap analysis last updated: 2026-06-15. All original gaps addressed.*
