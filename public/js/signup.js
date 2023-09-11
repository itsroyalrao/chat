const form = document.getElementById('signup-form');
const msg = document.getElementById('message');

form.addEventListener('submit', (e) => createUser(e));

async function createUser(e) {
  e.preventDefault();
  try {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userDetalis = {
      name, phone, email, password
    }
    const result = await axios.post('/auth', userDetalis);

    msg.innerHTML = '';
    if (result.data.success) {
      msg.appendChild(document.createTextNode(result.data.msg));
      msg.style.color = 'green';
      setTimeout(() => {
        window.location.href = '/html/login.html';
      }, 2000);
    } else {
      msg.appendChild(document.createTextNode(result.data.msg));
      msg.style.color = 'red';
    }

  } catch (e) {
    console.log(e.message);
  }
}