# Model view controller (MVC)

Is three patterns together according to the "Head First: Design Patterns" book: observer, strategy and composite. But, Irina disagrees. There is a lot of confusion about what MVC means today in general. There are a million different interpretation, e.g.

## Repository, Service, Controller

There is always a transform from the database model to the business model.

- **controller**: Management of the REST interface to the business logic. Where the API client is, REST, protobuf.
- **service**: With the request in hand, check and enrich the data--the business logic implementation
- **repository**: The internal representation. How it is stored it gets store in the database.


## Model, View, Controller

Became a popular software application pattern to break up the application code.

- **model**: the data logic behind the application
- **view**: what the user sees and interacts with
- **controller**: communicates with the model and view



