import mongoose from 'mongoose';

const SickleCellFormSchema = new mongoose.Schema({
  crisisTriggers: {
    type: [String],
    required: true
  },
  sickleCellType: {
    type: String,
    enum: ['SS', 'SC'],
    required: true
  },
  crisisFrequency: {
    type: String,
    enum: ['Often', 'Sometimes', 'Rarely'],
    required: true
  }
}, { timestamps: true });

const SickleCellForm = mongoose.model('SickleCellForm', SickleCellFormSchema);
export default SickleCellForm;
