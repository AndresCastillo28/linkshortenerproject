# Agent Instructions for Link Shortener Project

This document provides comprehensive coding standards and guidelines for AI agents working on this link shortener project.

## Project Overview

This is a modern link shortener application built with:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js

## Core Principles

1. **Type Safety First**: Always use TypeScript with strict mode enabled. No `any` types unless absolutely necessary.
2. **Server Components by Default**: Use React Server Components unless client-side interactivity is required.
3. **Database-First Design**: Define schema in Drizzle, generate migrations, never manual SQL unless necessary.
4. **Modern React**: Use React 19 features, functional components, and hooks.
5. **Consistent Styling**: Use Tailwind CSS utility classes, follow the design system.

## ⚠️ CRITICAL: Read Documentation Before Coding

**BEFORE generating, modifying, or suggesting ANY code, you MUST:**

1. **Identify the relevant documentation file(s)** in the `/docs` directory that apply to your task
2. **Read the complete contents** of those documentation files using the `read_file` tool
3. **Follow the specific standards and patterns** defined in those files

### Required Documentation Files

Depending on your task, you MUST read:

- **`/docs/ui-components.md`** - REQUIRED for ANY UI component work (buttons, forms, cards, etc.)
- **`/docs/authentication.md`** - REQUIRED for authentication, user management, or protected routes
- **`/docs/api-conventions.md`** - REQUIRED for API routes, endpoints, or server actions
- **`/docs/component-library.md`** - REQUIRED for creating reusable components
- **`/docs/database-schema.md`** - REQUIRED for database queries, schema changes, or data modeling
- **`/docs/deployment.md`** - REQUIRED for deployment, environment, or configuration tasks

### This is NOT Optional

❌ **DO NOT** guess or assume patterns based on general knowledge  
❌ **DO NOT** skip reading documentation to save time  
❌ **DO NOT** proceed with incomplete information

✅ **DO** read the relevant docs first, every time  
✅ **DO** ask for clarification if documentation is missing  
✅ **DO** follow the exact patterns specified in the docs

**Failure to read and follow the documentation guidelines will result in code that doesn't match project standards and will need to be rewritten.**

## Project Structure

```
/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication-related pages (grouped route)
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   ├── layout.tsx         # Root layout with Clerk provider
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── db/                    # Database configuration
│   ├── schema.ts          # Drizzle schema definitions
│   └── index.ts           # Database client instance
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   └── features/         # Feature-specific components
├── lib/                   # Utility functions and helpers
├── types/                 # TypeScript type definitions
├── docs/                  # Additional documentation
├── drizzle/              # Generated migration files (git-committed)
└── public/               # Static assets
```

## TypeScript Standards

### File Naming Conventions

- **Components**: PascalCase (e.g., `LinkCard.tsx`, `UrlShortener.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`, `layout.tsx`, `[slug]/page.tsx`)
- **Utilities**: camelCase (e.g., `formatUrl.ts`, `generateShortCode.ts`)
- **Types**: PascalCase with `.d.ts` for declarations (e.g., `Link.d.ts`)
- **API Routes**: lowercase (e.g., `route.ts`, `[id]/route.ts`)

### Import Organization

```typescript
// 1. External dependencies (React, Next.js, libraries)
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

// 2. Internal absolute imports (using @/ alias)
import { db } from "@/db";
import { links } from "@/db/schema";
import { LinkCard } from "@/components/ui/LinkCard";

// 3. Relative imports
import { generateShortCode } from "./utils";

// 4. Types (if not using inline imports)
import type { Link } from "@/types/Link";
```

### Type Definitions

```typescript
// Prefer interfaces for object shapes
interface Link {
  id: string;
  url: string;
  shortCode: string;
  userId: string;
  createdAt: Date;
  clicks: number;
}

// Use type for unions, intersections, and utilities
type LinkStatus = "active" | "inactive" | "expired";
type CreateLinkInput = Omit<Link, "id" | "createdAt" | "clicks">;

// Export types alongside implementation
export type { Link, LinkStatus, CreateLinkInput };
```

## Next.js App Router Conventions

### Page Components

```typescript
// Always use proper metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Link Shortener",
  description: "Manage your shortened links",
};

// Async server components are preferred
export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userLinks = await db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, user.id),
  });

  return <div>{/* JSX */}</div>;
}
```

### API Routes

```typescript
// app/api/links/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    // Validate body here

    const newLink = await db
      .insert(links)
      .values({
        url: body.url,
        userId: user.id,
        shortCode: generateShortCode(),
      })
      .returning();

    return NextResponse.json(newLink[0], { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  // Implementation
}
```

### Client Components

```typescript
"use client";

import { useState } from "react";

interface LinkFormProps {
  onSubmit: (url: string) => Promise<void>;
}

export function LinkForm({ onSubmit }: LinkFormProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(url);
      setUrl("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form JSX */}
    </form>
  );
}
```

## Database & Drizzle ORM

### Schema Definition

```typescript
// db/schema.ts
import {
  pgTable,
  text,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  url: text("url").notNull(),
  shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
  userId: text("user_id").notNull(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Infer types from schema
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
```

### Database Queries

```typescript
// Use query API for simple queries
const allLinks = await db.query.links.findMany({
  where: (links, { eq }) => eq(links.userId, userId),
  orderBy: (links, { desc }) => [desc(links.createdAt)],
  limit: 10,
});

// Use builder API for complex queries
import { eq, and, desc } from "drizzle-orm";

const activeLinks = await db
  .select()
  .from(links)
  .where(and(eq(links.userId, userId), eq(links.status, "active")))
  .orderBy(desc(links.clicks));
```

### Migrations

```bash
# Generate migration after schema changes
npm run db:generate  # or: npx drizzle-kit generate

# Apply migrations
npm run db:migrate   # or: npx drizzle-kit migrate
```

## Authentication with Clerk

```typescript
// Server Components - use currentUser()
import { currentUser } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <div>Hello {user.firstName}</div>;
}

// Client Components - use useUser()
"use client";

import { useUser } from "@clerk/nextjs";

export function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return null;

  return <div>{user.emailAddress}</div>;
}

// API Routes - use currentUser()
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ...
}
```

## Styling with Tailwind CSS

### Class Naming Patterns

```typescript
// Use utility classes, group by category
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-black rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
    Title
  </h2>
  <p className="text-base text-zinc-600 dark:text-zinc-400">
    Description
  </p>
</div>

// For complex classes, use cn() helper (if implemented)
import { cn } from "@/lib/utils";

<button className={cn(
  "px-4 py-2 rounded-md font-medium transition-colors",
  "bg-blue-600 hover:bg-blue-700 text-white",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  isLoading && "opacity-50 cursor-wait"
)}>
  Submit
</button>
```

### Design System

- **Colors**: Use zinc scale for neutrals, define brand colors
- **Spacing**: Use Tailwind's spacing scale (4, 6, 8, 12, 16, etc.)
- **Typography**: System font stack with fallbacks
- **Dark Mode**: Support dark mode using `dark:` variant

## Error Handling

### Server Components

```typescript
export default async function Page() {
  try {
    const data = await fetchData();
    return <div>{data}</div>;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <ErrorComponent message="Failed to load data" />;
  }
}
```

### API Routes

```typescript
export async function POST(request: NextRequest) {
  try {
    // Implementation
  } catch (error) {
    console.error("API Error:", error);

    // Return appropriate error response
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Client Components

```typescript
"use client";

import { useState } from "react";

export function FormComponent() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    try {
      setError(null);
      await submitData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      {/* Form fields */}
    </form>
  );
}
```

## Environment Variables

```typescript
// Access in server components and API routes
const databaseUrl = process.env.DATABASE_URL;

// For client-side, use NEXT_PUBLIC_ prefix
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Always validate env vars on startup
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
```

## Code Quality

### ESLint

- Follow Next.js recommended ESLint rules
- No unused variables or imports
- Consistent quote style (prefer double quotes)
- Semicolons required

### Comments

```typescript
// Use JSDoc for functions
/**
 * Generates a unique short code for a link
 * @param length - The length of the short code (default: 6)
 * @returns A unique alphanumeric string
 */
export function generateShortCode(length: number = 6): string {
  // Implementation
}

// Use inline comments sparingly, only for complex logic
// Calculate expiration based on user's subscription tier
const expirationDate = isPremium
  ? addDays(new Date(), 365) // Premium: 1 year
  : addDays(new Date(), 30); // Free: 30 days
```

## Testing (When Implemented)

```typescript
// Unit tests: lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { generateShortCode } from "./utils";

describe("generateShortCode", () => {
  it("generates a code of specified length", () => {
    const code = generateShortCode(8);
    expect(code).toHaveLength(8);
  });
});

// Integration tests: app/api/links/route.test.ts
import { POST } from "./route";

describe("POST /api/links", () => {
  it("creates a new link", async () => {
    // Test implementation
  });
});
```

## Performance Optimization

1. **Use React Server Components** for data fetching
2. **Implement streaming** with Suspense boundaries
3. **Optimize images** with next/image
4. **Cache database queries** appropriately
5. **Use database indexes** on frequently queried columns

```typescript
// Example with Suspense
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<LinksSkeleton />}>
        <LinksTable />
      </Suspense>
    </div>
  );
}
```

## Security Best Practices

1. **Validate all inputs** on the server side
2. **Sanitize URLs** before storing or redirecting
3. **Use Clerk for authentication**, never roll your own
4. **Implement rate limiting** for API routes
5. **Use HTTPS** in production
6. **Never expose sensitive data** in client components

```typescript
// Example: URL validation
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
```

## Git Workflow

1. **Commit messages**: Use conventional commits
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for refactoring
   - `docs:` for documentation
   - `chore:` for maintenance

2. **Branch naming**:
   - `feature/short-description`
   - `fix/issue-description`
   - `refactor/component-name`

3. **Commit drizzle migrations** to version control

## Common Patterns

### Short Code Generation

```typescript
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6,
);

export function generateShortCode(): string {
  return nanoid();
}
```

### Link Redirection

```typescript
// app/[shortCode]/page.tsx
import { redirect } from "next/navigation";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function RedirectPage({
  params,
}: {
  params: { shortCode: string };
}) {
  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortCode, params.shortCode),
  });

  if (!link) {
    return <div>Link not found</div>;
  }

  // Update click count
  await db
    .update(links)
    .set({ clicks: link.clicks + 1 })
    .where(eq(links.id, link.id));

  redirect(link.url);
}
```

### Server Actions

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const url = formData.get("url") as string;

  // Validate URL
  if (!isValidUrl(url)) {
    throw new Error("Invalid URL");
  }

  await db.insert(links).values({
    url,
    userId: user.id,
    shortCode: generateShortCode(),
  });

  revalidatePath("/dashboard");
}
```

## Additional Documentation

**REMINDER: You MUST read these files before working on related features. This is a mandatory requirement, not a suggestion.**

For specific implementation guidelines, refer to:

- **`/docs/authentication.md`** - Authentication standards and Clerk integration patterns
- **`/docs/ui-components.md`** - shadcn/ui component standards and usage patterns (**MANDATORY** for any UI work)
- **`/docs/api-conventions.md`** - API route patterns, responses, and conventions
- **`/docs/component-library.md`** - Reusable component guidelines and patterns
- **`/docs/database-schema.md`** - Database design, relationships, and query patterns
- **`/docs/deployment.md`** - Deployment procedures and environment setup

**These documentation files contain project-specific patterns, conventions, and requirements that supersede general knowledge. Always consult them first.**

## Questions or Clarifications

When uncertain about:

1. **Architecture decisions** - Ask before implementing
2. **Breaking changes** - Discuss impact first
3. **New dependencies** - Justify the addition
4. **Security concerns** - Always err on the side of caution

---

_Last updated: January 2026_
