const mongoose = require("mongoose");

//file Schema
const fileSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: [true, "uploaded file must have a name"],
    }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;