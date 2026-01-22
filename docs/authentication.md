# Authentication Standards

## Overview

Authentication in this application is **exclusively handled by Clerk**. No other authentication methods, custom auth logic, or third-party auth solutions should be implemented.

## Core Requirements

### 1. Clerk Only

- **All authentication flows** must use Clerk
- **No custom auth implementations** (no JWT manually, no sessions, no cookies)
- **No alternative auth providers** (no Auth.js, NextAuth, Passport, etc.)

### 2. Protected Routes

#### Dashboard Route

The `/dashboard` route is **protected** and requires authentication:

```typescript
// app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Dashboard content
  return <div>Dashboard for {user.firstName}</div>;
}
```

#### Homepage Redirect

If a user is **logged in** and visits the homepage (`/`), they should be **redirected to `/dashboard`**:

```typescript
// app/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  // Homepage content for non-authenticated users
  return <div>Welcome</div>;
}
```

### 3. Modal Authentication

Sign-in and sign-up flows must **always launch as modals**, not as separate pages.

Configure Clerk components to use modal mode:

```typescript
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#000000" }
      }}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

Use Clerk's modal components:

```typescript
"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <>
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>

      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </>
  );
}
```

## Common Patterns

### Server Components

```typescript
import { currentUser } from "@clerk/nextjs/server";

export default async function ServerComponent() {
  const user = await currentUser();

  if (!user) {
    // Handle unauthenticated state
  }

  // Use user.id, user.emailAddress, etc.
}
```

### Client Components

```typescript
"use client";

import { useUser } from "@clerk/nextjs";

export function ClientComponent() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return null;

  return <div>Hello {user.firstName}</div>;
}
```

### API Routes

```typescript
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Handle authenticated request
}
```

### Server Actions

```typescript
"use server";

import { currentUser } from "@clerk/nextjs/server";

export async function protectedAction() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Perform action with user.id
}
```

## Route Structure

### Authentication Routes

Use grouped routes for auth pages (optional, if needed for customization):

```
app/
  (auth)/
    sign-in/
      [[...sign-in]]/
        page.tsx      # Custom sign-in page (if needed)
    sign-up/
      [[...sign-up]]/
        page.tsx      # Custom sign-up page (if needed)
```

**Note**: Prefer modal mode over custom pages unless specific customization is required.

## Middleware (Optional)

For route-level protection, use Clerk middleware:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/links(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

## Security Checklist

- ✅ Always check authentication in server components and API routes
- ✅ Use `currentUser()` for server-side auth checks
- ✅ Use `useUser()` for client-side auth state
- ✅ Redirect unauthenticated users from protected routes
- ✅ Return 401 responses from protected API routes
- ✅ Use `user.id` for database associations
- ❌ Never bypass Clerk authentication
- ❌ Never store passwords or auth tokens manually
- ❌ Never implement custom session management

## Common Mistakes to Avoid

1. **Using client-side auth checks for security**: Always verify on the server
2. **Not checking auth in API routes**: Every protected endpoint needs auth
3. **Using separate pages for auth**: Always use modal mode
4. **Mixing auth providers**: Only Clerk, no exceptions
5. **Storing sensitive data in client state**: Use server components

---

_Follow these standards strictly. Any deviation from Clerk-based authentication must be explicitly discussed and approved._
