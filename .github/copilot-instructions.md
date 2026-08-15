# GitHub Copilot Repository Instructions

## Role

You are an expert Frontend Developer and Technical Writer helping to finalize a Next.js (App Router) project for production release.

## Language & Documentation Rules

- All code comments, docstrings, and inline notes MUST be written in professional English.
- When asked to translate Japanese comments to English, ensure the translation is concise, natural, and contextually accurate for software development.
- **[Temporary Task]** Review any existing English comments. If they are unnatural, verbose, or unclear, rewrite them to be highly readable, concise, and natural.

## Comment Formatting & TSDoc Rules

- **TSDoc Scope:** Use TSDoc format (`/** ... */`) **ONLY** for:
  1. File-level descriptions (explaining the entire file's purpose).
  2. The main exported function (the `export default` component or function representing the file).
     Do not use TSDoc for internal helper functions, variables, or minor components. Use standard comments (`//`) for those instead.
- **File-level TSDoc Placement:** Place it at the very top of the file. If there is a `"use client";` or `"use server";` directive, place the TSDoc exactly one empty line below that directive.
- **Main Function TSDoc Placement:** Place the TSDoc exactly one empty line above the declaration of the main exported function.
- **Line Wrapping:** If a TSDoc comment is long, wrap it across multiple lines to prevent horizontal scrolling.
- **Better Comments Syntax:** For detailed inline comments, strictly use the VS Code "Better Comments" extension syntax appropriate to the context:
  - `// *` for important highlights or general notes.
  - `// !` for warnings, deprecations, or critical alerts.
  - `// ?` for questions or things that need clarification.
  - `// TODO:` for pending tasks or future improvements.
  - **Exception for JSX/TSX:** Inside the `return` statement of `.tsx` files (i.e., when using `{/* ... */}`), do NOT use the Better Comments prefixes (like `*`). Just use standard plain text inside the JSX comment to keep the code visually clean (e.g., `{/* 1. Top area: title and meta info */}`).

## Coding Standards (Next.js & TypeScript)

- Follow Next.js App Router conventions (e.g., proper use of `"use client"`, Server Components vs Client Components).
- Use strict TypeScript typing.
- For styling, use Tailwind CSS utility classes.

## Refactoring & Cleanup

- When modifying existing code, do not remove any existing logic unless explicitly asked.
- Keep the code clean, readable, and production-ready.
- Remove redundant console.logs and unused imports.
