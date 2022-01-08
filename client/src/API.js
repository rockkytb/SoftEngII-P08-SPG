
const url = "/api";

function addUser(newUser) {
  // call: POST /api/newclient
  return new Promise((resolve, reject) => {
    fetch("/api/newclient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
        password: newUser.password,
        phone: newUser.phone
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function logIn(credentials, type) {
  //call: POST /api/...
  let response = null;
  switch (type) {
    case "C":
      response = await fetch(url + "/clientSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      break;
    case "M":
      response = await fetch(url + "/warehouseManagerSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      break;
    case "A":
      response = await fetch(url + "/managerSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      break;
    case "F":
      response = await fetch(url + "/farmerSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      break;
    case "S":
      response = await fetch(url + "/shopEmployeeSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      break;
    case "W":
      response = await fetch(url + "/warehouseWorkerSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    console.log("client: login returned ok from server");
    const user = await response.json();
    return user;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch(url + "/logout", { method: "DELETE" });
}



async function getUserInfo() {
  const response = await fetch(url + "/userinfo");
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

async function getClientByEmail(email) {
  //Not very secure, should send also employee data to verify identity
  const response = await fetch(url + "/client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  if (response.ok) {
    resolve (response.json());
  } else {
    reject (response.json());
  }
}

async function getWalletById(id) {
  //Not very secure, should send also employee data to verify identity
  const response = await fetch(url + "/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  const wallet = await response.json();
  if (response.ok) {
    return wallet;
  } else {
    throw wallet;
  }
}

async function setNewWallet(id, amount) {
  return new Promise((resolve, reject) => {
    fetch(url + "/walletbalance", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        amount: amount,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function newBooking(clientId, products) {
  //call: POST /api/bookings
  const getId = async (clientId) => {

    const response = await fetch(url + "/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idClient: clientId }),
    });

    const id = await response.json();
    if (response.ok) {
      return id.idBooking;
    }
  };

  async function newBookingProduct(ID_Booking, products) {
    //call: POST /api/bookingproduct
    return new Promise((resolve, reject) => {
      fetch(url + "/bookingproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_Booking: ID_Booking,
          products: products,
        }),
      })
        .then((response) => {
          if (response.ok) {
            //FIX should NOT do it here
            //editProductQty(ID_Product, Qty);
            resolve(response.json());
          } else {
            response
              .json()
              .then((obj) => {
                reject(obj);
              }) // error msg in the response body
              .catch((err) => {
                reject({
                  errors: [
                    {
                      param: "Application",
                      msg: "Cannot parse server response",
                    },
                  ],
                });
              }); // something else
          }
        })
        .catch((err) => {
          reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
        }); // connection errors
    });
  }

  let id = await getId(clientId);
  console.log(id);
  let result = await newBookingProduct(id, products);

  return result;
}

async function confirmBooking(id) {
  return new Promise((resolve, reject) => {
    fetch(url + "/bookingstate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        state: "COMPLETED",
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function newBookingMode(booking) {
  //call: POST /api/bookings_mode
  return new Promise((resolve, reject) => {
    fetch(url + "/bookings_mode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function editProductQty(ID_Product, Qty) {
  //call: PUT /api/productqty
  return new Promise((resolve, reject) => {
    fetch(url + "/productqty", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_Product: ID_Product,
        Dec_Qty: Qty,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function confirmAck(id) {
  return new Promise((resolve, reject) => {
    fetch(url + "/ackstate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        state: "READ",
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function confirmDeliveryProducts(productList) {
  return new Promise((resolve, reject) => {
    const deliveryList = productList.map((product) => {
      return {
        id: product.id,
        state: "DELIVERED",
      };
    });
    fetch(url + "/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryList),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function confirmProductsFarmer(product) {
  return new Promise((resolve, reject) => {
    fetch(url + "/productstate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function newAck(idFarmer, email) {
  //call: POST /api/acknowledge
  return new Promise((resolve, reject) => {
    fetch(url + "/acknowledge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idFarmer: idFarmer, email: email }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function newFutureProduct(id, products) {
  //call: POST /api/bookings_mode
  return new Promise(
    (resolve, reject) =>
      fetch(url + "/farmers/" + id + "/productsExpected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            response
              .json()
              .then((obj) => {
                reject(obj);
              }) // error msg in the response body
              .catch((err) => {
                reject({
                  errors: [
                    {
                      param: "Application",
                      msg: "Cannot parse server response",
                    },
                  ],
                });
              }); // something else
          }
        })
        .catch((err) => {
          reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
        }) // connection errors
  );
}

async function confirmPreparation(id) {
  return new Promise((resolve, reject) => {
    fetch(url + "/bookings_mode/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }

    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function confirmPreparationFarmer(productList) {
  return new Promise((resolve, reject) => {
    const preparationList = productList.map((product) => {
      return {
        id: product.id,
        state: "PREPARATION",
      };
    });
    fetch(url + "/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparationList),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function updateOrder(product) {

  const update = async (product) => {
    const response = await fetch(url + "/bookingproducts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    const result = await response.json();
    if (response.ok) {
      return result
    } else {
      return "error";
    }
  }

  let mrTorgue = update(product);
  return mrTorgue;
}


async function setDate(date) {
  return new Promise(
    (resolve, reject) =>
      fetch(url + "/clock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(date),
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            response
              .json()
              .then((obj) => {
                reject(obj);
              }) // error msg in the response body
              .catch((err) => {
                reject({
                  errors: [
                    {
                      param: "Application",
                      msg: "Cannot parse server response",
                    },
                  ],
                });
              }); // something else
          }
        })
        .catch((err) => {
          reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
        }) // connection errors
  );
}

//VIRTUAL CLOCK
async function getTime() {
  const response = await fetch("/api/time");
  const time = await response.json();
  if (response.ok) {
    return time;
  }
}

async function enableDisableVirtualClock() {
  const response = await fetch("/api/virtualTime");
  const time = await response.json();
  if (response.ok) {
    return time;
  }
}

async function deleteProductBooking(product) {
  // call: DELETE /api/bookingProduct
  console.log("dentro api")
  console.log(product)
  await fetch(url + "/bookingProduct", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      ID_Product: product.ID_Product,
      ID_Booking: product.ID_Booking
    }),
  });
}

async function attaccoDoS(userdata) {
  const getProducts = async () => {
    // call: GET /api/products


    if (userdata && userdata.id && userdata.id.charAt(0) === "F") {
      let prodi = [];
      const getExpected = async (userdata) => {
        const response = await fetch(
          "/api/farmers/" + userdata.id.substring(1) + "/products_expected"
        );
        const productList = await response.json();
        if (response.ok) {
          productList.map((p)=> prodi.push(p))
        }
      };
      const getConfirmed = async (userdata) => {
        const response2 = await fetch(
          "/api/products/farmers/" + userdata.id.substring(1)
        );
        const productList2 = await response2.json();
        if (response2.ok) {
          productList2.map((p)=> prodi.push(p))
        }
      };

      await getExpected(userdata);
      await getConfirmed(userdata);

      return prodi;
    } else {
      const response = await fetch("/api/products");
      const productList = await response.json();
      if (response.ok) {
        return productList;
      }
    }
  };

  const getBookings = async () => {
    // call: GET /api/bookings (S), GET api/bookings/clients/:id (C), GET /api/bookingModesNew/pickup (M)
    if (userdata && userdata.id && userdata.id.charAt(0) === "S") {
      const response = await fetch("/api/bookingModesPreparation");
      const bookingList = await response.json();
      if (response.ok) {
        return bookingList;
      }
    } else if (userdata && userdata.id && userdata.id.charAt(0) === "C") {
      const response = await fetch(
        "/api/bookings/clients/" + userdata.id.substring(1)
      );
      const bookingList = await response.json();
      if (response.ok) {
        return bookingList;
      }
    } else if (userdata && userdata.id && userdata.id.charAt(0) === "M") {
      const response = await fetch(
        "/api/bookingModesNew/pickup"
      );
      const bookingList = await response.json();
      if (response.ok) {
        return bookingList;
      }
    }
    else if (userdata && userdata.id && userdata.id.charAt(0) === "W") {
      const response = await fetch(
        "/api/bookingModesNew/pickup"
      );
      const bookingList = await response.json();
      if (response.ok) {
        return bookingList;
      }
    }
  };

  const getClients = async () => {
    // call: GET /api/clients
    if (userdata && userdata.id && userdata.id.charAt(0) === "S") {
      const response = await fetch("/api/clients");
      const clientList = await response.json();
      if (response.ok) {
        return clientList;
      }
    }
  };

  const getCategories = async () => {
    // call: GET /api/categories
    const response = await fetch("/api/categories");
    const clientList = await response.json();
    if (response.ok) {
      return clientList;
    }
  };

  let products = await getProducts();
  let bookings = await getBookings();
  let clients = await getClients();
  let categories = await getCategories();

  return { products, bookings, clients, categories };
}



const API = {
  addUser,
  newAck,
  confirmAck,
  logIn,
  logOut,
  getUserInfo,
  newBooking,
  editProductQty,
  getClientByEmail,
  getWalletById,
  setNewWallet,
  confirmBooking,
  newBookingMode,
  confirmDeliveryProducts,
  newFutureProduct,
  confirmProductsFarmer,
  setDate,
  attaccoDoS,
  confirmPreparation,
  confirmPreparationFarmer,
  updateOrder,
  getTime,
  enableDisableVirtualClock,
  deleteProductBooking
};
export default API;
