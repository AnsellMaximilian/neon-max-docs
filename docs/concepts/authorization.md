# Authorization

Authorization in Neon Max ensures that users can only access resources or perform actions that they are permitted to. It's a way of controlling what authenticated users are allowed to do in the application.

## The `Authorization` Helper Class

Located in `lib/authorization.ts`, the Authorization class is the primary utility for managing access control within Neon Max. It provides a flexible way to enforce permissions by defining and checking policies.

### Policies

Before diving into the methods under the `Authorization` class, the concept of policies should be made.

Policies define what actions a user can take. They are implemented as functions that take a User object as the first argument and any additional necessary parameters. Policies return a boolean indicating whether the action is permitted.

Policies are registered inside the `config/authorization.ts` file as a property of the `AUTHORIZATIONS` constant variable.

For example, a policy named `"can-edit-blog"` might check if the current user is the author of a blog post before allowing them to edit it:

```typescript
import { getBlogById } from "@/actions/blog";
import { User } from "next-auth";

export const AUTHORIZATIONS: Record<
  string,
  (user: User, ...args: any[]) => Promise<boolean>
> = {
  "can-edit-blog": async (user, blogId: number) => {
    const blog = await getBlogById(blogId);

    if (blog && blog.authorId === user.id) return true;

    return false;
  },
};
```

### `Authorization.allows()`

The Authorization.allows() method is used to check if the currently authenticated user is allowed to perform a specific action based on the defined policies.

Parameters:

- `policyName`: The name of the policy to check.
- `...args`: Additional arguments required by the policy.

Returns: `true` if the action is allowed, otherwise `false`.

Here's how you would use the previously defined `can-edit-blog` policy using the `allows()` method:

#### Rendering a button based on authorization result

```tsx
<div>
{
  (await Authorization.allows("can-edit-blog", blog.id)) && (
    <Button>Edit Blog</Button>
  );
}
</div>
```

In the code above, I'm only going to render an "edit" button if, according to the `can-edit-blog` policy, the logged in user's `id` is the same as the blog's `authorId`. Basically, only render the button when the current user is the creator of the blog.

#### Redirecting Users Who Fails the Authorization

```typescript
if (!(await Authorization.allows("is-admin"))) {
  redirect("/dashboard");
}
```

In the above example, if a user doesn't pass the `is-admin` authorization, they will be redirected to a dashboard page.

### `Authorization.allowsFor()`

The `Authorization.allowsFor()` method is similar to `allows()`, but it allows you to check permissions for a specific user rather than the currently authenticated user.

Parameters:

- `policyName`: The name of the policy to check.
- `user`: The `User` object representing the user to check permissions for. Unlike `allows` you have to provide this explicitly.
- `...args`: Additional arguments required by the policy.

Returns: `true` if the action is allowed, otherwise `false`.
