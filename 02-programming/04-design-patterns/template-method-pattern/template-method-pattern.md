# Template method pattern

The template method encapsulates algorith stepwise execution.

In the template method an abstract parent class defines the overarching structure of a multistep algorithm in a template method. It contains some base global or cross-cutting steps, and exposes some steps to concrete child classes:

- mandatory custom implementations
- optional hooks

When the template method is called it therefore executes the base global steps, mandatory custom steps and optional hooks steps in the order specified by the parent.