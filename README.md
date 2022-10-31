# Generic NestJS API

## Description

This is a generic server template for an API built with [NestJS](https://github.com/nestjs/nest).
It utilizes services and libraries which are commonly leveraged at MetaLab to
offer a starting point for getting an API running.

This repository utilizes

- [ExpressJS](https://docs.nestjs.com/first-steps#platform) as a http-framework (comes by default with NestJS),
- a local [PostgresQL](https://www.postgresql.org/) database (there's a docker image!),
- [Prisma ORM](https://www.prisma.io/) for schema & db-management purposes,
- [Firebase](https://firebase.google.com/) for Authentication,
- [Postman Collections](https://www.postman.com/collection/) to facilitate verifying the API out-of-the-box,
- and [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to provide graphs as an alternative to the REST api.

See the [/docs](./docs/) folder for more detailed information on each of these specific pieces
of the architecture.

## TODOs

Documentation

- [ ] README sections

  - [ ] environment info
  - [ ] App Setup w/ Existing Service Accounts: set local db, copy .env vars,
  - [ ] App Setup w/o Existing Service Accounts: copying db, setting up firebase and aws accounts, setting up env vars

- docs/
- [x] FIREBASE
  - set up prod account
  - set up local emulation
  - auth guards & how they tie in to Firebase
- [x] DATABASE
  - docker image,
  - prisma setup: migrations & seed
- [x] TESTs
  - [ ] unit vs integrations tests
  - [ ] setup / cleanup notes
  - [ ] mocking utils notes
- [ ] GraphQL / Apollo
  - resolvers & how the schema is generated
  - where to look for the generated types
- [ ] POSTMAN
  - how the collections work, how to add/change them, what's needed

## Environment

- node version

## App Setup [With Existing Accounts]

TODO

## App Setup [Without Existing Accounts]

TODO
