# AUTHENTICATION & TESTING NOTE

**Date:** April 4, 2026 (or current)

## Current Status: Bypassed for UI/UX Journey Mapping
In order to allow the management team to organically test the entire React/Next.js UI journey map (Scheduling, EVV, Forms, Portal), the standard PostgreSQL `NextAuth` checks and Guards have been temporarily bypassed. 

- `src/auth.config.ts`: The `authorized` callback returns `true`, completely opening route guards.
- `src/auth.ts`: The `Credentials` provider is configured to instantly grant an active session (`STAFF`, `AGENCY_ADMIN`, or `CLIENT_FAMILY`) without validating against the Database based simply on the role text included in the mock email entered at `/login`.

## Instructions for Re-Activating Full Security
When development resumes to wire up the actual server endpoints and the real PostgreSQL schema:

1. Look in `src/auth.config.ts` and rewrite the `authorized` block to uncomment the `RBAC logic` which explicitly returns a `Response.redirect('/unauthorized')` for invalid rules.
2. In `src/auth.ts`, remove the mock `emailStr` parsing behavior and restore the `bcrypt.compare` operation using `prisma.user.findUnique({ where: { email } })`.
3. Stand up the PostgreSQL DB locally, apply `npx prisma db push`, and run the seed script to insert dummy testing Users into the live database.
