import CareTaker from "../models/careTaker.model.js";

const addCareTaker = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const phone = req.body.phone?.trim();
        const email = req.body.email?.trim();
        const relationship = req.body.relationship?.trim();
        const patientName = req.body.patientName?.trim();

        if (!name || !phone || !email || !relationship || !patientName) {
            console.error("Validation error: Missing required fields.");
            return res.status(400).json({ message: "All fields are required." });
        }

        const newCareTaker = new CareTaker({
            name,
            phone,
            email,
            relationship,
            patientName
        });

        const savedCareTaker = await newCareTaker.save();
        res.status(201).json(savedCareTaker);
    } catch (error) {
        console.error("Error adding caretaker:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getAllCareTakers = async (req, res) => {
    try {
        const careTakers = await CareTaker.find();
        res.json(careTakers);
    } catch (error) {
        console.error('Error fetching caretakers:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getCareTaker = async (req, res) => {
    try {
        const careTaker = await CareTaker.findOne({ phone: req.params.phone });

        if (!careTaker) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(careTaker);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export { addCareTaker, getCareTaker, getAllCareTakers };
