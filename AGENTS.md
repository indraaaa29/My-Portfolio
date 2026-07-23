<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Structure Rule
- **Root Application Structure**: All application source files (`package.json`, `src/`, `public/`, `next.config.ts`, `tsconfig.json`, etc.) MUST reside at the root of the repository.
- **No Subfolder Wrappers**: Do NOT place the web application files into a `Website/` or subfolder wrapper. Keep all source files, configurations, and public assets at the root level.

