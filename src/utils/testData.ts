/**
 * Resolves a Gherkin step argument that may reference loaded test data.
 *
 * Any value prefixed with "td." is treated as a key lookup into the scenario's
 * `testData` object (populated from the `@DataFile`/`@Key` tags on the scenario).
 * Any other value is returned as-is (a literal).
 *
 * Example:
 *   resolveTestDataToken(this.testData, 'td.Username') -> testData['Username']
 *   resolveTestDataToken(this.testData, 'someone@example.com') -> 'someone@example.com'
 */
export function resolveTestDataToken(testData: Record<string, unknown>, raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('td.')) return raw;

  const key = trimmed.slice('td.'.length);
  const value = testData[key];

  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing test data for "${key}". Check @DataFile/@Key tags and the data file columns.`);
  }

  const leadingSpace = raw.slice(0, raw.indexOf(trimmed));
  const trailingSpace = raw.slice(raw.indexOf(trimmed) + trimmed.length);
  return `${leadingSpace}${String(value)}${trailingSpace}`;
}
