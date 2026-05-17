# Mediator pattern

For example, we have smart home appliances

- coffee machine makes coffee on weekday mornings but not weekends
- sprinklers turn on every 15 minutes unless it's rained
- alarm that goes off in the morning and turns on the coffee machine
- calendar checks appointments and sets alarm

The Mediator sits in the middles of all these services and mediates their interactions. Then each service does not need to know about other services, decoupling them. A message queue doesn't solve it because the services would still need to call another depending on the message.

Examples,

- zookeeper
- orchestrator, e.g. google workflows