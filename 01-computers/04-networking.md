# Networking

> The Internet is “just” a network of interconnected computer networks. The term "Internet" literally means "between networks." It operates as a packet-switched mesh network  with best-effort delivery, meaning there are no guarantees on whether a packet will be delivered or how long it will take. The reason why the internet appears to operate so smoothly (at least from a technical perspective) is the layers of abstraction that handle retries, ordering, deduplication, security and so many other things behind the scenes. - Devon Peroutky (1)

## Lesson Plan: Networking Foundations for Front-End Developers

### 1. Introduction to Computer Networking
- What is a computer network? Basic concepts of data transfer and connectivity.
- Overview of the Internet and how networks interconnect globally.
- Key terminology: IP addresses, packets, protocols.

How the web works hasn't changed much in the past 20 years.
Web sockets when you break it down is based on the TCP protocol.
There is a client and a server and they "communicate" with each other using HTTP or HTTPS.
How computers communicate is described by a standaradised reference model called the OSI (Open Systems Interconnection) model.
The model has 7 layers. Each layer is "it's own domain", receives data from the previous layer, and passes data to the next layer (only interacts with the layer above or below).

7. Application layer: end user application protocols, e.g. HTTP
6. Presentation layer: translates data into suitablee formats
5. Session layer: "connection maintainance"
4. Transport layer: TCP, UDP
3. Network layer: IP
2. Data link layer: routes, switches, ethernet
1. Physical layer: fiber, wire, wireless

#### Layer 7: Application layer

The applicaiton layers initiates the network request.
The application layer is not the applications themselve but the foundational technologies that they use.
- A browser making a request to a web server using the HTTP protocol.
- An email app using the SMTP protocol to send and receive emails.
- Typing google.com instead of 142.250.150.138 thanks to the DNS protocol

#### Layer 6: Presentation layer

Once the client makes the HTTP request the request itself is passed to the presentation layer.
The presentation layer standardises the data representation before handing data to or from the application layer.

Functions attributed to the presentation layer include 
- data format translation (e.g., different character sets),
- lossless compression, and 
- encryption/decryption

#### Layer 5: Session layer

The session layer is used for

- opening connections
- keeping connections alive, and
- closing connections.

"In real life this pretty much does not exist and is part of the Transport Layer."

#### Layer 7: Transport Layer

The transport layer is usually defined based on the protocol that's being used.

The two most popular ones are:

Transmission Control Protocol (TCP)
User Datagram Protocol (UDP)

### 2. OSI Model Overview (Open Systems Interconnection)
- Purpose and importance of OSI as a conceptual framework.
- The 7 layers:
  - Layer 1: Physical (cabling, signals)
  - Layer 2: Data Link (error detection, MAC addresses)
  - Layer 3: Network (routing, IP addresses)
  - Layer 4: Transport (TCP, UDP)
  - Layer 5: Session (connection management)
  - Layer 6: Presentation (data formatting, encryption like TLS)
  - Layer 7: Application (HTTP and other user-facing protocols)
- Relevance of each layer for front-end development (e.g., understanding where HTTP fits at Layer 7).[1][2][3][4]

### 3. HTTP Protocol Basics
- What is HTTP and its role in web communication.
- HTTP methods: GET, POST, PUT, DELETE, etc.
- Structure of HTTP requests and responses including status codes (e.g., 200, 404, 500).
- Understanding ports (commonly 80 for HTTP and 443 for HTTPS).
- Role of HTTPS and encryption basics with TLS.
- Brief introduction to WebSockets for real-time communication.[5][6]

### 4. Other Important Networking Concepts for Front-End Developers
- DNS (Domain Name System): How domain names resolve to IP addresses.
- Difference between TCP and UDP protocols.
- Understanding common network ports relevant to web development.
- Basics of routing and switching in networks.
- Security concepts relevant to front-end, such as CORS and SSL/TLS.
- How APIs connect front-end applications to back-end services.

This structured plan gives you a solid foundation in networking concepts that directly impact front-end development, helping you understand how browsers communicate, how data flows on the web, and the protocols enabling interactive and secure web applications.[7][8]

[1](https://www.freecodecamp.org/news/osi-model-computer-networking-for-beginners/)
[2](https://zerotomastery.io/blog/introduction-to-networking/)
[3](https://www.geeksforgeeks.org/blogs/computer-network-concepts-a-software-engineer-should-learn/)
[4](https://www.codecademy.com/article/osi-model-complete-guide-to-the-7-network-layers)
[5](https://dev.to/kumar_kusumitsharma_b190/the-ultimate-guide-to-computer-networking-for-developers-gpk)
[6](https://www.netburner.com/learn/an-introduction-to-http-protocol/)
[7](https://dev.to/iqra_firdose/a-beginners-guide-to-computer-networks-and-the-osi-model-47k8)
[8](https://dev.to/flynnjones/networking-for-developers-what-you-should-know-beyond-coding-1cji)
[9](https://www.science.smith.edu/~jcardell/Courses/EGR328/Readings/KuroseRoss%20Ch1.pdf)
[10](https://en.wikipedia.org/wiki/OSI_model)
[11](https://devonperoutky.super.site/blog-posts/mediocre-engineers-guide-to-https)