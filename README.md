# Namaste-node

# Nodejs

- is asynchronous non blocking I/O reading and writing files
- Non blocking I/O coz it won't block the main thread that means main execution is going on in v8's call stack and other io operations are happening in libuv
- Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.

V8 Engine--- Browser
the V8 engine (or another JavaScript engine, depending on the browser) is responsible for running the JavaScript code, but it doesn't handle timers, network requests, or other asynchronous tasks by itself. Instead, the browser uses a different mechanism:

The call stack is part of the JavaScript engine itself, such as V8 (used in Chrome and Node.js). It manages the execution of synchronous JavaScript code. When a function is invoked, it's pushed onto the call stack, and when the function returns, it's popped off. The call stack handles only one task at a time, which is why JavaScript is often referred to as a "single-threaded" language.

Web APIs: In the browser, these are provided by the browser environment itself (not by the JavaScript engine). These include APIs for timers (e.g., setTimeout, setInterval), DOM manipulation, AJAX requests (e.g., fetch or XMLHttpRequest), and more.

Event Loop: Like Node.js, the browser has an event loop that manages asynchronous tasks. When you call a timer or make a network request, the browser's Web API handles it, and once the task is complete, the result is sent back to the event loop, which then queues up the corresponding callback to be executed by the V8 engine.

# Node js

In Node.js, the way asynchronous tasks are handled is similar to how it's done in the browser, but with some key differences. Instead of using Web APIs like browsers do, Node.js relies on libuv to manage asynchronous tasks such as timers, file system I/O, networking, etc.

1. Call Stack (V8 Engine)
   Like in the browser, Node.js uses the V8 engine to execute JavaScript code. it follows a "Last In, First Out" (LIFO) order. When a function is called, it's added to the call stack, and when it finishes, it's removed.

2. libuv (for Asynchronous Tasks)
   libuv is a key component in Node.js. It provides an abstraction layer to handle asynchronous tasks such as:
   File system operations (e.g., reading/writing files)
   Network I/O (e.g., HTTP requests, TCP connections)
   Timers (e.g., setTimeout, setInterval)
   DNS queries
   When you perform an asynchronous operation in Node.js, like reading a file with fs.readFile(), the actual I/O operation is handed off to libuv, which performs the operation outside of the V8 engine. Meanwhile, V8 continues executing other JavaScript code.

3. Event Loop (Node.js)
   Just like in browsers, Node.js has an event loop that manages asynchronous operations. The event loop checks the call stack and queues (task queues and microtask queues). If the call stack is empty, the event loop processes any pending callbacks from asynchronous tasks.

Interpreter--
it will start reading the code line by line and executes
Compiler---
It will compile the code that means it will create machine level code and then executes

# V8- Both interpreted and compiled language -- javascript --- JIT

                          Code
                           |
                        Parsing
                  Lexical analysis (Tokenization)
                       Code -> Tokens

                  Syntax Analysis(Parsing)
                       Tokens -> Abstract syntax tree
                            |                            If there is a repetative code it will give it to compiler for optimisation
                        Interpreter(Ignition interpreter)     ----->     Turbofan compiler
                            |                                                |
                          Byte Code                                    Optimised machine code
                            |                                                 |
                                     sum(1,2) sum(10,34) sum(0,4)
                                  de-optimization <---- sum("a","b")

                                                |
                                            Execution

Garbage collector
Orinoco
Oilpan
Scavenger
Mcompact

# Event loop

Higher prority -- process.nextTick() and promise callbacks --- only once all the callbacks are completed then only it will move to next cycle that means if there are any next process.nextTick it will execute it then only it will go to promises
but its not the case with second cycle

2nd cycle

1. timer --- setTimeout setInterval
2. poll --- I/O callbacks, incoming connections,data,fs,crypto, http.get etc
3. check --- setImmediate
4. Close --- socket.on("close")

before checking each step in the second cycle it will ceck the 1st hight priority task if there are any nextTick or promise call backs it will execute it and then it will mve to the next cycle

# Thread Pool - by default the size is 4 -- belongs to uv

Libuv uses different threads to handle different requests
Ex:- fs - most of the functions from fs module uses thread pool
dns.lookup - uses thred pool
crypto - ------||---

Epoll,Kqueue, fds-socket descriptors

# Server

A server is a computer system or a software application that provides services, resources, or data to other devices, often referred to as clients, over a network.

# Difference between our systems and aws virtual machine

Ip---since we are using a local network it won't provide us a proper IP where in aws's one there will be a dedicated IP for our sysytem
ram--- we have a limited ram and in aws i can increase
internet connectivity and power supply --- in local machines we can't guarante a high speed internet connectivity and power supply 24/7 where aws is managing all this

1. Hardware Server
   A hardware server refers to the physical machine or computer that is designed to run server software and manage networked resources or services.
   Physical Components: It includes things like motherboards, CPUs, hard drives, and network interfaces.
   High Performance: These servers typically have more processing power, memory, and storage capacity than regular computers because they serve many users and handle large-scale operation

2. Software Server (sometimes referred to as "Server Software")
   A software server refers to the program or application running on either physical or virtual hardware that provides specific services or functionality. This is where the actual server software processes client requests

# Protocol --- A protocol is a set of rules and standards that define how data is transmitted and received between different devices in a network.

- While TCP is responsible for reliably transmitting data between two devices (e.g., between your computer and a web server), HTTP is responsible for defining how that data is structured, exchanged, and interpreted at a higher level, specifically for web communication.
  # HTTP is an application layer protocol used to structure requests and responses for web communication. It defines how browsers request data (like web pages, images, etc.) from servers and how servers respond with that data.
  # TCP ensures that the data (like the HTTP request and response) is transmitted reliably and in the correct order over the internet.

1. Internet Protocols:
   HTTP (Hypertext Transfer Protocol): Used for transmitting web pages over the internet.
   HTTPS (HTTP Secure): A secure version of HTTP, which encrypts the data sent between a browser and a web server using SSL/TLS.
   FTP (File Transfer Protocol): Used to transfer files between computers over a network.
   SMTP (Simple Mail Transfer Protocol): Used for sending emails between se rvers.
   IMAP/POP3: Used for retrieving emails from mail servers.

2. Network Protocols:
   IP (Internet Protocol): Responsible for addressing and routing data packets between devices on a network.
   TCP (Transmission Control Protocol): Ensures reliable transmission of data by establishing a connection between devices and verifying data integrity.
   UDP (User Datagram Protocol): A faster, connectionless protocol used for tasks where speed is more important than reliability (e.g., video streaming or online gaming).
   DHCP (Dynamic Host Configuration Protocol): Automatically assigns IP addresses to devices on a network.

3. Security Protocols:
   SSL/TLS (Secure Sockets Layer/Transport Layer Security): Provides encryption for secure communication over networks (commonly used in HTTPS).
   IPsec (Internet Protocol Security): Used to secure data at the network layer, often in VPNs (Virtual Private Networks).
   SSH (Secure Shell): Provides secure remote access to a server or device.

# OSI Model---

Physical Layer: Hardware, cables, and transmission of raw bits.
Data Link Layer: Error detection and correction between directly connected nodes.
Network Layer: Routing and forwarding of data packets (IP is here).
Transport Layer: Ensures reliable data transmission (TCP/UDP).
Session Layer: Manages sessions and connections.
Presentation Layer: Data translation and encryption. (TLS/SSL)
Application Layer: End-user services and network-based applications (HTTP, FTP)

# _The difference between an IP address and a port number lies in what they identify and how they help in network communication._

IP Address:
What it is: An IP (Internet Protocol) address is a unique numerical identifier assigned to each device on a network. It acts like an address for devices on the internet or a local network, allowing them to find and communicate with each other.

    Purpose: It specifies which device on the network you're communicating with. An IP address can be thought of as the "home address" for a device on the internet, ensuring that data is delivered to the right device.

Port Number:
What it is: A port number is a numerical value assigned to specific processes or services running on a device. It helps distinguish between different types of network traffic (or services) on the same device.

    Purpose: It specifies which application or service on the device you're communicating with.

EX:- i have two different applications one is react and other one is node
myapplication.com/ -- dafault i can give it as 3000
myapplication.com/api --- i can make this to point my nodejs application by running this at port 3001 and inside this there might me internal servers as well say for example we have hhosted our DBs, files like images and videos in a different server, main server will fetch from these

# _Difference between Sockets and Web sockets_

Socket:
Used in general-purpose network programming.
Can be implemented using different transport protocols like TCP and UDP.
Examples include file transfers, email communication, streaming services, or any custom communication protocol.

WebSocket:
Specifically used for web-based applications that require real-time, bidirectional communication between a web client (typically a browser) and a server.
Common in web applications such as live chats, stock tickers, real-time notifications, collaborative editing, and gaming applications where immediate updates are needed.

# _Database_

    *Organized collection of data --- structured in a way that we can perform certain operations on it like adding data,  removing altering

DBMS -- way to interact with the data, end user and database itself

Types of Database
1.Relational Database -- PostgreSQL, MYSQL
    EF codd -- he introduced 12 rules and said if the database follows this 12 rule then it will be Relational DB
2.NoSQL -- MongoDB
    Document DB, Key value DB, Multi Model DB
3.inmemory DB -- Redis -- it acts like a caching -- ex-if the particular api is frequently getting called
etc.

# *SQL-- Structured query language*