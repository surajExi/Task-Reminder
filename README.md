# Task-Reminder
Task Reminder Application- Based on Node Js for Backend &amp; Vue Js for front end 

#Web API - Node Js Server
Web API for the application is written in Node Js acting as the backend server.
Based on the code in the repo, the server would run on "http://localhost:4000"
Applied CORS in the API layer to accept the Vue.js (Do change as per your root`)

#Authentication - JWT Token Based
For the API authentication we have used the JWT token based authentication. Middleware is used as the VerifyToken under the configurations/token.js
The job is to check for the ["x-access-token"] in the header and validate the token.

#To run API Server
In Command Prompt/Terminal
Hit > node server

#Web Layer - Vue.Js Front-End
For the front end or the web layer for the interaction within the client and the api server, we have used here Vue.Js
The Vue.Js would run on "http://localhost:8080"

#Database - MySQL
For the Database we have used MySql. The database schema with the tables created script in under the Database Scripts folder. 

Thus, this is a generic module created, which you can use for the API authentication (basic) and extend to build applications/apis!

Hope it helps!


