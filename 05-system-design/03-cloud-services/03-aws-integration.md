# 03 cloud services

## AWS integration

- Simple Notification Service (SNS)
- Simple Queue Service (SQS)
- Simple Email Service (SES)
- Simple Workflow Service (SWF)
- Cloudmap
- EventBridge
- Step Functions
- Batch

Whenever there are seperation of applications (for whatever reason) there is a need to manage the communication between the applications. AWS provides multiple tools for app integration.

There are three main cross-application integration services: SQS, SNS, EventBridge.

There are a four AWS services that are used to connect applications with each other, i.e. are used for the purpose of integrating applications in a decoupled architecture.

### Simple Notification Service (SNS)

Amazon SNS is a publish/subscribe service. Using Amazon SNS topics, a publisher publishes messages to subscribers.

Messages are immediately pushed to interested subscribers. In Amazon SNS, subscribers can be web servers, email addresses, AWS Lambda functions, or several other options. The process is synchronous. This is like a mobile push notification: topic is created and messages are sent to a topic.

sends notification to a Topic for an _app/EC2/CloudWatch (publisher)_ to communicate with _lambda/email/SQS or other application (subscriber)_. It enables a pub/sub model. Notifications are sent two ways, A2A and A2P. A2A provides high-throughput, pushed based, many-to-many messaging between distributed systems, microservices, and event driven serverless applications. The applications include SQS, Amazon Kinesis Data Firehose, Lambda, abd other HTTPS endpoints. A2P helps send messages to customers with SMS texts, push notifications, and email.

### Simple Queue Service (SQS)

Using Amazon SQS, you can send, store, and receive messages between software components, without losing messages or requiring other services to be available. In Amazon SQS, an application sends messages into a queue. A user or service retrieves a message from the queue, processes it, and then deletes it from the queue.

A message queue that messages can be pushed onto a queue and other applications can query the queue whenever it has time to process the application. The process is asynchronous. Besides its own message broker (SQS), AWS also supports open-source message broker services (Apache ActiveMQ and RabbitMQ) via the Amazon MQ service.

is useful in cases where data cannot be processed quickly enough for example. Messages can be placed in a queue and a separate service polls the queue periodically. It's a hosted service used to enable distributed/decoupled applications. A SNS Topics and SQS can be strung together.


### EventBridge

An eventbus service that listens to events that are reported to it, and then triggers actions in another service. No message is passed, only a general event is listened for and an action triggered in response. Processing is synchronous, but with a layer of indirection. Events can be scheduled or reactive with EventBridge.

### Simple Email Service (SES)

A cost-effective, flexible, and scalable email service that enables developers to send mail from within any application. Not geared towards application integration however. This service is used for sending email but not SMS text messages.

### Simple Workflow Service (SWF)

enables automation of workflows that may have a human component. It is less preferred than the newer Step Functions.

### Cloudmap

Assign names to cloud resources so that information about the services can be looked up by other services by name. Useful for complicated microservices architecture.

### Step Functions

For predefined execution sequences. Helps model complex compute process where multiple lambdas need to work together in a pre-defined order.

are used to coordinate components of applications in a workflow. You can defines the sequences in a step, e.g. in a situation where a number of lambda functions should operate in sequence. It has a visual editor and output that shows the steps and status.

### Batch

Batch jobs.
