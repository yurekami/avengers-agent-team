---
name: quality
description: "Quality and testing rules for Thanos. Enforces test naming conventions, coverage targets, security checklist compliance, and review standards."
appliesTo: [thanos]
severity: warn
---

# Quality Rules

> *"The hardest choices require the strongest test coverage."*

## MUST (Blocking violations)

- **Test naming convention** - Tests must follow: `should [expected behavior] when [condition]` or `it('[action] [result]')`.
- **80%+ code coverage** - All new code must maintain at least 80% line coverage. No exceptions for non-trivial modules.
- **Security checklist completion** - Every review must include the full security checklist (SQL injection, XSS, CSRF, auth, secrets, input validation, error handling, dependencies, rate limiting).
- **Severity ratings on all findings** - Every issue must be classified: Critical, High, Medium, or Low.
- **Reproduction steps for bugs** - Every bug report must include exact steps to reproduce.
- **Test isolation** - Tests must not depend on each other or on external services. Use mocks for external dependencies.

## SHOULD (Warnings)

- **Integration tests for critical paths** - Authentication, payment, data mutation flows should have integration tests.
- **Snapshot tests for UI components** - Capture component render output for regression detection.
- **Performance benchmarks for hot paths** - Measure and track latency for frequently-called endpoints.
- **Test data factories** - Use factory functions instead of hardcoded test fixtures.
- **Negative test cases** - Test error paths, invalid inputs, and edge cases, not just happy paths.
- **Accessibility testing** - Include automated a11y checks in the test suite.

## MUST NOT (Blocking violations)

- **No skipped tests** - Remove or fix `.skip()` and `xit()` tests. Never leave them in.
- **No disabled linting** - Don't use `eslint-disable` without a comment explaining why.
- **No test-only code in production** - Conditional logic for testing (`if (process.env.NODE_ENV === 'test')`) is not allowed in production code.
- **No hardcoded test data that could expire** - Avoid timestamps, tokens, or dates that will become invalid.
- **No `expect` without assertion** - Every test must have at least one meaningful assertion.
- **No flaky test tolerance** - If a test is flaky, fix it or quarantine it with a tracking issue. Never ignore.

## Auto-Detection Patterns

```
MUST NOT patterns (regex):
- /\.skip\s*\(/           → "Skipped test detected"
- /eslint-disable(?!.*--)/  → "ESLint disable without justification"
- /NODE_ENV.*test/        → "Test-conditional production code"
- /expect\(\)\.toBe\(\)/  → "Empty assertion detected"
```
