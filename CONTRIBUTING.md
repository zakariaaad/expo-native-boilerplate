# Contributing

## Toolchain overview

```
Prettier                   → Formatting (the single source of truth for style)
ESLint                     → Code quality & logic rules (NOT formatting)
eslint-config-prettier     → Disables all ESLint rules that conflict with Prettier
eslint-plugin-prettier     → Reports Prettier violations as ESLint errors
prettier-plugin-tailwindcss→ Auto-sorts Tailwind/NativeWind className strings
lint-staged                → Runs Prettier + ESLint only on git-staged files
Husky                      → Git hooks that invoke lint-staged + tsc
```

The golden rule: **Prettier owns formatting. ESLint owns logic.**
They never conflict because `eslint-config-prettier` is always last in `extends`.

---

## Setup

```bash
npm install       # installs everything including husky + lint-staged
```

Husky hooks are registered automatically via the `"prepare": "husky"` script
that runs on `npm install`.

---

## What happens on `git commit`

```
pre-commit hook
  └─ lint-staged
      ├─ *.{ts,tsx}   → prettier --write → eslint --fix --max-warnings 0
      ├─ *.js         → prettier --write
      └─ *.{json,md,css} → prettier --write
  └─ tsc --noEmit    (full project type-check, catches cross-file errors)

commit-msg hook
  └─ validates Conventional Commits format
```

If any step fails, the commit is **blocked** and the error is printed to the terminal.
Fix the reported issues and `git add` the fixed files before trying again.

---

## Editor integration (VS Code)

Install the recommended extensions when prompted (`.vscode/extensions.json`).
With them installed:

- **Format on save** — Prettier runs automatically every time you save a file
- **ESLint inline** — errors and warnings appear as you type, auto-fixed on save
- **className autocomplete** — Tailwind IntelliSense works inside `className`, `cn()`, and `clsx()`

---

## Manual commands

```bash
# Format all files
npm run format

# Check formatting without writing (useful in CI)
npm run format:check

# Lint all files
npm run lint

# Lint + auto-fix
npm run lint:fix

# Type-check without emitting
npm run type-check
```

---

## Commit message format

This project enforces [Conventional Commits](https://www.conventionalcommits.org):

```
type(scope): short description
```

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Maintenance — deps, config, tooling |
| `docs` | Documentation only |
| `style` | Formatting, whitespace, no logic change |
| `refactor` | Code restructure — no new feature, no fix |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system, bundler config |
| `ci` | CI/CD pipeline changes |
| `revert` | Revert a previous commit |

**Examples:**
```
feat(auth): add biometric login
fix: crash on deep link navigation
chore(deps): bump nativewind to v4
docs: update EAS setup instructions
```

Tip: Install the **Conventional Commits** VS Code extension
(`vivaxy.vscode-conventional-commits`) for a guided commit message UI.
