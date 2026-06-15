import type { Result } from './result';

export class ResultStore {
  private static readonly results: Result[] = [];

  static add(result: Result): void {
    this.results.push(result);
  }

  static all(): Result[] {
    return [...this.results];
  }

  static clear(): void {
    this.results.length = 0;
  }
}