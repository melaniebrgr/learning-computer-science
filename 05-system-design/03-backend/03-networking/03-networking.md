# Networking

> Networked systems are appearing at all granularities, from planetary scale web services such as Google and Akamai, to distributed databases for managing large corporations, to massively parallel multiplayer games, to large scale sensor networks ... Networked computing is increasingly integral to all aspects of society. Countering this trend, networked systems face challenges at every level of the protocol stack, e.g., the frequent misconfigurations and "brownouts" observed in the Internet, the disruption of service by both overt state actors (e.g., censorship) and non-state actors (e.g., DDoS attacks by botnets and traffic filtering by ISPs) (3).

+----------------+
|     Client     | E.g. browser, Node.js client
+----------------+
        |
        | 1. Resolve DNS: Find the IP address of the server from the domain name. 
        | The only part of the URL that is necessary to find and IP address is the domain name.
        v
+----------------+
|   DNS Server   | E.g. Google (8.8.8.8), OpenDNS, or Cloudflare (1.1.1.1) DNS servers.
+----------------+
        |
        v
+----------------+
|     Client     |
+----------------+
        |
        | 2. Use the IP address to send an HTTP request
        v
+----------------+
|     Server     |
+----------------+

- client: The computer sending the request. The fetch API is built into the browser and Node _clients_ for making HTTP requests.
- server: The computer sending the response. A server is optimised for handling server loads.

> **ℹ️ Info:**
> A daemon is a type of computer program that runs in the background, performing tasks without direct user interaction. It’s commonly used in Unix-like operating systems (e.g., Linux, macOS) to handle system-level services or processes. The term "daemon" comes from Greek mythology, referring to a guiding spirit, and was chosen to describe these programs that quietly "guide" system functions.
>
> Daemons typically run continuously in the background and are triggered by events, handling tasks like network services, logging, or scheduling without a user interface. They often manage critical functions, such as DNS resolution, web hosting, or email delivery.

## Input/Output (I/O)

A rough comparison of relative speeds of different types of I/O:

| Component | Speed | Example Process | Sync/Async |
|-----------|-------|-----------------|------------|
| **CPU** | 1 nanosecond (ns) | Basic arithmetic operations, cache access | Sync |
| **RAM** | 100 nanoseconds (ns) | Loading variables, accessing arrays | Sync |
| **SSD** | 1 millisecond (ms) | Reading files, database queries | Async |
| **HDD** | 10 milliseconds (ms) | Large file operations, boot sequences | Async |
| **Network** | 100 milliseconds (ms) | HTTP requests, downloading files | Async |

## Internet Protocol (IP)

A protocol is an agreed on standard of communication--a set of rules and commands both sides have agreed to. The Internet Protocol (IP) is like the rules for addressing and delivering internet mail.

> "When one computer wants to send something (like a video or a message) to another, IP breaks the data into tiny packets (like letters). Each packet gets a label with the sender’s and receiver’s IP addresses. These packets travel through the internet, hopping from one router (like a post office) to another, until they reach the right device. The receiving device puts the packets back together to get the original message."

There's two major versions of IP: IPv4 and IPv6. IPv4 uses shorter addresses but is running out of unique addresses. IPv6 uses longer addresses and has a much larger address space:

- **IPv4**: IPv4 is made up of 4 numbers from 1-255, seperated by periods, e.g. 192.168.1.1. It is a 32-bit address space (4 bytes * 8 bits in a byte). The address space therefore has **4.3 billion unique addresses** (2^32).
- **IPv6**: IPv6 is made up of 8 groups of 4 numbers from 0-65535, seperated by colons, e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334. It is a 128-bit address space because there are 16 bytes. The address space therefore has **340 undecillion unique addresses** (2^128).

> **ℹ️ Info:**
>
> A byte is a unit of digital information that consists of 8 bits. Each bit is a binary digit (either 0 or 1), so a byte can represent 256 different values (from 0 to 255).
>
> This is a byte.The 8-bit binary representation of the decimal numbers:
>
> - 00000000 = 0
> - 00000001 = 1
> - 00000010 = 2
> - 00000011 = 3 (2+1)
> - 01100100 = 100 (64+32+4)
> - 11111111 = 255 (128+64+32+16+8+4+2+1)
>
> To determine the decimal number add up the 1's: 128, 64, 32, 16, 8, 4, 2, 1

## Domain Name System (DNS)

A service that provides Domain Name System (DNS) resolution, translating website names (like www.google.com) into IP addresses that computers use to connect is a DNS server. This is like a phone book for the internet, where you look up a name to find the corresponding number (IP address). DNS servers are owned and operated by a variety of entities, including:

- **Internet Service Providers (ISPs)**: Companies that provide internet access, like Comcast or AT&T.
- **Public DNS Providers**: Companies that offer free DNS services, like Google (8.8.8.8) or Cloudflare (1.1.1.1).
- **Technology Companies**: Companies that provide DNS services as part of their infrastructure, like Amazon Web Services (AWS) or Microsoft Azure.

A DNS query can be made programmatically, specifying a DNS server for that request. 1.1.1.1 is Cloudflare's public DNS server.

### Example: DNS Query with `cURL`

```bash
# Request the A record for example.com from Cloudflare's public DNS server:
curl -X GET \
  -H "Accept: application/dns-json" \
  "https://1.1.1.1/dns-query?name=example.com&type=A" 
```

```bash
# Response from the DNS server:
{"Status":0,"TC":false,"RD":true,"RA":true,"AD":false,"CD":false,"Question":[{"name":"example.com","type":1}],"Answer":[{"name":"example.com","type":1,"TTL":166,"data":"96.7.128.198"},{"name":"example.com","type":1,"TTL":166,"data":"96.7.128.175"},{"name":"example.com","type":1,"TTL":166,"data":"23.192.228.80"},{"name":"example.com","type":1,"TTL":166,"data":"23.192.228.84"},{"name":"example.com","type":1,"TTL":166,"data":"23.215.0.136"},{"name":"example.com","type":1,"TTL":166,"data":"23.215.0.138"}]}%    
```

### Example: DNS Query with `dig`

```bash
# Request the A record for example.com from Google's public DNS server:
dig @8.8.8.8 example.com
```

```bash
# Respose from the DNS server:
; <<>> DiG 9.10.6 <<>> @8.8.8.8 example.com
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 29479
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		227	IN	A	96.7.128.175
example.com.		227	IN	A	23.192.228.80
example.com.		227	IN	A	23.192.228.84
example.com.		227	IN	A	96.7.128.198
example.com.		227	IN	A	23.215.0.138
example.com.		227	IN	A	23.215.0.136

;; Query time: 17 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Sun May 25 13:49:47 CEST 2025
;; MSG SIZE  rcvd: 136
```

The **Internet Corporation for Assigned Names and Numbers** (ICANN) is the organisation that manages the DNS system. They oversee the allocation of domain names and IP addresses, ensuring that each domain name is unique and properly registered. They also manage the root nameservers, which are the highest level of DNS servers in the hierarchy. Typically the addresses of these servers are hardcoded into DNS resolver software of the computer.

for a hostname like `blog.boot.dev`, `dev` is the top-level domain (TLD), `boot` is the second-level domain, and `blog` is the subdomain. The TLD is managed by a registry, which is responsible for maintaining the database of all domain names under that TLD. For example, `.com` is managed by Verisign, while `.org` is managed by Public Interest Registry (PIR). After purchasing a domain name, all the subdomains are also owned.

A DNS registrar like GoDaddy or Namecheap provide an interface to search an purchase available domain names. Once owned, you can set up DNS records to point it to your server's IP, typically some hosting provider, address.

## Hypertext Transfer Protocol (HTTP)

HTTP is the internet communication protocol. URLs are not specific to HTTP--if they were we wouldn't need to prefix URLs with `http://`. The prefix (scheme) tells the computer _which_ protocol to use. There are many protocols that can be used with URLs, such as `ftp://` for file transfer, `mailto:` for email, and `https://` for secure HTTP. Each protocol has a default port number that it uses to communicate. For example, **HTTP uses port 80 by default**, while HTTPS uses port 443. This is why you don't see the port number in most URLs, as the browser assumes the default port for the protocol.

HTTP verbs (methods) and status codes are part of the HTTP (Hypertext Transfer Protocol) specification, maintained by the Internet Engineering Task Force (IETF) and the World Wide Web Consortium (W3C). They are defined in a series of RFCs.

### HTTP Headers

HTTP headers are key-value pairs sent in the request and response messages. HTTP headers let the client and the server pass additional information with a message in a request or response to control how the client and server communicate and handle the data being transferred. A common use for Headers is authentication, where the client sends a token in the `Authorization` header or API token to prove its identity to the server.

Headers are grouped according to context:

- **General Headers**: These headers apply to both request and response messages, like the `Request URL`, `Request Method`, `Status Code`.
- **Request Headers**: Contain more information about the resource to be fetched, or about the client requesting the resource, e.g. 
- **Response Headers**: Hold additional information about the response, like its location or about the server providing it, e.g.
- **Representational Headers**: Contain information about the body of the resource, like its MIME type, or encoding/compression applied, e.g.
- **Payload Headers**: Contain representation-independent information about payload data, including content length and the encoding used for transport, e.g.

### HTTP Methods

"HTTP defines a set of request methods to indicate the purpose of the request and what is expected if the request is successful." Methods can differ in whether they are safe, idempotent or cacheable. The most commonly used HTTP methods are:

- `GET`: The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should not contain a request content.
- `POST`: The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server, e.g. POST /users to create a new user with a server-generated ID. When to Use:
  - Creating a new resource, e.g., adding a new user, post, or order.
  - When the client doesn't control the resource's identifier.
- `PUT`: The PUT method replaces all current representations of the target resource with the request payload, e.g. PUT /users/123 to replace the user with ID 123. PUT is typically used to update existing resources. When to Use:
  - Updating an entire resource when you know its URI.
  - Creating a resource at a specific URI (less common).
- `PATCH`: The PATCH method applies partial modifications to a resource, e.g. PATCH /users/123 to update only specific fields of the user with ID 123. When to Use:
  - Updating specific fields of a resource without affecting others.
  - When bandwidth is a concern, as PATCH sends less data than PUT.
- `DELETE`: The DELETE method deletes the specified resource. It is idempotent, meaning that multiple identical requests should have the same effect as a single request.

Less commonly used HTTP methods are `CONNECT`, `HEAD`, `OPTIONS`, and `TRACE`.

### HTTP Status Codes

HTTP status codes are three-digit numbers returned by the server to indicate the outcome of a request. They are grouped into five classes:

- **1xx (Informational)**: These codes indicate that the request was received and understood, and that the server is continuing to process it. They are rarely used in practice.
- **2xx (Success)**: These codes indicate that the request was successful and that the server has returned the requested resource. The most common success code is `200 OK`, which means the request was successful and the server has returned the requested resource.
- **3xx (Redirection)**: These codes indicate that the requested resource has been moved to a different URL, and the client should follow the redirection to access it. The most common redirection code is `301 Moved Permanently`, which means the resource has been permanently moved to a new URL.
- **4xx (Client Error)**: These codes indicate that the client has made an error in the request, such as requesting a resource that does not exist or providing invalid input. The most common client error code is `404 Not Found`, which means the requested resource could not be found on the server.
- **5xx (Server Error)**: These codes indicate that the server has encountered an error while processing the request. The most common server error code is `500 Internal Server Error`, which means the server encountered an unexpected condition that prevented it from fulfilling the request.

## Uniform Resource Locator (URL)

A URL is made up of several components, each serving a specific purpose:

1. **Scheme**: Indicates the protocol to be used (e.g. `http`, `https`, `ftp`, `mailto`). The protocol is _required_ to determine how to fetch the resource. We must know "what language to speak" to the server. Not all schemes are supported by all browsers or clients. Not all schemes are postfixed with `://`, but most are. The `mailto:` scheme is understood by most computers so that on click it will automatically open an email client to send an email.
2. **Username**: An optional username for authentication (e.g. `dragonslayer`).
3. **Password**: An optional password for authentication (e.g. `pwn3d`).
4. **Host**: The domain name or IP address of the server (e.g. `www.example.com`). This is _required_ to locate the server on the internet.
5. **Port**: The port number on the server (e.g., `:80` for HTTP, `:443` for HTTPS) is optional and often omitted. Ports are "virtual little hubs" managed by the operating system that segment incoming internet traffic to different applications on the same server at the same time. An OS allows for about 65,535 ports, but only 1-1024 are reserved for well-known services. The rest are available for applications to use.
6. **Path**: The specific resource on the server (e.g. `/path/to/resource`). The default path is `/` if not provided, which is the root of the server. The path typically changes something big, like serving a whole page or resource.
7. **Query**: A set of key-value pairs for additional parameters (e.g. `?key1=value1&key2=value2`). Tends to be smaller changes to the resource, like filtering or sorting data. The query string is optional and can be empty.
8. **Fragment**: A specific section within the resource (e.g. `#section1`).

```js
const url = new URL('https://dragonslayer:pwn3d@www.example.com/path/to/resource?key1=value1&key2=value2#section1');
console.log(url);

// URL {
//   href: 'https://dragonslayer:pwn3d@www.example.com/path/to/resource?key1=value1&key2=value2#section1',
//   origin: 'https://www.example.com',
//   protocol: 'https:',
//   username: 'dragonslayer',
//   password: 'pwn3d',
//   host: 'www.example.com',
//   hostname: 'www.example.com',
//   port: '',
//   pathname: '/path/to/resource',
//   search: '?key1=value1&key2=value2',
//   searchParams: URLSearchParams { 'key1' => 'value1', 'key2' => 'value2' },
//   hash: '#section1'
// }

```

> **ℹ️ Info:**
>
> A **URI** (Uniform Resource Identifier) is a string of characters that identifies a particular resource. A URL (Uniform Resource Locator) is a specific type of URI that provides the means to locate the resource by describing its primary access mechanism, typically its network location. All URLs are URIs. A URN (Uniform Resource Name) is another type of URI that identifies a resource by name in a particular namespace, but does not provide a means to locate it.
>
> A **HREF** (Hypertext Reference) is an _attribute_ in HTML to specify the URL of a linked resource. It is commonly used in anchor (`<a>`) tags to create hyperlinks. It can be relative or absolute. A relative URL is a partial URL that is relative to the current page, while an absolute URL includes the full path to the resource, including the protocol and domain name.

## API Design Architectures

"REST" and "GraphQL" are both API design architectures used for building and querying web services, enabling communication between clients and servers.

### REST (Representational State Transfer)

Representational State Transfer (REST) is a set of guiding architectural constraints for building APIs. It is not a protocol or standard.

> When a client request is made via a RESTful API, it transfers a representation of the state of the resource to the requester or endpoint.

In order for an API to be considered RESTful, it has to conform to these criteria:

- A client-server architecture made up of clients, servers, and resources, with requests managed through HTTP.
- Stateless client-server communication, meaning no client information is stored between get requests and each request is separate and unconnected.
- Cacheable data that streamlines client-server interactions.
- A uniform interface between components so that information is transferred in a standard form.

## Resources

1. [Mediocre Engineer’s guide to HTTPS](https://devonperoutky.super.site/blog-posts/mediocre-engineers-guide-to-https)
2. [Full HTTP Networking Course](https://www.youtube.com/watch?v=2JYT5f2isg4)
    - <https://youtu.be/2JYT5f2isg4?si=K-4PRUlE6mquTZaT&t=13137>
3. [CSE 561: Computer Networks](https://courses.cs.washington.edu/courses/cse561/12wi/)
4. [HTTP Networking in JavaScript – Handbook for Beginners](https://www.freecodecamp.org/news/http-full-course/)
5. [HTTP Headers and Cookies](https://youtu.be/DxeSGUM16_4?si=Fa0Rnz-iWKeO8uae&t=372)
6. [What is a REST API?](https://www.redhat.com/en/topics/api/what-is-a-rest-api)