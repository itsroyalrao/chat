const user = localStorage.getItem("user");
if (!user) window.location.href = "html/login.html";

const gname = document.querySelector(".my-groups");
const username = document.getElementById("username");

(async () => {
  try {
    const result = await axios.get(`/home?username=${user}`);

    username.appendChild(document.createTextNode(result.data.user.name));
  } catch (e) {}
})();

async function getGroupName() {
  try {
    let groups = await axios.post("/home/myGroups", { user });
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

  const cardDiv = document.createElement("div");
  cardDiv.className = "card shadow-sm";

  const img = document.createElement("img");
  img.className = "bd-placeholder-img card-img-top";
  img.height = "225";
  img.src = `https://source.unsplash.com/480x360?${group}`;

  const h5 = document.createElement("h5");
  h5.className = "group-name";
  h5.appendChild(document.createTextNode(group));

  cardDiv.appendChild(img);
  cardDiv.appendChild(h5);
  a.appendChild(cardDiv);
  colDiv.appendChild(a);
  gname.appendChild(colDiv);
}
