# DBM2021FallMidtermProject - Assuject

Midterm project for "Database Management", 2021 Fall

## Description

Assuject is a task progress tracking system, inspired by [JIRA](https://www.atlassian.com/software/jira), [Trello](https://trello.com/) and [Notion](https://www.notion.so/).

## Demo Video

## Quick Start

### Prerequisites

- NodeJS v14
- [yarn package manager](https://www.npmjs.com/package/yarn)
- [PostgreSQL](https://www.postgresql.org/)

### Install dependencies

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

### Start the Project

Go back to the root directory

```bash
$ cd ..
```

Run the following command:

```bash
$ yarn start
```

Go to http://localhost:4000 to see the app.

## Development Guide

Everytime the file `prisma/schema.prisma` is changed, you need to run the command below again.

```bash
$ npx prisma migrate dev
```

Seeding the database (inject fake data for development):

```bash
$ npx prisma db seed
```

To reset all data in db, run:

```bash
$ npx prisma migrate reset
```
