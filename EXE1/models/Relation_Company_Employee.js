const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RelationSchema = new Schema({
    Employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Relation', RelationSchema);