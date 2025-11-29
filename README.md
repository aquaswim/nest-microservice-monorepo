<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Monorepo Microservice Boilerplate built with nestjs 🐈

## Project setup

1. make sure you have `pnpm` installed
2. run `pnpm install`

## Module List

| Path           | Type | Description    |
|----------------|------|----------------|
| apps/Gateway   | App  | API Gateway    |
| apps/Sample    | App  | Sample Service |
| libs/sharedlib | Libs | Common helper  |
| libs/db        | Libs | Typeorm module |

## Compile and run the project

1. start the backing service for local development `docker compose -f ./backing-service/docker-compose.yml up -d`
2. sets up the environment variables in `.env` file from `.env.example`
3. run `pnpm run start:dev`

## Run tests

```bash
TBA
```

## Deployment

```bash
TBA
```

## Database migrations

We use dbmate to run and manage database migration, all the migration script
will reside in `./migrations/{service name}/*.sql`.

Example command to run dbmate on **sample service** reusing the .env file for running the service

```shell
$ dbmate --env-file ".env" -e SAMPLE_DB_CONN -d ./migrations/sample status
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- [NestJS Documentation](https://docs.nestjs.com)
- [dbmate](https://github.com/amacneil/dbmate)

## Developers

1. [Bayu Setiawan](https://github.com/aquaswim)