Specifications/Requirements

Module Installations

The modules you need for this project are ejs and express. You don't need to use nodemon, but it helps the development process as nodemon restarts the server after any server code change.



Items Information

Information about the items a supermarket sells will be provided via a JSON file (e.g., itemsList.json). The "itemsList" property represent an array of the items the supermarket sells. The "itemsListName" property is the name of the list (you can ignore it as it will not be used in the project).



Command Line Interpreter

You should start developing your application by implementing the command line interpreter that is part of the supermarketServer.js file. Users will start the server by executing node supermarketServer.js followed by a file with JSON information about items sold by the supermarket. For example, to start the server with the data available in itemsList.json the user will type on the command line: node supermarketServer.js itemsList.json

About the command line interpreter:



The command line interpreter will use the prompt "Type itemsList or stop to shutdown the server: ".

The server will stop when "stop" is entered. The message "Shutting down the server" should be displayed when the server is stopped. Use process.exit(0) to stop the server.

The items in the JSON file loaded are displayed when "itemsList" is entered.

"Invalid command: " followed by the command entered, is displayed for a command other than "stop" or "itemsList".

Displays the message "Usage supermarketServer.js jsonFile" when an incorrect number of command line arguments are provided.

Definining and Processing Endpoints (path and specific HTTP method)

Using express, you will define endpoints that will generate the expected processing. Assumming app is the express request handler function, the endpoints you need to implement are:



app.get("/", (request, response) => { /\* You implement \*/}); - This endpoint renders the main page of the application and it will display the contents of the index.ejs template file.

app.get("/catalog", (request, response) => { /\* You implement \*/ }); - This endpoint displays the displayItems.ejs template with the table of items available.

app.get("/order", (request, response) => { /\* You implement \*/ }); - This endpoint displays the placeOrder.ejs template with the table of items available.

app.post("/order", (request, response) => { /\* You implement \*/ }); - This endpoint will process the submission of the placeOrder form, retrieving the order values and processing the order. Processing an order requires displaying the orderConfirmation.ejs template with a table that includes the items to be purchased, along with their cost. The last table row has the sum of all the items in the order.

Template files

We have provided the template files you need to use while processing endpoints. In those files, except for index.ejs, you will find variable(s) (e.g., <%- orderTable %>) that will be replaced with the appropriate contents. Class examples illustrate how to use the render method (e.g., response.render()) with an ejs file and an object that has values that will replace the ejs file variables. Do not modify the provided template files.





Format for Output Messages and Tables

Take a look at the application video to identify the format expected for output messages and tables.



Data Validity

You an assume the provided JSON files are correct. Also, you can assume users will provide the expected data (the application does not have to generate any error messages for invalid data provided by the user).



Port Number

Your server will use 5000 as the port number. The application main page will be accessed via the endpoint http://localhost:5000/

