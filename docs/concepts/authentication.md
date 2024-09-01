# Authentication

Authentication in Neon Max is about verifying the identity of users to grant or restrict access to certain parts of the application. The Auth helper class in `lib/auth.ts` simplifies the process of managing authentication state within server components and actions. It helps protect routes, ensuring that only authenticated users can access certain pages while restricting guest users from others.

## The `Auth` Helper Class

The `Auth` class provides methods to manage and enforce authentication states within the app. This is crucial for maintaining a secure and user-friendly application.

### `Auth.authenticated()`

This method checks if a user is authenticated. If the user is not authenticated, it redirects them to the login page (or a specified URL).

Parameters:

- `redirectTo`: `string` (optional): The URL to redirect the user if they are not authenticated. Defaults to `AUTH_URLS.LOGIN` (`/auth/login`).

Returns:

- `User` | `undefined`:
  - If the user is authenticated, the method returns the user object from the session.
  - If the user is not authenticated, the method redirects to the specified `redirectTo` URL (defaults to `"/"`) and does not return a value.

Usage:

- This method is typically used in server components or actions where you need to ensure that a user is logged in before allowing them to proceed.
- If the user is authenticated, it returns the user object from the session.
- If the user is not authenticated, it redirects them to the login page as defined in the `AUTH_URLS` inside `config/auth.ts` or another URL defined by the `redirectTo` parameter, if an argument is provided.

```typescript
const user = await Auth.authenticated("/some-other-login");
```

### `Auth.guest()`

This method checks if the user is a guest (i.e., not logged in). If the user is authenticated, it redirects them to a specified page, usually the homepage or another protected area.

Parameters:

- redirectTo: string (optional): The URL to redirect the user if they are authenticated. Defaults to /.

Returns: `void`

Usage:

- This method is useful for routes like login or registration pages, where you want to ensure that only guests (users who are not logged in) can access the page.
- If the user is not authenticated, the method does nothing, allowing the guest to continue accessing the page.
- If the user is authenticated, it redirects them to the homepage or another specified URL.

## Auth URLs

The AUTH_URLS object provides a centralized way to manage the URLs related to authentication in your application. This makes it easier to maintain and update the routes used for login, registration, and potentially other authentication-related actions.

- `LOGIN`: The default URL to redirect users to the login page (`/auth/login`).
- `REGISTER`: The default URL for the registration page (`/auth/register`).

You can modify these values to your liking.
