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
        default:  new Date().toISOString().slice(0, 10) + ' ' + new Date().toLocaleTimeString()
    }
});

const PainLog = mongoose.model('PainLog', painLogSchema);

export default PainLog;
