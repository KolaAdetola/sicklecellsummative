import mongoose from 'mongoose';

const painLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
