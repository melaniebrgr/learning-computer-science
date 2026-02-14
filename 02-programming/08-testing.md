# Testing

Test because you're lazy

- **confidence to refactor**: as the code grows or in a codebase that's not yours without tests you might not risk refactoring to fix an issue and implement some hack instead, which makes the overall problem worse.
- **document the code**: better than documentation--it's verifiable. Assertions about what shoul dbe true about the system are codified in a test. It's a form of communication for new developers _and_ you're future self. Tests are example of how things should work that allow you to generalise about how the system works.
- **develope faster**: It is _critical_ that writing and running tests be easier than the application so you can narrowly focus on a problem instead of getting the application into a state to validate the change.
- **improve AI output**

People don't test because they don't know how--because the codebase hasn't been deesigned to be testable. If you've made an untestable codebase it is likely so tightly coupled that it is immediately a legacy codebase because you're unwilling to make changes to it.

The more tests behave like real users, the more confidence they can give you.

## Kinds of tests by category

- testing level: static analysis, unit, integration (functional), system (e2e), acceptance
- functionailty: function, performance, security, usability, accessibility
- automation: manual, automated
- other: regression, smoke

## React Query

Components using React query will require a Query clinet provider. A `renderWithClient` util can be created for this purpose. A new quey client should be created for each test with settings suitable for test, e.g. no retries.

```js
function renderWithClient(ui) {
  const testQueryClient = new QueryClient();

  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
}
```

Pair it with MSW to simulate API requests, and run the server before the test suite

```js
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
```

A challenge when testing mutations that invalidate queries is that static mock handlers don't reflect changes from mutations. Even after a mutation is performed and a query is invalidated, the mock handler will still return the same initial data. The problem of static mock handlers not reflecting mutation changes can be solved by using MSW's one-time override feature, `res.once`, which allows dynamic updates the mock response for a specific request, simulating the updated state after a mutation.

## References

- <https://frontendmasters.com/courses/web-app-testing/introduction/>