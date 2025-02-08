## General

We are building a mobile web app using Next.js.

## Instructions

- Propose a functioning and well-styled, concise code
- Work on each file one at time. Propose the changes so that I can review them and integrate to the code
- Keep the explanations brief

## Goals

--

## Code Style and Conventions

1. JavaScript/TypeScript:

   - Use double quotes for strings
   - No semicolons
   - Props with ReactNode type should use PascalCase (except 'children')
   - Keep React's reserved prop names (like 'children') as is

2. CSS:

   - Use CSS Modules for style isolation (e.g., `Component.module.css`)
   - Keep semicolons in CSS rules
   - Use proper indentation

3. Import Statements:
   - At the top of the file
   - Sectioned by:
     (i) from external packages
     (ii) from other directories from package (usually starts with `@/src/...`)
     (iii) from local files (`./...`)
   - Empty line inserted between sections
   - Within sections, the imports should be sorted
