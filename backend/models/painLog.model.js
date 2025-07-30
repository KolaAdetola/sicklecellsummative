import mongoose from 'mongoose';

const painLogSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PainLog = mongoose.model('PainLog', painLogSchema);

export default PainLog;
