const bcrypt = require("bcrypt");
const Auth = require("../models/auth");

const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = await Auth.findOne({ email: email });
    if (user) {
      return res.json({ success: false, msg: "User exists, Please login!" });
    } else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        await Auth.create({
          name,
          phone: Number(phone),
          email,
          password: encrypted,
        });
        return res
          .status(201)
          .json({ success: true, msg: "Account is created successfuly!" });
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email: email });

    bcrypt.compare(password, user.password, (err, same) => {
      if (same) return res.status(200).json({ success: true });
      else return res.json({ success: false, msg: "Password is incorrect!" });
    });
  } catch (e) {
    console.log(e.message);
  }
};

const getFriends = async (req, res) => {
  try {
    const users = await Auth.find({});

    return res.status(200).json({ success: true, users });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { signup, login, getFriends };
