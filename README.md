# SoftEngII-P08-SPG

## HOW TO RUN DOCKER?

1. install docker
2. open a powershell 
3. docker-compose up
4. connect localhost 3000


## HOW TO TEST? SERVER SIDE

1. cd server
2. npm run test

## LIST OF API SPRINT 1

### http://localhost:3000 is the default path

#### POST /api/clientSessions

Login of clients

#### POST /api/managerSessions

Login of managers

#### POST /api/famerSessions

Login of farmers

#### POST /api/shopEmployeeSessions

Login of shop employees

#### GET /api/clients

return the JSON vector of all clients.

Example

    [
    {"ID":1,
    "Name":"Antonio",
    "Surname":"Bianchi",
    "Email":"antonio.bianchi@mail.com"},
    ...]

#### GET /api/products

return the JSON list of all products. Example

    [
    {"id":1,
    "name":"Apple",
    "category":"spices",
    "price":1.99,
    "qty":2,
    "farmer_email":"farmer@email.it"},
    ...]

#### POST /api/bookings

Create a new booking with state = BOOKED

Receive a JSON object

    {"idClient":3,
    "qty":10}

Return a JSON OBJECT with booking id

    {"idBooking":1}

#### PUT /api/bookingstate

Edit the state of an existing booking.

Receive a JSON object:

{"id":1,
"state":"COMPLETED"}

#### PUT /api/ackstate

Edit the state of an existing ack.

Receive a JSON object:

{"id":1,
"state":"READ"}

#### GET /api/bookings/clients/:id

Get ALL the bookings of a particular client, return a JSON Vector

    [{
    	"id": 1,
        "state": "PENDING",
        "email": "client@gmail.com",
        "name": "client1",
        "surname": "clientSurname",
        "qty": 3,
        "product": "pro1"
    },...]

#### POST /api/products_expected

This API receives an array of products advertised by farmer and insert one by one in the db and return a vector with all id created

    [
    {
    "name":"Apple",
    "category":2,
    "price":1.99,
    "qty":2,
    "farmer_id":3
    },
    ...]

#### GET /api/categories

get all categories

    [{
    	"id": 1,
        "name": "fruit"
    },...]

#### GET /api/bookingsPendingCancelation

retrieves all the bookings with state = PENDINGCANCELATION, return a JSON Vector

    [{
    	"id": 2,
        "state": "PENDINGCANCELATION",
        "email": "client@gmail.com",
        "name": "client1",
        "surname": "clientSurname",
        "qty": 3,
        "product": "pro1"
    },...]

#### GET /api/acksNew

retrieves all the acks with state = NEW, return a JSON Vector

    [    {
        "id": 2,
        "state": "NEW",
        "farmer": "antonio.bianchi@mail.it",
        "farmerId": 1
    },...]

#### POST /api/bookings_mode

Create a new booking mode

Receive a JSON object

    {"idBooking":3,
    "delivery":1,
    "street":"via giovanni ribet",
    "city":"turin",
    "province":"TO",
    "postal_code":"12345",
    "country":"italy",
    "date":"22/11/2021",
    "time":"13:20",
    "extra_fee":24.5
    }

### DELETE /api/products_expected

delete a product by receiving its id

#### GET /api/farmers/:farmerid/products_expected

return the JSON list of all products from PRODUCT EXPECTED according to the id of a farmer. Example

    [
    {"id":1,
    "name":"Apple",
    "category":"fruit",
    "price":1.99,
    "qty":2,
    "farmer_email":"farmer@email.it"
    "state":"EXPECTED"},
    ...]

### POST /api/farmers/:farmerid/products/

INSERT into Product_WEEK by receiving a product confirmed by farmer with state = CONFIRMED
reciving a json object
{
{"id":1,
"name":"Apple",
"category":2,
"price":1.99,
"qty":2,
"farmer_id":3
"state": "CONFIRMED"}

#### GET /api/farmers/:farmerid/products

return the JSON list of all products of a particular farmer in state= CONFIRMED from PRODUCT_WEEK table. Example

    [
    {"id":1,
    "name":"Apple",
    "category":2,
    "price":1.99,
    "qty":2,
    "farmer_email":3},
    ...]

#### PUT /api/products

put (edit) the state of all product in PRODUCT_WEEK by receiving an array of products with id and new state. Example

    [
    {"id":1,
    "state":"DELIVERED"},
    ...]

#### POST /api/acknowledge
Add new acknowledge for manager with state = NEW. Example:
    {
    "idFarmer": 1, 
    "email": "antonio.bianchi@mail.it"
    }

#### GET /api/bookings

Retrieve the list of all bookings, return a JSON Vector

    [{
    	"id": 1,
        "state": "PENDING",
        "email": "client@gmail.com",
        "name": "client1",
        "surname": "clientSurname",
        "qty": 3,
        "product": "pro1"
    },...]

#### POST /api/bookingproduct

Create a new record of a product for a certain booking.

Receive a JSON object

    {"ID_Booking":1,
    "ID_Product":2,
    "Qty":3}

#### PUT /api/productqty

Decrements the qty of a product in product_week table

Receive a JSON object

    {"ID_Product":3,
    "Dec_Qty":6}

#### POST /api/newclient

Add a new client in the table Client

Receive a JSON object, password is the HASH of the password

{"email":"antonio.bianchi@mail.it",
"name":"Antonio",
"surname":"Bianchi",
"password":"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"}

    plaintext password for this user is : 'testpassword'

Add also a record in the table client_Wallet with the same client ID and balance = 0

Return the client ID

    {"idClient":3}

#### POST /api/client

Get a client by mail. Receives a JSON object with the email

{"email":"antonio.bianchi@mail.it"}

Return the client id if exists, -1 if not exists

{"id_client":-1}

#### POST /api/wallet

Get the balance of a client.

Receive a JSON Object with client ID

{"Client_id":1}

Return a JSON with balance

    {"Balance":15.50}

Returns 404 if not found

#### PUT /api/walletbalance

Edit the wallet balance for a certain client
Receive a JSON Object with client ID and new balance

    {"id":1,
    "amount":19.99}
