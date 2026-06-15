# Page Object Model (POM) — Conti+ Conventions

## Table of Contents

1. [Overview](#overview)
2. [Page Class Structure](#page-class-structure)
3. [Locator Strategy](#locator-strategy)
4. [Actions & Assertions](#actions--assertions)
5. [Component Objects](#component-objects)
6. [Registering in ScenarioContext](#registering-in-scenariocontext)
7. [Best Practices](#best-practices)

## Overview

Page Objects encapsulate all UI interactions for a single screen or component. In this project:

- **No shared LocatorRepo** — locators live as `get` property methods on the page class
- **Extends `BasePage`** — all page classes extend `src/pages/base.page.ts` which provides `this.page`, the optional `this.subStepLogger`, and protected logging helpers
- **Native Playwright assertions** — `expect(locator).toBeVisible()` etc., not wrapper helpers
- **Lazy-cached per scenario** — page objects are instantiated once per scenario via `ScenarioContext` getters

## Page Class Structure

```typescript
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

  get orderNameInput(): Locator {
    return this.page.getByLabel('Order Name');
  }

  get successToast(): Locator {
    return this.page.getByText('Order created successfully');
  }

  // ==================== Validations ====================

  async verifyPageDisplayed(): Promise<void> {
    await this.logInfo('Verifying Orders page is displayed');
    await expect(this.pageHeader).toBeVisible();
    await this.logSuccess('Orders page displayed');
  }

  async verifyOrderCreated(): Promise<void> {
    await expect(this.successToast).toBeVisible();
    await this.logSuccess('Order created successfully');
  }

  // ==================== Actions ====================

  async clickCreateOrder(): Promise<void> {
    await this.createOrderButton.click();
  }

  async fillOrderName(name: string): Promise<void> {
    await this.orderNameInput.fill(name);
  }

  async submitOrder(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        response => response.url().includes('/api/orders') && response.request().method() === 'POST',
      ),
      this.page.getByRole('button', { name: 'Submit' }).click(),
    ]);
  }
}
```

## Locator Strategy

Define locators as `get` property methods. Use Playwright's semantic locators in this priority order:

| Priority | Locator type | Example |
|----------|-------------|---------|
| 1 | Role-based | `page.getByRole('button', { name: 'Submit' })` |
| 2 | Label-based | `page.getByLabel('Email address')` |
| 3 | Placeholder | `page.getByPlaceholder('Enter email')` |
| 4 | Text-based | `page.getByText('Welcome')` |
| 5 | CSS / XPath | `page.locator('#email')`, `page.locator('//input[@id="email"]')` |

Always prefer options 1–4 for resilience. Fall back to CSS/XPath when the application does not expose semantic attributes.

```typescript
// Preferred — semantic locator
get loginButton(): Locator {
  return this.page.getByRole('button', { name: 'Login' });
}

// Acceptable — CSS for specific PrimeNG/Angular component attribute
get passwordInput(): Locator {
  return this.page.locator('#password input');
}

// Acceptable — XPath for complex ancestry traversal
get cookiePopup(): Locator {
  return this.page.locator('//span[contains(text(),"We value your privacy!")]/..');
}
```

## Actions & Assertions

- Actions modify state — they click, fill, select
- Assertions verify state — use `expect(locator)` matchers from `@playwright/test`
- Use **`BasePage` logging helpers** (inherited) for HTML sub-step badges in the Cucumber report:
  - `await this.logInfo('message')` — informational badge
  - `await this.logSuccess('message')` — green success badge
  - `await this.logWarning('message')` — yellow warning badge
  - `await this.logFailure('message')` — red failure badge (non-throwing)
  - For soft/hard failures use `this.subStepLogger?.softFailure()` / `this.subStepLogger?.failure()` directly
- **Wait for network responses** inside actions that trigger API calls:

```typescript
async login(username: string, password: string): Promise<void> {
  await this.logInfo('Waiting for login page to be ready');
  await expect(this.usernameInput).toBeVisible();
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.logInfo('Submitting login form');
  await Promise.all([
    this.page.waitForResponse(
      response => response.url().includes('/auth/login') && response.request().method() === 'POST',
    ),
    this.loginButton.click(),
  ]);
  await expect(this.loginButton).toBeHidden({ timeout: 15000 });
  await this.logSuccess('Login submitted successfully');
}
```

- **Handle optional UI elements** gracefully:

```typescript
async handleCookiePopup(): Promise<void> {
  try {
    await this.cookiePopupHeader.waitFor({ state: 'visible', timeout: 5000 });
    if (await this.cookiePopupHeader.isVisible()) {
      await this.acceptButton.click();
      await expect(this.acceptButton).toBeHidden({ timeout: 10000 });
    }
  } catch {
    // Cookie popup not present — nothing to handle
  }
}
```

## Component Objects

For reusable UI components shared across pages, create a class in `src/pages/components/`:

```typescript
// src/pages/components/sidebar.component.ts
import { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  constructor(private readonly page: Page) {}

  get ordersLink(): Locator {
    return this.page.getByRole('link', { name: 'Orders' });
  }

  get dashboardLink(): Locator {
    return this.page.getByRole('link', { name: 'Dashboard' });
  }

  async navigateTo(section: string): Promise<void> {
    await this.page.getByRole('link', { name: section }).click();
  }
}
```

Compose it in a page object:

```typescript
// src/pages/dashboard.page.ts
import { Page } from '@playwright/test';
import { SidebarComponent } from './components/sidebar.component';

export class DashboardPage {
  readonly sidebar: SidebarComponent;

  constructor(private readonly page: Page) {
    this.sidebar = new SidebarComponent(page);
  }

  async navigateToOrders(): Promise<void> {
    await this.sidebar.navigateTo('Orders');
  }
}
```

## Registering in ScenarioContext

Every page object must be registered as a **lazy getter** in `src/utils/ScenarioContext.ts`. Pass `this.page` (required) and `this.subStepLogger` (optional but always pass it for HTML report logging):

```typescript
// 1. Import
import { OrdersPage } from '../pages/orders.page';

// 2. Private field + lazy getter (inside the ScenarioContext class)
private _ordersPage?: OrdersPage;

get ordersPage(): OrdersPage {
  if (!this._ordersPage) this._ordersPage = new OrdersPage(this.page, this.subStepLogger);
  return this._ordersPage;
}
```

Steps access it as `this.ordersPage` — the instance is created once and reused for the entire scenario.

## Best Practices

### Do

- **Extend `BasePage`** and use `constructor(page: Page, subStepLogger?: HTMLSubStepLogger)` — `subStepLogger` is optional
- **Use `BasePage` logging helpers** (`this.logInfo/logSuccess/logWarning/logFailure`) — do not call `this.subStepLogger` directly in most cases
- **Define locators as `get` methods** — lazy evaluation, always fresh reference
- **Use semantic locators** (`getByRole`, `getByLabel`) for resilience
- **Represent business actions** — `submitOrder()` not `clickSubmitButton()`
- **Assert inside page methods** when verifying post-action state
- **Keep methods focused** — one business action or one assertion per method
- **Handle optional/conditional UI** in the page object, not in step definitions

### Don't

- ❌ Import page objects directly in step definitions — use `this.<pageName>` via ScenarioContext
- ❌ Use locators directly in step files
- ❌ Hardcode waits (`page.waitForTimeout(...)`) — use Playwright assertions or `waitForResponse`
- ❌ Share state between page object instances
- ❌ Create page objects with `new XyzPage(...)` in step files

## File Naming

| Artifact | Convention | Example |
|----------|-----------|---------|
| Page object | `<screen>.page.ts` | `orders.page.ts` |
| Component | `<name>.component.ts` | `sidebar.component.ts` |
| Step definitions | `<feature>.steps.ts` | `orders.steps.ts` |
| Feature file | `<feature>.feature` | `orders.feature` |

## Related References

- **Adding a scenario**: See [add-scenario.md](add-scenario.md) for the full step-by-step guide
- **Locator strategies**: See [locators.md](locators.md) for advanced Playwright locator patterns
- **PR hygiene**: See [pr-hygiene.md](pr-hygiene.md) for code review checklist
