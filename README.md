# DBM2021FallMidtermProject

Midterm project for "Database Management", 2021 Fall

## Quick Start

### Prerequisites

- NodeJS v14

### Installation

In the root directory, simply run:

```bash
$ yarn i
```

### Database Setup

Make sure you are running `PostgreSQL` server in your local machine. You can also run PostgreSQL using docker.

```bash
$ docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Write the following content into `backend/.env` file.

```
postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>
```

For example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dbm2021fall?schema=public"
```

Run the following command:

```bash
$ cd backend/
$ npx prisma migrate dev
```

Everytime the file `prisma/schema.prisma` is changed, you need to run the command above again.

Seeding the database (inject fake data for development):

```bash
$ npx prisma db seed
```

To reset all data in db, run:

```bash
$ npx prisma migrate reset
```

### Start the Project

In the root directory, run:

```bash
$ yarn start
```
