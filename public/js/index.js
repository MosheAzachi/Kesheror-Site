const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const register = document.querySelector('.form--register');
const newItem = document.querySelector('.form--newProduct');
const newUser = document.querySelector('.form--createUser');
const contact = document.querySelector('.form--contact');

if (register) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    registerFunc(name, email, password, passwordConfirm);
  });
}

registerFunc = async (name, email, password, passwordConfirm) => {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/users/signup',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('נרשמת בהצלחה לאתר!');
        window.setTimeout(function() {
          location.assign('/');
        }, 1000);
      }
      console.log(data.status);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

if (loginForm) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

login = async (email, password) => {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/users/login',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      email: email,
      password: password
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('התחברת בהצלחה לאתר!');
        window.setTimeout(function() {
          location.assign('/');
        }, 1000);
      }
      console.log(data.status);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

if (logOutBtn) {
  logOutBtn.addEventListener('click', async () => {
    $.ajax({
      url: 'http://127.0.0.1:4000/api/users/logout',
      type: 'GET',
      success: function(data) {
        if (data.status === 'success') {
          location.reload(true);
        }
      },
      error: function(xhr, status, error) {
        alert(xhr.responseJSON.message);
      }
    });
  });
}

if (newItem) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    let onSale;
    let priceAfter;
    if (document.getElementById('productOnSale').value === 'true') {
      console.log('hi');
      onSale = true;
      priceAfter = document.getElementById('productPriceOnSale').value;
    } else {
      onSale = false;
    }
    const productImage = document.getElementById('productImage').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    createItem(productImage, productName, productDescription, productPrice, onSale, priceAfter);
  });
}

createItem = async (productImage, productName, productDescription, productPrice, onSale, priceAfter) => {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/items',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      image: productImage,
      sale: onSale,
      priceAfterSale: priceAfter,
      productName: productName,
      description: productDescription,
      price: productPrice
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('מוצר נוצר בהצלחה!');
        window.setTimeout(function() {
          location.assign('/personal');
        }, 1000);
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

if (newUser) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const role = document.getElementById('role').value;
    createUser(name, email, password, passwordConfirm, role);
  });
}

createUser = async (name, email, password, passwordConfirm, role) => {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/users/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      role: role
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('משתמש נוצר בהצלחה!');
        window.setTimeout(function() {
          location.assign('/personal');
        }, 1000);
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

function deleteUserFunc(ID) {
  deleteUser(ID);
}

deleteUser = async ID => {
  $.ajax({
    url: `http://127.0.0.1:4000/api/users/${ID}`,
    type: 'DELETE',
    success: function(data) {
      if (!data) {
        alert('משתמש נמחק בהצלחה!');
        window.location.reload();
      }
      console.log(data.status);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

function deleteItemFunc(ID) {
  deleteItem(ID);
}

deleteItem = async ID => {
  $.ajax({
    url: `http://127.0.0.1:4000/api/items/${ID}`,
    type: 'DELETE',
    success: function(data) {
      if (!data) {
        alert('מוצר נמחק בהצלחה!');
        window.location.reload();
      }
      console.log(data.status);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

function updateUserFunc(ID) {
  const name = document.getElementById(`usernameInput-${ID}`).value;
  const email = document.getElementById(`emailInput-${ID}`).value;
  const role = document.getElementById(`roleSelect-${ID}`).value;
  updateUser(ID, name, email, role);
}

updateUser = async (ID, name, email, role) => {
  $.ajax({
    url: `http://127.0.0.1:4000/api/users/${ID}`,
    type: 'PATCH',
    contentType: 'application/json',
    data: JSON.stringify({
      name: name,
      email: email,
      role: role
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('המשתמש עודכן בהצלחה!');
        window.setTimeout(function() {
          location.assign('/get-users');
        }, 1000);
      }
      console.log(data.status);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

function updateItemFunc(ID) {
  const name = document.getElementById(`productNameInput-${ID}`).value;
  const price = document.getElementById(`priceInput-${ID}`).value;
  const description = document.getElementById(`productDescriptionInput-${ID}`).value;
  const image = document.getElementById(`imageInput-${ID}`).value;
  updateItem(ID, name, price, description, image);
}

updateItem = async (ID, name, price, description, image) => {
  $.ajax({
    url: `http://127.0.0.1:4000/api/items/${ID}`,
    type: 'PATCH',
    contentType: 'application/json',
    data: JSON.stringify({
      productName: name,
      price: price,
      description: description,
      image: image
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('המוצר עודכן בהצלחה!');
        window.setTimeout(function() {
          location.assign('/get-items');
        }, 1000);
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};

if (contact) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const message = document.getElementById('message').value;
    contactSend(contactName, contactEmail, message);
  });
}

function contactSend(name, email, description) {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/contact',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      name: name,
      email: email,
      description: description
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('טופס יצירת קשר נשלח בהצלחה!');
        window.setTimeout(function() {
          location.assign('/');
        }, 1000);
      }
    }
  });
}

function togglePriceInputs(value) {
  const priceInputs = document.getElementById('priceInputs');
  if (value === 'true') {
    priceInputs.style.display = 'block';
  } else {
    priceInputs.style.display = 'none';
  }
}
