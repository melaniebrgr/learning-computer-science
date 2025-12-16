# Webhooks

The difference between a website and a webhook is that the _sender_ is not web server but some sort of automated system, and instead of a sending an HTML document it sends some additional data. And the webhook _receiver_ then triggers some action other than rendering the HTML document. Instead of the receiver polling for updates (a user refreshing the page), the sender sends updates automatically when there's been a change.

In short, a webhook is a way to push updates to subcribers over HTTP.

> The Webhook is the Web's way to integrate completely different systems in semi-real time. ... HTTP, the protocol used for requesting and fetching website[s] ... has become the default delivery mechanism for almost anything that's transferred over the Internet.

Webhooks have a straightforward flow:

0. A subscriber subscribes to a ![webhook emitting system](./_assets/scalable-webhook-workflow.png).
1. Something happens (!) and an event is pushed to a queue.
2. A queue worker reads from the queue and fetches the list of subscribers to that event
3. A HTTP request is made to each subscriber
4. Each subscriber responds and queues a response action.

## References

1. <https://simonfredsted.com/1583>
2. 