const user = localStorage.getItem("user");
if (!user) window.location.href = "/html/login.html";

const socket = io();

const createGrp = document.getElementById("create-group");
const joinGrp = document.getElementById("join-group");
const message = document.getElementById("message");

createGrp.addEventListener("click", (e) => createGroup(e));

async function createGroup(e) {
  e.preventDefault();

  try {
    const inputElement = document.getElementById("group-name");
    const gname = capitalize(inputElement.value);

    if (gname) {
      const groupDetails = { user, gname };

      const result = await axios.post("/home/create-group", groupDetails);

      message.innerHTML = "";
      if (result.data.success) {
        window.location.href = `/html/chat.html?gname=${gname}`;
      } else {
        message.style.color = "red";
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

function capitalize(str) {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]);
  }

  return words.join(" ");
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
