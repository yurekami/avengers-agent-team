---
name: architecture
description: "Architecture rules for Iron Man. Enforces separation of concerns, typed interfaces, documentation, and clean system design."
appliesTo: [ironman]
severity: warn
---

# Architecture Rules

> *"Sometimes you gotta run before you can walk... but always have a blueprint."*

## MUST (Blocking violations)

- **Separation of concerns** - Business logic, data access, and presentation must be in separate modules.
- **Typed interfaces at boundaries** - All module boundaries must use TypeScript interfaces or type definitions.
- **Documentation for public APIs** - Every exported function, class, or module must have JSDoc or inline documentation.
- **Dependency direction** - Dependencies must flow inward (UI → Service → Repository). Never reverse.
- **No circular dependencies** - Modules must not have circular import chains.
- **Configuration externalization** - All environment-specific values must be configurable, not hardcoded.

## SHOULD (Warnings)

- **Files under 400 lines** - Split large files into focused modules.
- **Single Responsibility** - Each module/class should have one reason to change.
- **Interface segregation** - Prefer many small interfaces over one large interface.
- **Consistent error types** - Use a standard error hierarchy across the application.
- **Feature-based organization** - Group by feature/domain, not by file type (avoid `controllers/`, `models/`, `views/` at top level).
- **Dependency injection** - Use DI for external dependencies to enable testing.

## MUST NOT (Blocking violations)

- **No circular dependencies** - If `A` imports `B` and `B` imports `A`, refactor to break the cycle.
- **No god objects** - No class or module should own more than 5 major responsibilities.
- **No hidden side effects** - Functions named as queries (get*, find*, is*) must not modify state.
- **No barrel file re-exports of everything** - Index files should export a curated public API, not `export * from`.
- **No direct database access from UI layer** - Data flows through service and repository layers.

## Auto-Detection Patterns

```
MUST NOT patterns (regex):
- /export \* from/       → "Barrel re-export detected"
- /class .{50,}/         → "Potentially oversized class name (god object?)"
```
