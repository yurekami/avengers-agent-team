---
name: frontend
description: "Frontend development rules for Spider-Man. Enforces TypeScript best practices, accessibility, responsive design, and clean component architecture."
appliesTo: [spiderman]
severity: warn
---

# Frontend Rules

> *"With great power comes great responsibility... especially with TypeScript."*

## MUST (Blocking violations)

These rules MUST be followed. Violations block task completion.

- **TypeScript interfaces for all props** - Every component must define typed props. No `any` on component boundaries.
- **ARIA labels on interactive elements** - Buttons, links, form inputs, and custom controls must have accessible labels.
- **Responsive design** - All UI components must work on mobile (320px), tablet (768px), and desktop (1024px+).
- **Error boundaries** - Every route-level component must be wrapped in an error boundary.
- **Key props on lists** - All mapped/iterated elements must have stable, unique keys. Never use array index as key.
- **Semantic HTML** - Use proper HTML5 elements (`nav`, `main`, `article`, `section`, `aside`, `header`, `footer`).
- **No direct DOM manipulation** - Never use `document.querySelector` or `innerHTML` in component code.

## SHOULD (Warnings)

These rules SHOULD be followed. Violations generate warnings but don't block.

- **Components under 200 lines** - Split large components into smaller, focused ones.
- **Custom hooks for shared logic** - Extract reusable stateful logic into custom hooks.
- **Proper loading states** - Show skeleton/spinner during async operations.
- **Proper empty states** - Display meaningful content when data is empty.
- **Memoization for expensive renders** - Use `useMemo`/`useCallback` for heavy computations or frequently re-rendered components.
- **Consistent naming** - PascalCase for components, camelCase for hooks (useXxx), kebab-case for CSS modules.

## MUST NOT (Blocking violations)

These patterns MUST NOT appear. Detection is automatic.

- **No inline styles** - Use CSS modules, Tailwind, or styled-components. Never `style={{}}` except for truly dynamic values.
- **No `any` type** - Replace with proper types. Use `unknown` if truly unknown, then narrow.
- **No `console.log` in production** - Remove all debug logging before completion. Use a proper logging utility if needed.
- **No `// @ts-ignore`** - Fix the type error instead of suppressing it.
- **No hardcoded strings** - User-facing text should use i18n or constants.
- **No `var` declarations** - Use `const` by default, `let` only when reassignment is needed.
- **No nested ternaries** - Use early returns, switch statements, or extracted variables instead.

## Auto-Detection Patterns

```
MUST NOT patterns (regex):
- /style=\{\{/           → "Inline style detected"
- /:\s*any\b/            → "any type detected"
- /console\.log\(/       → "console.log detected"
- /@ts-ignore/           → "@ts-ignore detected"
- /\bvar\s+/             → "var declaration detected"
```
