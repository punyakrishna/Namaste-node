# Namaste-node

Nodejs

- is asynchronous non blocking I/O reading and writing files
- Non blocking I/O coz it won't block the main thread that means main execution is going on in v8's call stack and other io operations are happening in libuv
- Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.

V8 Engine--- Browser
the V8 engine (or another JavaScript engine, depending on the browser) is responsible for running the JavaScript code, but it doesn't handle timers, network requests, or other asynchronous tasks by itself. Instead, the browser uses a different mechanism:

The call stack is part of the JavaScript engine itself, such as V8 (used in Chrome and Node.js). It manages the execution of synchronous JavaScript code. When a function is invoked, it's pushed onto the call stack, and when the function returns, it's popped off. The call stack handles only one task at a time, which is why JavaScript is often referred to as a "single-threaded" language.

Web APIs: In the browser, these are provided by the browser environment itself (not by the JavaScript engine). These include APIs for timers (e.g., setTimeout, setInterval), DOM manipulation, AJAX requests (e.g., fetch or XMLHttpRequest), and more.

Event Loop: Like Node.js, the browser has an event loop that manages asynchronous tasks. When you call a timer or make a network request, the browser's Web API handles it, and once the task is complete, the result is sent back to the event loop, which then queues up the corresponding callback to be executed by the V8 engine.

Node js
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

V8- Both interpreted and compiled language -- javascript --- JIT

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


