# SoftEngII-P08-SPG

## IMPORTANT NOTE

Only for testing purpose we have included a feature for which at the end of every week instead of deleting products we readvertise them automatically and increase their quantity by 10. Obviously this will not be included in a hypotetichal final release. It's only for improving the testing of the application by you teachers.

## LIST OF ACCOUNTS

Only with testmode disabled
Password is always : <b> testpassword </b>

### Customer

1. email: antonio.bianchi@mail.it

### Shop Employee

1. email: susan@employee.spg.com
2. email: mario@employee.spg.com

### Manager

1. email: john@manager.spg.com

### Warehouse Manager

1. email: mike@whmanager.spg.com

### Warehouse Worker

1. email: tim@worker.spg.com

### Farmer

1. email: mark@farmer.spg.com
2. email: sue@farmer.spg.com

## HOW TO TEST? SERVER SIDE

1. cd server
2. npm run test

## LIST OF STATUS PRODUCT WEEK

1. EXPECTED = advertised by farmer on saturday morning
2. CONFIRMED = confirmed by farmer on monday
3. DELIVERED = delivered by farmer on tuesday evening

## LIST OF APIs (not updated anymore, to check all API use swagger: http://localhost:3001/api-docs )

### http://localhost:3000 is the default path

#### GET /api/time

Returns current time

#### GET /api/virtualTime 

Enable/disable virtual time

#### POST /api/clientSessions

Login of clients

#### POST /api/managerSessions

Login of managers

#### POST /api/famerSessions

Login of farmers

#### POST /api/shopEmployeeSessions

Login of shop employees

#### POST /api/warehouseManagerSessions

Login of warehouse managers

#### POST /api/warehouseWorkerSessions

Login of warehouse workers

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

return the JSON list of all products in state = EXPECTED. Example

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
        "name": "fruit",
        "measure":"kg",
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

Create a new booking mode with state=NEW

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

return the JSON list of all products from PRODUCT_WEEK with state = EXPECTED according to the id of a farmer. Example

    [
    {"id":1,
    "name":"Apple",
    "category":"fruit",
    "price":1.99,
    "qty":2,
    "farmer_email":"farmer@email.it"
    "state":"EXPECTED"},
    ...]

### POST /api/farmers/:farmerid/products

INSERT into Product_WEEK by receiving a product confirmed by farmer with state = CONFIRMED
reciving a json object

{
"name": "Apple",
"category": 2,
"price": 1.99,
"qty": 2
}

### POST /api/farmers/:farmerid/productsExpected

INSERT into Product_WEEK by receiving a product confirmed by farmer with state = EXPECTED
reciving a json object

{
"name": "Apple",
"category": 2,
"price": 1.99,
"qty": 2
}

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

#### PUT /api/clientsPreparation

This API receives a vector of products_id and for every product received, retrieve the client id, name, surname, email and collect all the clients in an array without duplications. example:
[
{"ID":1,
"Name":"Antonio",
"Surname":"Bianchi",
"Email":"antonio.bianchi@mail.com"},
...]

### GET /api/bookingModesPreparation

Get all the bookings from BOOKING_MODE with delivery = 0 and state = PREPARATION

response example:
[
{"idBooking":3,
"idClient":1,
state:"PENDINGCANCELATION",
"date":"22/11/2021",
"time":"13:20",

},...]

### GET /api/bookingModesNew/pickup

get all the records from BOOKING_MODE table WHERE delivery = 0 and state = NEW. Furthermore the state of the booking must be != PENDINGCANCELATION

response example:
[
{"idBooking":3,
"idClient":1,
state:"BOOKED",
"date":"22/11/2021",
"time":"13:20",
},...]

#### GET /api/bookings

Retrieve the list of all bookings, return a JSON Vector

    [
    {
        "id": 1,
        "state": "PENDINGCANCELATION",
        "email": "marco.bianchi@mail.it",
        "name": "Marco",
        "surname": "Bianchi",
        "products": [
            {
                "productID": 1,
                "product": "Mele",
                "qty": 3
            },
            {
                "productID": 2,
                "product": "Lamponi",
                "qty": 1
            }
        ]
    },
    {
        "id": 4,
        "state": "BOOKED",
        "email": "marco.bianchi@mail.it",
        "name": "Marco",
        "surname": "Bianchi",
        "products": [
            {
                "productID": 1,
                "product": "Mele",
                "qty": 2
            },
            {
                "productID": 2,
                "product": "Lamponi",
                "qty": 2
            }
        ]
    }
    ]

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

#### PUT /api/productstate

Changes the state of a product in product_week table

Receive a JSON object

    {"id":3,
    "state":"EXPECTED"}

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

#### NEW API

#### GET /api/bookings/booked/clients/:id

to get all the bookings of the client id that are
in state = BOOKED (ONLY THE BOOKINGS, NOT THE PRODUCTS)
json returned:

[
{
"id_booking" : 1
"id_client" : 1
"state" : "BOOKED"
},
...]

#### GET /api/bookingProducts/:bookingId

GET all the product associated to a particular booking.
json returned:

[
"id" = 1,
"name" = "Mele"
"category" =
"price" = 14.0
]

##### GETALLBOOKINGS(app.get("/api/bookings"), GETALLBOOKINGFORCLIENT(app.get("/api/bookings/clients/:id"), getBookingsStatePendingCancelation(app.get("/api/bookingsPendingCancelation"), getTotal(app.post("/api/clock"): I DIDN'T CHANGE THESE FUNCTIONS FOR THE COLUMNS CHANGED IN THE PRODUCT_WEEK

##### I CHANGED FOR THE ADD COLUMNS IN PRODUCT_WEEK THE app.post("/api/farmers/:farmerid/products"), app.get("/api/products"), app.get("/api/farmers/:farmerid/products_expected"), app.get("/api/products/farmers/:id"),

#### DELETE /api/products/:id

delete a product from product_week table with the given id

#### DELETE /api/bookingProduct

delete a booking product 
request body :
{
    "ID_Product": 1,
    "ID_Booking": 1
}
response status code is 204 (no content)

#### PUT /api/bookings_mode/:id

updates a given booking_mode state to PREPERATION
returns
{
"error": "BOOKING MODE ID NOT FOUND"
} with status code 500
if booking mode id was not found.


###### Now the api /api/products/farmers/:id return the elements with state confirmed or preparation 

###### GET /api/bookingProducts/:bookingId GET all the product associated to a particular booking.

    products = {
          id_product: e.ID,
          name_product: e.NAME,
          category: e.CATEGORY_NAME, 
          price: e.PRICE, 
          qty_booking: e.QTY_BOOKING, 
          email: e.FARMER_EMAIL, 
          state: e.STATE
    }
    
#### PUT /api/incrementProductQty

Increments the qty of a product in product_week table

Receive a JSON object

    {
    "ID_Product": 2,
    "Inc_Qty": 3
}
return the updated product info:
    "ID": 2,
    "NAME": "Lamponi",
    "CATEGORY_ID": 1,
    "PRICE": 1.78,
    "QTY": 4,
    "FARMER_ID": 1,
    "STATE": "CONFIRMED",
    "SIZE": 1,
    "UNIT_OF_MEASURE": "g"
}
   
