const user = localStorage.getItem("user");
const userEmail = user;
if (!user) window.location.href = "/html/login.html";

const socket = io();
const gname = new URLSearchParams(window.location.search).get("gname");

socket.emit("join room", gname);

const form = document.getElementById("form");
const searchFriends = document.getElementById("friends-area_input");
const friendList = document.getElementById("friend-list");
const navGrpName = document.getElementById("navbar_group-name");
const inputMessage = document.getElementById("inputMessage");
const messages = document.getElementById("messages");
const messageArea = document.getElementById("message-area");

friendList.innerHTML = "";

navGrpName.appendChild(document.createTextNode(gname));

socket.on("message", (message) => {
  console.log("Message recieved successfuly");
  appendChats(message);
  messageArea.scrollTop = messageArea.scrollHeight;
});

socket.on("media message", (imageURL, filename) =>
  appendMedia(imageURL, filename)
);

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    const msg = inputMessage.value;
    const filesInput = document.getElementById("files");

    const formData = new FormData();
    formData.append("room", gname);
    formData.append("files", filesInput.files[0]);

    if (filesInput.files.length) {
      try {
        const result = await axios.post("/upload", formData);

        socket.emit(
          "media message",
          result.data.result,
          result.data.file.originalname,
          gname
        );
        filesInput.value = "";

        const messageDetails = {
          user,
          msg: result.data.file.originalname,
          gname,
          messageType: result.data.file.mimetype,
          link: result.data.result,
        };

        await axios.post("/chat", messageDetails);
      } catch (error) {
        console.error("Error sending files:", error);
      }
    } else if (msg) {
      const messageDetails = {
        user,
        msg,
        gname,
        messageType: "text",
      };

      socket.emit("user-message", msg, gname);

      await axios.post("/chat", messageDetails);
    }
    inputMessage.value = "";
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
function appendMedia(imageURL, filename) {
  const item = document.createElement("li");
  const a = document.createElement("a");
  a.appendChild(document.createTextNode(filename));
  a.href = imageURL;
  a.target = "_blank";
  item.appendChild(a);
  messages.appendChild(item);
  messageArea.scrollTop = messageArea.scrollHeight;
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
    chats.forEach((msg) => {
      if (msg.messageType === "text") appendChats(msg.message);
      else appendMedia(msg.link, msg.message);
    });
    messageArea.scrollTop = messageArea.scrollHeight;
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
