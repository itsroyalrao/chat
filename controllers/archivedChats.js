const { CronJob } = require("cron");
const { Chat, ArchivedChat } = require("../models/chat");

const archiveChats = async (req, res) => {
  try {
    const oneDayAgo = Date.now() - 60 * 1000;
    const messagesToMove = await Chat.find({ createdAt: { $lt: oneDayAgo } });
    await ArchivedChat.insertMany(messagesToMove);
    await Chat.deleteMany({ createdAt: { $lt: oneDayAgo } });
  } catch (e) {
    console.log(e.message);
  }
};

const job = new CronJob(
  "0 0 * * * *",
  async function () {
    await archiveChats();
  },
  null,
  true,
  "America/Los_Angeles"
);
