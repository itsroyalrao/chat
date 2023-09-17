const Models = require("../models/home");

const Group = Models.Group;

const createGroup = async (req, res) => {
  try {
    const { user, gname } = req.body;

    const group = await Group.findOne({ name: gname });

    if (group) {
      return res.status(200).json({
        success: true,
        msg: `${gname} is already present, Please join`,
      });
    } else {
      await Group.create({ name: gname, users: user });
      return res
        .status(200)
        .json({ success: true, msg: `${gname} is successfully created` });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const joinGroup = async (req, res) => {
  try {
    const { user, gname } = req.body;

    const group = await Group.findOne({ name: gname });

    if (group) {
      const users = group.users;
      if (users.includes(user)) {
        return res
          .status(200)
          .json({ success: true, msg: `You are already present in ${gname}` });
      } else {
        users.push(user);
        await Group.findOneAndUpdate({ name: gname }, { users: users });
        return res.status(200).json({
          success: true,
          msg: `You are successfully added in ${gname}`,
        });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, msg: `${gname} is not present` });
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createGroup, joinGroup };
