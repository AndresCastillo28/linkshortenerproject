# UI Components Guidelines

## shadcn/ui Standards

This project uses [shadcn/ui](https://ui.shadcn.com/) exclusively for all UI components. **Do not create custom UI components** - always use shadcn/ui components.

## Core Principles

1. **Always use shadcn/ui components** - Never create custom buttons, inputs, cards, dialogs, etc.
2. **Install components as needed** - Use `npx shadcn@latest add <component>` to add new components
3. **Customize via Tailwind** - Extend styling with Tailwind classes, not custom CSS
4. **Follow shadcn conventions** - Use the component patterns from the official documentation

## Installation

To add a new shadcn/ui component:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
# etc.
```

Components will be installed to `components/ui/` directory.

## Usage Patterns

### Buttons

```typescript
import { Button } from "@/components/ui/button";

// Primary button
<Button>Click me</Button>

// Variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>
<Button variant="link">Learn more</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### Forms

```typescript
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="url">URL</Label>
    <Input
      id="url"
      type="url"
      placeholder="https://example.com"
    />
  </div>
  <Button type="submit">Submit</Button>
</div>
```

### Cards

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Link Details</CardTitle>
    <CardDescription>View your shortened link</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

### Dialogs

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Tables

```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Short Code</TableHead>
      <TableHead>Original URL</TableHead>
      <TableHead>Clicks</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {links.map((link) => (
      <TableRow key={link.id}>
        <TableCell>{link.shortCode}</TableCell>
        <TableCell>{link.url}</TableCell>
        <TableCell>{link.clicks}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Dropdowns

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Link Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Copy</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Commonly Used Components

Install these components as your project needs them:

- **Layout**: `card`, `separator`, `sheet`, `tabs`
- **Forms**: `input`, `label`, `button`, `checkbox`, `select`, `textarea`, `switch`
- **Data Display**: `table`, `badge`, `avatar`, `skeleton`
- **Feedback**: `alert`, `toast`, `dialog`, `alert-dialog`
- **Navigation**: `dropdown-menu`, `navigation-menu`, `breadcrumb`
- **Overlays**: `dialog`, `sheet`, `popover`, `tooltip`

## Styling Guidelines

### Extending with Tailwind

```typescript
import { Button } from "@/components/ui/button";

// Add additional Tailwind classes
<Button className="w-full mt-4">Full Width Button</Button>

// Use cn() utility for conditional classes
import { cn } from "@/lib/utils";

<Button className={cn(
  "w-full",
  isLoading && "opacity-50 cursor-wait"
)}>
  Submit
</Button>
```

### Dark Mode Support

shadcn/ui components automatically support dark mode via Tailwind's `dark:` variant:

```typescript
// Components will respect system/user dark mode preference
// No additional configuration needed
```

## Form Validation

Use shadcn/ui with React Hook Form and Zod:

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export function LinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Shorten</Button>
      </form>
    </Form>
  );
}
```

## Best Practices

1. **Import from @/components/ui/** - Always use the installed components
2. **Use asChild prop** - When wrapping custom elements: `<Button asChild><Link href="...">Text</Link></Button>`
3. **Leverage variants** - Use built-in variants before adding custom styles
4. **Keep components accessible** - shadcn/ui is built with accessibility in mind, don't break it
5. **Follow composition patterns** - Use compound components as shown in examples
6. **Check documentation** - Visit [ui.shadcn.com](https://ui.shadcn.com/) for full component API

## Resources

- **Official Documentation**: https://ui.shadcn.com/
- **Component Examples**: https://ui.shadcn.com/examples
- **GitHub Repository**: https://github.com/shadcn-ui/ui

---

_Remember: Never create custom UI components. Always use shadcn/ui._
