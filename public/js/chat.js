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
        for (let i = 1; i < 10; i++) {
          localStorage.setItem(i - 1, localStorage.getItem(i));
          console.log(localStorage.getItem(i));
        }
        localStorage.setItem(9, msg);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});

function getlsChats() {
  messages.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    appendChats(localStorage.getItem(i));
  }
}

function appendChats(message) {
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

(() => {
  setInterval(() => {
    getlsChats();
  }, 1000);
})();