This is an example [Next.js](https://nextjs.org) app with custom Authentication logic.
It uses [Tailwind CSS](https://tailwindcss.com/), ESLint, TypeScript and App Router.

## Styling

Signup and Login components are styled with Tailwind, and use custom UI components (Button, Input and Label) defined in @/app/_components folder. For styling these components, the folowing dependencies were installed:

```bash
npm install class-variance-authority clsx tailwind-merge @radix-ui/react-label
```

## Getting Started

First, install the database.

This project uses Prisma ORM with MySQL database.
Connection string must be specified under the DATABASE_URL .env variable. More about connection string formats [here](https://www.prisma.io/docs/orm/reference/connection-urls).

Second, run the prisma migration:

```bash
npx prisma migrate dev --name init
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.