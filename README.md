# SoftEngII-P08-SPG

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
	{"ID":1,
	"Name":"Apple",
	"Category_Id":2,
	"Price":1.99,
	"Qty":2,
	"Farmer_ID":3},
	...]

#### POST /api/booking

Create a new booking with state = BOOKED

Receive a JSON object

	{"Client_id":3}
  
Return a JSON OBJECT with booking id

	{"ID_Booking":1}
	
#### PUT /api/bookingstate
Edit the state of an existing booking.

Receive a JSON object:

   	{"ID_Booking":1,
   	"New_State":"DELIVERED"}


#### GET /api/bookings

Retrieve the list of all bookings, return a JSON Vector

	[{
		"ID_Booking":1,
		"Client_id":2,
		"State":"PENDING"
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

  	{"Email":"antonio.bianchi@mail.it",
	"Name":"Antonio",
	"Surname":"Bianchi",
	"Password":"sdojnids3204klvncxpkèpf"}
  
Add also a record in the table client_Wallet with the same client ID and balance = 0

Return the client ID

	{"ID":3}

#### GET /api/client

Get a client by mail. Receives a JSON object with the email
  
  	{"email":"antonio.bianchi@mail.it"}

Return the client id if exists, -1 if not exists

  	{"id_client":-1}

#### GET /api/wallet

Get the balance of a client.

Receive a JSON Object with client ID

  	{"Client_id":1}

Return a JSON with balance
  
	{"Balance":15.50}
  
Returns 404 if not found

#### PUT /api/walletbalance

Edit the wallet balance for a certain client
	
Receive a JSON Object with client ID and new balance
  
	{"Client_id":1,
	"New_Balance":19.99}
	

