const bcrypt = require('bcrypt');
const Auth = require('../models/auth');

const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = await Auth.findOne({ email: email });
    if (user) {
      return res.json({ success: false, msg: 'User exists, Please login!' });
    } else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        await Auth.create({ name, phone: Number(phone), email, password: encrypted });
        return res.status(201).json({ success: true, msg: 'Account is created successfuly!' });
      })
    }
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { signup };