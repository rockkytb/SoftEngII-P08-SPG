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
        case 'F':
            response = await fetch(url + '/farmerSessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            break;
        case 'E':
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
    await fetch(url+'/sessions/current', { method: 'DELETE' });
  }

const API = { addUser, logIn, logOut };
export default API;