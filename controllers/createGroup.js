const Group = require("../models/group");

const createGroup = async (req, res) => {
  try {
    const { user, gname } = req.body;

    const group = await Group.findOne({ name: gname });

    if (group) {
      return res.status(200).json({
        success: false,
        msg: `${gname} is already present, Please join`,
      });
    } else {
      await Group.create({ name: gname, users: user, admins: user });
      return res.status(200).json({ success: true });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const joinGroup = async (req, res) => {
  try {
    const { user, gname } = req.body;

    const group = await Group.findOne({ name: gname });

    const users = group.users;
    if (!users.includes(user)) {
      users.push(user);
      await Group.findOneAndUpdate({ name: gname }, { users: users });
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createGroup, joinGroup };
