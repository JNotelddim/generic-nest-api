# Testing

In this repository, you will find examples of unit, integration, and endpoint tests.

## Unit Tests

Unit tests are concerned with testing individual pieces of code in isolation.
These are well suited to testing business logic that exists as modular code.

You can find examples of unit tests in `*.service.spec.ts` files.

In these cases, you'll see that the DatabaseService is mocked out, this is because
we are not concerned with testing the integration with the databse in our unit tests.

## Integration Tests

Integration tests are concerned with testing that multiple pieces of the code work
when combined as a group. Testing business logic does not belong in integrations tests.

You can find exmaples of unit tests in `*.service.spec.ts` files, under the 'describe'
-block title of '\* Service Integration Tests'.
[TBC]

These tests are to verify that services integrate properly with eachother, so as an example
you'll see tests of the service methods where the DatabaseService is not mocked.

An essential principle with integration tests is idempotency.
We want our tests to run exactly the same, no matter how many times we run them.
To facilitate this, we need good set-up and clean-up boilerplate code.

You can find this at ...
[TBC]

## Endpoint Tests

Endpoint tests can be used to simulate an external client interacting with this API's
available routes.

[TBC]

## Running Tests

`yarn test`

...

[TBC]
