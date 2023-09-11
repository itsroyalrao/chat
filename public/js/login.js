const form = document.getElementById('login-form');
const msg = document.getElementById('message');

form.addEventListener('submit', (e) => getUser(e));

async function getUser(e) {
  e.preventDefault();
  try {
    msg.innerHTML = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email) msg.appendChild(document.createTextNode('Email can not be empty!'));
    else if (!password) msg.appendChild(document.createTextNode('Password can not be empty!'));
    else {
      const userDetails = {
        email, password
      }
      const result = await axios.post('/auth/login', userDetails);

      if (result.data.success) {
        localStorage.setItem('user', email);
        window.location.href = '/html/home.html';
      } else {
        msg.appendChild(document.createTextNode(result.data.msg));
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}
