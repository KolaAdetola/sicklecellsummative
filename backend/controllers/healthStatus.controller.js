import SickleCellForm from "../models/healthStatus.model.js";
// Create new form
export const createForm = async (req, res) => {
  try {
    const { crisisTriggers, sickleCellType, crisisFrequency } = req.body;


    if (!crisisTriggers || !sickleCellType || !crisisFrequency) {
      return res.status(400).json({ message: "All fields are required." });
    }


    const newForm = new SickleCellForm({
      crisisTriggers,
      sickleCellType,
      crisisFrequency
    });

    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all forms for a user
// export const getUserForms = async (req, res) => {
//   try {
//     const userId = req.user?._id || req.userId;
//     const forms = await SickleCellForm.find({ user: userId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(forms);
//   } catch (error) {
//     console.error("Error fetching forms:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// Get form by ID
// export const getFormById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const form = await SickleCellForm.findById(id).populate(
//       "user",
//       "name email"
//     );

//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     res.status(200).json(form);
//   } catch (error) {
//     console.error("Error fetching form:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
