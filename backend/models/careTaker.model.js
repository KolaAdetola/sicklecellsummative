import mongoose from "mongoose";

const CareTakerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CareTaker = mongoose.model("CareTaker", CareTakerSchema);
export default CareTaker;
