# Errors

The `Errors` class in Neon Max is designed to simplify error management across your application, ensuring a consistent way to handle and display errors. It provides utilities to set, flash, retrieve, and validate errors, particularly useful when working with form submissions and data validation using Zod schemas.

## The `Errors` Helper Class

Located in lib/errors.ts, the Errors class is the primary utility for managing errors in Neon Max. It provides a streamlined approach to setting and retrieving errors, flashing errors to the user, and validating data using Zod schemas.

### Setting and Flashing Errors

The Errors class allows you to set and flash errors that can be displayed to the user. This is particularly useful in forms or any user input scenario where you need to provide feedback.

#### `Errors.set()`

The `Errors.set()` method is used to manually set an error message.

Parameters:

- `name`: The name of the error (usually corresponding to a form field or general error type).
- `value`: The error message to display.

Example usage:

```typescript
import { Errors } from "@/lib/errors";

const isPasswordValid = await checkPassword(password);

// Set the error
if (!isPasswordValid) {
  Errors.set("authError", "Incorrect credentials");
}

// Flash all errors
Errors.flash();
```

In the code above, if the password is not valid, an error message is set using `Errors.set()`. Then, `Errors.flash()` is called to store all errors in a cookie for later retrieval.

#### `Errors.flash()`

The Errors.flash() method is used to store all the currently set errors in a cookie. This allows errors to persist across redirects and be displayed to the user after a form submission or other action. Think of it as flashing the errors because it only lasts one request.

### Retreving Errors

The `Errors` class also provides a method to retrieve a specific error message, which can be used to display errors to the user.

#### `Errors.get()`

The `Errors.get()` method retrieves an error message based on the error name.

Parameters:

- `name`: The name of the error to retrieve.

Returns: The error message if it exists, otherwise undefined.

Example Usage:

```tsx
import { Errors } from "@/lib/errors";
import { ErrorMessage } from "@/components/ErrorMessage";

<ErrorMessage message={Errors.get("authError")} />;
```

In the example above, the `ErrorMessage` component is used to display the error message for authError if it exists.

### Validating Zod Schemas and Handling Errors

The Errors class integrates seamlessly with Zod, a popular schema validation library, to provide an easy way to validate data and generate errors automatically.

#### `Errors.validateZod()`

The `Errors.validateZod()` method validates data against a provided Zod schema and automatically generates errors for any validation failures.

The `Errors.validateZod()` method validates data against a provided Zod schema and automatically generates errors for any validation failures.

Parameters:

- `schema`: A Zod schema object to validate against.
- `data`: The data to validate.

Returns: An object with two properties:

- `error`: A boolean indicating if validation failed.
- `data`: The validated data if validation was successful, otherwise null.

Example usage:

```typescript
import { Errors } from "@/lib/errors";
import { postSchema } from "@/lib/validation";

const title = formData.get("title") as string;
const content = formData.get("content") as string;

const postValidationResult = Errors.validateZod(postSchema, { title, content });

if (postValidationResult.error) {
  redirect("/post/create");
}
```

In the code above, `Errors.validateZod()` is used to validate form data against a `postSchema`. If validation fails, the user is redirected back to the form.

#### Rendering Validation Errors in the Front-End

You can use the auto-generated errors by referencing the field names defined in the schema:

```tsx
import { Errors } from "@/lib/errors";
import { ErrorMessage } from "@/components/ErrorMessage";

<ErrorMessage message={Errors.get("title")} />;
<ErrorMessage message={Errors.get("content")} />;
```

In the example above, `ErrorMessage` components are used to display error messages for the title and content fields if they exist.
