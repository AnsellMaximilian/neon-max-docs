# Raw Queries with Neon

If you want to use raw SQL queries to perform your database operations, `@neondatabase/serverless` is included right into Neon Max. You can immediately start running raw queries like so:

```tsx
import { neon } from "@neondatabase/serverless";

async function getData() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return response[0].version;
}
export default async function Page() {
  const data = await getData();
  return <>{data}</>;
}
```

This will give you a lot more flexibility with what you can do with your database, as these queries will be run directly against your serverless Postgres database, while still giving you the option to use Prisma if the situation doesn't call for it.
