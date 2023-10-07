const user = localStorage.getItem("user");
if (!user) window.location.href = "html/login.html";

const socket = io();

const gname = document.querySelector(".my-groups");

async function getGroupName() {
  try {
    let groups = await axios.post("/home/allGroups", { user });
    groups = groups.data.groupNameList;

    groups.forEach((group) => {
      appendGroupName(group);
    });
  } catch (e) {
    console.log(e);
  }
}
getGroupName();

function appendGroupName(group) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  const a = document.createElement("a");
  a.className = "group-body";
  a.href = `/html/chat.html?gname=${group}`;
  a.onclick = (e) => joinGroup(e, group);

  const cardDiv = document.createElement("div");
  cardDiv.className = "card shadow-sm";

  const img = document.createElement("img");
  img.className = "bd-placeholder-img card-img-top";
  img.height = "225";
  img.src = `https://source.unsplash.com/480x360?${group}`;

  const h5 = document.createElement("h5");
  h5.className = "group-name";
  h5.appendChild(document.createTextNode(group));
  h5.style.textTransform = "capitalize";

  cardDiv.appendChild(img);
  cardDiv.appendChild(h5);
  a.appendChild(cardDiv);
  colDiv.appendChild(a);
  gname.appendChild(colDiv);
}

async function joinGroup(e, gname) {
  e.preventDefault();

  try {
    await socket.emit("join-room", gname);

    const groupDetails = { user, gname };
    await axios.post("/home/join-group", groupDetails);

    window.location.href = `/html/chat.html?gname=${gname}`;
  } catch (e) {
    console.log(e.message);
  }
}
