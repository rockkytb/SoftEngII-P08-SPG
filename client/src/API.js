

function addUser(newUser) {
    // call: POST /api/newclient
    return new Promise((resolve, reject) => {
        fetch('/api/newclient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
               {email: newUser.email, name: newUser.name, surname: newUser.surname, password: newUser.password}
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

const API = { addUser };
export default API;