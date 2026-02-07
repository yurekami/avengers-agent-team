---
name: backend
description: "Backend development rules for Thor. Enforces secure API design, proper error handling, input validation, and database best practices."
appliesTo: [thor]
severity: warn
---

# Backend Rules

> *"Bring me a properly validated request!"*

## MUST (Blocking violations)

- **Parameterized queries** - All database queries must use parameterized/prepared statements. No string concatenation for SQL.
- **Input validation** - All user input must be validated at the API boundary using a schema library (Zod, Joi, etc.).
- **Error handling on all async operations** - Every `await` must be in a try/catch or have a `.catch()`. No unhandled promise rejections.
- **Authentication on protected routes** - Every non-public endpoint must verify authentication before processing.
- **Authorization checks** - Verify the authenticated user has permission for the requested resource/action.
- **Rate limiting** - All public endpoints must have rate limiting configured.
- **Request/response typing** - All API handlers must have typed request and response interfaces.

## SHOULD (Warnings)

- **Functions under 50 lines** - Break complex logic into focused helper functions.
- **Proper logging** - Use structured logging (not console.log) with log levels (debug, info, warn, error).
- **Idempotent operations** - PUT/DELETE operations should be safe to retry.
- **Pagination on list endpoints** - All endpoints returning arrays should support pagination.
- **Health check endpoint** - API should expose a `/health` or `/status` endpoint.
- **Request ID tracking** - Generate and propagate request IDs for tracing.
- **Graceful shutdown** - Server should handle SIGTERM and drain connections.

## MUST NOT (Blocking violations)

- **No raw SQL strings** - Use an ORM, query builder, or parameterized queries.
- **No hardcoded secrets** - API keys, passwords, tokens must come from environment variables.
- **No unhandled promises** - Every promise must be awaited or have a .catch() handler.
- **No stack traces in responses** - Error responses must not expose internal details to clients.
- **No `eval()` or `Function()` constructor** - Never execute dynamic code from user input.
- **No synchronous file I/O in request handlers** - Use async versions (`fs.promises`) in hot paths.
- **No wildcard CORS** - Never use `Access-Control-Allow-Origin: *` on authenticated endpoints.

## Auto-Detection Patterns

```
MUST NOT patterns (regex):
- /`.*\$\{.*\}.*`.*query|query.*`.*\$\{/  → "String interpolation in SQL query"
- /['"]sk-|['"]api_key|password\s*=\s*['"]/  → "Hardcoded secret detected"
- /eval\s*\(/                                → "eval() usage detected"
- /readFileSync|writeFileSync/               → "Sync file I/O in handler"
- /Origin:\s*\*/                             → "Wildcard CORS detected"
```
