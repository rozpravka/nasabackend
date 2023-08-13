# NASA Back-end

## Introduction
---
Typescript and Postgress back-end implementation for nasa front-end, thanks to which the user is able to manage space launches.
In terms of libraries used, csv-parser and fs are responsible for loading the habitable planets from csv file, prisma+@prisma/client for managing
the data in PG DB and Supertest+Jest for the integration test.

## User instructions
---
1. Clone this project
2. Set up .env file
3. Install dependencies
4. Start the project

### Setting up .env file
---
To configure your application with necessary environment variables, you need to create a `.env` file in the project directory. This file will store sensitive information and configuration settings securely. Below are the environment variables required for the application to run properly:

`DATABASE_URL`: The URL to your database.

### Install dependencies
`yarn install`

### Start the project
`yarn start`

