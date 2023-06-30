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
