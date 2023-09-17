const Group = require("../models/home");

const getGroupsNames = async (req, res) => {
  try {
    const { user } = req.body;
    const myGroups = await Group.find({});

    const groupNameList = [];
    myGroups.forEach((group) => {
      groupNameList.push(group.name);
    });

    res.status(200).json({ success: true, groupNameList });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { getGroupsNames };
