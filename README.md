# SoftEngII-P08-SPG

## HOW TO TEST? SERVER SIDE

1) cd server
2) npm run test

## LIST OF API SPRINT 1

### http://localhost:3000 is the default path


#### POST /api/clientSessions

Login of clients

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
	"category":2,
	"price":1.99,
	"qty":2,
	"farmer_email":3},
	...]

#### POST /api/bookings

Create a new booking with state = BOOKED

Receive a JSON object

	{"idClient":3}
  
Return a JSON OBJECT with booking id

	{"idBooking":1}
	
#### PUT /api/bookingstate
Edit the state of an existing booking.

Receive a JSON object:

   	{"id":1,
   	"state":"COMPLETED"}


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

Edit the qty of a product in product_week table

Receive a JSON object

	{"ID_Product":3,
	"New_Qty":6}
	
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
	

