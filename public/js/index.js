const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const register = document.querySelector('.form--register');
const newItem = document.querySelector('.form--newProduct');
const newUser = document.querySelector('.form--createUser');

if (register) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    registerFunc(name, email, password, passwordConfirm);
  });
}

registerFunc = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/api/users/signup',
      data: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      alert('נרשמת בהצלחה לאתר!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};

if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/api/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      alert('התחברת בהצלחה לאתר!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};

if (logOutBtn) {
  logOutBtn.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:4000/api/users/logout',
      });
      if ((res.data.status = 'success')) location.reload(true);
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}

if (newItem) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const productImage = document.getElementById('productImage').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    createItem(productImage, productName, productDescription, productPrice);
  });
}

createItem = async (productImage, productName, productDescription, productPrice) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/api/items',
      data: {
        image: productImage,
        productName: productName,
        description: productDescription,
        price: productPrice,
      },
    });
    if (res.data.status === 'success') {
      alert('מוצר נוצר בהצלחה!');
      window.setTimeout(() => {
        location.assign('/personal');
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

if (newUser) {
  document.querySelector('.form').addEventListener('submit', (e) => {
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
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/api/users/',
      data: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        role: role,
      },
    });
    if (res.data.status === 'success') {
      alert('משתמש נוצר בהצלחה!');
      window.setTimeout(() => {
        location.assign('/personal');
      }, 1000);
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};

function deleteUserFunc(ID) {
  deleteUser(ID);
}

deleteUser = async (ID) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:4000/api/users/${ID}`,
    });
    if (!res.data) {
      alert('משתמש נמחק בהצלחה!');
      window.location.reload();
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};

function deleteItemFunc(ID) {
  deleteItem(ID);
}

deleteItem = async (ID) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:4000/api/items/${ID}`,
    });
    if (!res.data) {
      alert('מוצר נמחק בהצלחה!');
      window.location.reload();
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};

function updateUserFunc(ID) {
  const name = document.getElementById(`usernameInput-${ID}`).value;
  const email = document.getElementById(`emailInput-${ID}`).value;
  const role = document.getElementById(`roleSelect-${ID}`).value;
  updateUser(ID, name, email, role);
}

updateUser = async (ID, name, email, role) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:4000/api/users/${ID}`,
      data: {
        name: name,
        email: email,
        role: role,
      },
    });
    if (res.data.status === 'success') {
      alert('המשתמש עודכן בהצלחה!');
      window.setTimeout(() => {
        location.assign('/get-users');
      }, 1000);
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};

function updateItemFunc(ID) {
  const name = document.getElementById(`productNameInput-${ID}`).value;
  const price = document.getElementById(`priceInput-${ID}`).value;
  const description = document.getElementById(`productDescriptionInput-${ID}`).value;
  const image = document.getElementById(`imageInput-${ID}`).value;
  updateItem(ID, name, price, description, image);
}

updateItem = async (ID, name, price, description, image) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:4000/api/items/${ID}`,
      data: {
        productName: name,
        price: price,
        description: description,
        image: image,
      },
    });
    if (res.data.status === 'success') {
      alert('המוצר עודכן בהצלחה!');
      window.setTimeout(() => {
        location.assign('/get-items');
      }, 1000);
    }
    console.log(res.data.status);
  } catch (err) {
    alert(err.response.data.message);
  }
};
