# Abstractions

## Software development kit (SDK)

An SDK (software development kit) is a bundled set of tools, libraries, and documentation that developers embed in their code to build or integrate applications for a specific platform, operating system, or service more quickly and reliably (10).

An SDK is **embeded** into existing software to build or integrate some functionality. It is not a separate product that is operated manually.

### Advantages of an SDK

Creating an SDK on top of an existing API is about ergonomics, safety, and consistency rather than raw capability (1). An API defines “what’s possible” over the wire; an SDK packages that into idiomatic, high-level building blocks for a given language or platform, so product teams can integrate faster and with fewer errors (2). Concrete benefits:

- **Faster integration and less boilerplate**  
  The SDK handles HTTP clients, auth, retries, pagination, serialization, and low-level plumbing, so app code becomes a few method calls instead of repeated request/response wiring (3).

- **Safer, more discoverable usage** 
  SDKs can expose strong types, enums, and structured errors that match the domain, making misuse harder and auto-complete / docs much clearer than working with raw JSON and URLs (3).

- **Consistency across consumers**
  An SDK encodes best practices (timeouts, retries, backoff, default headers, telemetry), so every team uses the API in a consistent, supportable way instead of reinventing it differently (4). 

- **Shielding from breaking changes**
  When the API evolves, you can adapt the SDK internally while keeping a mostly stable surface for client code, reducing upgrade pain for integrators (5).

- **Higher-level abstractions**
  SDKs can offer composite operations (e.g., “create project with default settings”) that span multiple API calls, matching how users think about tasks rather than endpoints (6). 

### When to create an SDK

The primary intended use of an SDK is to be integrated into software (applications, services, scripts, backend jobs, CLIs), not just to be “called” like a standalone tool (7). So you would create one 

- When you want to target many developers in a specific ecosystem (e.g., JS/TS, Python) and offer low-friction adoption (8). 
- When the API is non-trivial (auth flows, webhooks, long-running jobs, complex payloads), and you want to hide that complexity behind a **clean** client (1).

The raw API can still be exposed for a maximum control, language-agnostic access, and advanced or bleeding‑edge use cases where the SDK may lag behind or be too opinionated (9).

### SDK References

1. [hooyia](https://hooyia.net/en/blogs/api-vs-sdk-whats-the-real-difference/)
2. [geeksforgeeks](https://www.geeksforgeeks.org/software-engineering/sdk-vs-api-difference-between-sdk-and-api-in-software-development/)
3. [devTO](https://dev.to/speakeasy/apis-vs-sdks-why-you-should-always-have-both-4ahh)
4. [augmentcode](https://www.augmentcode.com/learn/sdks-vs-apis-more-than-code-wrappers)
5. [ibm](https://www.ibm.com/think/topics/api-vs-sdk)
6. [pubnub](https://www.pubnub.com/guides/sdk-vs-api/)
7. [github](https://github.com/resources/articles/what-is-an-sdk)
8. [ibm](https://www.ibm.com/think/topics/api-vs-sdk)
9. [rublon](https://rublon.com/blog/api-vs-sdk-difference/)
10. [en.wikipedia](https://en.wikipedia.org/wiki/Software_development_kit)

## DSL
