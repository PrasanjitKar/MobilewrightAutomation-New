# Adding a New Feature / Scenario — Step-by-Step Guide

This guide walks through the complete process of adding a new automated test scenario to the **Conti+ Mobile Automation** framework.

> **Start in `docs/test-suites/`** — the single source of truth for all TCs. Read the relevant TC file before writing any code.

---

## Overview of the Flow

```
1. Read TC spec (docs/test-suites/)   →  Understand behaviour, fields, Gherkin
2. Write Feature (.feature)           →  Gherkin scenario in plain English
3. Create Page Object (pages/)        →  Playwright locators + business methods
4. Register in ScenarioContext        →  Lazy getter so steps can use this.<pageName>
5. Write Step Definitions             →  Glue code connecting Gherkin to page objects
6. Add Test Data (if needed)          →  CSV row in the correct <module>data.csv
7. Tag & Run                          →  Execute, verify, commit
8. Update index.md files              →  Mark TC as 🟢 Active — mandatory
```

---

## Step 0 — Read the TC Spec First

Before writing any code, find the TC in `docs/test-suites/`:

```
docs/test-suites/<module>/tc-<id>-<title>.md
```

The TC spec contains:
- **Objective** — what the scenario must prove
- **Required Flutter source fields / semantic labels** — exact `formControlName` values, i18n keys
- **Permission codes** — what `BELT-MONITORING-DEVICE-add` or `SITES-add` gates access
- **Suggested Gherkin** — copy-paste ready scenario
- **Test data key** — the `@Key:` to use in `resources/data/<module>data.csv`
- **Status** — if it's already `🟢 Active`, do NOT re-automate; just verify

---

## Step 1 — Choose the Right Feature File and Data File

| Suite intent | Feature file | Tag | Data file | Environment |
|---|---|---|---|---|
| Fast production check | `features/sanity/sanity.feature` | `@sanity` | `sanitydata.csv` | PRD |
| Fast critical path | `features/smoke/<module>.feature` | `@smoke` | `smokedata.csv` | STG |
| Full acceptance | `features/regression/<module>.feature` | `@regression` | `<module>data.csv` | STG |
| Complete journey | `features/e2e/<module>.feature` | `@e2e` | `e2edata.csv` | STG |

### Gherkin template

```gherkin
# features/regression/sites.feature
Feature: Sites — Regression

  Background:
    Given User is at Login page
    And Login with normal user "td.username" and "td.password.admin"

  # ─────────────────────────────────────────────────────────────────────
  # TC-SITES-019  Delete site with confirmation
  # ─────────────────────────────────────────────────────────────────────

  @DataFile:resources/data/sitedata.csv @Key:site_delete @regression
  Scenario: User deletes a site with confirmation
    Given User navigates to the Sites page
    When User selects the site "td.siteName" from the list
    And User clicks Delete from the action menu
    Then A delete confirmation dialog is displayed
    When User confirms the deletion
    Then The site "td.siteName" is removed from the list
```

### Tag convention

| Pattern | Meaning |
|---------|---------|
| `@Key:site_delete` | Links to a row in the data file where `Key = site_delete` |
| `@DataFile:resources/data/sitedata.csv` | Points to the module data file |
| `@regression` | Runs with `npm run test:regression` |
| `@both` | Run on iOS + Android (always add a platform tag) |
| `@android` | Android only |
| `@ios` | iOS only |
| `"td.siteName"` | Replaced at runtime with the `siteName` column value |
| `"td.password.admin"` | Loaded from `resources/data/.env.passwords` |

---

## Step 2 — Add Test Data to the Module CSV

Open `resources/data/<module>data.csv` (or create it if new):

```
# resources/data/sitedata.csv
Key|Env|username|siteName|updatedSiteName|searchKeyword|filterName|noMatchKeyword
site_delete|STG|user@example.com|Automation Test Site Delete||||
site_delete|PRD|user@example.com|Automation Test Site Delete||||
```

Rules:
- **One file per module** for regression: `sitedata.csv`, `logindata.csv`, `conveyordata.csv`, etc.
- **`smokedata.csv`** for all smoke scenarios
- **`sanitydata.csv`** for all sanity scenarios (PRD)
- **Never add new keys to `testdata.csv`** — it is legacy only
- Include STG, DEV, and PRD rows for each key if the scenario runs in all environments

---

## Step 3 — Create the Page Object

```typescript
// src/pages/sites.page.ts
import { Page } from '@playwright/test';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import { BasePage } from './base.page';


export class SitesPage extends BasePage {
  constructor(page: Page, subStepLogger?: HTMLSubStepLogger) {
    super(page, subStepLogger);
  }

  // ── Locators ────────────────────────────────────────────────────────
  get sitesTable()     { return this.page.locator('p-table[data-testid="sites-table"]'); }
  get deleteButton()   { return this.page.getByRole('button', { name: 'Delete' }); }
  get confirmButton()  { return this.page.getByRole('button', { name: 'Yes' }); }

  // ── Actions ─────────────────────────────────────────────────────────
  async navigateToSites(): Promise<void> {
    
    await this.page.goto(`${base}/secure/sites`);
    await this.waitForLoadingToComplete();
    this.logSuccess('Navigated to Sites module');
  }

  async deleteSite(siteName: string): Promise<void> {
    this.logInfo(`Deleting site: ${siteName}`);
    await this.page.getByRole('row', { name: siteName }).check();
    await this.deleteButton.click();
    await this.confirmButton.click();
    this.logSuccess(`Site "${siteName}" deleted`);
  }
}
```

### Rules
- **Extend `BasePage`** — always
- **`page.goto()` uses full URL** — no relative paths
- **Locators as `get` properties** — not assigned in constructor
- **Prefer semantic locators** (`getByRole`, `getByLabel`, `getByText`) over CSS/XPath

---

## Step 4 — Register in ScenarioContext

```typescript
// src/utils/ScenarioContext.ts — add these lines:

import { SitesPage } from '../pages/sites.page';

// Inside the class:
private _sitesPage?: SitesPage;

get sitesPage(): SitesPage {
  if (!this._sitesPage) this._sitesPage = new SitesPage(this.page, this.subStepLogger);
  return this._sitesPage;
}
```

---

## Step 5 — Write Step Definitions

```typescript
// src/steps/sites.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { ScenarioContext } from '../utils/ScenarioContext';
import { expect } from '@playwright/test';

Given('User navigates to the Sites page', async function(this: ScenarioContext) {
  await this.sitesPage.navigateToSites();
});

When('User selects the site {string} from the list', async function(this: ScenarioContext, siteName: string) {
  await this.sitesPage.selectSiteRow(siteName);
});

Then('The site {string} is removed from the list', async function(this: ScenarioContext, siteName: string) {
  await expect(this.sitesPage.sitesTable.getByRole('row', { name: siteName })).not.toBeVisible();
});
```

### Rules
- Always type `this` as `ScenarioContext`
- Use `this.sitesPage` — never `new SitesPage(...)`
- **No locators in step files** — all UI interaction goes through page object methods
- Keep steps thin: 1–2 page method calls maximum

---

## Step 6 — Tag, Run, Verify

```bash
# Tag with @inprogress during development
HEADLESS=false npm run test:inprogress

# Remove @inprogress when passing, then run the target suite
npm run test:regression
```

---

## Step 7 — Update Documentation (MANDATORY)

After automation is verified passing:

### 7a — Update the TC file status

In `docs/test-suites/sites/tc-sites-019-delete-site-confirmation.md`:
```markdown
| **Status** | 🟢 Active — Automated |
```

### 7b — Update the module index

In `docs/test-suites/sites/index.md`:
```markdown
| [TC-SITES-019](./tc-sites-019-delete-site-confirmation.md) | Delete site... | Critical | 🟢 Active |

## 📊 KPI
| Automated | 10 (31%) |   ← increment
| 📋 Planned | 22 |       ← decrement
```

### 7c — Update the global index

In `docs/test-suites/index.md`, find the sites row and update the `Automated` column and `Status`.

### 7d — Update test-coverage.md

In `docs/test-coverage.md`, add a row to the scenario details table for the new scenario.

---

## Status Values Reference

| Status | Meaning |
|--------|---------|
| `📋 Planned` | TC documented; no feature file/steps/page object yet |
| `🟢 Active — Automated` | Feature file, steps, page object all exist and passing |
| `🔵 Active — In Progress` | Being automated (tagged `@inprogress`) |
| `⚠️ Failing` | Automated but currently failing in CI |
| `🚫 Deprecated` | No longer relevant; kept for reference |
| `🔴 Blocked` | Cannot be automated without external infra (email API, etc.) |


---

## Step 1 — Write the Feature File

Create or edit a `.feature` file in the correct subfolder under `features/`:

| Suite | Folder | Tags |
|---|---|---|
| Fast / critical paths | `features/smoke/` | `@smoke` |
| Production smoke | `features/smoke/` | `@sanity` |
| Full acceptance | `features/regression/` | `@regression` |
| Complete user journeys | `features/e2e/` | `@e2e` |

```gherkin
# features/smoke/orders.feature    ← smoke scenario
# features/regression/orders.feature  ← regression scenario
# features/e2e/orders.feature         ← e2e scenario
Feature: Order Management

  @DataFile:resources/data/testdata.csv @Key:Order_01 @smoke
  Scenario: Create a new order
    Given User is at Login page
    Given Login with "td.username" and "td.password.admin"
    Then Navigate to the Orders page
    When Click on Create New Order button
    Then Verify the order is created successfully
```

### Key conventions

| Pattern | Meaning |
|---------|---------|
| `@Key:Order_01` | Links the scenario to a row in `testdata.csv` (column `Key`, value `Order_01`) |
| `@DataFile:resources/data/testdata.csv` | Optional — points to the data file (defaults to `resources/data/testdata.csv`) |
| `@smoke` / `@regression` | Tag for selective execution (`npm run test:smoke`) |
| `"td.username"` | Replaced at runtime with the `username` column from test data |
| `"td.password.admin"` | Replaced with the value from `resources/data/.env.passwords` |

> **Note:** Feature files live at the **project root** under `features/`, not `features/` or `src/`.

---

## Step 2 — Create the Page Object

Create a new file in `src/pages/`. The class must **extend `BasePage`** which provides `this.page`, `this.subStepLogger` (optional), and protected logging helpers. Define locators as **getter methods** returning Playwright `Locator` objects. There is no centralised LocatorRepo — each page class owns its selectors.

```ts
// src/pages/orders.page.ts
import { expect, Locator, Page } from '@playwright/test';
import BasePage from './base.page';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';

export class OrdersPage extends BasePage {
  constructor(page: Page, subStepLogger?: HTMLSubStepLogger) {
    super(page, subStepLogger);
  }

  // ==================== Locators ====================

  get pageHeader(): Locator {
    return this.page.getByRole('heading', { name: 'Orders' });
  }

  get createOrderButton(): Locator {
    return this.page.getByRole('button', { name: 'Create Order' });
  }

  get successMessage(): Locator {
    return this.page.getByText('Order created successfully');
  }

  // ==================== Actions ====================

  async verifyPageDisplayed(): Promise<void> {
    await this.logInfo('Verifying Orders page is displayed');
    await expect(this.pageHeader).toBeVisible();
    await this.logSuccess('Orders page displayed');
  }

  async clickCreateOrder(): Promise<void> {
    await this.createOrderButton.click();
  }

  async verifyOrderCreated(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await this.logSuccess('Order created successfully');
  }
}
```

### Rules

- Use Playwright's semantic locators first: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`
- Fall back to `page.locator('css=...')` or XPath only when semantic locators are not viable
- Each public method represents a **business action**, not a raw click
- Use native Playwright assertions (`expect(...).toBeVisible()`, `expect(...).toBeHidden()`) inside page methods
- Use `BasePage` logging helpers (`this.logInfo/logSuccess/logWarning/logFailure`) for HTML sub-step logging — not `this.subStepLogger` directly
- Wait for network responses in actions that trigger API calls:

```ts
async submitForm(): Promise<void> {
  await Promise.all([
    this.page.waitForResponse(response =>
      response.url().includes('/api/orders') && response.request().method() === 'POST'
    ),
    this.submitButton.click(),
  ]);
}
```

---

## Step 3 — Register in ScenarioContext

Open `src/utils/ScenarioContext.ts` and add:

### 3a. Import the page class

```ts
import { OrdersPage } from '../pages/orders.page';
```

### 3b. Add private field + lazy getter

Pass `this.page` (required) and `this.subStepLogger` (optional — always pass it so the page has HTML logging):

```ts
// In the class body, alongside the other page getters:

private _ordersPage?: OrdersPage;

get ordersPage(): OrdersPage {
  if (!this._ordersPage) this._ordersPage = new OrdersPage(this.page, this.subStepLogger);
  return this._ordersPage;
}
```

That's it — now any step can use `this.ordersPage.someMethod()`.

---

## Step 4 — Write Step Definitions

Create a new file in `src/steps/`:

```ts
// src/steps/orders.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { ScenarioContext } from '../utils/ScenarioContext';

Then('Navigate to the Orders page', async function (this: ScenarioContext) {
  await this.homePage.navigateToOrdersPage();
  await this.ordersPage.verifyPageDisplayed();
});

When('Click on Create New Order button', async function (this: ScenarioContext) {
  await this.ordersPage.clickCreateOrder();
});

Then('Verify the order is created successfully', async function (this: ScenarioContext) {
  await this.ordersPage.verifyOrderCreated();
});
```

### Rules

- **Always type `this` as `ScenarioContext`** — gives access to all page getters and world state
- **Never instantiate pages** — use `this.ordersPage` (lazy-cached by ScenarioContext)
- **No logging in steps** — page objects handle assertions and any required logging
- **Keep steps thin** — one or two page method calls per step, no business logic

> ### ⛔ IMPORTANT — No Locators in Step Definitions
>
> Step definition files must **never** use Playwright locators or selectors directly.
> All UI interactions must go through **page object methods**.
>
> ❌ **Wrong** — locator used directly in step file:
> ```ts
> When('User clicks create order', async function (this: ScenarioContext) {
>   await this.page.click('button[name="Create Order"]');  // BAD: locator in step file
> });
> ```
>
> ✅ **Correct** — step delegates to page object:
> ```ts
> When('User clicks create order', async function (this: ScenarioContext) {
>   await this.ordersPage.clickCreateOrder();  // GOOD: page object handles locator
> });
> ```

---

## Step 5 — Add Test Data (if needed)

### 5a. CSV test data

Edit `resources/data/testdata.csv` (pipe-delimited):

```
Key|Env|username|orderName
Order_01|STG|user@example.com|Test Order 001
Order_01|DEV|user@example.com|Test Order 001
```

- The `Key` column matches the `@Key:Order_01` tag on the scenario
- The `Env` column filters by the current environment (STG / DEV / SBX)
- Reference columns in feature files as `"td.username"`, `"td.orderName"`, etc.

### 5b. Passwords

Add credentials to `resources/data/.env.passwords`:

```
password.admin=$Adm!nO0O0
password.readonly=R3ad0nly!
```

Reference in feature files as `"td.password.admin"`.

---

## Step 6 — Tag, Run & Verify

### Tag your scenario for development

Add `@inprogress` while developing:

```gherkin
@DataFile:resources/data/testdata.csv @Key:Order_01 @smoke @inprogress
Scenario: Create a new order
```

### Run

```bash
# Run just your new scenario (headed by default)
npm run test:inprogress

# Headed with slow-mo for debugging
SLOW_MO=500 npm run test:inprogress
```

### Verify

1. Check terminal output — all steps green
2. Open `test-results/reports/index.html` for the HTML report
3. Remove `@inprogress` tag when the scenario is stable
4. Commit — pre-commit hooks will auto-lint and format

---

## Quick Checklist

```
☐  Feature file written under features/ with @Key and execution tags
☐  Page object created in src/pages/ extending BasePage with constructor(page, subStepLogger?)
☐  Locators defined as getter methods on the page class
☐  BasePage logging helpers used (this.logInfo/logSuccess/logWarning/logFailure) for sub-step reporting
☐  Page object registered in src/utils/ScenarioContext.ts (import + lazy getter with this.page, this.subStepLogger)
☐  Step definitions created in src/steps/ using this.<pageName>
☐  Test data added to resources/data/testdata.csv (and .env.passwords if needed)
☐  Tests pass with npm run test:inprogress
☐  @inprogress tag removed
☐  Code committed (lint + format enforced by pre-commit hook)
```

---

## Adding Navigation from an Existing Page

If navigating to your new page from the Dashboard, add a method to `src/pages/dashboard.page.ts`:

```ts
// src/pages/dashboard.page.ts — add:
get ordersMenuLink(): Locator {
  return this.page.getByRole('link', { name: 'Orders' });
}

async navigateToOrdersPage(): Promise<void> {
  await this.ordersMenuLink.click();
  await this.logSuccess('Navigated to Orders page');
}
```

No changes needed in step files — they already call `this.homePage.navigateToOrdersPage()`.
