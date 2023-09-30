const user = localStorage.getItem("user");
const userEmail = user;
if (!user) window.location.href = "/html/login.html";

const socket = io();
const gname = new URLSearchParams(window.location.search).get("gname");

const form = document.getElementById("form");
const searchFriends = document.getElementById("friends-area_input");
const friendList = document.getElementById("friend-list");
const navGrpName = document.getElementById("navbar_group-name");
const inputMessage = document.getElementById("inputMessage");
const messages = document.getElementById("messages");

friendList.innerHTML = "";

navGrpName.appendChild(document.createTextNode(gname));

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

      socket.emit("user-message", msg);
      await axios.post("/chat", messageDetails);
    }
  } catch (e) {
    console.log(e);
  }
});

socket.on("message", (message) => {
  appendChats(message);
});

function appendChats(message) {
  const li = document.createElement("li");
  li.textContent = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

async function getFriends() {
  try {
    const result = await axios.get(`/home/friends?gname=${gname}`);
    const users = result.data.users;

    if (users) {
      users.users.forEach(async (friend) => {
        if (friend !== user) {
          const user = await axios.get(`/chat/friend?friend=${friend}`);

          appendFriends(user.data.user.name);
        }
      });
    }
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

  const img = document.createElement("img");
  img.className = "deleteFriend";
  img.src = "/util/delete.png";
  img.addEventListener("click", () => removeFriend(user));

  div.appendChild(a);
  div.appendChild(img);
  friendList.appendChild(div);
}

async function removeFriend(user) {
  try {
    const result = await axios.delete(
      `/chat?name=${user}&gname=${gname}&email=${userEmail}`
    );
    friendList.innerHTML = "";
    await getFriends();
  } catch (e) {
    console.log(e.message);
  }
}

searchFriends.addEventListener("input", async (e) => {
  e.preventDefault();

  try {
    friendList.innerHTML = "";
    const friend = searchFriends.value;

    const result = await axios.post(`/chat/friend`, { friend });
    appendFriends(result.data.user.name);
  } catch (e) {
    console.log(e.message);
  }
});
