const user = localStorage.getItem('user');
if (!user) window.location.href = '/html/login.html';

const form = document.getElementById('form');
const inputMessage = document.getElementById('inputMessage');
const messages = document.getElementById('messages');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const msg = inputMessage.value;
    if (msg) {
      const messageDetails = {
        user, msg
      }
      inputMessage.value = '';

      const result = await axios.post('/chat', messageDetails);

      if (result.data.success) {
        const li = document.createElement('li');
        li.textContent = msg;
        messages.appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});