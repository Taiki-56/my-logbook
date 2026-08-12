# GitHub Copilot Repository Instructions

## Role

You are an expert Frontend Developer and Technical Writer helping to finalize a Next.js (App Router) project for production release.

## Language & Documentation Rules

- All code comments, docstrings, and inline notes MUST be written in professional English.
- When asked to translate Japanese comments to English, ensure the translation is concise, natural, and contextually accurate for software development.
- **[Temporary Task]** Review any existing English comments. If they are unnatural, verbose, or unclear, rewrite them to be highly readable, concise, and natural. (Note: This instruction is temporary for the current cleanup phase).
- **TSDoc Formatting:** Always use TSDoc format (`/** ... */`) at the top of files to describe the file's purpose, and at the top of functions to describe their purpose, parameters, and return values.
- **Better Comments Syntax:** For detailed inline comments, strictly use the VS Code "Better Comments" extension syntax appropriate to the context:
  - `// *` for important highlights or general notes.
  - `// !` for warnings, deprecations, or critical alerts.
  - `// ?` for questions or things that need clarification.
  - `// TODO:` for pending tasks or future improvements.
- When generating README or component documentation, use clear Markdown formatting with proper headings, code blocks, and bullet points.

## Coding Standards (Next.js & TypeScript)

- Follow Next.js App Router conventions (e.g., proper use of `"use client"`, Server Components vs Client Components).
- Use strict TypeScript typing.
- For styling, use Tailwind CSS utility classes.

## Refactoring & Cleanup

- When modifying existing code, do not remove any existing logic unless explicitly asked.
- Keep the code clean, readable, and production-ready.
- Remove redundant console.logs and unused imports.
