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
        appendChats(msg);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});

async function getChats() {
  try {
    const result = await axios.post('/chat/chats', { user });

    const msg = result.data.messages;
    for (let i = 0; i < msg.length; i++) {
      appendChats(msg[i]);
    }

  } catch (e) {
    console.log(e.message);
  }
}
getChats();

function appendChats(message) {
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

(() => {
  setInterval(async () => {
    messages.innerHTML = '';
    await getChats();
  }, 1000);
})();