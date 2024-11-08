DEV Tinder

Waterfall model -- Requirements -> Design -> Development -> Testing -> deployement -> maintainance

#

                        Monolith                                                  Microservices

- Everything will be in a sinble repositories \* Multiple small service - where service can be a new application ornew project  
  ex:- front end, DB connect, email service etc ex:- microservice for auth service, BE service,Notification service
  Dev speed slow fast
  Code repo  
  scalability Very difficult to scale scaling is easy here
  deployement is very easy since we have a single repo here we can deploye only the service where we have chnages
  but like if we have some single line code changes
  also we have to dploye eveythin
  Tech stack we have to maintain a single language eveywhere we can have different languages for a different services
  Infra cost Lower higher
  Complexity depends on size of the project
  Maintanence It breaks the entire system if something goes wrong here it will affect only that service
  Testing There will be a central ownership It can be tested independantly - ownership can be taken independantly

# Features

1. Create account/Login and update profile
2. Feed - Explore page
3. Send connection request
4. See our matches
5. REquset status
6.

LLD --- low level design
#DB Design
Collections
User --> user info -->name,pswd,genderetc
Connection request -- From, To, status --> pending,accepted,rejected,canceled, ignored

HDL --- high level design

# app.use() and app.get()

        app.use("/hello", ...) will match all HTTP methods (GET, POST, PUT, DELETE, etc.) that start with the /hello path. This means it applies to any request where the URL starts with /hello, including /hello, /hello/world, etc.

        app.get("/hello", ...) will match only GET requests for the exact /hello path. It won’t apply to POST, PUT, DELETE, or any other methods.

app.get("/user", async (req, res) => {
//http://localhost:2000/user?userId=1&name="punya"
console.log("Query param...", req.query); //{userId:1,name:"punya"}
res.send("sent from hello");
});

app.get("/user/:userId", async (req, res) => {
//http://localhost:2000/user?userId=1 :(colon) means dynamic routes
console.log("Path param...", req.params); //{userId:1}
res.send("sent from hello");
});

ab?c --- c is optional here, that means without b also this route will work, a(bc)?d ---- bc is optional
ab+c --- b can come many times
ab\*cd --- the route should start with ab and ends with cd
we can also have regex in the path

app.get(
"/",
async (req, res, next) => {
console.log("Fetching users...1st request");
// res.send("sent"); when it is commented 2nd response will be sent if we uncomment - as soon as it reaches res.send("sent 2") this it will throw an error --- cannot set header after it sent back to the client
next();
},
(req, res) => {
console.log("Fetching users...2nd request ");
res.send("sent 2");
}
);

Other way of sending multiple route handlers

app.get(
"/",
async (req, res, next) => {
console.log("Fetching users...1st request");
next();
},
);

app.get(
"/",
async (req, res, next) => {
console.log("Fetching users...1st request");
res.send("sent"); This will be the output

},
);

# Middleware

middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. Middleware allows you to intercept requests, add logic before sending a response, and handle things like authentication, data parsing, and error handling.

const express = require('express');
const app = express();

# _.use() and .all()_

.use() Method
Purpose: The .use() method is used to register middleware functions that will execute for all HTTP methods (GET, POST, PUT, DELETE, etc.) that match a specified path or, if no path is specified, all paths.
Usage: .use() is typically used for application-level middleware (e.g., logging, parsing, authentication).
// Middleware function that logs request details
app.use('/',(req, res, next) => {

                  // We can check authorization here
                  const token="Punya"
                  if(token=="Punya"){
                  next(); // Passes control to the next middleware or route if the user is authenticated
                  }else{
                  res.status(401).send("user is not authorized)
                  }
                  });
                  // Route handler
                  app.get('/admin/getusers', (req, res) => {
                  res.send('Hello World!');
                  });

                  app.delete('/admin/user', (req, res) => {
                  res.send('Hello World!');
                  });

                  app.listen(3000, () => {
                  console.log('Server is running on port 3000');
                  });

.all() Method
Purpose: The .all() method is used to define middleware functions that run for all HTTP methods on a specific route.
Usage: .all() is usually used to apply middleware to a particular route or path, regardless of the HTTP method (GET, POST, etc.). It's commonly used when you want to handle certain logic for a specific route without repeating code for each method.

                  app.all('/api/*', (req, res, next) => {
                    console.log('API request to any endpoint');
                    next();
                  });

                  app.get('/api/users', (req, res) => {
                    res.send('User List');
                  });

                  app.post('/api/users', (req, res) => {
                    res.send('Create User');
                  });

Cookies
while sending a jwt token server will wrap that inside a cookie and send that
A cookie is a small piece of data that a server sends to a user's web browser. The browser stores it and sends it back to the server with each subsequent request to the same domain. Cookies are primarily used to remember information about the user, helping improve the browsing experience and enabling personalized interactions.
Attributes of a Cookie:

\\
Name and Value: Key-value pairs that represent the data being stored.
Domain: The domain that can access the cookie (e.g., example.com).
Path: Specifies the URL path that must exist for the cookie to be sent.
Expiration Date: Defines how long the cookie will remain valid.
Secure and HttpOnly Flags:
Secure: Ensures the cookie is only sent over HTTPS.
HttpOnly: Prevents JavaScript from accessing the cookie, offering additional security against cross-site scripting (XSS) attacks.

# _cookies vs jwt tokens_

Expiring Cookies:
Cookies are stored on the client’s browser and may contain session information.
Expiration is controlled by the Expires or Max-Age attribute in the cookie.
When a cookie expires, it is automatically removed from the client’s browser, which can end the session if the cookie was used to authenticate.
_res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })_

Expiring JWT Tokens:
A JWT (JSON Web Token) is a token typically stored in cookies, local storage, or session storage on the client side.
JWTs have an exp (expiration) claim in their payload, specifying the exact time they will expire.
Unlike cookies, expired JWTs are not automatically removed from storage. Instead, when a request is made with an expired JWT, the server rejects it upon verifying the exp claim.
