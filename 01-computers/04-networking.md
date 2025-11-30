# Networking

## Lesson Plan: Networking Foundations for Front-End Developers

### 1. Introduction to Computer Networking
- What is a computer network? Basic concepts of data transfer and connectivity.
- Overview of the Internet and how networks interconnect globally.
- Key terminology: IP addresses, packets, protocols.

There is a client and a server and they "communicate" with each other using HTTP or HTTPS.
How computers communicate is described by a standaradised reference model called the OSI (Open Systems Interconnection) model.
The model has 7 layers. Each layer is "it's own domain", receives data from the previous layer, and passes data to the next layer.

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