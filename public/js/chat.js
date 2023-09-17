const user = localStorage.getItem("user");
if (!user) window.location.href = "/html/login.html";

const gname = new URLSearchParams(window.location.search).get("gname");
// console.log(gname, user);

const form = document.getElementById("form");
const friendList = document.getElementById("friend-list");
const inputMessage = document.getElementById("inputMessage");
const messages = document.getElementById("messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const msg = inputMessage.value;
    if (msg) {
      const messageDetails = {
        user,
        msg,
        gname,
      };
      inputMessage.value = "";

      const result = await axios.post("/chat", messageDetails);

      if (result.data.success) {
        appendChats(msg);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

function appendChats(message) {
  const li = document.createElement("li");
  li.textContent = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

(() => {
  setInterval(() => {
    getChats();
  }, 1000);
})();

async function getFriends() {
  try {
    const result = await axios.get("/auth");
    const users = result.data.users;

    users.forEach((friend) => {
      if (friend.email !== user) {
        appendFriends(friend.name);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}
getFriends();

async function getChats() {
  try {
    let chats = await axios.post("/chat/chats", { gname });
    chats = chats.data.messages;

    messages.innerHTML = "";
    chats.forEach((message) => {
      appendChats(message);
    });
  } catch (e) {
    console.log(e);
  }
}
getChats();

function appendFriends(user) {
  const div = document.createElement("div");
  div.className = "friends";

  const a = document.createElement("a");
  a.className = "sidebar_friends";
  a.href = "#";
  a.appendChild(document.createTextNode(user));

  div.appendChild(a);
  friendList.appendChild(div);
}
