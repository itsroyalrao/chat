const user = localStorage.getItem("user");
if (!user) window.location.href = "/html/login.html";
// const form = document.getElementById("create-group-form");
const createGrp = document.getElementById("create-group");
const joinGrp = document.getElementById("join-group");
const message = document.getElementById("message");

createGrp.addEventListener("click", (e) => createGroup(e));
joinGrp.addEventListener("click", (e) => joinGroup(e));

async function createGroup(e) {
  e.preventDefault();

  try {
    const gname = document.getElementById("group-name").value;
    if (gname) {
      const groupDetails = { user, gname };

      const result = await axios.post("/home/create-group", groupDetails);

      message.innerHTML = "";
      if (result.data.success) message.style.color = "green";
      else message.style.color = "red";
      message.appendChild(document.createTextNode(result.data.msg));
    } else {
      message.style.color = "red";
      message.appendChild(document.createTextNode("Please provide a value"));
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function joinGroup(e) {
  e.preventDefault();

  try {
    const gname = document.getElementById("group-name").value;
    if (gname) {
      const groupDetails = { user, gname };

      const result = await axios.post("/home/join-group", groupDetails);
      console.log(result);

      message.innerHTML = "";
      if (result.data.success) {
        window.location.href = `/html/chat.html?gname=${gname}`;
      } else {
        message.appendChild(document.createTextNode(result.data.msg));
      }
    } else {
      message.style.color = "red";
      message.appendChild(document.createTextNode("Please provide a value"));
    }
  } catch (e) {
    console.log(e.message);
  }
}
