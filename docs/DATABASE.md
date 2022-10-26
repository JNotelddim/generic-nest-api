# Database

This API - Generic NodeJS API - uses a PostgresQL instance for its database.

When working locally, it depends on a Postgres image running in a local Docker
container.

[CLONE_UPDATE]

For production, there is a database instance hosted on <UPDATE ME>.

## Local Database

To set up your local databse instance in a fresh dev environment, you'll
need Docker installed.

1. Install Docker Desktop if you haven't already, and ensure it is running.
1. Use the `dev:docker:up` yarn command to setup the local Postgres database:

```console
yarn dev:docker:up
```

> Note, since this instance runs via Docker container, if you restart your computer,
> the Docker container will likely be stopped when you get back online.
> You'll need to manually resume your container.

## Staging and Production Database

Generic NestJS API is not deployed for production anywhere.

[CLONE_UPDATE]

If you're using this repository as a template, please update this section when
you start setting up staging/prod databases. For now, you can probably just
worry about your local instance.

### Database creation

[CLONE_UPDATE]

If you are setting up a staging/prod database, please fill in this section with
steps for how to create additional database instances.

### Validating Databse Connection

[CLONE_UPDATE]

With a production/staging database, it's helpful to have notes on how to
verify that connecting to the database works. Please use this section to
guide contributors along.
