import PainLog from "../models/painLog.model.js";

const submitPainLog = async (req, res) => {
    try {
        const { description, level } = req.body;

        if (!description || typeof level !== "number") {
            return res.status(400).json({ message: "Description and level are required." });
        }

        const newLog = new PainLog({ description, level });
        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (error) {
        console.error("Error saving pain log:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { submitPainLog };
