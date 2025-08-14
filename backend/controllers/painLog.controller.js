import PainLog from "../models/painLog.model.js";

const submitPainLog = async (req, res) => {
  try {
    const { description, level } = req.body;

    if (!description || typeof level !== "number") {
      return res
        .status(400)
        .json({ message: "Description and level are required." });
    }
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const newLog = new PainLog({ description, level, userId: req.user._id, createdAt: formattedDateTime });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    console.error("Error saving pain log:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getPainLogs = async (req, res) => {
  try {
    const painLogs = await PainLog.find();
    res.json(painLogs);
  } catch (error) {
    console.error("Error fetching pain logs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { submitPainLog, getPainLogs };
