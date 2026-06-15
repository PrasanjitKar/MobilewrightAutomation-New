# Locator Strategies

## How Locators Work in This Project

In the Conti+ framework, **locators are defined as `get` property methods on each page class** — there is no centralised LocatorRepo file. Each page object owns its selectors:

```typescript
// src/pages/orders.page.ts
export class OrdersPage {
  constructor(private readonly page: Page) {}

  // Each locator is a getter returning a Playwright Locator
  get createOrderButton(): Locator {
    return this.page.getByRole('button', { name: 'Create Order' });
  }

  get orderNameInput(): Locator {
    return this.page.getByLabel('Order Name');
  }
}
```

**Locators must never be used in step definition files** (`src/steps/`). All UI interactions go through page object methods.

See [page-object.md](page-object.md) for the full page object conventions.

---

## Available Locator Methods

### 1. By Text Content
Find elements by their visible text:

```typescript
// Exact match
const element = screen.getByText('Welcome to SG Alert');

// Case-insensitive regex
const element = screen.getByText(/welcome to sg alert/i);

// Partial match
const element = screen.getByText('Welcome', { exact: false });

await element.tap();
```

### 2. By Label (Accessibility Label)
Best for accessibility-enabled apps:

```typescript
const element = screen.getByLabel('Email');
await element.fill('test@example.com');
```

### 3. By Test ID (Resource ID)
Most reliable - requires devs to add test IDs:

```typescript
const element = screen.getByTestId('login-button');
await element.tap();
```

### 4. By Role (Semantic)
Finds elements by their type:

```typescript
const button = screen.getByRole('button', { name: 'Sign In' });
await button.tap();
```

### 5. By Type (Android/iOS Element Type)
Direct element type matching:

```typescript
// Android
const element = screen.getByType('android.widget.Button');

// iOS
const element = screen.getByType('XCUIElementTypeButton');

await element.tap();
```

### 6. By Placeholder
For input fields with placeholder text:

```typescript
const searchField = screen.getByPlaceholder('Search...');
await searchField.fill('test query');
```

---

## Common Patterns

### Chain Locators (Narrow Down Search)
Find an element within another element:

```typescript
const row = screen.getByType('android.widget.LinearLayout');
const button = row.getByText('Delete');
await button.tap();
```

### Wait for Element
Elements auto-wait, but you can be explicit:

```typescript
const element = screen.getByText('Loading...');
await element.waitFor({ state: 'hidden' }); // Wait for it to disappear

const content = screen.getByText('Content Loaded');
await element.waitFor({ state: 'visible' }); // Wait for it to appear
```

### Check Element State
Query element properties:

```typescript
const checkbox = screen.getByRole('checkbox');

if (await checkbox.isVisible()) {
  console.log('Checkbox is visible');
}

if (await checkbox.isEnabled()) {
  await checkbox.tap();
}

if (await checkbox.isChecked()) {
  console.log('Checkbox is checked');
}
```

### Get Element Text
Extract text from elements:

```typescript
const heading = screen.getByType('android.widget.TextView');
const text = await heading.getText();
console.log('Heading says:', text);
```

---

## Most Common Locators (Ordered by Reliability)

### 1. Test ID (Most Stable) ⭐⭐⭐
```typescript
screen.getByTestId('login-button')
```
Requires `identifier` or `resourceId` in the UI tree.

### 2. Label (Good for Accessibility) ⭐⭐
```typescript
screen.getByLabel('Email')
screen.getByLabel('Password')
```
Requires `label` or `contentDescription` in the UI tree.

### 3. Text (Easy but can change) ⭐
```typescript
screen.getByText('Next >')
screen.getByText(/welcome/i)  // case-insensitive
```
Uses the visible `text` property.

### 4. Type (Generic)
```typescript
screen.getByType('android.widget.Button')
```
Finds any element of that type.

---


## Actions on Elements

```typescript
const element = screen.getByText('Click Me');

// Tap/Click
await element.tap();

// Double tap
await element.doubleTap();

// Long press
await element.longPress({ duration: 2000 });

// Fill text (for input fields)
await element.fill('Hello World');

// Swipe on element
await element.swipe({ direction: 'left' });

// Scroll element into view
await element.scrollIntoViewIfNeeded();
```

---

## Screen-Level Actions

```typescript
// Swipe anywhere on screen
await screen.swipe('up');
await screen.swipe('down', { distance: 500, duration: 300 });

// Tap at coordinates
await screen.tap(100, 200);

// Press hardware buttons
await screen.pressButton('HOME');
await screen.pressButton('BACK');
await screen.goBack(); // Shortcut for back button
```

---

## Example: Login Flow

```typescript
test('Login to app', async ({ device, screen }) => {
  // Launch app
  await device.launchApp('com.senecaglobal.sgalert.internal');
  
  // Wait for load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Enter email
  const emailField = screen.getByLabel('Email');
  await emailField.tap();
  await emailField.fill('user@example.com');
  
  // Enter password
  const passwordField = screen.getByLabel('Password');
  await passwordField.tap();
  await passwordField.fill('password123');
  
  // Tap login button
  const loginButton = screen.getByRole('button', { name: 'Sign In' });
  await loginButton.tap();
  
  // Verify success
  const welcomeMessage = screen.getByText(/welcome/i);
  await expect(welcomeMessage).toBeVisible();
  
  // Take screenshot
  await screen.screenshot();
});
```

---

## Debugging

If an element isn't found:

```typescript
// 1. Dump UI to see what's actually there
const uiTree = await screen.viewTree();
console.log(JSON.stringify(uiTree, null, 2));

// 2. Try different locators
try {
  const el1 = screen.getByText('Exact Text');
  await el1.tap();
} catch (e) {
  const el2 = screen.getByText(/partial/i);
  await el2.tap();
}

// 3. Add more wait time
await new Promise(r => setTimeout(r, 5000));

// 4. Check if element is actually visible
const isVisible = await element.isVisible();
console.log('Element visible:', isVisible);
```

## Tips

1. **Prefer stable locators**: `getByTestId` > `getByLabel` > `getByText` > `getByType`
2. **Use regex for flexible matching**: `/welcome/i` matches any case
3. **Inspect first**: Always dump the UI tree to see what's available
4. **Auto-waiting**: All actions wait for elements to be ready
5. **Assertions retry**: `expect().toBeVisible()` polls until timeout

---             

✅ **DO:**
- Use `screen.viewTree()` often to see what changed
- Prefer stable selectors (test IDs > labels > text)
- Use regex for flexible text matching: `/next/i`
- Take screenshots to verify each step

❌ **DON'T:**
- Rely only on text (it might change with translations)
- Use coordinates (they break on different screen sizes)
- Forget to wait for elements to load

---

## Related References

- **Adding a scenario**: See [add-scenario.md](add-scenario.md) for full step-by-step guide
- **Page object conventions**: See [page-object.md](page-object.md) for organizing locators
- **PR checklist**: See [pr-hygiene.md](pr-hygiene.md) for code review standards