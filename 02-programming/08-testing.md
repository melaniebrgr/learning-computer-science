# Testing

Test because you're lazy

- **confidence to refactor**: as the code grows or in a codebase that's not yours without tests you might not risk refactoring to fix an issue and implement some hack instead, which makes the overall problem worse.
- **document the code**: better than documentation--it's verifiable. Assertions about what shoul dbe true about the system are codified in a test. It's a form of communication for new developers _and_ you're future self. Tests are example of how things should work that allow you to generalise about how the system works.
- **develope faster**: It is _critical_ that writing and running tests be easier than the application so you can narrowly focus on a problem instead of getting the application into a state to validate the change.
- **improve AI output**

People don't test because they don't know how--because the codebase hasn't been deesigned to be testable. If you've made an untestable codebase it is likely so tightly coupled that it is immediately a legacy codebase because you're unwilling to make changes to it.

## Kinds of tests by category

- testing level: static analysis, unit, integration (functional), system (e2e), acceptance
- functionailty: function, performance, security, usability, accessibility
- automation: manual, automated
- other: regression, smoke

## References

- <https://frontendmasters.com/courses/web-app-testing/introduction/>