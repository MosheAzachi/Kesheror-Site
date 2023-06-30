const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const register = document.querySelector('.form--register');

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
        name,
        email,
        password,
        passwordConfirm,
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
