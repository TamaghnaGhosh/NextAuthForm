# NextAuthForm

A small Next.js app demonstrating NextAuth v5 with a Credentials provider (email/password), JWT sessions, and protected routes.

**Quick Start**

- Install dependencies:

```bash
pnpm install
```

- Add local environment variables in `.env.local` (already present for development):

```
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=<secure-random-string>
```

- Run the dev server:

```bash
npm run dev
```

- Open: `http://localhost:3001`

**Environment**

- `NEXTAUTH_URL` — the base URL used by NextAuth (e.g. `http://localhost:3001`).
- `NEXTAUTH_SECRET` — a strong random string used to sign tokens and cookies. Replace for production.

**Authentication Flow (overview)**

1. Signup: user registers via the signup endpoint (`app/api/auth/signup/route.ts`) which hashes the password with `bcryptjs` and stores the user in the in-memory `users` map for this example.
2. Sign-in: user submits email/password to the Credentials provider (`app/api/auth/[...nextauth]/route.ts`). The provider's `authorize` callback checks the credentials and, on success, returns a user object.
3. Session creation: NextAuth issues a JWT session (configured in `authOptions`) using `NEXTAUTH_SECRET`.
4. Protected routes: Server components call the exported `auth()` helper from `app/api/auth/[...nextauth]/route.ts` to obtain the session. If no session exists, pages redirect to `/login`.
5. Dashboard: upon successful sign-in users land on the protected dashboard page (`app/dashboard/page.tsx`). A client component `components/prevent-back.tsx` intercepts browser Back button navigation and prevents navigating back while authenticated.
6. Sign-out: clicking the `Sign Out` button calls the sign-out flow and clears the session, after which normal navigation is allowed.

**Key Files**

- `app/api/auth/[...nextauth]/route.ts` — NextAuth configuration, providers, callbacks, and `auth()` helper.
- `app/dashboard/page.tsx` — Protected dashboard page that renders session details.
- `components/prevent-back.tsx` — Client component that prevents back navigation while authenticated.
- `components/sign-out-button.tsx` — Sign-out UI and handler.
- `.env.local` — Local env file for `NEXTAUTH_URL` and `NEXTAUTH_SECRET` (not committed).

**Testing the behavior**

1. Start the dev server and sign up / sign in with the demo user (or create a new user).
2. After landing on the dashboard, press the browser Back button — you should remain on the dashboard.
3. Click `Sign Out` — after sign out, Back navigation should behave normally.

**Notes & Next Steps**

- This example uses an in-memory `users` object; replace with a persistent DB for real apps.
- For production, use a secure secret, enable HTTPS, and add `.env.local` to `.gitignore`.
- Consider improving UX by showing a confirmation modal when the user attempts to navigate away.

---

If you'd like, I can:
- Add `.env.local` to `.gitignore`, or
- Replace the demo in-memory store with a minimal SQLite example.
