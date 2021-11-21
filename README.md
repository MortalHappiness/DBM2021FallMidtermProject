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

In the project root directory, simply run:

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
SECRET="SECRET_STRING"
```

For example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dbm2021fall?schema=public"
SECRET="44c81ac827830431b3c5cd3fe777be793777172cd3c1f461b729de89984d84a0540cf784122bf99b7bd67408803067a2"
```

Run the following command:

```bash
$ cd backend/
$ npx prisma migrate dev
```

### Start the Project

Go back to the project root directory

```bash
$ cd ..
```

Run the following command:

```bash
$ yarn start
```

Go to http://localhost:3000 to see the app.

## Example Usage

1. When you see this login page, you can choose sign up an account or use the admin demo account to login.
  + Username: `admin`
  + Password: `password`

![image](https://user-images.githubusercontent.com/47914085/142757259-41cd6292-2d63-4a08-895b-f4abf4f894e5.png)

2. Assume you logined with the admin demo account, you can see all organizations that you joined. You can click the organization name to enter organization page. For example, click the "Database Management Group E" to enter it. You can also click the plus button on the top right to create new organizations.

![image](https://user-images.githubusercontent.com/47914085/142757340-9767fd95-bcff-481a-b77a-4809dd8079ee.png)

3. After entering the organization page, you can see all projects and members in this organization. You can click the plus button to create new projects. You can click the "plus people" button to generate an invitation link to invite other people to join this organization. You can click the red button to leave this organization. You can click the project name to enter the project page. For example, click the "midterm project" to enter it.

![image](https://user-images.githubusercontent.com/47914085/142757480-4b857f9d-9534-4ce4-a0f3-35b04120dcfc.png)

4. After entering the project page, you can click the buttons on the top right to create new task and create new labels. After a task is created, it will show up in the "TODO" column. You can drag and drop it to other columns. You can click it to edit its detail content. For example, click "TASK-1 基本架構"

![image](https://user-images.githubusercontent.com/47914085/142757708-51db509e-a21c-493c-82e6-659c07a7bcae.png)

5. You can edit the task detail here. For example, change its title and description, linked other tasks, add a comment, assign to members, edit labels, etc.

![image](https://user-images.githubusercontent.com/47914085/142757781-112375fa-1e60-4dff-921c-4c6345298156.png)

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
