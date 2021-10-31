# DBM2021FallMidtermProject

Midterm project for "Database management", 2021 Fall

## Quick Start

### Prerequisites

- NodeJS v14

### Database

Make sure you have PostgreSQL installed in your local machine. You can also run PostgreSQL using docker.

```
docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Change directory into `backend/` folder.

```
cd backend/
```

Write the following content into `.env` file.

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dbm2021fall?schema=public"
```

Replace the connection URL with your PostgreSQL conneciotn URL. The format of the connection URL looks like follows

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

Run the following command

```
npx prisma migrate dev
```

Everytime the file `prisma/schema.prisma` is changed, you need to run the command above again.

### Backend

```
cd backend/
yarn install
yarn start
```

### Frontend

```
cd frontend/
yarn install
yarn start
```
