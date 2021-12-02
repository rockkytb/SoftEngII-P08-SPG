const url = "/api";

function addUser(newUser) {
    // call: POST /api/newclient
    return new Promise((resolve, reject) => {
        fetch('/api/newclient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { email: newUser.email, name: newUser.name, surname: newUser.surname, password: newUser.password }
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function logIn(credentials, type) {
    //call: POST /api/...
    let response = null;
    switch (type) {
        case 'C':
            response = await fetch(url + '/clientSessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            break;
        case 'M':
                response = await fetch(url + '/managerSessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });
                break;
        case 'F':
            response = await fetch(url + '/farmerSessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            break;
        case 'S':
            response = await fetch(url + '/shopEmployeeSessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            break;
        default:
            //error: wtf are you
            console.log("How did you get that?");
            return null;
    }
    if (response.ok) {
        console.log("client: login returned ok from server")
        const user = await response.json();
        return user;
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch (err) {
            throw err;
        }
    }
}

async function logOut() {
    await fetch(url + '/logout', { method: 'DELETE' });
}

async function getUserInfo() {
    const response = await fetch(url + '/userinfo');
    const userInfo = await response.json();
    if (response.ok) {
        return userInfo;
    } else {
        throw userInfo;  // an object with the error coming from the server
    }
}

async function getClientByEmail(email){
    //Not very secure, should send also employee data to verify identity
    const response = await fetch(url+"/client", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { email: email }
        ),
    });
    if(response.ok){
        return await response.json();
    }
    else{
        throw await response.json();
    }
}

async function getWalletById(id){
    //Not very secure, should send also employee data to verify identity
    const response = await fetch(url+"/wallet", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { id: id }
        ),
    });
    const wallet = await response.json();
    if(response.ok){
        return wallet;
    }
    else{
        throw wallet;
    }
}

async function setNewWallet(id, amount){
    return new Promise((resolve, reject) => {
        fetch(url + '/walletbalance', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id:id,
                    amount:amount
                }
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function newBooking(clientId, products) {
    //call: POST /api/bookings
    return new Promise((resolve, reject) => {
        fetch(url + '/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { idClient: clientId }
            ),
        }).then((response) => {
            if (response.ok) {
                if(products && products.length()>0)
                products.map((p) => {
                    newProductBooking(tmp, p.id, p.quantity);
                  });
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });

}

async function confirmBooking(id){
    return new Promise((resolve, reject) => {
        fetch(url + '/bookingstate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id:id,
                    state:"COMPLETED"
                }
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function newBookingProduct(ID_Booking, ID_Product, Qty) {
    //call: POST /api/bookingproduct
    return new Promise((resolve, reject) => {
        fetch(url + '/bookingproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {ID_Booking: ID_Booking,
                   ID_Product: ID_Product,
                 Qty: Qty}
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function newBookingMode(booking) {
    //call: POST /api/bookings_mode
    return new Promise((resolve, reject) => {
        fetch(url + '/bookings_mode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                booking
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function editProductQty(ID_Product, Qty) {
    //call: PUT /api/productqty
    return new Promise((resolve, reject) => {
        fetch(url + '/productqty', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                   ID_Product: ID_Product,
                 Dec_Qty: Qty}
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function confirmAck(id){
    return new Promise((resolve, reject) => {
        fetch(url + '/ackstate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id:id,
                    state:"READ"
                }
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function confirmDeliveryProducts(productList){
    return new Promise((resolve, reject) => {
        const deliveryList = productList.map((product)=>{
            return {
                id: product.id,
                state:"DELIVERED"
            }
        });
        fetch(url + '/products', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                deliveryList
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function confirmProductsFarmer(product){
    return new Promise((resolve, reject) => {
        
        
            fetch(url + '/productstate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    product
                ),
            }).then((response) => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((obj) => { reject(obj); }) // error msg in the response body
                        .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                }
            }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
        
    
    });
}

async function newAck(idFarmer,email) {
    //call: POST /api/acknowledge
    return new Promise((resolve, reject) => {
        fetch(url + '/acknowledge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { idFarmer: idFarmer,
                  email: email }
            ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });

}


async function newFutureProduct(id, products){
    //call: POST /api/bookings_mode
    return new Promise((resolve, reject) =>
        fetch(url+'/farmers/'+id+'/productsExpected', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                products
            ),
        }).then((response) =>
            {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((obj) => { reject(obj); }) // error msg in the response body
                        .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                }
            }
        ).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] })}) // connection errors
    )
}

//TODO: move clock to backend
//SHORT-TERM: post to server to receive date-time 
async function setDate(date){
    return new Promise((resolve, reject) =>
        fetch(url+'/clock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                date
            ),
        }).then((response) =>
            {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((obj) => { reject(obj); }) // error msg in the response body
                        .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                }
            }
        ).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] })}) // connection errors
    )
}

const API = { addUser,newAck, confirmAck, logIn, logOut, getUserInfo,
     newBooking, newBookingProduct, editProductQty, getClientByEmail, 
    getWalletById, setNewWallet, confirmBooking, newBookingMode,
    confirmDeliveryProducts, newFutureProduct, confirmProductsFarmer, setDate};
export default API;